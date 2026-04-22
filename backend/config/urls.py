from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.users.urls')),
    path('api/notes/', include('apps.notes.urls')),
    path('api/todos/', include('apps.todos.urls')),
    path('api/tools/', include('apps.tools.urls')),
]
