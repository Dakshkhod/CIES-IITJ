from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from base.api.v1.permissions import AccessAuthenticationPermission


class BaseAV(APIView):
    """
    Base API View with configurable authentication.
    
    Usage:
        authentication = True  # Require auth for all methods
        authentication = False  # No auth required
        authentication = {"get": False, "post": True}  # Per-method auth
    """
    authentication: dict | bool = True

    permission_classes = [
        AccessAuthenticationPermission,
    ]

    def handle_exception(self, exc):
        """Custom exception handling for consistent error responses"""
        if hasattr(exc, 'detail'):
            return Response(
                {"error": exc.detail},
                status=exc.status_code if hasattr(exc, 'status_code') else status.HTTP_400_BAD_REQUEST
            )
        return super().handle_exception(exc)
