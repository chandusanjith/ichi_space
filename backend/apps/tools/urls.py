from django.urls import path

from .views import LogToolUsageView, PopularToolsView

urlpatterns = [
    path('log/', LogToolUsageView.as_view(), name='tool-log'),
    path('popular/', PopularToolsView.as_view(), name='tool-popular'),
]
