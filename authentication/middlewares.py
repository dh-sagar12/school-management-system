from django.contrib.auth import authenticate
from django.http import QueryDict
from core.models import BranchModel, DayOperationsModel
import json


class LoggedInBranchMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        if request.method == 'POST' and request.path == '/api/auth/login/':
            try:
                data = json.loads(request.body)
                email = data.get('email')
                password = data.get('password')
                branch_id = data.get('branch_id')

            except json.JSONDecodeError as e:
                data = QueryDict(request.body)
                email = data.get('email')
                password = data.get('password')
                branch_id = data.get('branch_id')

            user = authenticate(email=email, password=password)
            if user and branch_id is not None:
                today_np =  DayOperationsModel.get_today_np(self=DayOperationsModel)
                today_ad  = str(DayOperationsModel.get_today_date(self =  DayOperationsModel))
                request.session['branch'] = branch_id
                request.session['today_np'] =  today_np
                request.session['today_ad'] =  today_ad

        response = self.get_response(request)
        return response
