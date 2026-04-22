from django.conf import settings
from django.db import models


class Note(models.Model):
    """User note with color coding and pinning support."""

    COLOR_CHOICES = [
        ('default', 'Default'),
        ('red', 'Red'),
        ('orange', 'Orange'),
        ('yellow', 'Yellow'),
        ('green', 'Green'),
        ('blue', 'Blue'),
        ('purple', 'Purple'),
        ('pink', 'Pink'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notes',
    )
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True, default='')
    color = models.CharField(
        max_length=20, choices=COLOR_CHOICES, default='default'
    )
    is_pinned = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_pinned', '-updated_at']

    def __str__(self):
        return self.title
