from django.urls import  path
from .views import BrachDropDownView, BranchesView, MenusView, DistrictView, ProvinceView, LocalBodiesView

urlpatterns = [
    path("branch/", BranchesView.as_view(), name='branches'),
    path("branch-dropdown/", BrachDropDownView.as_view(), name='branche_dropdown'),
    path("provinces/", ProvinceView.as_view(), name='provinces'),
    path("districts/", DistrictView.as_view(), name='districts'),
    path("localbodies/", LocalBodiesView.as_view(), name='localbodies'),
]
