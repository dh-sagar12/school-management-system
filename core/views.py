from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from authentication.authentication import CustomAuthentication
from core.models import BranchModel, DistrictModel, LocalBodiesModel, MenuModel, ProvincesModel
from core.serializers import AttachmentSerializer, BranchDropDownSerilizer, BranchSerializer, DistrictSerializer, LocalBodiesSerializer, MenuSerializer, ProvinceSerializer
from rest_framework.permissions import IsAuthenticated
from django.core.files.storage import FileSystemStorage
import uuid
import pathlib
import os
import shutil

# Create your views here.


class BranchesView(APIView):
    authentication_classes = [CustomAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.data['creator'] = request.user.id
        serializer = BranchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({
                'error': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        request_id = request.data.get('id')

        if (request_id > 0):
            try:
                id = request.data.get('id')
                branch = BranchModel.objects.get(id=id)
                serializer = BranchSerializer(branch)
                return Response(serializer.data, status=status.HTTP_200_OK)

            except Exception as e:
                return Response({'error': f'{e}'}, status=status.HTTP_404_NOT_FOUND)
        else:
            branch = BranchModel.objects.all()
            serializer = BranchSerializer(branch, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


class BrachDropDownView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        branches = BranchModel.objects.all()
        serializer = BranchDropDownSerilizer(branches, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MenusView(APIView):
    authentication_classes = [CustomAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = MenuSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Success'}, status=status.HTTP_201_CREATED)

    def get(self, request):
        menus = MenuModel.objects.all()
        # print(menus)
        serializer = MenuSerializer(menus, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProvinceView(APIView):
    authentication_classes = [CustomAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        id = request.data.get('id')
        if id is not None:
            province_instance = ProvincesModel.objects.get(id=id)
            serializer = ProvinceSerializer(province_instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            province_instance = ProvincesModel.objects.all()
            serializer = ProvinceSerializer(province_instance, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


class DistrictView(APIView):
    authentication_classes = [CustomAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        id = request.data.get('id')
        if id is not None:
            district_instance = DistrictModel.objects.get(id=id)
            serializer = DistrictSerializer(district_instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            district_instance = DistrictModel.objects.all()
            serializer = DistrictSerializer(district_instance, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


class LocalBodiesView(APIView):
    authentication_classes = [CustomAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        id = request.data.get('id')
        if id is not None:
            localbodies_instance = LocalBodiesModel.objects.get(id=id)
            serializer = LocalBodiesSerializer(localbodies_instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            localbodies_instance = LocalBodiesModel.objects.all()
            serializer = LocalBodiesSerializer(localbodies_instance, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


class AttachmentView(APIView):

    def post(self, request):
        serializer = AttachmentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            validated_data = dict(serializer.validated_data)

            # check whether the file exists on temp directoryd
            file_exists = os.path.exists(
                f'Resources/Temp/{validated_data.get("file_name")}')

            if file_exists:
                try:
                    if not os.path.exists('Resources/Images/'):
                        os.mkdir('Resources/Images/')

                    shutil.copy2(
                        f'Resources/Temp/{validated_data.get("file_name")}', f'Resources/Images/{validated_data.get("file_name")}')

                    os.remove(
                        f'Resources/Temp/{validated_data.get("file_name")}')
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)

                except Exception as e:
                    return Response({'error': f'{e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            else:
                return Response({'error': 'File May be Renamed or Removed from original path'}, status=status.HTTP_204_NO_CONTENT)


class TempAttachmentView(APIView):
    authentication_classes = [CustomAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        files = request.FILES['original_file_name']
        file_uuid = str(uuid.uuid4())
        file_extension = pathlib.Path(files.name).suffix

        file_name = f'{file_uuid}{file_extension}'
        fs = FileSystemStorage(location='Resources/Temp/')
        fs.save(file_name, files)
        reponse = {
            'original_file_name': files.name,
            'file_name': file_name
        }
        return Response(reponse, status=status.HTTP_201_CREATED)
