from rest_framework import viewsets, permissions

from .models import Todo
from .serializers import TodoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    """CRUD operations for user todos."""

    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]
    search_fields = ['title', 'description']
    filterset_fields = ['is_completed', 'priority']
    ordering_fields = ['created_at', 'updated_at', 'priority', 'due_date']

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
