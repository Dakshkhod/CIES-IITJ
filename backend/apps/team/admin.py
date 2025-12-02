from django.contrib import admin
from django.utils.html import format_html

from apps.team.models import TeamMember


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = [
        "name", "role_display", "committee_display", "batch",
        "featured", "is_hod", "is_faculty", "is_active", "display_order"
    ]
    list_filter = ["role", "committee", "batch", "featured", "is_hod", "is_faculty", "is_active"]
    search_fields = ["name", "bio", "email"]
    ordering = ["-is_hod", "-is_faculty", "-featured", "display_order", "name"]
    readonly_fields = ["profile_preview"]
    
    fieldsets = (
        ("Basic Information", {
            "fields": ("name", "role", "committee", "batch", "bio")
        }),
        ("Profile Image", {
            "fields": ("profile_image", "profile_preview")
        }),
        ("Display Settings", {
            "fields": ("featured", "is_hod", "is_faculty", "is_active", "display_order")
        }),
        ("Contact & Social", {
            "fields": ("email", "phone", "linkedin", "instagram", "twitter", "github", "website")
        }),
    )

    def role_display(self, obj):
        return obj.role.label if obj.role else "-"
    role_display.short_description = "Role"

    def committee_display(self, obj):
        return obj.committee.label if obj.committee else "-"
    committee_display.short_description = "Committee"

    def profile_preview(self, obj):
        if obj.profile_image and obj.profile_image.image:
            return format_html(
                '<img src="{}" style="max-height: 150px; max-width: 150px; border-radius: 50%;" />',
                obj.profile_image.image.url
            )
        return "No image"
    profile_preview.short_description = "Profile Preview"
