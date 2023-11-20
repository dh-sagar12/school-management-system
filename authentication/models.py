
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
import random

# from core.models import BranchModel
# Create your models here.



class CustomAccountManager(BaseUserManager):
    def create_user(self,  email, first_name,  last_name, password=None, gender=1):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        
        user = self.model(
            email=self.normalize_email(email),
            first_name= first_name,
            last_name = last_name, 
            gender  =  gender
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

        
    def create_superuser(self, email, first_name, last_name, password ):

        user=  self.create_user( email=email,first_name=first_name, last_name=last_name,  password=password)

        user.is_staff =  True
        user.is_superuser =  True
        user.is_active =  True
        user.save()
        
        if user.is_superuser is not True:
            raise ValueError('Superuser must be assigned to is_superuser True')

        
        if user.is_staff is not True:
            raise ValueError('Superuser must be assigned to is_staff True')
    
    
class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    email= models.EmailField(_("email address"), max_length=254, unique=True)
    username =  models.CharField(_("username"), max_length=20, unique=True, auto_created=True)
    branch_id =  models.ForeignKey('core.BranchModel', on_delete=models.DO_NOTHING, db_column='branch_id')
    first_name= models.CharField(max_length=100, null=False)
    middle_name = models.CharField(max_length=100, blank= True, null=True)
    last_name =  models.CharField(max_length=100, null=False)
    date_of_birth =  models.DateField(blank=True, null=True)
    password =  models.TextField()
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default= True)
    date_joined = models.DateTimeField(blank=True, default=timezone.now)
    
    GENDER_MALE = 0
    GENDER_FEMALE = 1
    GENDER_OTHER = -1
    GENDER_CHOICES = [(GENDER_MALE, 'Male'), (GENDER_FEMALE, 'Female'), (GENDER_OTHER, 'Other')]
    gender = models.IntegerField(choices=GENDER_CHOICES, null=False)
    
    
    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        db_table=  'auth"."users'

    def save(self, *args, **kwargs):  # new
        if self.username == '' or self.username is None:
            random_int  = random.randint(100, 1000)
            self.username = f"{self.first_name}{random_int}"
        return super().save(*args, **kwargs)
    
        


class BranchLoginPolicyModel(models.Model):
    id  =  models.BigAutoField(primary_key=True)
    user_id =  models.ForeignKey(User, on_delete=models.DO_NOTHING, db_column='user_id', related_name='branch_policies_user_id')
    branch_id =  models.ForeignKey('core.BranchModel', on_delete= models.DO_NOTHING, db_column='branch_id')
    date_access_from  =  models.DateField(null=False, blank=False, db_column='date_access_from')
    date_access_to  =  models.DateField(null=False, blank=False, db_column='date_access_to')
    time_access_from =  models.TimeField(null=False, blank=False, db_column='time_access_from')
    time_access_to =  models.TimeField(null=False, blank=False, db_column='time_access_to')
    created_by =  models.ForeignKey(User, on_delete=models.DO_NOTHING,  null=False, db_column='created_by', related_name='branch_policies_created_by')

    class Meta:
        db_table=  'auth"."branch_policies'
        verbose_name = "Branch Policy"
        verbose_name_plural = "Branch Policies"    


    def __str__(self):
        return f"{self.user_id} - {self.branch_id}"
    


class MenuPermissionModel(models.Model):
    id  = models.BigAutoField(primary_key=True)
    user_id  = models.ForeignKey(User, on_delete=models.DO_NOTHING, db_column='user_id', related_name='menu_policies_user_id')
    branch_id  =  models.ForeignKey('core.BranchModel', on_delete=models.DO_NOTHING, db_column='branch_id')
    menu_id  =  models.ForeignKey('core.MenuModel', on_delete=models.DO_NOTHING, related_name='menu_policies', db_column='menu_id')
    created_by =  models.ForeignKey(User, on_delete=models.DO_NOTHING, db_column='created_by', related_name='menu_policies_created_by')
    can_edit =  models.BooleanField(default=False, null=False )


    class Meta:
        db_table =  'auth"."menu_policies'
        verbose_name = "Menu Policy"
        verbose_name_plural = "Menu Policies"  

    def __str__(self):
        return f"{self.menu_id} -  {self.user_id} - {self.branch_id}"

