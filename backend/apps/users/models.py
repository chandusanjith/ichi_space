from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Custom user model with email-based authentication."""

    email = models.EmailField(unique=True)
    avatar = models.URLField(blank=True, null=True)
    bio = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.email
