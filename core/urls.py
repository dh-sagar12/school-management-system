from django.urls import  path
from .views import BrachDropDownView, BranchesView, MenusView

urlpatterns = [
    path("branch/", BranchesView.as_view(), name='branches'),
    path("branch-dropdown/", BrachDropDownView.as_view(), name='branche_dropdown'),
    path("menus/", MenusView.as_view(), name='menus'),
]
