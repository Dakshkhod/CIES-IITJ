import uuid6

from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

from apps.core.choices import ActivityCategory, ActivityStatus, EventsCategory
from apps.core.enums import Status
from apps.core.managers import DeleteStatusManager

from config.defaults import DEFAULT_ON_DELETE

# Create your models here.


class BaseModel(models.Model):
    BASE_MODEL_FIELDS = (
        "uuid",
        "status",
        "created_at",
        "updated_at",
    )

    uuid = models.UUIDField(default=uuid6.uuid6)
    status = models.IntegerField(default=Status.CREATED)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    objects = DeleteStatusManager()

    class Meta:
        abstract = True


class User(BaseModel, AbstractUser):
    USER_MODEL_FIELDS = BaseModel.BASE_MODEL_FIELDS + (
        "is_superuser",
        "last_login",
        "is_staff",
        "is_active",
        "date_joined",
        "groups",
        "user_permissions",
        "password"
    )

    first_name = None
    last_name = None
    email = models.EmailField(max_length=100, null=False, blank=False, unique=True)
    name = models.CharField(max_length=50, null=True)

    objects = UserManager()

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = ["username"]


class DropDown(BaseModel):
    label = models.CharField(max_length=200)
    parent = models.ForeignKey(
        "self",
        DEFAULT_ON_DELETE,
        null=True,
        related_name="children",
    )

    def __str__(self):
        return self.label

class Images(BaseModel):
    image = models.ImageField(upload_to="images")

# class TeamMember(BaseModel):
#     name = models.CharField(max_length=255)
#     role = models.ForeignKey(DropDown, on_delete=models.DO_NOTHING, related_name="member_role")
#     committee = models.ForeignKey(DropDown, on_delete=models.DO_NOTHING, related_name="member_committee")
#     profile_image = models.OneToOneField(Images, on_delete=models.DO_NOTHING, related_name="profile_image", null=True)
#     bio = models.TextField(null=True)
#     batch = models.CharField(max_length=20, null=True)
#     featured = models.BooleanField(default=False)
#     linkedin = models.URLField(null=True)
#     email = models.EmailField(null=True)
#     instagram = models.URLField(null=True)




