from django.db import models

from apps.core.models import BaseModel, Images
from apps.events.choices import ActivityCategory, ActivityStatus, EventsCategory


class Events(BaseModel):
    title = models.CharField(max_length=255)
    date = models.DateField()
    event_category = models.CharField(
        max_length=20,
        choices=EventsCategory.choices,
        default=EventsCategory.EVENT
    )
    category = models.CharField(
        max_length=20,
        choices=ActivityCategory.choices,
        default=ActivityCategory.OTHER
    )
    activity_status = models.CharField(
        max_length=20,
        choices=ActivityStatus.choices,
        default=ActivityStatus.UPCOMING
    )
    description = models.TextField(null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    additional_details = models.JSONField(null=True, default=dict, blank=True)
    attendees_count = models.IntegerField(null=True, blank=True)
    
    # New fields for enhanced functionality
    featured = models.BooleanField(default=False, help_text="Featured events appear on homepage")
    speaker_name = models.CharField(max_length=255, null=True, blank=True)
    speaker_info = models.TextField(null=True, blank=True)
    registration_link = models.URLField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True, help_text="For multi-day events")
    time_start = models.TimeField(null=True, blank=True)
    time_end = models.TimeField(null=True, blank=True)
    
    # SEO and display
    slug = models.SlugField(max_length=255, unique=True, null=True, blank=True)
    meta_description = models.CharField(max_length=160, null=True, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Event"
        verbose_name_plural = "Events"
        ordering = ["-date", "-created_at"]

    def save(self, *args, **kwargs):
        # Auto-generate slug if not provided
        if not self.slug:
            from django.utils.text import slugify
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            while Events.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)


class EventImage(BaseModel):
    event = models.ForeignKey(
        Events,
        on_delete=models.CASCADE,
        null=True,
        related_name="event_images",
    )
    image = models.ForeignKey(
        Images,
        on_delete=models.CASCADE,
        null=True,
        related_name="event_images",
    )
    caption = models.CharField(max_length=255, null=True, blank=True)
    display_order = models.IntegerField(default=0)
    is_cover = models.BooleanField(default=False, help_text="Use as cover image for the event")

    class Meta:
        verbose_name = "Event Image"
        verbose_name_plural = "Event Images"
        ordering = ["-is_cover", "display_order"]

    def __str__(self):
        return f"{self.event.title} - Image {self.display_order}"
