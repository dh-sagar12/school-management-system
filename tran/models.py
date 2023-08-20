from django.db import models
from authentication.models import User
from academic.models import AcademicChargesModel
from student.models import StudentModel
from django.utils.timezone import now
# Create your models here.

class TransactionMasterModel(models.Model):
    class VerificationStatusChoices(models.IntegerChoices):
        VERIFIED = 1, "Verified"
        REJECTED = -1, "Rejected"
        UNVERIFIED = 0, "Unverified"
        AUTOVERIFIED  =  2, "AutoVerified"

    id = models.BigAutoField(primary_key=True)
    tran_date  = models.DateField(null=False, blank=False, auto_now=False, auto_now_add=False)
    tran_code = models.CharField(max_length=15, blank=False, null=False)
    verification_id  = models.IntegerField(choices=VerificationStatusChoices.choices, null=False, blank=False)
    created_by =  models.ForeignKey(User, on_delete=models.DO_NOTHING, null=False, blank=False, related_name='created_by', db_column='created_by')
    verified_by  = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True, blank=False, related_name='verified_by', db_column='verified_by')
    created_on = models.DateTimeField(default=now)
    verified_on =  models.DateField(auto_now_add=False, auto_now=False, null=True)


    class Meta:
        verbose_name = "Transaction Master"
        verbose_name_plural = "Transaction Masters"
        db_table = 'tran"."transaction_master'



class AdmissionTransactionModel(models.Model):

    id = models.BigAutoField(primary_key=True)
    tran_date = models.DateField(null=False, blank=False, auto_now=False, auto_now_add=False)
    tran_id =  models.ForeignKey(TransactionMasterModel, on_delete=models.DO_NOTHING, null=False, blank=False, db_column='tran_id')
    student_id =  models.ForeignKey(StudentModel, on_delete=models.DO_NOTHING, null=False, blank=False, db_column='student_id')
    charge_id =  models.ForeignKey(AcademicChargesModel, on_delete=models.DO_NOTHING, null=False, blank=False, db_column='charge_id')
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    discount  = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False, default=0)
    statement_reference =  models.TextField(null=False, blank=False)
    created_on =  models.DateTimeField(auto_now_add=True)

    

    class Meta:
        verbose_name = "Admission Transaction"
        verbose_name_plural = "Admission Transactions"
        db_table = 'tran"."admission_transactions'


    def __str__(self):
        return f"{self.id}"
