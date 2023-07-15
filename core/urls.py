from django.urls import  path
from .views import BranchesView, MenusView

urlpatterns = [
    path("branch/", BranchesView.as_view(), name='branches'),
    path("menus/", MenusView.as_view(), name='menus'),
]
