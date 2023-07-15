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
