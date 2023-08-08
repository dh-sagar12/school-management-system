from django.db import models
from authentication.models import User
from rest_framework.exceptions import ValidationError
from rest_framework import status
from django.db.models import Max
from django.db import connection

# Create your models here.



class BranchModel(models.Model):
    id =   models.BigAutoField(primary_key=True)
    org_code =  models.CharField(max_length=5,  null=False, blank= False)
    org_name =  models.CharField(max_length=250, null=False, blank=False, db_column='org_name', db_index=True)
    nick_name =  models.CharField(max_length=20, null=False, blank=False, db_column='nick_name', db_index=True)
    registration_date =  models.DateField(null=True, blank=True, db_column='registration_date')
    registration_number =  models.CharField(null=True, blank=True, db_column='registration_number')
    pan_number =  models.CharField(null=True, blank=True, db_column='pan_number')
    country =  models.CharField(null=True, blank=True, db_column='country')
    province =  models.CharField(null=True, blank=True, db_column='province')
    district =  models.CharField(null=True, blank=True, db_column='district')
    street  =  models.CharField(null=True, blank=True, db_column='street')
    contact_number  =  models.CharField(null=True, blank=True, db_column='contact_number')
    web_address  =  models.CharField(null=True, blank=True, db_column='web_address')
    fax  =  models.CharField(null=True, blank=True, db_column='fax')
    is_primary_office  =  models.BooleanField(null=False, blank=False, db_column='is_primary_office')
    creator  =  models.ForeignKey(User, on_delete=models.DO_NOTHING, db_column='creator')
    created_on  =  models.DateTimeField(auto_now_add=True)


    class Meta:
        db_table  =  'core"."branches'


    def save(self, *args, **kwargs):
        
        if self.is_primary_office:
            already_exists  =  BranchModel.objects.filter(is_primary_office  =  True).exists()
            
            if already_exists:
                raise ValidationError({'error': 'Duplicate Head Office Not Allowed', 'status': status.HTTP_403_FORBIDDEN }) 
            
        super().save(*args, **kwargs)
 

    def __str__(self) -> str:
        return self.nick_name



class MenuModel(models.Model):
    id =  models.BigAutoField(primary_key=True)
    menu_code =  models.CharField(max_length=6, null=False, blank=False)
    menu_name  = models.CharField(max_length=20, null=False, blank=False)
    url   = models.CharField(max_length=100, null=False, blank=False)
    MAIN_MENU  =  'H'
    SUB_MENU = 'M'
    REPORT_MENU  =  'R'
    MENU_TYPE_CHOICES = [(MAIN_MENU, 'Main'), (SUB_MENU, 'Sub Menu'), (REPORT_MENU, 'Report')]
    menu_type =  models.CharField(choices=MENU_TYPE_CHOICES, null=False, blank=False)
    parent_id  =  models.ForeignKey("self", on_delete=models.DO_NOTHING, db_column='parent_id',  null=True)
    created_on  =  models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.menu_name


    class Meta:
        db_table =  'core"."menus'




class ProvincesModel(models.Model):
    id =  models.BigAutoField(primary_key=True)
    province_name   =  models.CharField(null=False, blank=False)
    province_name_np   =  models.CharField(null=False, blank=False)
    


    class Meta:
        db_table =  'core"."provinces'

    def __str__(self):
        return self.province_name


class DistrictModel(models.Model):
    id =  models.BigAutoField(primary_key=True)
    district_name   =  models.CharField(null=False, blank=False)
    district_name_np   =  models.CharField(null=False, blank=False)
    province_id   =  models.ForeignKey(ProvincesModel, null=False, blank=False, on_delete=models.DO_NOTHING, db_column='province_id' )

    


    class Meta:
        db_table =  'core"."districts'

    def __str__(self):
        return self.district_name
    




class LocalBodiesModel(models.Model):

    class LocalBodiesChoices(models.TextChoices):
        MUNICIPALITY = "Municipality", "Municipality"
        RURAL = "Rural Municipality", "Rural Municipality"
        METRO = "Metropolitian City", "Metropolitian City"
        SUBMETRO = "Sub-Metropolitian City", "Sub-Metropolitian City"

    id =  models.BigAutoField(primary_key=True)
    district_id   =  models.ForeignKey(DistrictModel, null=False, blank=False, on_delete=models.DO_NOTHING, db_column='district_id' )
    local_body_name   =  models.CharField(null=False, blank=False)
    local_body_name_np   =  models.CharField(null=False, blank=False)
    local_body_type   =  models.CharField(null=False, blank=False, choices=LocalBodiesChoices.choices)

    


    class Meta:
        db_table =  'core"."local_bodies'

    def __str__(self):
        return self.local_body_name
    

class AcademicYearModel(models.Model):
    id  =  models.BigAutoField(primary_key=True)
    ac_year_code =  models.CharField(max_length=20, blank=False, null=False)
    ac_year_name =  models.CharField(max_length=20,  null=False,blank=False)
    starts_on  =  models.DateField(null=False, blank=False)
    ends_on  =  models.DateField(null=False, blank=False)
    is_active  =  models.BooleanField(null=False, default=True, blank=False)
    created_by =  models.ForeignKey(User, on_delete=models.DO_NOTHING, db_column='created_by')

    
    class Meta:
      db_table =  'core"."academic_year'  

    def __str__(self):
        return self.ac_year_name




class NepaliDateModel(models.Model):
    year_id  =  models.IntegerField(null=False, blank=False, db_column='year_id')
    month_id  =  models.IntegerField(null=False, blank=False, db_column='month_id')
    day_id  =  models.IntegerField(null=False, blank=False, db_column='day_id')
    start_date  =  models.DateField(null=False, blank=False, db_column='start_date')
    end_date  =  models.DateField(null=False, blank=False, db_column='end_date')


    class Meta:
        verbose_name = "Nepali Date"
        verbose_name_plural = "Nepali Dates"   
        db_table =   'core"."nepali_dates'  


    def convert_ad_to_np(self, ad_date):
        with connection.cursor() as cursor:
            cursor.callproc('core.date_np', [ad_date])
            result = cursor.fetchone()[0]
        return result
    
    def convert_np_to_ad(self, np_date):
        with connection.cursor() as cursor:
            cursor.callproc('core.date_ad', [np_date])
            result = cursor.fetchone()[0]
        return result


    def __str__(self):
        return f"{self.year_id}"



    

class DayOperationsModel(models.Model):
    id = models.BigAutoField(primary_key=True)
    value_date =  models.DateField(null=False,blank=False)
    is_completed =  models.BooleanField(null=False, default=False)
    eod_by  = models.ForeignKey(User, on_delete=models.DO_NOTHING,  null=True, blank=False, db_column='eod_by')
    eod_on =  models.DateTimeField(auto_now=False, auto_now_add=False, null=True)



    class Meta:
        verbose_name = "Day Operation"
        verbose_name_plural = "Day Operations"   
        db_table =   'core"."day_operation'  

    def __str__(self):
        return f"{self.value_date}"


    def get_today_date(self):
        today_date  =  DayOperationsModel.objects.get(is_completed =  False).value_date
        return today_date

    def get_today_np(self):
        today_ad  =  self.get_today_date(self)
        with connection.cursor() as cursor:
            cursor.callproc('core.date_np', [today_ad])
            result = cursor.fetchone()[0]
        return result
    



class AttachmentModel(models.Model):
    id  =models.BigAutoField(primary_key=True)
    table_name =  models.CharField(max_length=50, null=False,blank=False)
    table_id  =  models.BigIntegerField(null=False, blank=False)
    attachment_type =  models.CharField(max_length=10, null=False, blank=False)
    original_file_name =  models.CharField(max_length=100, blank=False, null=False)
    file_name  =  models.CharField(max_length=500, null=False, blank=False)
    is_active = models.BooleanField(default=True, null=False)
    created_on  = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Attachment"
        verbose_name_plural = "Attachments"   
        db_table =   'core"."attachments'  

    def __str__(self):
        return f"{self.table_name}-{self.table_id}"

