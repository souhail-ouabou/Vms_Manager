from rest_framework import views, status, generics
from rest_framework.response import Response
from rest_framework.exceptions import APIException


from libvirt import libvirtError

from .utils import  LibvirtClient
from .serializers import VmReadSerializer, VmCreateSerializer





class VirtualMachineControlAPIView(views.APIView, LibvirtClient):

    def post(self, request, vm_name, action):
        try:
            if action == 'resume':
                self.libvirt_client.resume_vm(vm_name)
                
            elif action == 'stop':
                self.libvirt_client.stop_vm(vm_name)
                
            elif action == 'delete':
                self.libvirt_client.delete_vm(vm_name)
                
            elif action == 'start':
                self.libvirt_client.start_vm(vm_name)
                
            elif action == 'shutdown':
                self.libvirt_client.shutdown_vm(vm_name)
            else:
                return Response({'message': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)
        
        except libvirtError as e:    
            return Response({'message': e.get_error_message()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        except:
            return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response({'message': f'{action} command sent for VM {vm_name}'}, status=status.HTTP_200_OK)
    


vm_control_api_view = VirtualMachineControlAPIView.as_view()




# class VirtualMachineCreateListAPIView(views.APIView, LibvirtClient):
#     def get(self, request):
#         domains = self.libvirt_client.get_vms()
#         serializer = VmReadSerializer(domains, many=True)
#         return Response(
#            serializer.data
#         )
        
#     def post(self, request):
#         pass
    
# vm_create_list_api_view = VirtualMachineCreateListAPIView.as_view()


class VirtualMachineCreateListAPIView(generics.ListCreateAPIView,LibvirtClient):
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return VmCreateSerializer
        return VmReadSerializer
    
    def get_queryset(self):
        return self.libvirt_client.get_vms()
    
    def create(self, request, *args, **kwargs):
        # Create the domain
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Get created domain detail
        created_domain = self.perform_create(serializer)
        serializer = VmReadSerializer(created_domain)
        headers = self.get_success_headers(serializer.data)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def perform_create(self, serializer):
        try:
            return serializer.save(libvirt_client=self.libvirt_client)
        except libvirtError as e:
            raise APIException(
                {'message': e.get_error_message()}
            )
vm_create_list_api_view = VirtualMachineCreateListAPIView.as_view()
