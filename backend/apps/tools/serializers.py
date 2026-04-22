from rest_framework import serializers

from .models import ToolUsage


class ToolUsageSerializer(serializers.ModelSerializer):
    """Serializer for logging tool usage."""

    class Meta:
        model = ToolUsage
        fields = ['id', 'tool_slug', 'metadata', 'used_at']
        read_only_fields = ['id', 'used_at']


class PopularToolSerializer(serializers.Serializer):
    """Serializer for popular tools aggregate data."""

    tool_slug = serializers.CharField()
    usage_count = serializers.IntegerField()
