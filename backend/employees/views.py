from rest_framework.views import APIView # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework import status # type: ignore
from .models import Employee
from .serializers import EmployeeSerializer

class EmployeeListCreateView(APIView):
    """
    GET  -> List all employees
    POST -> Add new employee
    """

    def get(self, request):
        employees = Employee.objects.all().order_by('-created_at')
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
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


class EmployeeDeleteView(APIView):
    """
    DELETE -> Delete employee by ID
    """

    def delete(self, request, pk):
        try:
            employee = Employee.objects.get(pk=pk)
        except Employee.DoesNotExist:
            return Response(
                {"error": "Employee not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        employee.delete()
        return Response(
            {"message": "Employee deleted successfully."},
            status=status.HTTP_200_OK
        )
