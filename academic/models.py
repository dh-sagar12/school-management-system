from django.db import models
from core.models import *

# Create your models here.


class AcademicClassModel(models.Model):
    id  = models.BigAutoField(primary_key=True)
    class_name =  models.CharField(max_length=50, unique=True)
    

    class Meta:
        db_table =   'academic"."classes'
        verbose_name = "Class"
        verbose_name_plural = "Classes"


    def __str__(self):
        return self.class_name
    
    


class AcademicSectionModel(models.Model):
    id  =  models.BigAutoField(primary_key=True)
    class_id  = models.ForeignKey(AcademicClassModel, on_delete=models.DO_NOTHING, db_column='class_id', null=False)
    no_of_section  =  models.IntegerField(null=False, blank=False)
    academic_year_id  =  models.ForeignKey(AcademicYearModel, on_delete=models.DO_NOTHING, null=False, db_column='academic_year_id')


    class Meta:
        db_table =   'academic"."section_details'
        verbose_name = "Section"
        verbose_name_plural = "Sections"

    def __str__(self):
        return self.class_id
    


class AcademicTypeModel(models.Model):
    id =  models.BigAutoField(primary_key=True)
    academic_type =  models.CharField(max_length=20, null=False, blank=False )



    class Meta:
        db_table   =  'academic"."academic_type'
        verbose_name = "Academic Type"
        verbose_name_plural = "Academic Types"


class FacultyModel(models.Model):
    id  = models.BigAutoField(primary_key=True)
    faculty_name = models.CharField(max_length=20, null=False, blank=False, db_column='faculty_name')

    class Meta:
        db_table =   'academic"."faculties'

    def __str__(self) -> str:
        return self.faculty_name

class SubjectModel(models.Model):
    id =  models.BigAutoField(primary_key=True)
    subject_code  =  models.CharField(max_length=6, null=False, blank=False)
    subject_name =  models.CharField(max_length=60, blank=False, null=False)
    status  =  models.BooleanField(default=True, null=False)    


    class Meta: 
        db_table =   'academic"."subjects'
        verbose_name = "Subject"
        verbose_name_plural = "Subjects"




    def __str__(self):
        return f"({self.subject_code}){self.subject_name}"
    


class CoursesModel(models.Model):

    id =  models.BigAutoField(primary_key=True)
    course_code =   models.CharField(max_length=15, null=False, unique=True)
    course_name =  models.CharField(max_length=100, null=False, blank=False, unique=True)
    faculty_id =  models.ForeignKey(FacultyModel, null=False,  on_delete=models.DO_NOTHING, db_column='faculty_Id')
    academic_type_id =  models.ForeignKey(AcademicTypeModel, null=False, on_delete=models.DO_NOTHING, db_column='academic_type_id')
    status  =  models.BooleanField(default=True, null=False)
    subjects  =  models.ManyToManyField(SubjectModel, db_column='subjects', related_name='courses')


    class Meta:
        db_table =   'academic"."courses'
        verbose_name = "Course"
        verbose_name_plural = "Courses"


    def __str__(self):
        return self.course_name
    