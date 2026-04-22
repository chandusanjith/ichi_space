from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import CustomTokenObtainPairView, ProfileView, RegisterView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth-register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='auth-token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='auth-token-refresh'),
    path('profile/', ProfileView.as_view(), name='auth-profile'),
]
