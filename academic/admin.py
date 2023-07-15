from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(AcademicClassModel)
admin.site.register(AcademicSectionModel)
admin.site.register(AcademicTypeModel)
admin.site.register(FacultyModel)
admin.site.register(SubjectModel)
admin.site.register(CoursesModel)