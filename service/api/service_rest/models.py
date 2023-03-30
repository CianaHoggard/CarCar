from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=20, unique=True)
    import_href = models.CharField(max_length=200)

class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.CharField(max_length=200, unique=True)
    def __str__(self):
            return self.name

class Appointment(models.Model):
    vin = models.CharField(max_length=17)
    customer_name = models.CharField(max_length=200)
    appointment_time = models.DateTimeField()
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.PROTECT,
    )
    reason = models.TextField()
    finished = models.BooleanField(default=False)
    vip = models.BooleanField()

    def __str__(self):
        return self.vin

    def get_api_url(self):
        return reverse("api_appointment_details", kwargs={ "vin": self.vin, "id": self.id})
