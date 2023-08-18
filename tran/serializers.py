from rest_framework import serializers


class GetDueChargeSerializer(serializers.Serializer):
    id =  serializers.IntegerField(required =  False)
    student_id =  serializers.IntegerField()
    charge_name =  serializers.CharField(max_length =  200)
    charge_amount  =  serializers.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        fields = '__all__'
        read_only_fields = ['id']
    

    

