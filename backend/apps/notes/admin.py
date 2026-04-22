from django.contrib import admin

from .models import Note


@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'color', 'is_pinned', 'updated_at']
    list_filter = ['color', 'is_pinned']
    search_fields = ['title', 'content']
