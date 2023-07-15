from .models import *
from rest_framework.serializers import ModelSerializer



class StaffDetailsSerializer(ModelSerializer):

    class Meta:
        model   =  StaffModel
        fields =  "__all__"
        read_only_fields =  ['id']


