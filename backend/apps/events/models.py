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
    description = models.TextField(null=True)
    additonal_details = models.JSONField(null=True, default=dict)
    attendees_count = models.IntegerField(null=True)

    def __str__(self):
        return self.title
    
class EventImage(BaseModel):
    event = models.ForeignKey(
        Events,
        on_delete=models.DO_NOTHING,
        null=True,
        related_name="event_images",
    )
    image = models.ForeignKey(
        Images,
        on_delete=models.DO_NOTHING,
        null=True,
        related_name="event_images",
    )
