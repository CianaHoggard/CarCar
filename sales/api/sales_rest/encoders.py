from common.json import ModelEncoder
from .models import AutomobileVO, Employee, Customer, Sale

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
    ]


class EmployeeEncoder(ModelEncoder):
    model = Employee
    properties = [
        "name",
        "employee_number",
    ]



class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number",
        "id",
    ]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "automobile",
        "salesperson",
        "customer",
        "price",
        "id",
    ]

    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": EmployeeEncoder(),
        "customer": CustomerEncoder()

    }
