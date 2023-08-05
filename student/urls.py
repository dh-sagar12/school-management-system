from django.urls import  path
from .views import *

urlpatterns = [
   path('student/',  AddStudentInfoView.as_view(), name='student'),
   path('student/<int:id>',  AddStudentInfoView.as_view(), name='student_single'),
   path('filter/',  SearchStudentView.as_view(), name='student_filter'),
]
