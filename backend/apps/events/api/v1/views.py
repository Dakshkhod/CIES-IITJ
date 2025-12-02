from django.http import HttpRequest
from django.shortcuts import get_object_or_404
from django.db.models import Q

from apps.events.choices import EventsCategory, ActivityCategory, ActivityStatus
from apps.events.models import Events
from rest_framework import status
from rest_framework.response import Response

from drf_spectacular.utils import (
    extend_schema,
    OpenApiParameter,
)
from drf_spectacular.types import OpenApiTypes

from base.api.v1.views import BaseAV
from base.pagination import DefaultPagination

from apps.events.api.v1.serializers import (
    EventGetSerializer,
    EventListSerializer,
    EventPaginatedResponseSerializer,
    EventPostSerializer,
    RecentActivitySerializer,
)

from apps.core.models import BaseModel


class EventsAV(BaseAV):
    """API for events/activities management"""
    authentication = {"get": False, "post": True, "put": True, "delete": True}

    @extend_schema(
        responses=EventPaginatedResponseSerializer(),
        parameters=[
            OpenApiParameter("page", int, required=False, description="Page number"),
            OpenApiParameter("page_size", int, required=False, description="Items per page"),
            OpenApiParameter(
                name="type",
                type=OpenApiTypes.STR,
                required=False,
                location=OpenApiParameter.QUERY,
                description="Event type filter",
                enum=["event", "activity", "roadmap"]
            ),
            OpenApiParameter(
                name="category",
                type=OpenApiTypes.STR,
                required=False,
                description="Activity category filter",
                enum=["workshop", "seminar", "site-visit", "competition", "edificio", "other"]
            ),
            OpenApiParameter(
                name="status",
                type=OpenApiTypes.STR,
                required=False,
                description="Activity status filter",
                enum=["completed", "upcoming", "ongoing"]
            ),
            OpenApiParameter(
                name="featured",
                type=OpenApiTypes.BOOL,
                required=False,
                description="Filter featured events only"
            ),
            OpenApiParameter(
                name="search",
                type=OpenApiTypes.STR,
                required=False,
                description="Search in title and description"
            ),
            OpenApiParameter(
                name="date_from",
                type=OpenApiTypes.DATE,
                required=False,
                description="Filter events from this date"
            ),
            OpenApiParameter(
                name="date_to",
                type=OpenApiTypes.DATE,
                required=False,
                description="Filter events until this date"
            ),
            OpenApiParameter(
                name="ordering",
                type=OpenApiTypes.STR,
                required=False,
                description="Order by field (prefix with - for descending)",
                enum=["date", "-date", "title", "-title", "created_at", "-created_at"]
            ),
        ]
    )
    def get(self, request: HttpRequest, uuid=None):
        # Single event detail
        if uuid:
            event = get_object_or_404(Events, uuid=uuid)
            serializer = EventGetSerializer(event)
            return Response({"data": serializer.data})

        # Build queryset with filters
        queryset = Events.objects.all()

        # Type filter (event_category)
        event_type = request.query_params.get("type")
        if event_type:
            queryset = queryset.filter(event_category=event_type)

        # Category filter (activity category)
        category = request.query_params.get("category")
        if category:
            queryset = queryset.filter(category=category)

        # Status filter
        status_filter = request.query_params.get("status")
        if status_filter:
            queryset = queryset.filter(activity_status=status_filter)

        # Featured filter
        featured = request.query_params.get("featured")
        if featured is not None:
            queryset = queryset.filter(featured=featured.lower() == "true")

        # Search filter
        search = request.query_params.get("search")
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(description__icontains=search)
            )

        # Date range filter
        date_from = request.query_params.get("date_from")
        if date_from:
            queryset = queryset.filter(date__gte=date_from)

        date_to = request.query_params.get("date_to")
        if date_to:
            queryset = queryset.filter(date__lte=date_to)

        # Ordering
        ordering = request.query_params.get("ordering", "-date")
        valid_orderings = ["date", "-date", "title", "-title", "created_at", "-created_at"]
        if ordering in valid_orderings:
            queryset = queryset.order_by(ordering)
        else:
            queryset = queryset.order_by("-date")

        # Pagination
        paginator = DefaultPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)

        serializer = EventListSerializer(paginated_qs, many=True)
        return paginator.get_paginated_response(serializer.data)

    @extend_schema(request={"multipart/form-data": EventPostSerializer})
    def post(self, request):
        if not request.user.is_staff:
            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = EventPostSerializer(data=request.data)
        if serializer.is_valid():
            event = serializer.save()
            return Response(
                {"data": EventGetSerializer(event).data, "message": "Event created successfully"},
                status=status.HTTP_201_CREATED
            )
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(request={"multipart/form-data": EventPostSerializer})
    def put(self, request, uuid=None):
        if not request.user.is_staff:
            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        if not uuid:
            return Response(
                {"error": "UUID is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        event = get_object_or_404(Events, uuid=uuid)
        serializer = EventPostSerializer(event, data=request.data, partial=True)
        if serializer.is_valid():
            event = serializer.save()
            return Response(
                {"data": EventGetSerializer(event).data, "message": "Event updated successfully"}
            )
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uuid=None):
        if not request.user.is_staff:
            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        if not uuid:
            return Response(
                {"error": "UUID is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        event = get_object_or_404(Events, uuid=uuid)
        event.delete()
        return Response({"message": "Event deleted successfully"})


class RecentActivitiesAV(BaseAV):
    """API for recent/featured activities on homepage"""
    authentication = False

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="limit",
                type=OpenApiTypes.INT,
                required=False,
                description="Number of activities to return (default: 5)"
            ),
            OpenApiParameter(
                name="type",
                type=OpenApiTypes.STR,
                required=False,
                description="Event type filter",
                enum=["event", "activity", "roadmap"]
            ),
        ],
        responses=RecentActivitySerializer(many=True)
    )
    def get(self, request):
        limit = int(request.query_params.get("limit", 5))
        event_type = request.query_params.get("type", "activity")

        # Get featured activities first, then recent ones
        queryset = Events.objects.filter(event_category=event_type)
        
        # Prioritize featured, then order by date
        queryset = queryset.order_by("-featured", "-date")[:limit]

        serializer = RecentActivitySerializer(queryset, many=True)
        return Response({"data": serializer.data})


class ActivitiesAV(BaseAV):
    """Dedicated endpoint for activities (frontend compatibility)"""
    authentication = False

    @extend_schema(
        responses=EventPaginatedResponseSerializer(),
        parameters=[
            OpenApiParameter("page", int, required=False),
            OpenApiParameter("page_size", int, required=False),
            OpenApiParameter(
                name="category",
                type=OpenApiTypes.STR,
                required=False,
                enum=["workshop", "seminar", "site-visit", "competition", "edificio", "other"]
            ),
            OpenApiParameter(
                name="status",
                type=OpenApiTypes.STR,
                required=False,
                enum=["completed", "upcoming", "ongoing"]
            ),
            OpenApiParameter("search", type=OpenApiTypes.STR, required=False),
            OpenApiParameter("featured", type=OpenApiTypes.BOOL, required=False),
        ]
    )
    def get(self, request):
        queryset = Events.objects.filter(event_category=EventsCategory.ACTIVITY)

        # Apply filters
        category = request.query_params.get("category")
        if category:
            queryset = queryset.filter(category=category)

        status_filter = request.query_params.get("status")
        if status_filter:
            queryset = queryset.filter(activity_status=status_filter)

        search = request.query_params.get("search")
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(description__icontains=search)
            )

        featured = request.query_params.get("featured")
        if featured is not None:
            queryset = queryset.filter(featured=featured.lower() == "true")

        queryset = queryset.order_by("-date")

        paginator = DefaultPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)

        serializer = EventListSerializer(paginated_qs, many=True)
        return paginator.get_paginated_response(serializer.data)


class RoadmapAV(BaseAV):
    """Dedicated endpoint for roadmap/timeline events"""
    authentication = False

    @extend_schema(
        responses=EventPaginatedResponseSerializer(),
        parameters=[
            OpenApiParameter("page", int, required=False),
            OpenApiParameter("page_size", int, required=False),
            OpenApiParameter("year", type=OpenApiTypes.INT, required=False),
            OpenApiParameter("month", type=OpenApiTypes.INT, required=False),
        ]
    )
    def get(self, request):
        queryset = Events.objects.filter(event_category=EventsCategory.ROADMAP)

        # Filter by year
        year = request.query_params.get("year")
        if year:
            queryset = queryset.filter(date__year=year)

        # Filter by month
        month = request.query_params.get("month")
        if month:
            queryset = queryset.filter(date__month=month)

        queryset = queryset.order_by("date")

        paginator = DefaultPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)

        serializer = EventListSerializer(paginated_qs, many=True)
        return paginator.get_paginated_response(serializer.data)
