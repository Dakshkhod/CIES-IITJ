from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from apps.core.api.v1.views import (
    DropdownAV, LoginAV, RegisterAV,
    ContactInfoAV, ContactSubmitAV, ContactSubmissionsListAV,
    AnnouncementAV, GalleryAV, NavigationAV
)

urlpatterns = [
    # Auth endpoints
    path("auth/register/", RegisterAV.as_view(), name="register"),
    path("auth/login/", LoginAV.as_view(), name="login"),
    path("auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    
    # Dropdown/Config endpoints
    path("dropdown/", DropdownAV.as_view(), name="dropdown"),
    
    # Contact endpoints
    path("contact/info/", ContactInfoAV.as_view(), name="contact_info"),
    path("contact/submit/", ContactSubmitAV.as_view(), name="contact_submit"),
    path("contact/submissions/", ContactSubmissionsListAV.as_view(), name="contact_submissions"),
    
    # Announcements endpoints
    path("announcements/", AnnouncementAV.as_view(), name="announcements_list"),
    path("announcements/<str:uuid>/", AnnouncementAV.as_view(), name="announcement_detail"),
    
    # Gallery endpoints
    path("gallery/", GalleryAV.as_view(), name="gallery_list"),
    path("gallery/<str:uuid>/", GalleryAV.as_view(), name="gallery_detail"),
    
    # Navigation endpoints
    path("navigation/", NavigationAV.as_view(), name="navigation"),
]
