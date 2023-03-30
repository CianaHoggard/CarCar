from django.urls import path
from .views import list_sales, show_sales, list_customers, show_customer, list_employee, show_employee

urlpatterns = [
    path("salespeople/", list_employee, name="list_employee"),
    path("salespeople/<int:id>/", show_employee, name="show_employee"),
    path("customers/", list_customers, name="list_customers"),
    path("customers/<int:id>/", show_customer, name="show_customer"),
    path("sales/", list_sales, name="list_sales"),
    path("sales/<int:id>/", show_sales, name="show_sales"),
]
