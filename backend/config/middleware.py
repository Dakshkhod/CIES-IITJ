"""
Custom middleware for the CIES IITJ Backend.
"""
import logging
import time

from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger(__name__)


class DisableCSRFMiddleware(MiddlewareMixin):
    """
    Middleware to disable CSRF verification.
    Only use in development or for API-only backends with proper authentication.
    """
    def process_request(self, request):
        setattr(request, '_dont_enforce_csrf_checks', True)


class RequestLoggingMiddleware(MiddlewareMixin):
    """
    Middleware to log all incoming requests.
    Useful for debugging and monitoring.
    """
    def process_request(self, request):
        request.start_time = time.time()
        
    def process_response(self, request, response):
        if hasattr(request, 'start_time'):
            duration = time.time() - request.start_time
            logger.info(
                f"{request.method} {request.path} - "
                f"Status: {response.status_code} - "
                f"Duration: {duration:.3f}s"
            )
        return response


class APIVersionMiddleware(MiddlewareMixin):
    """
    Middleware to add API version header to responses.
    """
    def process_response(self, request, response):
        response['X-API-Version'] = '1.0.0'
        return response
