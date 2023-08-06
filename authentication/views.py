from rest_framework.views import APIView
from rest_framework_simplejwt import tokens

from core.models import BranchModel
from core.serializers import BranchSerializer
from .serializers import UserLoginSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import User
from .permissions import CheckBranchPermission
# Create your views here.


class CreateUserView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserLoginView(APIView):
    authentication_classes = []
    permission_classes = [CheckBranchPermission]

    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get('email')
        password = serializer.data.get('password')
        user = authenticate(email=email, password=password)
        if user is not None:
            token = self.get_tokens_for_user(user)
            response = Response(headers={
                "Access-Control-Allow-Credentials": True
            })
            response.set_cookie(
                key='access', value=token['access'], httponly=True, samesite='None', secure=True)
            response.set_cookie(
                key='refresh', value=token['refresh'], httponly=True, samesite='None', secure=True)
            user_data = User.objects.filter(id=user.id).first()
            user_serializer = UserSerializer(user_data)
            # user_serializer.is_valid(raise_exception=True)
            response.data = user_serializer.data
            response.data['branch'] = request.session.get('branch')
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
        response.status_code =  status.HTTP_200_OK
        return response


class InitAuthorizeUserBranchView(APIView):

    def get(self, request):
        if request.user.is_authenticated:
            user_instance = User.objects.get(id=request.user.id)
            request_branch = request.session.get('branch')
            today_np  = request.session.get('today_np')
            today_ad  = request.session.get('today_ad')
            print('request+_branch' , request_branch)
            if user_instance is not None and request_branch is not None:

                # for authenticated user
                user_serializer = UserSerializer(user_instance)
                token = UserLoginView.get_tokens_for_user(self, user_instance)

                # for authenticated branch
                authenticated_branch = BranchModel.objects.get(
                    id=request_branch)
                branch_serilizer = BranchSerializer(authenticated_branch)

                return Response(
                    {
                        'user': user_serializer.data,
                        'access': token['access'],
                        'branch': branch_serilizer.data, 
                        'today_np': today_np, 
                        'today_ad':today_ad
                    }, status=status.HTTP_200_OK)

            return Response({'error': 'Un-Authorized'}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({"error":  'Un-Authorized'}, status=status.HTTP_401_UNAUTHORIZED)


class AuthenticatedBranchView(APIView):

    def get(self, request):
        if request.user.is_authenticated:
            branch_id = request.session.get('branch')
            if branch_id is not None:
                branch_instance = BranchModel.objects.get(id=branch_id)
                serializer = BranchSerializer(branch_instance)
                return Response(serializer.data)
            else:
                return Response({"error":  'Un-Authorized'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({"error":  'Un-Authorized'}, status=status.HTTP_401_UNAUTHORIZED)
