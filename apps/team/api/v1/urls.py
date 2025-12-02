from django.urls import path
from apps.team.api.v1.views import TeamMemberAV


# Write your urls here

urlpatterns = [
    path(
        "member/",
        TeamMemberAV.as_view(),
    ),
]
