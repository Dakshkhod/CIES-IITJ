from rest_framework import serializers
from drf_spectacular.utils import extend_schema_field

from base.api.v1.serializers import BaseSerializer, FileFieldSerializer

from apps.core.models import (
    DropDown, User, ContactInfo, ContactSubmission,
    Announcement, Gallery, GalleryImage, NavigationItem, Images
)


class DropDownSerializer(BaseSerializer):

    class Meta:
        model = DropDown
        fields = "__all__"


class LoginSerializer(BaseSerializer):

    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data.get("password"))
        user.save()
        return user


# ============== Contact Serializers ==============

class ContactInfoSerializer(BaseSerializer):
    """Serializer for contact information"""
    social_links = serializers.SerializerMethodField()

    class Meta:
        model = ContactInfo
        fields = [
            "department_name", "institution_name", "address", "email", "phone",
            "office_hours", "map_embed_url", "social_links"
        ]

    def get_social_links(self, obj):
        return {
            "linkedin": obj.linkedin_url,
            "instagram": obj.instagram_url,
            "twitter": obj.twitter_url,
            "youtube": obj.youtube_url,
            "facebook": obj.facebook_url,
            "website": obj.website_url,
        }


class ContactSubmissionCreateSerializer(serializers.Serializer):
    """Serializer for contact form submission"""
    name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=20, required=False, allow_blank=True)
    subject = serializers.CharField(max_length=255, required=False, allow_blank=True)
    message = serializers.CharField()
    recaptcha_token = serializers.CharField(required=False, allow_blank=True)

    def create(self, validated_data):
        # Remove recaptcha_token as it's not a model field
        validated_data.pop("recaptcha_token", None)
        return ContactSubmission.objects.create(**validated_data)


class ContactSubmissionSerializer(BaseSerializer):
    """Serializer for viewing contact submissions (admin)"""

    class Meta:
        model = ContactSubmission
        fields = "__all__"


# ============== Announcement Serializers ==============

class AnnouncementSerializer(BaseSerializer):
    """Serializer for announcements"""
    is_expired = serializers.SerializerMethodField()

    class Meta:
        model = Announcement
        fields = [
            "uuid", "title", "content", "is_active", "is_pinned", "priority",
            "publish_date", "expiry_date", "target_audience", "link_url",
            "link_text", "is_expired", "created_at"
        ]

    def get_is_expired(self, obj):
        from django.utils import timezone
        if obj.expiry_date:
            return obj.expiry_date < timezone.now()
        return False


class AnnouncementCreateSerializer(BaseSerializer):
    """Serializer for creating announcements"""

    class Meta:
        model = Announcement
        fields = [
            "title", "content", "is_active", "is_pinned", "priority",
            "expiry_date", "target_audience", "link_url", "link_text"
        ]


# ============== Gallery Serializers ==============

class GalleryImageSerializer(BaseSerializer):
    """Serializer for gallery images"""
    file_fields = ["image"]
    image = serializers.SerializerMethodField()

    class Meta:
        model = GalleryImage
        fields = ["uuid", "image", "caption", "display_order"]

    @extend_schema_field(FileFieldSerializer)
    def get_image(self, instance: GalleryImage):
        if instance.image:
            return {
                "url": instance.image.image.url if instance.image.image else None,
                "uuid": str(instance.image.uuid),
                "alt_text": instance.image.alt_text
            }
        return None


class GallerySerializer(BaseSerializer):
    """Serializer for gallery"""
    images = serializers.SerializerMethodField()
    image_count = serializers.SerializerMethodField()

    class Meta:
        model = Gallery
        fields = [
            "uuid", "title", "description", "category", "is_featured",
            "display_order", "date_taken", "images", "image_count", "created_at"
        ]

    @extend_schema_field(GalleryImageSerializer(many=True))
    def get_images(self, obj):
        return GalleryImageSerializer(obj.images.all(), many=True).data

    def get_image_count(self, obj):
        return obj.images.count()


class GalleryCreateSerializer(BaseSerializer):
    """Serializer for creating gallery"""
    images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Gallery
        fields = [
            "title", "description", "category", "is_featured",
            "display_order", "date_taken", "images"
        ]

    def create(self, validated_data):
        images = validated_data.pop("images", [])
        gallery = Gallery.objects.create(**validated_data)
        
        for idx, file in enumerate(images):
            img = Images.objects.create(image=file)
            GalleryImage.objects.create(
                gallery=gallery,
                image=img,
                display_order=idx
            )
        
        return gallery


# ============== Navigation Serializers ==============

class NavigationItemSerializer(BaseSerializer):
    """Serializer for navigation items"""
    children = serializers.SerializerMethodField()

    class Meta:
        model = NavigationItem
        fields = [
            "uuid", "name", "href", "icon", "display_order",
            "is_active", "opens_in_new_tab", "children"
        ]

    def get_children(self, obj):
        children = obj.children_items.filter(is_active=True).order_by("display_order")
        return NavigationItemSerializer(children, many=True).data


class NavigationItemCreateSerializer(BaseSerializer):
    """Serializer for creating navigation items"""

    class Meta:
        model = NavigationItem
        fields = [
            "name", "href", "icon", "parent", "display_order",
            "is_active", "opens_in_new_tab"
        ]
