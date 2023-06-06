import libvirt
import untangle
from pathlib import Path
from rest_framework.serializers import ValidationError


class LibvirtWrapper:
    def __init__(self):
        self.conn = libvirt.open("qemu:///system")

    def get_domain(self, domain_name):
        domain = self.conn.lookupByName(domain_name)            
        return domain

    # Implement methods for starting, stopping, creating, etc., VMs


    def shutdown_vm(self, domain_name):
        domain = self.get_domain(domain_name)
        domain.shutdown()
        
    def stop_vm(self, domain_name):
        domain = self.get_domain(domain_name)
        domain.suspend()
        
    def delete_vm(self, domain_name):
        domain = self.get_domain(domain_name)
        
        # Check if the domain is running
        if domain.isActive():
            # If the domain is active, destroy it before deleting
            domain.destroy()

        # Undefine the domain
        domain.undefine()

        
    def resume_vm(self,domain_name):
        domain = self.get_domain(domain_name)
        domain.resume()
        
    def start_vm(self,domain_name):
        domain = self.get_domain(domain_name)
        domain.create()
        
        
    def get_vm_detail(self, uuid):
        domain = self.conn.lookupByUUID(uuid)
        parsed_xml = untangle.parse(domain.XMLDesc())
        # id = int(parsed_xml.domain["id"])
        name = parsed_xml.domain.name.cdata
        uuid = parsed_xml.domain.uuid.cdata
        ram = int(parsed_xml.domain.memory.cdata) // 1e+6
        cpu = int(parsed_xml.domain.vcpu.cdata)
        state = domain.state()[0]
        
        return {
            "uuid": uuid,
            "name": name,
            "ram":ram,
            "cpu":cpu,
            "state":state
        }
        
    def get_vms(self):
        domains = self.conn.listAllDomains()
        vms = []
        # breakpoint()
        for domain in domains:
            vms.append(self.get_vm_detail(domain.UUID()))
        return vms


        
    def create_vm(self, config):
       uuid = self.conn.createXML(config).UUID()
       return self.get_vm_detail(uuid)


class LibvirtClient:
    libvirt_client = LibvirtWrapper()




def validate_iso_path(path):
    if not Path(path).suffix == '.iso':
        raise ValidationError("Provided file is not an iso.")
