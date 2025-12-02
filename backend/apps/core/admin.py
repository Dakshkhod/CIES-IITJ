from django.contrib import admin
from django.utils.html import format_html

from apps.core.models import (
    User, DropDown, Images, ContactInfo, ContactSubmission,
    Announcement, Gallery, GalleryImage, NavigationItem
)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ["email", "name", "is_staff", "is_active", "date_joined"]
    list_filter = ["is_staff", "is_active", "date_joined"]
    search_fields = ["email", "name", "username"]
    ordering = ["-date_joined"]


@admin.register(DropDown)
class DropDownAdmin(admin.ModelAdmin):
    list_display = ["label", "parent", "created_at"]
    list_filter = ["parent"]
    search_fields = ["label"]
    ordering = ["label"]


@admin.register(Images)
class ImagesAdmin(admin.ModelAdmin):
    list_display = ["uuid", "image_preview", "alt_text", "created_at"]
    search_fields = ["alt_text"]
    readonly_fields = ["image_preview"]

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 100px; max-width: 100px;" />',
                obj.image.url
            )
        return "No image"
    image_preview.short_description = "Preview"


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ["department_name", "institution_name", "email", "phone"]
    fieldsets = (
        ("Basic Information", {
            "fields": ("department_name", "institution_name", "address", "email", "phone", "office_hours")
        }),
        ("Social Media", {
            "fields": ("linkedin_url", "instagram_url", "twitter_url", "youtube_url", "facebook_url", "website_url")
        }),
        ("Other", {
            "fields": ("map_embed_url",)
        }),
    )

    def has_add_permission(self, request):
        # Only allow one instance
        return not ContactInfo.objects.exists()


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "subject", "is_read", "is_replied", "created_at"]
    list_filter = ["is_read", "is_replied", "created_at"]
    search_fields = ["name", "email", "subject", "message"]
    readonly_fields = ["name", "email", "phone", "subject", "message", "ip_address", "user_agent", "created_at"]
    ordering = ["-created_at"]
    
    fieldsets = (
        ("Submission Details", {
            "fields": ("name", "email", "phone", "subject", "message")
        }),
        ("Status", {
            "fields": ("is_read", "is_replied", "replied_at", "replied_by", "notes")
        }),
        ("Metadata", {
            "fields": ("ip_address", "user_agent", "created_at"),
            "classes": ("collapse",)
        }),
    )

    def save_model(self, request, obj, form, change):
        if obj.is_replied and not obj.replied_by:
            obj.replied_by = request.user
        super().save_model(request, obj, form, change)


@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ["title", "is_active", "is_pinned", "priority", "target_audience", "publish_date", "expiry_date"]
    list_filter = ["is_active", "is_pinned", "target_audience", "publish_date"]
    search_fields = ["title", "content"]
    ordering = ["-is_pinned", "-priority", "-publish_date"]
    
    fieldsets = (
        ("Content", {
            "fields": ("title", "content")
        }),
        ("Display Settings", {
            "fields": ("is_active", "is_pinned", "priority", "target_audience")
        }),
        ("Scheduling", {
            "fields": ("expiry_date",)
        }),
        ("Link", {
            "fields": ("link_url", "link_text"),
            "classes": ("collapse",)
        }),
    )


class GalleryImageInline(admin.TabularInline):
    model = GalleryImage
    extra = 1
    readonly_fields = ["image_preview"]

    def image_preview(self, obj):
        if obj.image and obj.image.image:
            return format_html(
                '<img src="{}" style="max-height: 80px; max-width: 80px;" />',
                obj.image.image.url
            )
        return "No image"
    image_preview.short_description = "Preview"


@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "is_featured", "image_count", "date_taken", "created_at"]
    list_filter = ["category", "is_featured", "date_taken"]
    search_fields = ["title", "description"]
    ordering = ["-is_featured", "-created_at"]
    inlines = [GalleryImageInline]

    def image_count(self, obj):
        return obj.images.count()
    image_count.short_description = "Images"


@admin.register(NavigationItem)
class NavigationItemAdmin(admin.ModelAdmin):
    list_display = ["name", "href", "parent", "display_order", "is_active"]
    list_filter = ["is_active", "parent"]
    search_fields = ["name", "href"]
    ordering = ["display_order"]
