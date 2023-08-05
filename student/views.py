from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from authentication.authentication import CustomAuthentication
from .serializer import *
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

# Create your views here.


class AddStudentInfoView(APIView):
    """
        API view for adding and retrieving student informtion.

        Methods:
        - post(request): Create a new student with associated contact, address, and class information.
        - get(request, id): Retrieve student information based on the provided ID.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Create a new student with associated contact, address, and class information.

        Request Parameters:
        - request: The HTTP request object containing the data for creating a new student.

        Returns:
        - Response: HTTP response with the serialized student data and a status code of 201 if successful.

        Raises:
        - ValidationError: If the serializer data is invalid.
        """

        serializer = RegisterNewStudentSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data,  status=status.HTTP_201_CREATED)

    def get(self, request, id):
        try:
            student = StudentModel.objects.get(id=id)
            student_contact = StudentContactModel.objects.filter(
                student_id=student.id)
            student_addresses = StudentAddressModel.objects.filter(
                student_id=student.id)
            # student_class  =  StudentClassModel.objects.get(student_id = id, has_passed= False)
            serializer_data = {
                'student': StudentSerializer(student).data,
                # 'student_class': StudentClassSerializer(student_class).data,
                'student_contact': StudentContactSerializer(student_contact, many=True).data,
                'student_addresses': StudentAddressSerializer(student_addresses, many=True).data,
            }
            serializer = RegisterNewStudentSerializer(serializer_data)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': f'{e}'}, status=status.HTTP_404_NOT_FOUND)


class SearchStudentView(APIView):
    pagination_class = PageNumberPagination()

    def search_student(slef, keyword):
        queryset = StudentModel.objects.filter(
            Q(student_id__icontains=keyword) | Q(first_name__icontains=keyword)
        )
        return queryset

    def post(self, request):

        keyword = request.data.get('query')
        queryset = self.search_student(keyword=keyword)
        paginated_queryset = self.pagination_class.paginate_queryset(
            queryset, request)
        serializer = StudentSerializer(paginated_queryset, many=True)
        paginated_resp = self.pagination_class.get_paginated_response(
            serializer.data)
        return Response(paginated_resp.data, status=status.HTTP_200_OK)
