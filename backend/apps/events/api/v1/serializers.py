from rest_framework import serializers
from drf_spectacular.utils import extend_schema_field

from base.api.v1.serializers import BaseSerializer, FileFieldSerializer

from apps.core.models import Images
from apps.events.models import EventImage, Events


class EventImageSerializer(BaseSerializer):
    """Serializer for event images"""
    file_fields = ["image"]
    image = serializers.SerializerMethodField()

    class Meta:
        model = EventImage
        fields = ["uuid", "image", "caption", "display_order", "is_cover"]

    @extend_schema_field(FileFieldSerializer)
    def get_image(self, instance: EventImage):
        if instance.image:
            return {
                "url": instance.image.image.url if instance.image.image else None,
                "uuid": str(instance.image.uuid),
                "alt_text": getattr(instance.image, 'alt_text', None)
            }
        return None


class EventGetSerializer(BaseSerializer):
    """Serializer for retrieving events"""
    images = serializers.SerializerMethodField()
    cover_image = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()  # For frontend compatibility
    status = serializers.CharField(source="activity_status")  # Alias for frontend

    class Meta:
        model = Events
        fields = [
            "uuid", "title", "date", "end_date", "event_category", "category",
            "activity_status", "status", "description", "location", "additional_details",
            "attendees_count", "featured", "speaker_name", "speaker_info",
            "registration_link", "time_start", "time_end", "slug",
            "images", "cover_image", "image_url", "created_at", "updated_at"
        ]

    @extend_schema_field(EventImageSerializer(many=True))
    def get_images(self, event: Events):
        return EventImageSerializer(
            instance=event.event_images.all(),
            many=True,
        ).data

    def get_cover_image(self, event: Events):
        """Get the cover image or first image"""
        cover = event.event_images.filter(is_cover=True).first()
        if not cover:
            cover = event.event_images.first()
        
        if cover and cover.image:
            return {
                "url": cover.image.image.url if cover.image.image else None,
                "uuid": str(cover.image.uuid),
            }
        return None

    def get_image_url(self, event: Events):
        """Single image URL for frontend compatibility"""
        cover = self.get_cover_image(event)
        return cover.get("url") if cover else None


class EventListSerializer(BaseSerializer):
    """Lightweight serializer for event listings"""
    image_url = serializers.SerializerMethodField()
    status = serializers.CharField(source="activity_status")

    class Meta:
        model = Events
        fields = [
            "uuid", "title", "date", "event_category", "category",
            "activity_status", "status", "description", "location",
            "attendees_count", "featured", "image_url", "slug"
        ]

    def get_image_url(self, event: Events):
        """Single image URL for frontend compatibility"""
        cover = event.event_images.filter(is_cover=True).first()
        if not cover:
            cover = event.event_images.first()
        
        if cover and cover.image and cover.image.image:
            return cover.image.image.url
        return None


class EventPostSerializer(BaseSerializer):
    """Serializer for creating/updating events"""
    images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Events
        fields = [
            "title", "date", "end_date", "event_category", "category",
            "activity_status", "description", "location", "additional_details",
            "attendees_count", "featured", "speaker_name", "speaker_info",
            "registration_link", "time_start", "time_end", "images"
        ]

    def create(self, validated_data):
        images = validated_data.pop("images", [])
        event = Events.objects.create(**validated_data)
        
        for idx, file in enumerate(images):
            img = Images.objects.create(image=file)
            EventImage.objects.create(
                event=event,
                image=img,
                display_order=idx,
                is_cover=(idx == 0)  # First image is cover
            )

        return event

    def update(self, instance, validated_data):
        images = validated_data.pop("images", None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # If new images provided, add them
        if images:
            existing_count = instance.event_images.count()
            for idx, file in enumerate(images):
                img = Images.objects.create(image=file)
                EventImage.objects.create(
                    event=instance,
                    image=img,
                    display_order=existing_count + idx
                )
        
        return instance


class EventPaginatedResponseSerializer(serializers.Serializer):
    """Serializer for paginated event responses"""
    count = serializers.IntegerField(required=False)
    next = serializers.CharField(required=False, allow_null=True)
    previous = serializers.CharField(required=False, allow_null=True)
    results = EventListSerializer(many=True, required=False, allow_null=True)


class RecentActivitySerializer(BaseSerializer):
    """Serializer for recent/featured activities on homepage"""
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Events
        fields = ["uuid", "title", "date", "description", "image_url", "slug", "category"]

    def get_image_url(self, event: Events):
        cover = event.event_images.filter(is_cover=True).first()
        if not cover:
            cover = event.event_images.first()
        
        if cover and cover.image and cover.image.image:
            return cover.image.image.url
        return None
