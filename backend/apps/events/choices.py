from django.db import models


class ActivityCategory(models.TextChoices):
    WORKSHOP = "workshop", "Workshop"
    SEMINAR = "seminar", "Seminar"
    SITE_VISIT = "site-visit", "Site Visit"
    COMPETITION = "competition", "Competition"
    EDIFICIO = "edificio", "Edificio"
    OTHER = "other", "Other"

class ActivityStatus(models.TextChoices):
    COMPLETED = "completed", "Completed"
    UPCOMING = "upcoming", "Upcoming"
    ONGOING = "ongoing", "Ongoing"

class EventsCategory(models.TextChoices):
    ACTIVITY = "activity", "Activity"
    EVENT = "event", "Event"
    ROADMAP = "roadmap", "Roadmap"

