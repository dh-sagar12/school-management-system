from django.db import models
from academic.models import SubjectModel
from core.models import BranchModel

# Create your models here.

class DepartmentModel(models.Model):
    id  =  models.BigAutoField(primary_key=True)
    department_name =  models.CharField(max_length=50, null=False)


    class Meta:
        db_table =  'staff"."departments'
        verbose_name = "Deparment"
        verbose_name_plural = "Deparments"

    def __str__(self):
        return self.department_name
    
    



class StaffDesignationModel(models.Model):
    id  = models.BigAutoField(primary_key=True)
    designation_name =  models.CharField(max_length=50, null=False,  blank=False)
    department_id   =  models.ForeignKey(DepartmentModel, on_delete=models.DO_NOTHING, db_column='department_id')
    
    class Meta:
        db_table =  'staff"."staff_designations'
        verbose_name = "Designation"
        verbose_name_plural = "Designations"


    def __str__(self):
        return self.designation_name
    

class StaffModel(models.Model):

    class GederTypeChocies(models.TextChoices):
        MALE = "Male", "Male"
        FEMALE = "Female", "Female"
        OTHER = "Other", "Other"
        RATHERNOTSAY = "RatherNotSay", "Rather Not Say"

    class MaritialTypeChocies(models.TextChoices):
        MARRIED = "Married", "Married"
        UMMARRIED = "Single", "Single"
        DIVORCED = "Divorced", "Divorced"
        SEPERATED = "Seperated", "Seperated"

    id  = models.BigAutoField(primary_key=True)
    staff_name = models.CharField(max_length=100, null=False, blank=False)
    staff_address  =  models.CharField(max_length=100, null=False,blank=False)
    staff_contact  =  models.CharField(max_length=15, null=False,blank=False)
    gender  =  models.CharField(null=False, blank=False, choices=GederTypeChocies.choices)
    maritial_status  =  models.CharField(null=False, blank=False, choices=MaritialTypeChocies.choices)
    joined_date  =  models.DateField(null=False, blank=False)
    branch_id  =  models.ForeignKey(BranchModel, on_delete=models.DO_NOTHING, db_column='branch_id')
    designation_id =  models.ForeignKey(StaffDesignationModel, on_delete=models.DO_NOTHING, db_column='designation_id')
    resigned_on =  models.DateField(null=True, blank=False)
    assigned_subject  =  models.ForeignKey(SubjectModel, on_delete=models.DO_NOTHING,  blank=False, null=True, name='assigned_subject')

    class Meta:
        db_table =   'staff"."staff_details'
        verbose_name = "Staff"
        verbose_name_plural = "Staffs"


    def __str__(self):
        return self.staff_name