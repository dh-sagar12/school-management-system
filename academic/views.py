from django.shortcuts import render
from rest_framework.views import APIView
from  .serializers import  *
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

class AcademicClassView(APIView):

    def post(self, request):
        serializer  =  AcademicClassSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Success'}, status =  status.HTTP_201_CREATED)
    

    def get(self, request):
        data  =  AcademicClassModel.objects.all()
        serializer =  AcademicClassSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class AcademicSectionView(APIView):

    def post(self, request):
        serializer  =  AcademicSectionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Success'}, status =  status.HTTP_201_CREATED)
    

    def get(self, request):
        data  =  AcademicSectionModel.objects.all()
        serializer =  AcademicSectionSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)        



class AcademicTypeView(APIView):

    def post(self, request):
        serializer  =  AcademicTypeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Success'}, status =  status.HTTP_201_CREATED)
    

    def get(self, request):
        data  =  AcademicTypeModel.objects.all()
        serializer =  AcademicTypeSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)        
    


class FacultyView(APIView):

    def post(self, request):
        serializer  =  FacultySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Success'}, status =  status.HTTP_201_CREATED)
    

    def get(self, request):
        data  =  FacultyModel.objects.all()
        serializer =  FacultySerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)        
    

class SubjectView(APIView):

    def post(self, request):
        serializer  =  SubjectSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Success'}, status =  status.HTTP_201_CREATED)
    

    def get(self, request):
        data  =  SubjectModel.objects.all()
        serializer =  SubjectSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)      
      
class CoursesView(APIView):

    def post(self, request):
        serializer  =  CoursesSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Success'}, status =  status.HTTP_201_CREATED)
    

    def get(self, request):
        data  =  CoursesModel.objects.all()
        serializer =  CoursesSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)  

    # def get(self, request):
    #     menus  =  MenuModel.objects.all()
    #     # print(menus)
    #     serializer =  MenuSerializer(menus, many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)      
    
