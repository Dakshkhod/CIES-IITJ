from django.http import HttpRequest
from django.shortcuts import get_object_or_404

from apps.core.choices import EventsCategory
from apps.events.models import Events
from rest_framework.response import Response


from drf_spectacular.utils import (
    extend_schema,
    OpenApiParameter,
)
from drf_spectacular.types import OpenApiTypes

from base.api.v1.views import BaseAV

from apps.events.api.v1.serializers import (
    EventGetSerializer,
    EventPaginatedResponseSerializer,
    EventPostSerializer,
)

from apps.core.models import BaseModel
from base.pagiantion import DefaultPagination

# Write your views here



class EventsAV(BaseAV):

    @extend_schema(
        responses=EventPaginatedResponseSerializer(),
        parameters=[
            OpenApiParameter("page", int, required=False),
            OpenApiParameter("page_size", int, required=False),
            OpenApiParameter(name="type", type=OpenApiTypes.STR, required=True, location=OpenApiParameter.QUERY, description="Purpose for the types of event", enum=["event", "activity", "roadmap"]),
        ]
    )
    def get(self, request: HttpRequest, uuid=None):

        event_type = request.query_params.get("type")

        if event_type == EventsCategory.EVENT:
            extra_filters = {"event_category":EventsCategory.EVENT}
        elif event_type == EventsCategory.ACTIVITY:
            extra_filters = {"event_category":EventsCategory.ACTIVITY}
        elif event_type == EventsCategory.ROADMAP:
            extra_filters = {"event_category":EventsCategory.ROADMAP}
        else:
            extra_filters = {}

        if uuid:
            event = get_object_or_404(Events, uuid=uuid, **extra_filters)
            serializer = EventGetSerializer(event)
            return Response({
                "data": serializer.data
            })
        qs = Events.objects.filter(**extra_filters).order_by("date")

        paginator = DefaultPagination()
        paginated_qs = paginator.paginate_queryset(qs, request)

        serializer = EventGetSerializer(paginated_qs, many=True, exclude=BaseModel.BASE_MODEL_FIELDS)
        return paginator.get_paginated_response(serializer.data)


    @extend_schema(request={"multipart/form-data":EventPostSerializer(exclude=BaseModel.BASE_MODEL_FIELDS)})
    def post(self, resquest):
        data = resquest.data
        serializer = EventPostSerializer(
            data=data, exclude=BaseModel.BASE_MODEL_FIELDS
        )
        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "Event Saved"})
        else:
            return Response(serializer.errors)
