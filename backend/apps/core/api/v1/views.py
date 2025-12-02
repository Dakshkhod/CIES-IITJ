import base64

from typing import Dict

from django.contrib.auth import authenticate, login, logout

from rest_framework import status
from rest_framework.response import Response


from drf_spectacular.utils import (
    extend_schema,
    OpenApiParameter,
    OpenApiExample,
    inline_serializer,
)
from drf_spectacular.types import OpenApiTypes

from base.api.v1.views import BaseAV
from base.api.v1.decorators import extend_schema_response

from apps.core.api.v1.serializers import (
    DropDownSerializer,
    LoginSerializer,
)
from apps.core.models import BaseModel, User, DropDown

# Write your views here


class DropdownAV(BaseAV):

    authentication = False

    @extend_schema(
        request=DropDownSerializer,
    )
    def post(self, request):
        data = request.data
        serializer = DropDownSerializer(
            data=data, exclude=BaseModel.BASE_MODEL_FIELDS + ("parent",), many=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response({"data":serializer.data,"msg": "Dropdown Saved"})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        parameters=[
            OpenApiParameter(
                "uuid",
                OpenApiTypes.UUID,
            ),
        ]
    )
    def get(self, request):
        data = request.query_params
        dropdowns = DropDown.objects.filter(
            parent=DropDown.objects.get(uuid=data.get("uuid"))
        )
        serializer = DropDownSerializer(
            dropdowns, many=True, exclude=BaseModel.BASE_MODEL_FIELDS
        )
        return Response(serializer.data)


class RegisterAV(BaseAV):

    authentication = False

    @extend_schema(
        request=inline_serializer(
            name="RegisterSerializer",
            fields={
                **{
                    k: v
                    for k, v in LoginSerializer().get_fields().items()
                    if k
                    not in User.USER_MODEL_FIELDS
                    + (
                        "uuid",
                        "user_permissions",
                    )
                },
            },
        ),
    )
    def post(self, request):
        data = request.data
        data = data.copy()
        serializer = LoginSerializer(data=data, exclude=(User.USER_MODEL_FIELDS))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors)


class LoginAV(BaseAV):
    "Login/Logout API View"

    authentication = {
        "post": False,
    }

    def decrypt_auth(self, meta_info) -> None | Dict:
        header, data = meta_info.split(" ")
        if header != "Basic":
            return None
        decrypted_auth = base64.b64decode(data).decode("utf-8")
        credentials = decrypted_auth.split(":")
        return {
            "email": credentials[0],
            "password": credentials[1],
        }

    @extend_schema_response(type=LoginSerializer(exclude=User.USER_MODEL_FIELDS))
    def get(self, request):
        serializer = LoginSerializer(
            instance=request.user,
            exclude=User.USER_MODEL_FIELDS,
        )
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema_response(type=LoginSerializer(exclude=User.USER_MODEL_FIELDS))
    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="Authorization",
                type=OpenApiTypes.STR,
                location=OpenApiParameter.HEADER,
                required=True,
                examples=[
                    OpenApiExample(
                        name="User Authentication",
                        value="Basic ZXJwQGtpZXQuZWR1OkBlcnA=",
                        summary="base64 encoded credentials are required",
                        description="",
                    )
                ],
            )
        ]
    )
    def post(self, request):
        auth_data = request.META.get("HTTP_AUTHORIZATION")
        credentials = self.decrypt_auth(auth_data)
        user = authenticate(request, **credentials)
        if user is not None:
            login(request, user)
            response = {
                "msg": "Login Successfull.",
            }
            return Response(response, status=status.HTTP_201_CREATED)
        response = {
            "msg": "Invalid Credentials.",
        }
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        logout(request)
        response = {
            "msg": "Logout successfull.",
        }
        return Response(response, status=status.HTTP_200_OK)
