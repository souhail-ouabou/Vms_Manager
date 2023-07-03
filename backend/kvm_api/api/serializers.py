from rest_framework import serializers

from pathlib import Path
import getpass

import os



def validate_iso_path(path):
    if not Path(path).suffix == '.iso':
        raise serializers.ValidationError("Provided file is not an iso.")


VIR_DOMAIN_NOSTATE = 0
VIR_DOMAIN_RUNNING = 1
VIR_DOMAIN_BLOCKED = 2
VIR_DOMAIN_PAUSED = 3
VIR_DOMAIN_SHUTDOWN = 4
VIR_DOMAIN_SHUTOFF = 5
VIR_DOMAIN_CRASHED = 6
VIR_DOMAIN_PMSUSPENDED = 7
VIR_DOMAIN_LAST = 8


CHOICES = (
    (VIR_DOMAIN_NOSTATE, 'No state'),
    (VIR_DOMAIN_RUNNING, 'The domain is running'),
    (VIR_DOMAIN_BLOCKED, 'The domain is blocked on resource'),
    (VIR_DOMAIN_PAUSED, 'The domain is paused by user'),
    (VIR_DOMAIN_SHUTDOWN, 'The domain is being shut down'),
    (VIR_DOMAIN_SHUTOFF, 'The domain is shut off'),
    (VIR_DOMAIN_CRASHED, 'The domain is crashed'),
    (VIR_DOMAIN_PMSUSPENDED, 'The domain is suspended by guest power management'),
    (VIR_DOMAIN_LAST, 'NB: this enum value will increase over time as new states are added to the libvirt API. It reflects the last state supported by this version of the libvirt API.'),
)

class StatusChoiceField(serializers.ChoiceField):
    def to_representation(self, value):
        """
        Serialize the value's class name.
        """        
        return {
            "id": value,
            "state": CHOICES[value][1]
        }




class VmReadSerializer(serializers.Serializer):
    uuid = serializers.UUIDField()
    name = serializers.CharField(max_length=100)
    ram = serializers.IntegerField(min_value=1)
    cpu = serializers.IntegerField(min_value=1)
    state = StatusChoiceField(choices=CHOICES)



class VmCreateSerializer(serializers.Serializer):
    

    name = serializers.CharField(max_length=100)
    ram = serializers.IntegerField(min_value=1, max_value=4)
    cpu = serializers.IntegerField(min_value=1, max_value=4)
    storage = serializers.FloatField(min_value=10, max_value=20)
    iso_path = serializers.CharField(validators=[validate_iso_path])
    
    
    def save(self, **kwargs):
        libvirt_client = kwargs.get("libvirt_client", None)
        name = self.validated_data["name"]
        ram = self.validated_data["ram"]
        storage = self.validated_data["storage"]
        cpu = self.validated_data["cpu"]
        iso_path = self.validated_data["iso_path"]
        
        create_new_img_cmd = f"qemu-img create -f qcow2 /home/{getpass.getuser()}/Desktop/{name}.qcow2 {storage}G "
        os.system(create_new_img_cmd)

        
        
        
        xml_config = f'''
            <domain type="kvm">
                <name>{name}</name>
                <memory unit="GB">{ram}</memory>
                <vcpu placement="static">{cpu}</vcpu>
                
                <os>
                        <type arch='x86_64' machine='pc-i440fx-2.9'>hvm</type>
                </os>
                
                
                <features>
                        <acpi/>
                </features>
                <devices>
                
                
                     <disk type='file' device='disk' >
                            <driver name='qemu' type='qcow2'/>
                            <source file='{f"/home/{getpass.getuser()}/Desktop/{name}.qcow2"}'/>
                            <target dev='vda' bus='virtio'/>
                            <address type='pci' domain='0x0000' bus='0x00' slot='0x04' function='0x0'/>
                            <boot order="1"/>
                    </disk>
                    <disk type='file' device='cdrom'>
                            <driver name='qemu' type='raw'/>
                            <source file='{iso_path}'/>
                            <target dev='sda' bus='sata'/>
                            <readonly/>
                            <address type='drive' controller='0' bus='0' target='0' unit='0'/>
                            <boot order="2"/>
                    </disk>
                    
         

                    
                   
                    <interface type='network'>
                            <mac address='52:54:00:4e:6f:78'/>
                            <source network='default'/>
                            <model type='virtio'/>
                    </interface>
                    
                    <graphics type="spice" autoport="yes">
                        <listen type="address"/>
                        <image compression="off"/>
                    </graphics>
                    
                    
                    
                    

                    <!-- Qemu guest agent -->

                    <channel type="unix">
                        <target type="virtio" name="org.qemu.guest_agent.0"/>
                        <address type="virtio-serial" controller="0" bus="0" port="1"/>
                    </channel>
                
                </devices>
                
                
                <!-- Other XML elements and structure -->
            </domain>
        '''
       

        if libvirt_client:
            return libvirt_client.create_vm(xml_config)
            
            
    
