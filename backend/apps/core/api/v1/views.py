import base64
from typing import Dict

from django.contrib.auth import authenticate, login, logout
from django.utils import timezone
from django.db.models import Q

from rest_framework import status
from rest_framework.response import Response

from drf_spectacular.utils import (
    extend_schema,
    OpenApiParameter,
    OpenApiExample,
    inline_serializer,
)
from drf_spectacular.types import OpenApiTypes

from base.api.v1.views import BaseAV
from base.api.v1.decorators import extend_schema_response
from base.pagination import DefaultPagination

from apps.core.api.v1.serializers import (
    DropDownSerializer,
    LoginSerializer,
    ContactInfoSerializer,
    ContactSubmissionCreateSerializer,
    ContactSubmissionSerializer,
    AnnouncementSerializer,
    AnnouncementCreateSerializer,
    GallerySerializer,
    GalleryCreateSerializer,
    NavigationItemSerializer,
    NavigationItemCreateSerializer,
)
from apps.core.models import (
    BaseModel, User, DropDown, ContactInfo, ContactSubmission,
    Announcement, Gallery, NavigationItem
)


# ============== Dropdown Views ==============

class DropdownAV(BaseAV):
    # Reads are public; creating dropdown values is a privileged write.
    authentication = {"get": False, "post": True}

    @extend_schema(request=DropDownSerializer)
    def post(self, request):
        if not request.user.is_staff:
            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        data = request.data
        serializer = DropDownSerializer(
            data=data, exclude=BaseModel.BASE_MODEL_FIELDS + ("parent",), many=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data, "message": "Dropdown saved successfully"})
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        parameters=[
            OpenApiParameter("uuid", OpenApiTypes.UUID, description="Parent dropdown UUID"),
        ]
    )
    def get(self, request):
        data = request.query_params
        uuid = data.get("uuid")
        
        if uuid:
            dropdowns = DropDown.objects.filter(
                parent=DropDown.objects.get(uuid=uuid)
            )
        else:
            dropdowns = DropDown.objects.filter(parent__isnull=True)
        
        serializer = DropDownSerializer(
            dropdowns, many=True, exclude=BaseModel.BASE_MODEL_FIELDS
        )
        return Response({"data": serializer.data})


# ============== Auth Views ==============

class RegisterAV(BaseAV):
    authentication = False

    @extend_schema(
        request=inline_serializer(
            name="RegisterSerializer",
            fields={
                **{
                    k: v
                    for k, v in LoginSerializer().get_fields().items()
                    if k not in User.USER_MODEL_FIELDS + ("uuid", "user_permissions",)
                },
            },
        ),
    )
    def post(self, request):
        data = request.data.copy()
        # Defense in depth: strip privilege/internal fields so a self-service
        # registration can never set is_staff/is_superuser/is_active/etc.,
        # regardless of how the serializer's field filtering behaves.
        for protected in User.USER_MODEL_FIELDS:
            data.pop(protected, None)
        serializer = LoginSerializer(data=data, exclude=(User.USER_MODEL_FIELDS))
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"data": serializer.data, "message": "User registered successfully"},
                status=status.HTTP_201_CREATED
            )
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class LoginAV(BaseAV):
    """Login/Logout API View"""
    authentication = {"post": False}

    def decrypt_auth(self, meta_info) -> None | Dict:
        if not meta_info:
            return None
        try:
            header, data = meta_info.split(" ")
            if header != "Basic":
                return None
            decrypted_auth = base64.b64decode(data).decode("utf-8")
            credentials = decrypted_auth.split(":")
            return {
                "email": credentials[0],
                "password": credentials[1],
            }
        except (ValueError, IndexError):
            return None

    @extend_schema_response(type=LoginSerializer(exclude=User.USER_MODEL_FIELDS))
    def get(self, request):
        serializer = LoginSerializer(
            instance=request.user,
            exclude=User.USER_MODEL_FIELDS,
        )
        return Response({"data": serializer.data})

    @extend_schema_response(type=LoginSerializer(exclude=User.USER_MODEL_FIELDS))
    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="Authorization",
                type=OpenApiTypes.STR,
                location=OpenApiParameter.HEADER,
                required=True,
                examples=[
                    OpenApiExample(
                        name="User Authentication",
                        value="Basic ZXJwQGtpZXQuZWR1OkBlcnA=",
                        summary="base64 encoded credentials are required",
                    )
                ],
            )
        ]
    )
    def post(self, request):
        auth_data = request.META.get("HTTP_AUTHORIZATION")
        credentials = self.decrypt_auth(auth_data)
        
        if not credentials:
            return Response(
                {"error": "Invalid authorization header"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = authenticate(request, **credentials)
        if user is not None:
            login(request, user)
            return Response(
                {"message": "Login successful"},
                status=status.HTTP_200_OK
            )
        return Response(
            {"error": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    def delete(self, request):
        logout(request)
        return Response({"message": "Logout successful"})


# ============== Contact Views ==============

class ContactInfoAV(BaseAV):
    """API for site-wide contact information"""
    authentication = {"get": False, "post": True, "put": True}

    @extend_schema(responses=ContactInfoSerializer)
    def get(self, request):
        contact_info = ContactInfo.objects.first()
        if not contact_info:
            # Create default contact info if none exists
            contact_info = ContactInfo.objects.create()
        
        serializer = ContactInfoSerializer(contact_info)
        return Response({"data": serializer.data})

    @extend_schema(request=ContactInfoSerializer)
    def put(self, request):
        contact_info = ContactInfo.objects.first()
        if not contact_info:
            contact_info = ContactInfo.objects.create()
        
        serializer = ContactInfoSerializer(contact_info, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data, "message": "Contact info updated"})
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ContactSubmitAV(BaseAV):
    """API for contact form submissions"""
    authentication = False

    @extend_schema(
        request=ContactSubmissionCreateSerializer,
        responses={201: inline_serializer(
            name="ContactSubmitResponse",
            fields={
                "success": OpenApiTypes.BOOL,
                "message": OpenApiTypes.STR,
            }
        )}
    )
    def post(self, request):
        serializer = ContactSubmissionCreateSerializer(data=request.data)

        if serializer.is_valid():
            # Verify reCAPTCHA (no-ops gracefully when not configured / no token)
            from apps.core.services import RecaptchaService
            if not RecaptchaService.verify(
                serializer.validated_data.get("recaptcha_token")
            ):
                return Response(
                    {"success": False, "message": "reCAPTCHA verification failed. Please try again."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Get client IP
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0]
            else:
                ip = request.META.get('REMOTE_ADDR')
            
            # Rate limiting check (simple: max 5 submissions per IP per hour)
            one_hour_ago = timezone.now() - timezone.timedelta(hours=1)
            recent_submissions = ContactSubmission.objects.filter(
                ip_address=ip,
                created_at__gte=one_hour_ago
            ).count()
            
            if recent_submissions >= 5:
                return Response(
                    {"success": False, "message": "Too many submissions. Please try again later."},
                    status=status.HTTP_429_TOO_MANY_REQUESTS
                )
            
            # Create submission
            submission = serializer.save()
            submission.ip_address = ip
            submission.user_agent = request.META.get('HTTP_USER_AGENT', '')
            submission.save()
            
            # Send email notifications (async in production)
            try:
                from apps.core.services import EmailService
                EmailService.send_contact_notification(submission)
                EmailService.send_contact_confirmation(submission)
            except Exception as e:
                # Log error but don't fail the request
                import logging
                logging.getLogger(__name__).error(f"Email notification failed: {e}")
            
            return Response(
                {"success": True, "message": "Your message has been sent successfully!"},
                status=status.HTTP_201_CREATED
            )
        
        return Response(
            {"success": False, "message": "Invalid form data", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )


class ContactSubmissionsListAV(BaseAV):
    """API for listing contact submissions (admin only)"""
    authentication = True

    @extend_schema(
        parameters=[
            OpenApiParameter("is_read", OpenApiTypes.BOOL, required=False),
            OpenApiParameter("page", OpenApiTypes.INT, required=False),
            OpenApiParameter("page_size", OpenApiTypes.INT, required=False),
        ],
        responses=ContactSubmissionSerializer(many=True)
    )
    def get(self, request):
        if not request.user.is_staff:
            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        queryset = ContactSubmission.objects.all()
        
        # Filter by read status
        is_read = request.query_params.get("is_read")
        if is_read is not None:
            queryset = queryset.filter(is_read=is_read.lower() == "true")
        
        paginator = DefaultPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)
        
        serializer = ContactSubmissionSerializer(paginated_qs, many=True)
        return paginator.get_paginated_response(serializer.data)


# ============== Announcement Views ==============

class AnnouncementAV(BaseAV):
    """API for announcements"""
    authentication = {"get": False, "post": True, "put": True, "delete": True}

    @extend_schema(
        parameters=[
            OpenApiParameter("active_only", OpenApiTypes.BOOL, required=False, description="Only show active announcements"),
            OpenApiParameter("audience", OpenApiTypes.STR, required=False, description="Filter by target audience"),
            OpenApiParameter("page", OpenApiTypes.INT, required=False),
            OpenApiParameter("page_size", OpenApiTypes.INT, required=False),
        ],
        responses=AnnouncementSerializer(many=True)
    )
    def get(self, request, uuid=None):
        if uuid:
            try:
                announcement = Announcement.objects.get(uuid=uuid)
                serializer = AnnouncementSerializer(announcement)
                return Response({"data": serializer.data})
            except Announcement.DoesNotExist:
                return Response(
                    {"error": "Announcement not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
        
        queryset = Announcement.objects.all()
        
        # Filter by active status
        active_only = request.query_params.get("active_only", "true")
        if active_only.lower() == "true":
            queryset = queryset.filter(is_active=True)
            # Also filter out expired announcements
            queryset = queryset.filter(
                Q(expiry_date__isnull=True) | Q(expiry_date__gte=timezone.now())
            )
        
        # Filter by audience
        audience = request.query_params.get("audience")
        if audience:
            queryset = queryset.filter(
                Q(target_audience="all") | Q(target_audience=audience)
            )
        
        paginator = DefaultPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)
        
        serializer = AnnouncementSerializer(paginated_qs, many=True)
        return paginator.get_paginated_response(serializer.data)

    @extend_schema(request=AnnouncementCreateSerializer)
    def post(self, request):
        if not request.user.is_staff:
            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = AnnouncementCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"data": serializer.data, "message": "Announcement created"},
                status=status.HTTP_201_CREATED
            )
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# ============== Gallery Views ==============

class GalleryAV(BaseAV):
    """API for gallery management"""
    authentication = {"get": False, "post": True, "put": True, "delete": True}

    @extend_schema(
        parameters=[
            OpenApiParameter("category", OpenApiTypes.STR, required=False),
            OpenApiParameter("featured", OpenApiTypes.BOOL, required=False),
            OpenApiParameter("page", OpenApiTypes.INT, required=False),
            OpenApiParameter("page_size", OpenApiTypes.INT, required=False),
        ],
        responses=GallerySerializer(many=True)
    )
    def get(self, request, uuid=None):
        if uuid:
            try:
                gallery = Gallery.objects.get(uuid=uuid)
                serializer = GallerySerializer(gallery)
                return Response({"data": serializer.data})
            except Gallery.DoesNotExist:
                return Response(
                    {"error": "Gallery not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
        
        queryset = Gallery.objects.all()
        
        # Filter by category
        category = request.query_params.get("category")
        if category:
            queryset = queryset.filter(category=category)
        
        # Filter by featured
        featured = request.query_params.get("featured")
        if featured is not None:
            queryset = queryset.filter(is_featured=featured.lower() == "true")
        
        paginator = DefaultPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)
        
        serializer = GallerySerializer(paginated_qs, many=True)
        return paginator.get_paginated_response(serializer.data)

    @extend_schema(request={"multipart/form-data": GalleryCreateSerializer})
    def post(self, request):
        if not request.user.is_staff:
            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = GalleryCreateSerializer(data=request.data)
        if serializer.is_valid():
            gallery = serializer.save()
            return Response(
                {"data": GallerySerializer(gallery).data, "message": "Gallery created"},
                status=status.HTTP_201_CREATED
            )
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# ============== Navigation Views ==============

class NavigationAV(BaseAV):
    """API for navigation menu items"""
    authentication = {"get": False, "post": True, "put": True, "delete": True}

    @extend_schema(responses=NavigationItemSerializer(many=True))
    def get(self, request):
        # Get only top-level navigation items (no parent)
        nav_items = NavigationItem.objects.filter(
            parent__isnull=True,
            is_active=True
        ).order_by("display_order")
        
        serializer = NavigationItemSerializer(nav_items, many=True)
        return Response({"data": serializer.data})

    @extend_schema(request=NavigationItemCreateSerializer)
    def post(self, request):
        if not request.user.is_staff:
            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = NavigationItemCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"data": serializer.data, "message": "Navigation item created"},
                status=status.HTTP_201_CREATED
            )
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
