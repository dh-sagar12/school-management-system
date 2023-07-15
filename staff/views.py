from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from rest_framework import status


# Create your views here.

class StaffDetailsView(APIView):


    def post(self, request):
        serializer  =  StaffDetailsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


    def get(self, request, id):
        try:
            if id > 0 :
                staff_instance  =  StaffModel.objects.get(id=id)
                serializer  =  StaffDetailsSerializer(staff_instance)
            else:
                staff_instance   = StaffModel.objects.filter()
                serializer  =  StaffDetailsSerializer(staff_instance, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': f'{e}' }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def put(self, request):
        try:
            staff_instance = StaffModel.objects.get(id=request.data.get('id'))
            serializer = StaffDetailsSerializer(staff_instance, data= request.data, partial= True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status= status.HTTP_202_ACCEPTED)
    
        except Exception as e:
            res = {'error': f'{e}'}
            return Response(res, status=status.HTTP_500_INTERNAL_SERVER_ERROR)