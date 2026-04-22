from django.db.models import Count
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ToolUsage
from .serializers import PopularToolSerializer, ToolUsageSerializer


class LogToolUsageView(APIView):
    """Log a tool usage event."""

    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = ToolUsageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(
            user=request.user if request.user.is_authenticated else None
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PopularToolsView(APIView):
    """Get the most popular tools by usage count."""

    permission_classes = [permissions.AllowAny]

    def get(self, request):
        limit = int(request.query_params.get('limit', 10))
        popular = (
            ToolUsage.objects
            .values('tool_slug')
            .annotate(usage_count=Count('id'))
            .order_by('-usage_count')[:limit]
        )
        serializer = PopularToolSerializer(popular, many=True)
        return Response(serializer.data)
