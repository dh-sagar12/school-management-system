from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import *
from student.models import StudentModel
from rest_framework.response import Response
from rest_framework import status
from academic.models import AcademicChargesModel
# Create your views here.


class GetDueChargeView(APIView):
    
    def post(request):
        student_id = request.data.get('student_id')
        class_id = request.data.get('class_id')
        try:

            student_instance  = StudentModel.object.get(id= student_id)
            charges_instances = AcademicChargesModel.objects.filter(class_id = class_id, is_active = True )
        
        except Exception as e:
            return Response({'error': e}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
        

        serializer = GetDueChargeSerializer(request.data)