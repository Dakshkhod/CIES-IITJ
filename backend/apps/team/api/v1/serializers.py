from rest_framework import serializers
from drf_spectacular.utils import extend_schema_field

from apps.core.models import Images
from apps.team.models import TeamMember
from base.api.v1.serializers import BaseSerializer, FileFieldSerializer


class TeamMemberGetSerializer(BaseSerializer):
    """Serializer for retrieving team members"""
    file_fields = ["profile_image"]
    
    # Include role and committee labels
    role_label = serializers.CharField(source="role.label", read_only=True, allow_null=True)
    committee_label = serializers.CharField(source="committee.label", read_only=True, allow_null=True)
    
    # Profile image with proper format
    profile_image = serializers.SerializerMethodField()
    photo = serializers.SerializerMethodField()  # Alias for frontend compatibility
    
    # Social links object for frontend
    socials = serializers.SerializerMethodField()

    class Meta:
        model = TeamMember
        fields = [
            "uuid", "name", "role_label", "committee_label", "profile_image", "photo",
            "bio", "batch", "featured", "is_hod", "is_faculty", "is_active",
            "display_order", "linkedin", "email", "instagram", "twitter",
            "github", "website", "phone", "socials"
        ]

    @extend_schema_field(FileFieldSerializer)
    def get_profile_image(self, instance: TeamMember):
        """
        Return structured image data with an absolute URL when a request
        is available in the serializer context. This makes it easier for
        frontends that are hosted on a different domain/port.
        """
        if not instance.profile_image or not instance.profile_image.image:
            return None

        request = self.context.get("request")
        url = instance.profile_image.image.url
        if request is not None:
            url = request.build_absolute_uri(url)

        return {
            "url": url,
            "uuid": str(instance.profile_image.uuid),
        }

    def get_photo(self, instance: TeamMember):
        """
        Simple photo URL alias used by the frontend.
        Always prefer an absolute URL when we have access to the request.
        """
        if not instance.profile_image or not instance.profile_image.image:
            return None

        request = self.context.get("request")
        url = instance.profile_image.image.url
        if request is not None:
            url = request.build_absolute_uri(url)
        return url

    def get_socials(self, instance: TeamMember):
        """Social links object for frontend compatibility"""
        return {
            "linkedin": instance.linkedin,
            "email": f"mailto:{instance.email}" if instance.email else None,
            "instagram": instance.instagram,
            "twitter": instance.twitter,
            "github": instance.github,
            "website": instance.website,
        }


class TeamMemberListSerializer(BaseSerializer):
    """Lightweight serializer for team member listings"""
    role_label = serializers.CharField(source="role.label", read_only=True, allow_null=True)
    committee_label = serializers.CharField(source="committee.label", read_only=True, allow_null=True)
    photo = serializers.SerializerMethodField()
    socials = serializers.SerializerMethodField()

    class Meta:
        model = TeamMember
        fields = [
            "uuid", "name", "role_label", "committee_label", "photo",
            "batch", "featured", "is_hod", "is_faculty", "socials"
        ]

    def get_photo(self, instance: TeamMember):
        if not instance.profile_image or not instance.profile_image.image:
            return None

        request = self.context.get("request")
        url = instance.profile_image.image.url
        if request is not None:
            url = request.build_absolute_uri(url)
        return url

    def get_socials(self, instance: TeamMember):
        return {
            "linkedin": instance.linkedin,
            "email": f"mailto:{instance.email}" if instance.email else None,
            "instagram": instance.instagram,
        }


class TeamMemberCreateSerializer(BaseSerializer):
    """Serializer for creating/updating team members"""
    profile_image = serializers.ImageField(write_only=True, required=False)

    class Meta:
        model = TeamMember
        fields = [
            "name", "role", "committee", "profile_image", "bio", "batch",
            "featured", "is_hod", "is_faculty", "is_active", "display_order",
            "linkedin", "email", "instagram", "twitter", "github", "website", "phone"
        ]

    def create(self, validated_data):
        image_file = validated_data.pop("profile_image", None)
        member = TeamMember.objects.create(**validated_data)

        if image_file:
            image_obj = Images.objects.create(image=image_file)
            member.profile_image = image_obj
            member.save()

        return member

    def update(self, instance, validated_data):
        image_file = validated_data.pop("profile_image", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if image_file:
            # Delete old image if exists
            if instance.profile_image:
                old_image = instance.profile_image
                instance.profile_image = None
                instance.save()
                old_image.delete()

            image_obj = Images.objects.create(image=image_file)
            instance.profile_image = image_obj
            instance.save()

        return instance


class TeamMembersByCommitteeSerializer(serializers.Serializer):
    """Serializer for team members grouped by committee"""
    committee = serializers.CharField()
    members = TeamMemberListSerializer(many=True)
