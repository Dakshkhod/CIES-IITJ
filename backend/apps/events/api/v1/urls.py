from django.urls import path

from apps.events.api.v1.views import (
    EventsAV,
    RecentActivitiesAV,
    ActivitiesAV,
    RoadmapAV,
)

urlpatterns = [
    # Main events endpoint
    path("events/", EventsAV.as_view(), name="events_list"),
    path("events/<str:uuid>/", EventsAV.as_view(), name="event_detail"),
    
    # Dedicated activities endpoint (frontend compatibility)
    path("activities/", ActivitiesAV.as_view(), name="activities_list"),
    path("activities/recent/", RecentActivitiesAV.as_view(), name="recent_activities"),
    
    # Roadmap/Timeline endpoint
    path("roadmap/", RoadmapAV.as_view(), name="roadmap_list"),
]
