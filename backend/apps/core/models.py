import uuid6

from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

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

    uuid = models.UUIDField(default=uuid6.uuid6, unique=True, editable=False)
    status = models.IntegerField(default=Status.CREATED)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

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

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"


class DropDown(BaseModel):
    label = models.CharField(max_length=200)
    parent = models.ForeignKey(
        "self",
        DEFAULT_ON_DELETE,
        null=True,
        blank=True,
        related_name="children",
    )

    def __str__(self):
        return self.label

    class Meta:
        verbose_name = "Dropdown"
        verbose_name_plural = "Dropdowns"


class Images(BaseModel):
    image = models.ImageField(upload_to="images")
    alt_text = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Image {self.uuid}"

    class Meta:
        verbose_name = "Image"
        verbose_name_plural = "Images"


class ContactInfo(BaseModel):
    """Singleton model for site-wide contact information"""
    department_name = models.CharField(max_length=255, default="Civil & Infrastructure Engineering Society")
    institution_name = models.CharField(max_length=255, default="Indian Institute of Technology Jodhpur")
    address = models.TextField(default="NH 62, Nagaur Road, Karwar, Jodhpur, Rajasthan 342030")
    email = models.EmailField(default="cies@iitj.ac.in")
    phone = models.CharField(max_length=20, blank=True, null=True)
    
    # Social media links
    linkedin_url = models.URLField(blank=True, null=True)
    instagram_url = models.URLField(blank=True, null=True)
    twitter_url = models.URLField(blank=True, null=True)
    youtube_url = models.URLField(blank=True, null=True)
    facebook_url = models.URLField(blank=True, null=True)
    website_url = models.URLField(blank=True, null=True)
    
    # Additional info
    office_hours = models.CharField(max_length=100, blank=True, null=True)
    map_embed_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.department_name} - Contact Info"

    class Meta:
        verbose_name = "Contact Information"
        verbose_name_plural = "Contact Information"

    def save(self, *args, **kwargs):
        # Ensure only one instance exists (singleton pattern)
        if not self.pk and ContactInfo.objects.exists():
            existing = ContactInfo.objects.first()
            self.pk = existing.pk
        super().save(*args, **kwargs)


class ContactSubmission(BaseModel):
    """Model to store contact form submissions"""
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    subject = models.CharField(max_length=255, blank=True, null=True)
    message = models.TextField()
    
    # Metadata
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.TextField(blank=True, null=True)
    
    # Status tracking
    is_read = models.BooleanField(default=False)
    is_replied = models.BooleanField(default=False)
    replied_at = models.DateTimeField(blank=True, null=True)
    replied_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="replied_contacts"
    )
    notes = models.TextField(blank=True, null=True, help_text="Internal notes about this submission")

    def __str__(self):
        return f"Contact from {self.name} - {self.email}"

    class Meta:
        verbose_name = "Contact Submission"
        verbose_name_plural = "Contact Submissions"
        ordering = ["-created_at"]


class Announcement(BaseModel):
    """Model for announcements/notices"""
    title = models.CharField(max_length=255)
    content = models.TextField()
    
    # Display settings
    is_active = models.BooleanField(default=True)
    is_pinned = models.BooleanField(default=False, help_text="Pinned announcements appear first")
    priority = models.IntegerField(default=0, help_text="Higher priority appears first")
    
    # Scheduling
    publish_date = models.DateTimeField(auto_now_add=True)
    expiry_date = models.DateTimeField(blank=True, null=True, help_text="Leave blank for no expiry")
    
    # Target audience
    AUDIENCE_CHOICES = [
        ("all", "All"),
        ("students", "Students Only"),
        ("faculty", "Faculty Only"),
        ("ug", "Undergraduate Students"),
        ("pg", "Postgraduate Students"),
    ]
    target_audience = models.CharField(max_length=20, choices=AUDIENCE_CHOICES, default="all")
    
    # Optional link
    link_url = models.URLField(blank=True, null=True)
    link_text = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Announcement"
        verbose_name_plural = "Announcements"
        ordering = ["-is_pinned", "-priority", "-publish_date"]


class Gallery(BaseModel):
    """Model for gallery/media management"""
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    
    # Category
    CATEGORY_CHOICES = [
        ("event", "Event"),
        ("activity", "Activity"),
        ("campus", "Campus"),
        ("achievement", "Achievement"),
        ("other", "Other"),
    ]
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="other")
    
    # Display settings
    is_featured = models.BooleanField(default=False)
    display_order = models.IntegerField(default=0)
    
    # Date
    date_taken = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Gallery"
        verbose_name_plural = "Galleries"
        ordering = ["-is_featured", "-display_order", "-created_at"]


class GalleryImage(BaseModel):
    """Images belonging to a gallery"""
    gallery = models.ForeignKey(
        Gallery,
        on_delete=models.CASCADE,
        related_name="images"
    )
    image = models.ForeignKey(
        Images,
        on_delete=models.CASCADE,
        related_name="gallery_images"
    )
    caption = models.CharField(max_length=255, blank=True, null=True)
    display_order = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.gallery.title} - Image {self.display_order}"

    class Meta:
        verbose_name = "Gallery Image"
        verbose_name_plural = "Gallery Images"
        ordering = ["display_order"]


class NavigationItem(BaseModel):
    """Model for dynamic navigation menu items"""
    name = models.CharField(max_length=100)
    href = models.CharField(max_length=255)
    icon = models.CharField(max_length=50, blank=True, null=True, help_text="Icon identifier (e.g., 'Home', 'Info')")
    
    # Hierarchy
    parent = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="children_items"
    )
    
    # Display settings
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    opens_in_new_tab = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Navigation Item"
        verbose_name_plural = "Navigation Items"
        ordering = ["display_order"]
