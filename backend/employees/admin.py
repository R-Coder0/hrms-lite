from django.contrib import admin # type: ignore
from .models import Employee

admin.site.register(Employee)
