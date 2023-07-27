from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from authentication.authentication import CustomAuthentication
from core.models import BranchModel, MenuModel
from core.serializers import BranchDropDownSerilizer, BranchSerializer, MenuSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.


class BranchesView(APIView):
    authentication_classes =  [CustomAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        request.data['creator'] =  request.user.id
        serializer =  BranchSerializer(data =  request.data)
        if  serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({
                'error': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        request_id  =  request.data.get('id')

        if (request_id >  0 ):
            try:
                id  =  request.data.get('id')
                branch  =  BranchModel.objects.get(id  =id)
                serializer  =  BranchSerializer(branch)
                return Response(serializer.data, status=status.HTTP_200_OK)

            except Exception as e:
                return Response({'error': f'{e}'}, status=status.HTTP_404_NOT_FOUND)
        else:
            branch  =  BranchModel.objects.all()
            serializer =  BranchSerializer(branch, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)


class BrachDropDownView(APIView):
    authentication_classes= []
    permission_classes = []

    def get(self, request):
        branches =  BranchModel.objects.all()
        serializer  =  BranchDropDownSerilizer(branches, many =  True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class MenusView(APIView):
    authentication_classes  =  [CustomAuthentication]
    permission_classes = [IsAuthenticated]


    def post(self, request):
        serializer  =  MenuSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Success'}, status=status.HTTP_201_CREATED)


    def get(self, request):
        menus  =  MenuModel.objects.all()
        # print(menus)
        serializer =  MenuSerializer(menus, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



        
