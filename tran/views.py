from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView

from student.serializer import StudentAdmissionViewSerializer
from .serializers import *
from student.models import StudentAdmissionViewModel
from rest_framework.response import Response
from rest_framework import status
from academic.models import AcademicChargesModel
from core.models import AcademicYearModel
from django.db.models import Sum
from .models import *
from django.db.models import Sum
from .utils.renderers import pdf_renderer
# Create your views here.


class GetDueChargeView(APIView):

    def post(self, request):
        student_id = request.data.get('student_id')
        class_id = request.data.get('class_id')
        due_charges = []

        try:
            academic_year_instance = AcademicYearModel.objects.get(
                is_active=True)

            received_charges = AdmissionTransactionModel.objects.select_related('tran_id').filter(tran_id__verification_id__gt=0, student_id=student_id, tran_id__tran_date__range=(
                academic_year_instance.starts_on, academic_year_instance.ends_on)).values('student_id', 'charge_id').annotate(total_amount=Sum('amount'))

            receivable_charges = AcademicChargesModel.objects.filter(
                class_id=class_id, is_active=True).values('id', 'charge_amount', 'charge_name', 'course_id', 'academic_session_type')

        except Exception as e:
            return Response({'error': f'{e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        for group in receivable_charges:

            for item in received_charges:

                if group['id'] == item['charge_id']:
                    group['charge_amount'] = group['charge_amount'] - \
                        item['total_amount']

            due_charges.append({
                'charge_id': group['id'],
                'charge_name': group['charge_name'],
                'due_charge': group['charge_amount'],
                'course_id': group['course_id'],
                'academic_session_type': group['academic_session_type']
            })

        return Response(due_charges, status=status.HTTP_200_OK)


class AdmissionTransactionDetailView(APIView):

    def get(self, request, tran_id):
        try:
            student_admission_view_instance = StudentAdmissionViewModel.objects.get(
                tran_id=tran_id)
            transaction_details = AdmissionTransactionModel.objects.filter(
                tran_id=tran_id)
        except Exception as e:
            return Response(f'{e}', status=status.HTTP_404_NOT_FOUND)

        student_admission_view_serializer = StudentAdmissionViewSerializer(
            student_admission_view_instance)
        transaction_detail_serializer = AdmissionTransactionSerializer(
            transaction_details, many=True)
        return Response({
            "class_data": student_admission_view_serializer.data,
            "transaction_detail": transaction_detail_serializer.data
        }, status=status.HTTP_200_OK)


class TransactionMasterView(APIView):

    def patch(self, request, id):
        try:
            transaction_master_instance = TransactionMasterModel.objects.get(
                id=id)
        except Exception as e:
            return Response(f'{e}', status=status.HTTP_404_NOT_FOUND)

        serializer = TransactionMasterSerializer(
            transaction_master_instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Success'}, status=status.HTTP_200_OK)




def PrintReceiptView(request, tran_id):

    transaction =  get_object_or_404(TransactionMasterModel, id=tran_id)
        
    return render(request, 'print-receipt.html')