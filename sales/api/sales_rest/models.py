from django.db import models

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200)
    vin = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.vin

class Employee(models.Model):
    name = models.CharField(max_length=100)
    employee_number= models.IntegerField(unique=True)

class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.IntegerField(unique=True)


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name = "sales",
        on_delete=models.CASCADE
    )
    salesperson = models.ForeignKey(
        Employee,
        related_name="sales",
        on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE
    )
    price = models.CharField(max_length=50)
