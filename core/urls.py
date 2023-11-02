from django.urls import  path
from .views import BrachDropDownView, BranchesView, MenusView, DistrictView, ProvinceView, LocalBodiesView, TempAttachmentView, AttachmentView

urlpatterns = [
    path("branch/", BranchesView.as_view(), name='branches'),
    path("branch-dropdown/", BrachDropDownView.as_view(), name='branch_dropdown'),
    path("provinces/", ProvinceView.as_view(), name='provinces'),
    path("menus/", MenusView.as_view(), name='menus'),
    path("districts/", DistrictView.as_view(), name='districts'),
    path("localbodies/", LocalBodiesView.as_view(), name='localbodies'),
    path("upload/", AttachmentView.as_view(), name='upload'),
    path("upload/temp/", TempAttachmentView.as_view(), name='tempupload'),
    path("attachment/<int:table_id>/", AttachmentView.as_view(), name='getAttachment'),
    path("attachment/delete/<int:attachment_id>/", AttachmentView.as_view(), name='deleteAttachment'),
]
