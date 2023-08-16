from rest_framework import serializers
from  .models import *


class AcademicClassSerializer(serializers.ModelSerializer):

    class Meta:
        model  =  AcademicClassModel
        fields  =  ("__all__")
        read_only_fields  =  ['id']




class AcademicSectionSerializer(serializers.ModelSerializer):
    

    class Meta:
        model =  AcademicSectionModel
        fields  = ("__all__")
        read_only_fields  =  ['id']
        


class AcademicTypeSerializer(serializers.ModelSerializer):


    class Meta :
        model  =  AcademicTypeModel
        fields  =  ("__all__")
        read_only_fields  =  ['id']
        


class FacultySerializer(serializers.ModelSerializer):
    
    class Meta:
        model =  FacultyModel
        fields =  ("__all__")
        read_only_fields =  ['id']


class SubjectSerializer(serializers.ModelSerializer):
    
    class Meta:
        model =  SubjectModel
        fields =  ("__all__")
        read_only_fields =  ['id']



class CoursesSerializer(serializers.ModelSerializer):

    class Meta:
        model  =  CoursesModel
        fields  =  ("__all__")
        read_only_fields =  ['id']


class AcademicChargesSerializer(serializers.ModelSerializer):

    class Meta:
        model =  AcademicChargesModel
        fields = "__all__"
        read_only_fields =  ['id']



class BulkAcademicChargesSerializer(serializers.Serializer):
    charges =  serializers.ListField()

    class Meta:
        fields  =  ("charges")

    
    def create(self, validated_data):
        validated_charges = validated_data.pop('charges')
        for item in validated_charges:
            serialized_charge =  AcademicChargesSerializer(data=item)
            serialized_charge.is_valid(raise_exception=True)
            serialized_charge.save()
        
        return serialized_charge.data


