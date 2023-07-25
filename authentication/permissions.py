from datetime import date
import time
from rest_framework.permissions import BasePermission
from rest_framework.exceptions import PermissionDenied
from authentication.models import User, BranchLoginPolicyModel

class CheckBranchPermission(BasePermission):

    def  has_permission(self, request, view):

        message = 'Adding customers not allowed.'
        requested_branch =  request.data.get('branch_id')
        requested_email   =  request.data.get('email')

        try:
            requested_user =  User.objects.get(email=requested_email)
        except Exception as e:
            return e

        if requested_branch is not None and requested_user is not None :
            policy_available   =  BranchLoginPolicyModel.objects.filter(user_id  = requested_user, branch_id  =  requested_branch,  date_access_from__lte= date.today(),  date_access_to__gt = date.today(), time_access_from__lte = time.strftime("%H:%M:%S", time.localtime() ), time_access_to__gt = time.strftime("%H:%M:%S", time.localtime())  ).exists()
            if policy_available:

                return True

            raise  PermissionDenied("Branch Login Policy Doesn't Exists")

