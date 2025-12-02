from django.urls import path

from apps.team.api.v1.views import (
    TeamMemberAV,
    FeaturedTeamAV,
    TeamByCommitteeAV,
)

urlpatterns = [
    # Main team endpoints
    path("members/", TeamMemberAV.as_view(), name="team_members_list"),
    path("members/<str:uuid>/", TeamMemberAV.as_view(), name="team_member_detail"),
    
    # Featured team (for homepage)
    path("featured/", FeaturedTeamAV.as_view(), name="featured_team"),
    
    # Team grouped by committee
    path("by-committee/", TeamByCommitteeAV.as_view(), name="team_by_committee"),
]
