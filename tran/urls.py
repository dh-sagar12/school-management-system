from django.urls import  path
from .views import *

urlpatterns = [
    path("due-charges/", GetDueChargeView.as_view(), name='due_charge'),
    path("admission/detail/<int:tran_id>", AdmissionTransactionDetailView.as_view(), name='admission_detail'),
    path("master/<int:id>", TransactionMasterView.as_view(), name='transaction_master'),
    path("print-receipt/<int:tran_id>", view=PrintReceiptView, name='print_receipt'),
]
