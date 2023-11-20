from django.urls import  path

from authentication.views import AuthenticatedBranchView, CreateUserView, MenuPolicyView, UserLoginView, UserLogoutView, InitAuthorizeUserBranchView, UserListView, BranchLoginPolicyView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView


urlpatterns = [
    path("signup/", CreateUserView.as_view(), name='create_user'),
    path("login/", UserLoginView.as_view(), name='login_user'),
    path("logout/", UserLogoutView.as_view(), name='logout_user'),
    path('refreshtoken/', TokenRefreshView.as_view(), name='refresh_token'),
    path('gettoken/', TokenObtainPairView.as_view(), name='get_token'),
    path('verifytoken/', TokenVerifyView.as_view(), name='verify_token'),
    path('init/', InitAuthorizeUserBranchView.as_view(), name='init_user_branch'),
    path('branch/', AuthenticatedBranchView.as_view(), name='loggedin_branch'),
    path('users/', UserListView.as_view(), name='users'),
    path('menu-policies/', MenuPolicyView().as_view(), name='menu-policies'),
    path('branch-policies/', BranchLoginPolicyView().as_view(), name='branch-policies'),


]
