from django.db import models
from core.models import *
from academic.models import *
# Create your models here.

class StudentModel(models.Model):

    class GederTypeChocies(models.TextChoices):
        MALE = "Male", "Male"
        FEMALE = "Female", "Female"
        OTHER = "Other", "Other"
        RAHTERNOTSAY = "RatherNotSay", "Rather Not Say"
    

    id =  models.BigAutoField(primary_key=True)
    first_name =  models.CharField(max_length=100, null=False, blank=False, db_index=True)
    middle_name =  models.CharField(max_length=100, null=True, blank=True)
    last_name =  models.CharField(max_length=100, null=False, blank=False, db_index=True)
    gender  =  models.CharField(null=False, blank=False, choices=GederTypeChocies.choices)
    date_of_birth  =  models.DateField(null=False, blank=False)
    father_name =   models.CharField(max_length=100, blank=False, null=False)
    mother_name =  models.CharField(max_length=100, null=False, blank=False)
    grand_father_name =  models.CharField(max_length=100, null=False, blank=False) 
    email =  models.EmailField(max_length=200, null=True, blank=True)
    created_by  =  models.ForeignKey(User, on_delete=models.DO_NOTHING, null=False)
    created_on =  models.DateTimeField(auto_now_add=True)


    class Meta:
        db_table =  'student"."students'


    def __str__(self) -> str:
        return self.first_name





class StudentContactModel(models.Model):

    class ContactChoices(models.TextChoices):
        LANDLINE = "Landline", "Landline"
        MOBILE = "Mobile", "Mobile"
        OTHER = "Other", "Other"

    class RelationTypeChocies(models.TextChoices):
        FATHER = "Father", "Father"
        MOTHER = "Mother", "Mother"
        OTHER = "Other", "Other"



    id  =  models.BigAutoField(primary_key=True)
    student_id =  models.ForeignKey(StudentModel, on_delete=models.DO_NOTHING, db_column='student_id')
    relation_type =  models.CharField(null=False, blank=False, choices=RelationTypeChocies.choices)
    contact_type =  models.CharField(null=False, blank=False, choices=ContactChoices.choices)
    contact_number =  models.CharField(max_length=15, null=False, blank=True)

    class Meta:
        db_table =  'student"."contact_details'

    def __str__(self) -> str:
        return self.id





class StudentAddressModel(models.Model):

    class AddressChoices(models.TextChoices):
        PERMANENT = "Permanent", "Permanent"
        TEMPORARY = "Temporary", "Temporary"
        OTHER = "Other", "Other"

    
    id  = models.BigAutoField(primary_key=True)
    student_id =  models.ForeignKey(StudentModel, on_delete=models.DO_NOTHING, db_column='student_id')
    address_type =  models.CharField(null=False, blank=False, choices= AddressChoices.choices)
    state_id   =  models.ForeignKey(ProvincesModel, on_delete=models.DO_NOTHING, null=False)
    district_id   =  models.ForeignKey(DistrictModel, on_delete=models.DO_NOTHING, null=False)
    local_bodies_id   =  models.ForeignKey(LocalBodiesModel, on_delete=models.DO_NOTHING, null=False)
    ward_no =  models.IntegerField(null=False, blank=False)
    street  =  models.CharField(max_length=50, null=True, blank=True)
    tole_name  =  models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        db_table =  'student"."address_details'
    
    def __str__(self) -> str:
        return self.id



class StudentClassModel(models.Model):
    id  = models.BigAutoField(primary_key=True)
    student_id =  models.ForeignKey(StudentModel, on_delete=models.DO_NOTHING, null=False, db_column='student_id')
    academic_year_id  =   models.ForeignKey(AcademicYearModel,  on_delete=models.DO_NOTHING, null=False, db_column='academic_year_id')
    admission_date  =  models.DateField(null=False, blank=False)
    class_id = models.ForeignKey(AcademicClassModel, on_delete=models.DO_NOTHING,   null=False, blank=False, db_column='class_id')
    faculty_id  =  models.ForeignKey(FacultyModel, on_delete=models.DO_NOTHING,  null=True, blank=True, db_column='faculty_id')
    course_id  =  models.ForeignKey( CoursesModel, on_delete  =  models.DO_NOTHING,  null=True, blank=True, db_column='course_id')
    has_passed =  models.BooleanField(default=False, null=False, blank=False)
    passed_year  =   models.DateField(null=True, blank=True)
    passed_grade =  models.CharField(null=True,  blank=True)
    created_by =  models.ForeignKey(User, null=False, blank=False , on_delete=models.DO_NOTHING, db_column='created_by')
    created_on   =  models.DateTimeField(auto_now_add=True)


    class Meta:
        db_table =  'student"."class_details'

    def __str__(self):
        return str(self.student_id)
