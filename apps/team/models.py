from django.db import models

from apps.core.models import BaseModel, DropDown, Images

class TeamMember(BaseModel):
    name = models.CharField(max_length=255)
    role = models.ForeignKey(DropDown, on_delete=models.DO_NOTHING, related_name="member_role")
    committee = models.ForeignKey(DropDown, on_delete=models.DO_NOTHING, related_name="member_committee")
    profile_image = models.OneToOneField(Images, on_delete=models.DO_NOTHING, related_name="profile_image", null=True)
    bio = models.TextField(null=True)
    batch = models.CharField(max_length=20, null=True)
    featured = models.BooleanField(default=False)
    linkedin = models.URLField(null=True)
    email = models.EmailField(null=True)
    instagram = models.URLField(null=True)

