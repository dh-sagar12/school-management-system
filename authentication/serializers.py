from gettext import translation
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from core.models import BranchModel, MenuModel
from .models import BranchLoginPolicyModel, MenuPermissionModel, User
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
                

class MenuPolicyModelSerializer(ModelSerializer):

    class Meta:
        model =  MenuPermissionModel
        fields  =  "__all__"


class MenuPolicySerializer(serializers.Serializer):
    branch_id  = serializers.IntegerField()
    user_id = serializers.IntegerField()
    menus  =  serializers.ListField()
    
    def create(self, validated_data):
        user_id  =  validated_data.get('user_id')
        user_instance  =  User.objects.get(id  =  user_id)
        branch_id  =  validated_data.get('branch_id')
        branch_instance  =  BranchModel.objects.get(id =  branch_id)
        existing_policies  =  MenuPermissionModel.objects.filter(user_id = user_id, branch_id  = branch_id)
        if existing_policies.exists():
            existing_policies.delete()

        menu_policies_data = [MenuPermissionModel(user_id =  user_instance, branch_id =  branch_instance, menu_id  = MenuModel.objects.get(id  =  item) , created_by  =  self.context, can_edit =  True) for item in validated_data.get('menus')]
        MenuPermissionModel.objects.bulk_create(menu_policies_data)

        current_menu_policies  =  MenuPermissionModel.objects.filter(user_id = user_id, branch_id  = branch_id)
        serializer  =  MenuPolicyModelSerializer(current_menu_policies, many= True)

        data = {
            'user_id': user_id,
            'branch_id': branch_id,
            'menus': serializer.data,
        }

        return data



class BranchLoginPolicySerializer(serializers.ModelSerializer):
    
    class Meta:
        model  =  BranchLoginPolicyModel
        fields  =  '__all__'
        read_only_fields  =  ['id', 'created_by']
        depth =  0

    def to_representation(self, instance):
        if self.context.method  =='GET':
            self.Meta.depth  = 1
        return super().to_representation(instance)
    

    def validate(self, attrs):
        date_access_from =  attrs.get('date_access_from')
        date_access_to =  attrs.get('date_access_to')
        time_access_from =  attrs.get('time_access_from')
        time_access_to =  attrs.get('time_access_to')
        if date_access_to <  date_access_from :
            raise ValidationError({'detail': 'Date Access To Must be Grater Than Date Access From'} )
        
        if time_access_to < time_access_from:
            raise ValidationError({'detail': 'Time Access To Must be Grater Than Time Access From'} )

        return super().validate(attrs)
    
    def create(self, validated_data):
        validated_data['created_by'] =  self.context.user
        return super().create(validated_data)