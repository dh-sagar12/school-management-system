from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from core.models import AttachmentModel, BranchModel, DistrictModel, LocalBodiesModel, MenuModel, ProvincesModel


class BranchSerializer(ModelSerializer):

    class Meta:
        model = BranchModel
        fields = ("__all__")


class BranchDropDownSerilizer(ModelSerializer):

    class Meta:
        model = BranchModel
        fields = ('id', 'org_code', 'nick_name')
        extra_kwargs = {
            'id': {'read_only': True},
            'org_code': {'read_only': True},
            'nick_name': {'read_only': True}
        }


class MenuSerializer(ModelSerializer):

    class Meta:
        model = MenuModel
        fields = ("id", "menu_code", "menu_name",
                  "menu_type", "parent_id", "created_on")
        extra_kwargs = {
            'id': {'read_only': True},
            'created_on': {'read_only': True}
        }


class ProvinceSerializer(ModelSerializer):

    class Meta:
        model = ProvincesModel
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True}
        }

class DistrictSerializer(ModelSerializer):

    class Meta:
        model = DistrictModel
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True}
        }


class LocalBodiesSerializer(ModelSerializer):

    class Meta:
        model = LocalBodiesModel
        fields = '__all__'



class AttachmentSerializer(ModelSerializer):

    class Meta:
        model  = AttachmentModel
        fields = '__all__'
    

class TempAttachmentSerializer(serializers.Serializer):
    original_file_name  =  serializers.CharField()
    file_name =  serializers.CharField()

    class Meta:
        fields  =  ("original_file_name", 'file_name')
