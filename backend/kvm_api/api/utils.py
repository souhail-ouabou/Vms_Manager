import libvirt
import untangle

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
        domain.destroy()
        
    def resume_vm(self,domain_name):
        domain = self.get_domain(domain_name)
        domain.resume()
        
    def start_vm(self,domain_name):
        domain = self.get_domain(domain_name)
        domain.create()
        
    def get_vms(self):
        domains = self.conn.listAllDomains()
        vms = []
        for domain in domains:
            # print(domain.XMLDesc())
            parsed_xml = untangle.parse(domain.XMLDesc())
            id = int(parsed_xml.domain["id"])
            name = parsed_xml.domain.name.cdata
            ram = int(parsed_xml.domain.memory.cdata) // 1024
            cpu = int(parsed_xml.domain.vcpu.cdata)
            state = domain.state()[0]
            
            vms.append({
              "id": id,
              "name": name,
              "ram":ram,
              "cpu":cpu,
              "state":state
            })
        return vms

class LibvirtClient:
    libvirt_client = LibvirtWrapper()
