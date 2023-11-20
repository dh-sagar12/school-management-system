from rest_framework.views import APIView
from rest_framework_simplejwt import tokens

from core.models import BranchModel
from core.serializers import BranchSerializer
from .serializers import BranchLoginPolicySerializer, MenuPolicyModelSerializer, MenuPolicySerializer, UserLoginSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import BranchLoginPolicyModel, MenuPermissionModel, User
from .permissions import CheckBranchPermission
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination

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
        response.status_code = status.HTTP_200_OK
        return response


class InitAuthorizeUserBranchView(APIView):

    def get(self, request):
        if request.user.is_authenticated:
            user_instance = User.objects.get(id=request.user.id)
            request_branch = request.session.get('branch')
            today_np = request.session.get('today_np')
            today_ad = request.session.get('today_ad')
            menu_policies = request.session.get('menu_policies')
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
                        'today_ad': today_ad,
                        'menu_policies': menu_policies
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


class UserListView(ListAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    pagination_class = None


class BranchLoginPolicyView(APIView):
    serializer_class = BranchLoginPolicySerializer
    model_class = BranchLoginPolicyModel
    pagination_class = PageNumberPagination()

    def post(self, request):
        serializer = self.serializer_class(
            data=request.data, context=request)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Login Policy Updated Successfully'}, status=status.HTTP_201_CREATED)
    
    def put(self, request):
        try:
            policy_instance = self.model_class.objects.get(id=request.data.get('id'))
            serializer = self.serializer_class(policy_instance, data= request.data, partial= True, context =  request)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Login Policy Updated Successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error":  f"{e}"}, status=status.HTTP_400_BAD_REQUEST)
        


    def get(self, request):
        policy_id = request.GET.get('policy_id')
        print(policy_id)
        if policy_id is not None:
            queryset = self.model_class.objects.get(id=policy_id)
            serializer = self.serializer_class(queryset, context  = request)
        else:
            queryset = self.model_class.objects.filter(
                branch_id=request.session.get('branch'))
            paginated_queryset = self.pagination_class.paginate_queryset(queryset, request)
            serializer = self.serializer_class(paginated_queryset, many=True, context  = request)
            paginated_resp = self.pagination_class.get_paginated_response(
                serializer.data)
            return Response(paginated_resp.data, status=status.HTTP_200_OK)

        return Response(serializer.data, status=status.HTTP_200_OK)


class MenuPolicyView(APIView):

    def get(self, request):
        user_id = request.GET.get('user_id')
        branch_id = request.GET.get('branch_id')
        print(user_id, branch_id)
        if user_id is not None and branch_id is not None:
            queryset = MenuPermissionModel.objects.filter(
                branch_id=branch_id, user_id=user_id)
            serializer = MenuPolicyModelSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response({"detail": "User and Branch is Not Provided"}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        serializer = MenuPolicySerializer(
            data=request.data, context=request.user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
