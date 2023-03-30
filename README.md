## Design

## Service microservice

I created 3 models, one for making/tracking appointments, tracking technicians and and viewing inventory using a VO. When creating an appointment, the views checks to see if the appointment VIN is matching with the inventoryVO VIN. If it is, it stores as true and will display an VIP icon on the appointments page. Otherwise it stores VIP as false and displays nothing under the VIP tab.

## Sales microservice


I created an Employee model, which when adding a sale, the views lists the employees and it is also possible to see what sales correlate with which employee(vin). I created a Customer model which allows the user to add a customer to be saved and used for other functions such as viewing what customer bought what automobile and the customer's information(phone number and address) will be pulled from what was previously inputted. The Sale model keeps track of the automobiles, salesperson, customer and sale price. Salesperson, customer and automobile are individual foreign keys to the Sale model.  A sale can be created when a user inputs the information from the model. All previous sales can be viewed as a list once required information was given.
AutomobileVO is the last model that holds the href and vin from automobiles which are then stored into the Inventory API using a poller function.
