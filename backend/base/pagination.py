from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class DefaultPagination(PageNumberPagination):
    """Default pagination class with customizable page size."""
    page_size = 10
    page_query_param = "page"
    page_size_query_param = "page_size"
    max_page_size = 100

    def get_paginated_response(self, data):
        """Return paginated response with additional metadata."""
        return Response({
            "count": self.page.paginator.count,
            "next": self.get_next_link(),
            "previous": self.get_previous_link(),
            "total_pages": self.page.paginator.num_pages,
            "current_page": self.page.number,
            "results": data
        })


class LargePagination(PageNumberPagination):
    """Pagination for endpoints that may return more items."""
    page_size = 50
    page_query_param = "page"
    page_size_query_param = "page_size"
    max_page_size = 200


class SmallPagination(PageNumberPagination):
    """Pagination for endpoints with smaller datasets."""
    page_size = 5
    page_query_param = "page"
    page_size_query_param = "page_size"
    max_page_size = 20

