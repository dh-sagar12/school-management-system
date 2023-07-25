from django.contrib import admin
from .models import BranchLoginPolicyModel, MenuPermissionModel, User

# Register your models here.


admin.site.register(User)
admin.site.register(BranchLoginPolicyModel)
admin.site.register(MenuPermissionModel)