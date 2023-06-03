from rest_framework import views, status
from rest_framework.response import Response

from libvirt import libvirtError

from .utils import  LibvirtClient
from .serializers import VmReadSerializer




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




class VirtualMachineCreateListAPIView(views.APIView, LibvirtClient):
    def get(self, request):
        domains = self.libvirt_client.get_vms()
        serializer = VmReadSerializer(domains, many=True)
        return Response(
           serializer.data
        )
        
    def post(self, request):
        pass
    
vm_create_list_api_view = VirtualMachineCreateListAPIView.as_view()