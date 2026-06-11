from rest_framework.permissions import BasePermission

# Write your permissions here


class AccessAuthenticationPermission(BasePermission):
    def has_permission(self, request, view):
        authentication = getattr(view, "authentication", True)
        method = (getattr(request, "method", "") or "").lower()

        if isinstance(authentication, bool):
            requires_auth = authentication
        else:
            # Fail closed: any method not explicitly listed as public still
            # requires authentication. Defaulting to ``True`` here prevents an
            # authorization bypass for verbs the view author forgot to map.
            requires_auth = authentication.get(method, True)

        if not requires_auth:
            return True
        return bool(request.user and request.user.is_authenticated)
