from django.urls import  path
from .views import *

urlpatterns = [
    path("classes/", view=AcademicClassView.as_view(), name='classes'),
    path("section/", view=AcademicSectionView.as_view(), name='section'),
    path("academic-type/", view=AcademicTypeView.as_view(), name='academic-type'),
    path("faculty/", view=FacultyView.as_view(), name='faculty'),
    path("subject/", view=SubjectView.as_view(), name='subject'),
    path("course/", view=CoursesView.as_view(), name='course')
]
