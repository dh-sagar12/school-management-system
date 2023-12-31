from rest_framework import serializers
from  .models import *
from tran.models import TempTranCode, TransactionMasterModel
from tran.serializers import AdmissionTransactionSerializer
from django.db.models import Max



class StudentSerializer(serializers.ModelSerializer):
    is_admitted =  serializers.BooleanField(required=False, default=False)
    class Meta:
        model =  StudentModel
        fields  =  ('__all__')
        read_only_fields  =  ['id', 'is_admitted']



class StudentContactSerializer(serializers.ModelSerializer):
    
    class Meta:
        model =  StudentContactModel
        fields  =  '__all__'
        read_only_fields  =  ['id']
        



class StudentAddressSerializer(serializers.ModelSerializer):
    
    class Meta:
        model =  StudentAddressModel
        fields  = ( '__all__')
        read_only_fields  =  ['id']
        

class StudentClassSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudentClassModel
        fields  =  ('id', 'student_id', 'academic_year_id', 'admission_date', 'class_id', 'course_id', 'has_passed', 'passed_year', 'passed_grade', 'created_by', 'created_on', 'academic_session_type', 'tran_id')
        extra_kwargs = {
            'id': {'read_only': True}, 
            'created_on': {'read_only': True},
            'academic_year_id': {'read_only': True},
            'tran_id': {'read_only': True},
        }
        
class StudentAdmissionViewSerializer(serializers.ModelSerializer):
    """ 
        Contact with StudentAdmissionViewModel to retrive data from view in the postgres database
    """

    class Meta:
        model =  StudentAdmissionViewModel
        fields = '__all__'




class RegisterNewStudentSerializer(serializers.Serializer):
    """
        Serializer for registering a new student.

        Fields:
        - student (DictField): Data for the student.
        - student_contact (ListField): List of contact information for the student.
        - student_addresses (ListField): List of addresses for the student.
        - student_class (DictField): Data for the student's class.

        Methods:
        - create(validated_data): Create a new student with associated contact, address, and class information.
        - get_new_student_id(self): Generate New student Id for  every student created
    """

    student  =  serializers.DictField()
    student_contact =  serializers.ListField()
    student_addresses =  serializers.ListField()
    # student_class =  serializers.DictField()  

    class Meta:
        fields  =  ("student", 'student_contact', 'student_addresses')

    def get_new_student_id(self):
        max_student_id  =  StudentModel.objects.aggregate(Max('student_id'))['student_id__max']
        return max_student_id + 1


    def create(self, validated_data):
        student_data  =  validated_data.pop('student') 
        student_contact  =  validated_data.pop('student_contact')  
        student_addresses  =  validated_data.pop('student_addresses')  
        # student_class  =  validated_data.pop('student_class') 

        if student_data.get('id') is not None and student_data.get('id') > 0:
            

            # updateing student model with new data if data contains id 

            student_instance  =  StudentModel.objects.get(id= student_data.get('id') )
            student_data_serializer = StudentSerializer(student_instance, data= student_data, partial= True)
            student_data_serializer.is_valid(raise_exception=True)
            student_data_serializer.save()

            # # updating class model with new data if data contains id 

            # student_class_instance  =  StudentClassModel.objects.get(id = student_class.get('id') )
            # student_class_serializer =  StudentClassSerializer(student_class_instance, data=student_class, partial= True)
            # student_class_serializer.is_valid(raise_exception=True)
            # student_class_serializer.save()

            # Create new address if not have id and if id then update accordingly 
            return_address_data = []
            for address in student_addresses:
                if address.get('id') is not None and address.get('id') > 0:
                    student_address_instance  =  StudentAddressModel.objects.get(id= address.get('id'))
                    student_address_serializer =  StudentAddressSerializer(student_address_instance, data=address, partial= True)
                    student_address_serializer.is_valid(raise_exception=True)
                    student_address_serializer.save()
                    return_address_data.append(student_address_serializer.data)

                
                else:
                    address['student_id'] =  student_instance.id
                    serialized_student_address  =  StudentAddressSerializer(data=address)
                    serialized_student_address.is_valid(raise_exception=True)
                    serialized_student_address.save()
                    return_address_data.append(serialized_student_address.data)



            # Create new contact data for contact model if id not exists else update accordingly 

            return_contact_data = []
            for contact in student_contact:
                if contact.get('id') is not None and contact.get('id') > 0:
                    student_contact_instance  =  StudentContactModel.objects.get(id= contact.get('id'))
                    student_contact_serializer =  StudentContactSerializer(student_contact_instance, data=contact, partial= True)
                    student_contact_serializer.is_valid(raise_exception=True)
                    student_contact_serializer.save()
                    return_contact_data.append(student_contact_serializer.data)

                
                else:
                    contact['student_id'] =  student_instance.id
                    serialized_student_contact  =  StudentContactSerializer(data=contact)
                    serialized_student_contact.is_valid(raise_exception=True)
                    serialized_student_contact.save()
                    return_contact_data.append(serialized_student_contact.data)

            return {
                    'student': student_data_serializer.data, 
                    'student_contact':return_contact_data, 
                    'student_addresses': return_address_data
                    # 'student_class': student_class_serializer.data
                }



        else:
        # for student instance 
            student_data['created_by'] =  self.context['request'].user.id
            student_data['student_id'] =  self.get_new_student_id()
            serialized_student =   StudentSerializer(data= student_data)
            serialized_student.is_valid(raise_exception=True)
            serialized_student.save()

            #for student classes 
            # student_class['created_by'] =  self.context['request'].user.id
            # student_class['student_id'] =  serialized_student.data['id']
            # serialized_student_class  =  StudentClassSerializer(data= student_class)
            # serialized_student_class.is_valid(raise_exception=True)
            # serialized_student_class.save()
            

            # for student address
            return_address_data = []
            for address in student_addresses:
                address['student_id'] =  serialized_student.data['id']
                serialized_student_address  =  StudentAddressSerializer(data=address)
                serialized_student_address.is_valid(raise_exception=True)
                serialized_student_address.save()
                return_address_data.append(serialized_student_address.data)


            # for student contact
            return_contact_data = []
            for contact in student_contact:
                contact['student_id'] =  serialized_student.data['id']
                serialized_student_contact  =  StudentContactSerializer(data=contact)
                serialized_student_contact.is_valid(raise_exception=True)
                serialized_student_contact.save()
                return_contact_data.append(serialized_student_contact.data)

            
            return {
                    'student': serialized_student.data, 
                    'student_contact':return_contact_data, 
                    'student_addresses': return_address_data 
                    # 'student_class': serialized_student_class.data
                }
        


class AdmitStudentSerializer(serializers.Serializer):
    class_detail =  StudentClassSerializer()
    charges  =  serializers.ListField()
    class Meta:
        model =  StudentClassModel
        fields  =  ("class_detail", 'charges')
    

    def create(self, validated_data):
        class_detail =  dict(validated_data.pop('class_detail'))
        charges =  validated_data.pop('charges')

        # First of all creating transaction master as 
        temp_tran_code =  TempTranCode
        tran_code =  temp_tran_code.get_new_tran_code(self, book_name='TRAN')
        tran_date = self.context['request'].session['today_ad']
        created_by =  self.context['request'].user
        
        transaction_master =  TransactionMasterModel(tran_code =  tran_code, tran_date  =  tran_date, created_by  =created_by, verification_id = 0 )
        transaction_master.save()



        # inserted into student class details
        academic_year  = AcademicYearModel.objects.get(is_active =  True)
        class_detail['tran_id'] = transaction_master
        class_detail['academic_year_id'] = academic_year
        serialized_class_detail =   StudentClassSerializer.create(self, validated_data=dict(class_detail))
        serialized_class_detail.save()

        # making charges transction 


        # now adding in admission transaction details 
        if len(charges) >  0 :
            for item in charges:
                item['tran_id'] =  transaction_master.id
                charges_serializer =  AdmissionTransactionSerializer(data=item)
                charges_serializer.is_valid(raise_exception=True)
                charges_serializer.save()
        return {
            "class_detail": serialized_class_detail, 
            "charges": []
        }
        


        



        


        

        


        

