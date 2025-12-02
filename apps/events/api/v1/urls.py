from django.urls import path

from apps.events.api.v1.views import EventsAV

urlpatterns = [
    path(
        "events/<str:uuid>/",
        EventsAV.as_view(),
    ),
    path(
        "events/",
        EventsAV.as_view(),
    ),
]
