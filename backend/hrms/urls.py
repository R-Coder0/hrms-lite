from django.contrib import admin # type: ignore
from django.urls import path, include # type: ignore

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/employees/', include('employees.urls')),
    path('api/attendance/', include('attendance.urls')),
]
