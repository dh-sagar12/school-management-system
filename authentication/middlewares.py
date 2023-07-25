from django.contrib.auth import authenticate
from django.http import QueryDict
from core.models import BranchModel
import json


class LoggedInBranchMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        print('requesst.path', request.path)
        print('requesst.method', request.method)
        print('requesst.method', request.body)

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
                branch = BranchModel.objects.get(
                    id=branch_id)
                request.session['branch'] = branch.id

        response = self.get_response(request)
        return response
