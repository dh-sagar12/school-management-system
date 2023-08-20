from django.urls import  path
from .views import *

urlpatterns = [
    path("due-charges/", GetDueChargeView.as_view(), name='due_charge'),
]
