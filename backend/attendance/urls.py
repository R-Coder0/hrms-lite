from django.urls import path # type: ignore
from .views import AttendanceListCreateView

urlpatterns = [
    path('', AttendanceListCreateView.as_view(), name='attendance-list-create'),
]
