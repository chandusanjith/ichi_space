from django.contrib import admin

from .models import ToolUsage


@admin.register(ToolUsage)
class ToolUsageAdmin(admin.ModelAdmin):
    list_display = ['tool_slug', 'user', 'used_at']
    list_filter = ['tool_slug']
    search_fields = ['tool_slug']
