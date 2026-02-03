from rest_framework.views import APIView # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework import status # type: ignore
from .models import Attendance
from .serializers import AttendanceSerializer

class AttendanceListCreateView(APIView):
    """
    GET  -> List attendance records
    POST -> Mark attendance
    """

    def get(self, request):
        employee_id = request.query_params.get('employee')

        queryset = Attendance.objects.all().order_by('-date')

        if employee_id:
            queryset = queryset.filter(employee_id=employee_id)

        serializer = AttendanceSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = AttendanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
