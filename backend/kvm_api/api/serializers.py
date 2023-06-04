from rest_framework import serializers



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
    ram = serializers.IntegerField(min_value=1)
    cpu = serializers.IntegerField(min_value=1)