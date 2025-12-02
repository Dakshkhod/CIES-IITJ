from apps.core.models import BaseModel
from apps.team.api.v1.serializers import TeamMemberCreateSerializer, TeamMemberGetSerializer
from apps.team.models import TeamMember
from rest_framework import status
from rest_framework.response import Response


from drf_spectacular.utils import (
    extend_schema,
)

from base.api.v1.views import BaseAV



class TeamMemberAV(BaseAV):

    @extend_schema(request={"multipart/form-data":TeamMemberCreateSerializer(exclude=BaseModel.BASE_MODEL_FIELDS)})
    def post(self, request):
        data = request.data
        serializer = TeamMemberCreateSerializer(data=data, exclude=BaseModel.BASE_MODEL_FIELDS)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "Team Member Saved"})
        else:
            return Response(serializer.errors)


    @extend_schema(responses=TeamMemberGetSerializer(exclude=(BaseModel.BASE_MODEL_FIELDS + ("role", "committee")), many=True))
    def get(self, request):
        qs = TeamMember.objects.all()
        serializer = TeamMemberGetSerializer(qs, many=True, exclude=(BaseModel.BASE_MODEL_FIELDS + ("role", "committee")))
        return Response(serializer.data)

