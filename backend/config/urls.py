"""
URL configuration for CIES IITJ Backend.

API URL Structure:
- /api/v1/core/      - Core functionality (auth, dropdowns, contact, announcements, gallery, navigation)
- /api/v1/events/    - Events, activities, and roadmap
- /api/v1/team/      - Team members

Admin and Documentation:
- /admin/            - Django admin
- /api/schema/       - OpenAPI schema
- /api/docs/         - Swagger UI
- /api/redoc/        - ReDoc documentation
"""

from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

# API v1 URL patterns
api_v1_patterns = [
    path("core/", include("apps.core.api.v1.urls")),
    path("events/", include("apps.events.api.v1.urls")),
    path("team/", include("apps.team.api.v1.urls")),
]

urlpatterns = [
    # Admin
    path("admin/", admin.site.urls),
    
    # API Documentation
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
    
    # API v1 endpoints
    path("api/v1/", include(api_v1_patterns)),
    
    # Legacy endpoints (for backward compatibility - can be removed later)
    path("core/", include("apps.core.api.v1.urls")),
    path("activity/", include("apps.events.api.v1.urls")),
    path("team/", include("apps.team.api.v1.urls")),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
