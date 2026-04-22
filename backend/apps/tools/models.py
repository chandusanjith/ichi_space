from django.conf import settings
from django.db import models


class ToolUsage(models.Model):
    """Tracks tool usage for analytics and popular tools ranking."""

    tool_slug = models.CharField(max_length=100, db_index=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='tool_usages',
    )
    metadata = models.JSONField(default=dict, blank=True)
    used_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-used_at']
        indexes = [
            models.Index(fields=['tool_slug', '-used_at']),
        ]

    def __str__(self):
        return f"{self.tool_slug} - {self.used_at}"
