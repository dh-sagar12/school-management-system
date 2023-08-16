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
    """ Semester, Annual , Trimester etc """
    id =  models.BigAutoField(primary_key=True)
    academic_type =  models.CharField(max_length=20, null=False, blank=False )
    occurance_per_year = models.IntegerField(null=False, blank=False)



    class Meta:
        db_table   =  'academic"."academic_type'
        verbose_name = "Academic Type"
        verbose_name_plural = "Academic Types"

    def __str__(self):
        return self.academic_type
    

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
    course_duration  =  models.IntegerField(null=False, blank=False)


    class Meta:
        db_table =   'academic"."courses'
        verbose_name = "Course"
        verbose_name_plural = "Courses"


    def __str__(self):
        return self.course_name
    


class AcademicChargesModel(models.Model):
    id =  models.BigAutoField(primary_key=True)
    class_id =  models.ForeignKey(AcademicClassModel, on_delete=models.DO_NOTHING, null=False, db_column='class_id')
    course_id =  models.ForeignKey(CoursesModel, on_delete=models.DO_NOTHING, null=True, blank=True, db_column='course_id')
    charge_code =  models.CharField(max_length=10, blank=False, null=False)
    charge_name =  models.CharField(max_length=100, null=False, blank=False)
    charge_amount = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    is_active = models.BooleanField(null=False, blank=False, default=True)
    academic_session_type = models.IntegerField(null=True, blank=True)
    

    class Meta:
        db_table = 'academic"."charges'
        verbose_name = 'Adacemic Charge'
        verbose_name_plural = "Academic Charges"
    

    def __str__(self):
        return self.charge_name



    
    
