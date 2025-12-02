from collections import defaultdict

from django.shortcuts import get_object_or_404
from django.db.models import Q

from apps.core.models import BaseModel, DropDown
from apps.team.api.v1.serializers import (
    TeamMemberCreateSerializer,
    TeamMemberGetSerializer,
    TeamMemberListSerializer,
)
from apps.team.models import TeamMember
from rest_framework import status
from rest_framework.response import Response

from drf_spectacular.utils import (
    extend_schema,
    OpenApiParameter,
)
from drf_spectacular.types import OpenApiTypes

from base.api.v1.views import BaseAV
from base.pagination import DefaultPagination


class TeamMemberAV(BaseAV):
    """API for team member management"""
    authentication = {"get": False, "post": True, "put": True, "delete": True}

    @extend_schema(
        parameters=[
            OpenApiParameter("page", int, required=False),
            OpenApiParameter("page_size", int, required=False),
            OpenApiParameter(
                name="committee",
                type=OpenApiTypes.STR,
                required=False,
                description="Filter by committee name or UUID"
            ),
            OpenApiParameter(
                name="role",
                type=OpenApiTypes.STR,
                required=False,
                description="Filter by role name or UUID"
            ),
            OpenApiParameter(
                name="batch",
                type=OpenApiTypes.STR,
                required=False,
                description="Filter by batch (e.g., 'UG 2024', 'PG 2023')"
            ),
            OpenApiParameter(
                name="featured",
                type=OpenApiTypes.BOOL,
                required=False,
                description="Filter featured members only"
            ),
            OpenApiParameter(
                name="is_faculty",
                type=OpenApiTypes.BOOL,
                required=False,
                description="Filter faculty members only"
            ),
            OpenApiParameter(
                name="is_active",
                type=OpenApiTypes.BOOL,
                required=False,
                description="Filter active members only (default: true)"
            ),
            OpenApiParameter(
                name="search",
                type=OpenApiTypes.STR,
                required=False,
                description="Search by name"
            ),
            OpenApiParameter(
                name="group_by",
                type=OpenApiTypes.STR,
                required=False,
                description="Group results by field",
                enum=["committee", "role", "batch"]
            ),
        ],
        responses=TeamMemberListSerializer(many=True)
    )
    def get(self, request, uuid=None):
        # Single member detail
        if uuid:
            member = get_object_or_404(TeamMember, uuid=uuid)
            serializer = TeamMemberGetSerializer(member, context={"request": request})
            return Response({"data": serializer.data})

        # Build queryset with filters
        queryset = TeamMember.objects.all()

        # Active filter (default: true)
        is_active = request.query_params.get("is_active", "true")
        if is_active.lower() == "true":
            queryset = queryset.filter(is_active=True)
        elif is_active.lower() == "false":
            queryset = queryset.filter(is_active=False)

        # Committee filter
        committee = request.query_params.get("committee")
        if committee:
            queryset = queryset.filter(
                Q(committee__label__icontains=committee) |
                Q(committee__uuid=committee)
            )

        # Role filter
        role = request.query_params.get("role")
        if role:
            queryset = queryset.filter(
                Q(role__label__icontains=role) |
                Q(role__uuid=role)
            )

        # Batch filter
        batch = request.query_params.get("batch")
        if batch:
            queryset = queryset.filter(batch__icontains=batch)

        # Featured filter
        featured = request.query_params.get("featured")
        if featured is not None:
            queryset = queryset.filter(featured=featured.lower() == "true")

        # Faculty filter
        is_faculty = request.query_params.get("is_faculty")
        if is_faculty is not None:
            queryset = queryset.filter(is_faculty=is_faculty.lower() == "true")

        # Search filter
        search = request.query_params.get("search")
        if search:
            queryset = queryset.filter(name__icontains=search)

        # Check if grouping is requested
        group_by = request.query_params.get("group_by")
        if group_by:
            return self._get_grouped_response(queryset, group_by)

        # Regular paginated response
        paginator = DefaultPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)

        serializer = TeamMemberListSerializer(
            paginated_qs, many=True, context={"request": request}
        )
        return paginator.get_paginated_response(serializer.data)

    def _get_grouped_response(self, queryset, group_by):
        """Return team members grouped by specified field"""
        grouped = defaultdict(list)

        for member in queryset:
            if group_by == "committee":
                key = member.committee.label if member.committee else "Unassigned"
            elif group_by == "role":
                key = member.role.label if member.role else "Unassigned"
            elif group_by == "batch":
                key = member.batch or "Unassigned"
            else:
                key = "All"

            grouped[key].append(
                TeamMemberListSerializer(member, context=self.get_serializer_context()).data
            )

        # Convert to list format
        result = [
            {"group": key, "members": members}
            for key, members in grouped.items()
        ]

        return Response({"data": result})

    @extend_schema(request={"multipart/form-data": TeamMemberCreateSerializer})
    def post(self, request):
        if not request.user.is_staff:
            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = TeamMemberCreateSerializer(data=request.data)
        if serializer.is_valid():
            member = serializer.save()
            return Response(
                {"data": TeamMemberGetSerializer(member).data, "message": "Team member created"},
                status=status.HTTP_201_CREATED
            )
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(request={"multipart/form-data": TeamMemberCreateSerializer})
    def put(self, request, uuid=None):
        if not request.user.is_staff:
            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        if not uuid:
            return Response(
                {"error": "UUID is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        member = get_object_or_404(TeamMember, uuid=uuid)
        serializer = TeamMemberCreateSerializer(member, data=request.data, partial=True)
        if serializer.is_valid():
            member = serializer.save()
            return Response(
                {"data": TeamMemberGetSerializer(member).data, "message": "Team member updated"}
            )
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uuid=None):
        if not request.user.is_staff:
            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        if not uuid:
            return Response(
                {"error": "UUID is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        member = get_object_or_404(TeamMember, uuid=uuid)
        member.delete()
        return Response({"message": "Team member deleted"})


class FeaturedTeamAV(BaseAV):
    """API for featured team members (for homepage)"""
    authentication = False

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="limit",
                type=OpenApiTypes.INT,
                required=False,
                description="Number of members to return (default: 10)"
            ),
        ],
        responses=TeamMemberListSerializer(many=True)
    )
    def get(self, request):
        limit = int(request.query_params.get("limit", 10))

        # Get featured members, prioritize HOD and faculty
        queryset = TeamMember.objects.filter(
            is_active=True,
            featured=True
        ).order_by("-is_hod", "-is_faculty", "display_order")[:limit]

        serializer = TeamMemberListSerializer(queryset, many=True)
        return Response({"data": serializer.data})


class TeamByCommitteeAV(BaseAV):
    """API for team members grouped by committee"""
    authentication = False

    @extend_schema(responses=TeamMemberListSerializer(many=True))
    def get(self, request):
        queryset = TeamMember.objects.filter(is_active=True)

        # Group by committee
        grouped = defaultdict(list)
        
        # Define committee order
        committee_order = [
            "Faculty Leadership",
            "Coordination Committee",
            "Events Committee",
            "Technical Committee",
            "Media Committee",
            "Other"
        ]

        for member in queryset:
            committee_name = member.committee.label if member.committee else "Other"
            grouped[committee_name].append(TeamMemberListSerializer(member).data)

        # Sort committees by predefined order
        result = []
        for committee in committee_order:
            if committee in grouped:
                result.append({
                    "committee": committee,
                    "members": grouped[committee]
                })

        # Add any remaining committees not in the predefined order
        for committee, members in grouped.items():
            if committee not in committee_order:
                result.append({
                    "committee": committee,
                    "members": members
                })

        return Response({"data": result})
