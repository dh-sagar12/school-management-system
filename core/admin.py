from django import forms
from django.contrib import admin
from .models import *
# Register your models here.

# we shall have custom modelForm for MenuModel which have limited parent_id options 


class MenuModelForm(forms.ModelForm):
    class Meta:
        model = MenuModel
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Limit choices for parent_id to those with menu_type 'H'
        self.fields['parent_id'].queryset = MenuModel.objects.filter(menu_type='H')

class MenuModelAdmin(admin.ModelAdmin):
    form = MenuModelForm

admin.site.register(MenuModel, MenuModelAdmin)
admin.site.register(BranchModel)
admin.site.register(ProvincesModel)
admin.site.register(DistrictModel)
admin.site.register(AcademicYearModel)