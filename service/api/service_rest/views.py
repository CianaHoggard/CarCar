from django.shortcuts import render
from django.http import JsonResponse
from .models import Technician, AutomobileVO, Appointment
from .encoders import TechnicianListEncoder, AppointmentListEncoder
from django.views.decorators.http import require_http_methods
import json


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        employee = Technician.objects.all()
        return JsonResponse(
            {"technicians": employee},
            encoder=TechnicianListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        employee = Technician.objects.create(**content)
        return JsonResponse(
            employee,
            encoder=TechnicianListEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        try:
            appointments = Appointment.objects.all()
            return JsonResponse(
                {"appointments": appointments},
                encoder=AppointmentListEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "No Appointments"},
                status=400,
                )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(name=content['technician'])
            content['technician'] = technician
            item = AutomobileVO.objects.filter(vin=content['vin'])
            if len(item) > 0:
                content['vip'] = True
            else:
                content['vip'] = False
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Technician name"},
                status=400,
            )

        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False,
        )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_appointment_details(request,vin,id):
    if request.method == "GET":
        appointments = Appointment.objects.filter(vin=vin,id=id)
        return JsonResponse(
            appointments,
            encoder=AppointmentListEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Appointment.objects.filter(vin=vin, id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            Appointment.objects.get(vin=vin, id=id)
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Appointment ID not found"},
                status=404,
            )
        Appointment.objects.filter(vin=vin,id=id).update(**content)
        appointment = Appointment.objects.get(vin=vin, id=id)
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False,
        )

@require_http_methods(["GET"])
def api_appointment_history(request,vin):
    if request.method == "GET":
        appointment = Appointment.objects.filter(vin=vin)
        return JsonResponse(
                appointment,
                encoder=AppointmentListEncoder,
                safe=False,
            )
