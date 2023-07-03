import libvirt
import untangle
import time
import threading

from rest_framework.exceptions import APIException



class LibvirtWrapper:
    def __init__(self):
        self.conn = libvirt.open("qemu:///system")

    def get_domain(self, domain_name):
        domain = self.conn.lookupByName(domain_name)            
        return domain

    # Implement methods for starting, stopping, creating, etc., VMs


    # def shutdown_vm(self, domain_name):
    #     domain = self.get_domain(domain_name)
        
    #     # Get the current state of the domain
    #     state, _ = domain.state()
        
    #     if state == libvirt.VIR_DOMAIN_RUNNING:
    #         domain.shutdown()
    #     else:
    #         return
        
    def shutdown_vm(self, domain_name):
        def timeout_handler():
            try:
                time.sleep(2)  # Wait for 3 seconds
                if not shutdown_event.is_set():
                    raise TimeoutError("Timeout occurred while waiting for the domain to shut off.")
            except TimeoutError as e:
                self.timeout_exception = e

            shutdown_event.set()

        # Create an event to signal the shutdown completion
        shutdown_event = threading.Event()

        # Initialize the timeout exception to None
        self.timeout_exception = None

        # Start a thread to handle the timeout
        timeout_thread = threading.Thread(target=timeout_handler)
        timeout_thread.start()

        domain = self.get_domain(domain_name)
        
        # Get the current state of the domain
        state, _ = domain.state()
        
        
        if state == libvirt.VIR_DOMAIN_RUNNING:
            domain.shutdown()
        else:
            return
        
        while True:
            

            # Check if the domain has shut off
            if state == libvirt.VIR_DOMAIN_SHUTOFF:
                shutdown_event.set()
                
                

            # # Check if the timeout event has been set
            if shutdown_event.is_set():
                break

            print("Shutting down...")
            # Sleep for a short duration before checking again
            time.sleep(1)

        # Handle the timeout exception if it occurred
        if self.timeout_exception:
            # Do something with the exception
            self.shutdown_vm(domain_name)

     
    def stop_vm(self, domain_name):
        domain = self.get_domain(domain_name)
        domain.suspend()
        
        while True:
            # Get the current state of the domain
            state, _ = domain.state()

            # Check if the domain has shut off
            if state == libvirt.VIR_DOMAIN_PAUSED:
               break

            # Sleep for a short duration before checking again
            time.sleep(1)
    
        
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
        
        while True:
            # Get the current state of the domain
            state, _ = domain.state()

            # Check if the domain has shut off
            if state == libvirt.VIR_DOMAIN_RUNNING:
                break

            # Sleep for a short duration before checking again
            time.sleep(1)
        
    def start_vm(self,domain_name):
        domain = self.get_domain(domain_name)
        domain.create()
        
        while True:
            # Get the current state of the domain
            state, _ = domain.state()

            # Check if the domain has shut off
            if state == libvirt.VIR_DOMAIN_RUNNING:
               break

            # Sleep for a short duration before checking again
            time.sleep(1)
    
        
        
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




