from rest_framework import serializers
from drf_spectacular.utils import extend_schema_field

from base.api.v1.serializers import BaseSerializer, FileFieldSerializer

from apps.core.models import Images
from apps.events.models import EventImage, Events



class EventImageSerializer(BaseSerializer):
    file_fields = ["image"]
    image = serializers.SerializerMethodField()

    class Meta:
        model = EventImage
        fields = "__all__"

    @extend_schema_field(FileFieldSerializer)
    def get_image(self, instance: EventImage):
        return instance.image


class EventGetSerializer(BaseSerializer):

    images = serializers.SerializerMethodField()

    class Meta:
        model = Events
        fields = "__all__"

    @extend_schema_field(EventImageSerializer(fields=("image",), many=True))
    def get_images(self, event: Events):
        return getattr(
            EventImageSerializer(
                instance=event.event_images.all(),
                many=True,
                fields=("image",),
            ),
            "data",
        )
    

class EventPostSerializer(BaseSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Events
        fields = "__all__"

    def create(self, validated_data):
        images = validated_data.pop("images", [])
        event = Events.objects.create(**validated_data)
        for file in images:
            img = Images.objects.create(image=file)
            EventImage.objects.create(event=event, image=img)

        return event

class EventPaginatedResponseSerializer(serializers.Serializer):
    count = serializers.IntegerField(required=False)
    next = serializers.CharField(required=False, allow_null=True)
    previous = serializers.CharField(required=False, allow_null=True)

    results = EventGetSerializer(many=True, required=False, exclude=Events.BASE_MODEL_FIELDS, allow_null=True)
    data = EventGetSerializer(required=False, exclude=Events.BASE_MODEL_FIELDS, )
