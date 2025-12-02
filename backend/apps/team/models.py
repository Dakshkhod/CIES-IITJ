from django.db import models

from apps.core.models import BaseModel, DropDown, Images


class TeamMember(BaseModel):
    name = models.CharField(max_length=255)
    role = models.ForeignKey(
        DropDown,
        on_delete=models.SET_NULL,
        null=True,
        related_name="member_role"
    )
    committee = models.ForeignKey(
        DropDown,
        on_delete=models.SET_NULL,
        null=True,
        related_name="member_committee"
    )
    profile_image = models.OneToOneField(
        Images,
        on_delete=models.SET_NULL,
        related_name="profile_image",
        null=True,
        blank=True
    )
    bio = models.TextField(null=True, blank=True)
    batch = models.CharField(max_length=20, null=True, blank=True)
    
    # Display flags
    featured = models.BooleanField(default=False, help_text="Show on homepage")
    is_hod = models.BooleanField(default=False, help_text="Head of Department")
    is_faculty = models.BooleanField(default=False, help_text="Faculty member")
    is_active = models.BooleanField(default=True, help_text="Currently active member")
    display_order = models.IntegerField(default=0, help_text="Order in team listing")
    
    # Contact/Social
    linkedin = models.URLField(null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    instagram = models.URLField(null=True, blank=True)
    twitter = models.URLField(null=True, blank=True)
    github = models.URLField(null=True, blank=True)
    website = models.URLField(null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        role_name = self.role.label if self.role else "No Role"
        return f"{self.name} - {role_name}"

    class Meta:
        verbose_name = "Team Member"
        verbose_name_plural = "Team Members"
        ordering = ["-is_hod", "-is_faculty", "-featured", "display_order", "name"]
