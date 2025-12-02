from functools import wraps
from drf_spectacular.utils import extend_schema


def extend_schema_response(type=None, many=False, **kwargs):
    """
    Decorator to extend schema with response type.
    
    Usage:
        @extend_schema_response(type=MySerializer)
        def get(self, request):
            ...
    """
    def decorator(func):
        @wraps(func)
        @extend_schema(responses={200: type}, **kwargs)
        def wrapper(*args, **inner_kwargs):
            return func(*args, **inner_kwargs)
        return wrapper
    return decorator
