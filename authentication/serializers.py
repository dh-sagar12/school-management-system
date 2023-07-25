from gettext import translation
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import User
from django.db.transaction import atomic
from rest_framework.validators import ValidationError


class UserLoginSerializer(ModelSerializer):
    email  =  serializers.EmailField()
    password  =  serializers.CharField()
    branch_id  =  serializers.IntegerField(required= True)
    class Meta:
        model = User
        fields = ['email', 'password', 'branch_id']
        extra_kwargs = {
            'password': {'write_only': True}, 
            'email': {'write_only': True}, 
            'branch_id': {'write_only': True}
        }


class UserSerializer(ModelSerializer):
    confirm_password =  serializers.CharField(write_only = True)
    class Meta:
        model  = User
        fields =  ['id', 'email', 'username', 'branch_id',  'first_name',  'confirm_password',  'password', 'middle_name', 'last_name', 'date_of_birth', 'gender']
        extra_kwargs = {
            'password': {'write_only': True} ,            
            'username': {'read_only': True} ,            
        }


    @atomic
    def create(self, validated_data):
            password  =   validated_data.pop('password', None)
            confirm_password  =   validated_data.pop('confirm_password', None)

            if password  ==  confirm_password: 
                instance =  self.Meta.model(**validated_data)
                if password is not None:
                    instance.set_password(password)
                else: 
                    raise ValidationError({'error': 'Null Password'}, code='error')
                instance.save()
                return instance
            else:
                raise ValidationError({'error': 'Password And Confirm Password Should Be Same'})
                

