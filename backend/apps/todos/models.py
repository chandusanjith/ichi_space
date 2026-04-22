from django.conf import settings
from django.db import models


class Todo(models.Model):
    """User todo item with priority and due date support."""

    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='todos',
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default='')
    is_completed = models.BooleanField(default=False)
    priority = models.CharField(
        max_length=10, choices=PRIORITY_CHOICES, default='medium'
    )
    due_date = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['is_completed', '-priority', '-created_at']

    def __str__(self):
        return self.title
