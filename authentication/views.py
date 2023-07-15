from rest_framework.views import APIView
from rest_framework_simplejwt import tokens
from .serializers import UserLoginSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import  status
from .models import User


# Create your views here.


class CreateUserView(APIView):
    def post(self, request):
        serializer  =  UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    



class UserLoginView(APIView):
    authentication_classes=[]
    permission_classes = []
    
    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }


    def post(self, request):
        serializer  =  UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception= True)
        email =  serializer.data.get('email')
        password =  serializer.data.get('password')
        user =  authenticate(email=email, password = password)
        print(user.id)
        if user is not None:
            token = self.get_tokens_for_user(user)
            response =  Response()
            response.set_cookie(key='access', value=token['access'], httponly=True )
            response.set_cookie(key='refresh', value=token['refresh'], httponly=True )
            user_data  =  User.objects.filter(id=user.id).first()
            user_serializer =  UserSerializer(user_data)
            # user_serializer.is_valid(raise_exception=True)
            response.data   = user_serializer.data
            return response
        else:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)



class UserLogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        response.data = {
            'message': 'success'
        }
        return response