from django.contrib import admin
from django.utils.html import format_html

from apps.events.models import Events, EventImage


class EventImageInline(admin.TabularInline):
    model = EventImage
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


@admin.register(Events)
class EventsAdmin(admin.ModelAdmin):
    list_display = [
        "title", "date", "event_category", "category", 
        "activity_status", "featured", "attendees_count"
    ]
    list_filter = ["event_category", "category", "activity_status", "featured", "date"]
    search_fields = ["title", "description", "location", "speaker_name"]
    ordering = ["-date"]
    prepopulated_fields = {"slug": ("title",)}
    inlines = [EventImageInline]
    
    fieldsets = (
        ("Basic Information", {
            "fields": ("title", "slug", "description", "location")
        }),
        ("Categorization", {
            "fields": ("event_category", "category", "activity_status", "featured")
        }),
        ("Date & Time", {
            "fields": ("date", "end_date", "time_start", "time_end")
        }),
        ("Speaker Information", {
            "fields": ("speaker_name", "speaker_info"),
            "classes": ("collapse",)
        }),
        ("Additional Details", {
            "fields": ("attendees_count", "registration_link", "additional_details"),
            "classes": ("collapse",)
        }),
        ("SEO", {
            "fields": ("meta_description",),
            "classes": ("collapse",)
        }),
    )

    def get_readonly_fields(self, request, obj=None):
        if obj:  # Editing existing object
            return ["slug"]
        return []


@admin.register(EventImage)
class EventImageAdmin(admin.ModelAdmin):
    list_display = ["event", "image_preview", "caption", "display_order", "is_cover"]
    list_filter = ["is_cover", "event"]
    search_fields = ["event__title", "caption"]
    ordering = ["event", "display_order"]

    def image_preview(self, obj):
        if obj.image and obj.image.image:
            return format_html(
                '<img src="{}" style="max-height: 80px; max-width: 80px;" />',
                obj.image.image.url
            )
        return "No image"
    image_preview.short_description = "Preview"
