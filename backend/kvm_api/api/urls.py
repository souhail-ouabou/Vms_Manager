from django.contrib import admin
from django.urls import include, path
from .views import vm_control_api_view, vm_create_list_api_view

urlpatterns = [
        path('vms/', vm_create_list_api_view, name='vm-list-create'),
        path('vms/<str:vm_name>/<str:action>/', vm_control_api_view, name='vm-control'),
        

]
