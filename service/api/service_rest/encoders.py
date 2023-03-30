from common.json import ModelEncoder
from .models import Technician, AutomobileVO, Appointment

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ['vin', 'import_href']

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [ 'name', "employee_number"]


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vin",
        "customer_name",
        "appointment_time",
        "reason",
        "finished",
        "vip",
        "technician",
        ]
    encoders = {
        "technician": TechnicianListEncoder(),
    }
