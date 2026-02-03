from rest_framework import serializers # type: ignore
from .models import Attendance

class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(
        source='employee.full_name',
        read_only=True
    )

    class Meta:
        model = Attendance
        fields = [
            'id',
            'employee',
            'employee_name',
            'date',
            'status',
            'created_at',
        ]

    def validate(self, data):
        employee = data.get('employee')
        date = data.get('date')

        if Attendance.objects.filter(employee=employee, date=date).exists():
            raise serializers.ValidationError(
                "Attendance for this employee on this date already exists."
            )

        return data
