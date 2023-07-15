from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from core.models import BranchModel, MenuModel




class BranchSerializer(ModelSerializer):

    class Meta:
        model =  BranchModel
        fields  = ( "__all__")
        



class MenuSerializer(ModelSerializer):

    class Meta:
        model = MenuModel
        fields  =  ("id", "menu_code", "menu_name", "menu_type", "parent_id", "created_on")
        extra_kwargs = {
            'id': {'read_only': True}, 
            'created_on': {'read_only': True}
        }