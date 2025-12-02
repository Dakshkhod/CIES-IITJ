from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


from apps.core.api.v1.views import DropdownAV, LoginAV, RegisterAV

# Write your urls here

urlpatterns = [
    path(
        "dropdown/",
        DropdownAV.as_view(),
    ),
    path(
        "register/",
        RegisterAV.as_view(),
    ),
    path(
        "login/",
        LoginAV.as_view(),
    ),
    # path(
    #     "team/",
    #     TeamMemberAV.as_view(),
    # ),
    path(
        "api/token/",
        TokenObtainPairView.as_view(),
    ),
    path(
        "api/token/refresh/",
        TokenRefreshView.as_view(),
    ),
]
