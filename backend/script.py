import libvirt


conn = libvirt.open('qemu:///system')


if conn is None:
    print('Failed to open connection to the hypervisor')
    exit(1)




# Working
# Function to delete a domain (VM)
def delete_domain(conn, domain_name):
    domain = conn.lookupByName(domain_name)
    if domain is None:
        print(f"Domain '{domain_name}' not found")
        return

    domain.undefine()
    print(f"Domain '{domain_name}' deleted")


# Working
# Function to pause a domain (VM)
def pause_domain(conn, domain_name):
    domain = conn.lookupByName(domain_name)
    if domain is None:
        print(f"Domain '{domain_name}' not found")
        return

    domain.suspend()
    print(f"Domain '{domain_name}' paused")



def shutdown_domain(conn, domain_name):
    domain = conn.lookupByName(domain_name)
    if domain is None:
        print(f"Domain '{domain_name}' not found")
        return

    domain.destroy()
    print(f"Domain '{domain_name}' paused")

# Function to start a domain (VM)
def start_domain(conn, domain_name):
    domain = conn.lookupByName(domain_name)
    if domain is None:
        print(f"Domain '{domain_name}' not found")
        return

    domain.create()
    print(f"Domain '{domain_name}' started")


# Function to resume a domain (VM)
def resume_domain(conn, domain_name):
    domain = conn.lookupByName(domain_name)
    if domain is None:
        print(f"Domain '{domain_name}' not found")
        return

    domain.resume()
    print(f"Domain '{domain_name}' resumed")



# List all active domains (VMs)
domains = conn.listDomainsID()

for domain_id in domains:
    domain = conn.lookupByID(domain_id)
    print(f"Domain ID: {domain.ID()}")
    print(f"Domain name: {domain.name()}")
    print(f"Domain state: {domain.state()}")
    print(domain.isActive())

import untangle


for domain in conn.listAllDomains():
    # print(domain.XMLDesc())
    parsed_xml = untangle.parse(domain.XMLDesc())
    id = int(parsed_xml.domain["id"])
    name = parsed_xml.domain.name.cdata
    ram = int(parsed_xml.domain.memory.cdata) // 1024
    cpu = int(parsed_xml.domain.vcpu.cdata)
    state = domain.state()[0]
    
    print(id,name, ram,cpu,state)


    # print(dir(domain))
    # print(domain.hostname())
    
    


# conn.createXML("""
               
# <domain type='kvm'>

#     <name>my_vm</name>
#     <memory unit='KiB'>1048576</memory>
#     <vcpu placement='static'>2</vcpu>
#     <os>
#         <type arch='x86_64' machine='pc-i440fx-2.9'>hvm</type>
#         <boot dev='hd'/>
#     </os>
  
# </domain>
               
#                """)



# shutdown_domain(conn,"my_vm")

# start_domain(conn,"ubuntu22.04-2")

conn.close()



# def domainStart(domainName):
#     if connection == None:
#         print('Can''t open connection to qemu:///system', file=sys.stderr)
#         exit(1)
#     dom = connection.lookupByName(domainName)
#     if dom == None:
#         print('Can''t get the domain object', file=sys.stderr)
#         exit(1)
#     dom.create()
#     print("the VM is running")

# def domainDestruction(domainName):
#     dom = connection.lookupByName(domainName)
#     dom.destroy()
#     print("the VM is shutdown")


# https://github.com/meclotfi/VM-Manager/blob/main/virt_man.py