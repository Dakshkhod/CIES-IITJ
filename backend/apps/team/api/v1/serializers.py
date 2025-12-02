from rest_framework import serializers

from apps.core.models import Images
from apps.team.models import TeamMember
from base.api.v1.serializers import BaseSerializer


class TeamMemberGetSerializer(BaseSerializer):
    
    file_fields = ["profile_image"]
    dynamic_keys = ["role.label", "committee.label"]

    class Meta:
        model = TeamMember
        fields = "__all__"


class TeamMemberCreateSerializer(BaseSerializer):
    profile_image = serializers.ImageField(write_only=True, required=False)

    class Meta:
        model = TeamMember
        fields = "__all__"

    def create(self, validated_data):

        image_file = validated_data.pop("profile_image", None)

        member = TeamMember.objects.create(**validated_data)

        if image_file:
            image_obj = Images.objects.create(image=image_file)
            member.profile_image = image_obj
            member.save()

        return member    