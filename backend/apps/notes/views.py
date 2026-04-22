from rest_framework import viewsets, permissions

from .models import Note
from .serializers import NoteSerializer


class NoteViewSet(viewsets.ModelViewSet):
    """CRUD operations for user notes."""

    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]
    search_fields = ['title', 'content']
    filterset_fields = ['is_pinned', 'color']
    ordering_fields = ['created_at', 'updated_at', 'is_pinned']

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
