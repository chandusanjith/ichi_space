from django.contrib import admin

from .models import Todo


@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'priority', 'is_completed', 'due_date']
    list_filter = ['priority', 'is_completed']
    search_fields = ['title', 'description']
