import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


const SalesForm = () => {
    const [formData, setFormData] = useState({
    "automobile": "",
    "salesperson": "",
    "customer": "",
    "price": ""
    });

    const [autos, setAutoData] = useState([]);
    const [salespeople, setEmployeeData] = useState([]);
    const [customers, setCustomersData] = useState([]);
    const [bad, setBad] = useState(false);
    const [submitted, setSubmit] = useState(false);

    useEffect( () => {
        const newData = async () => {
            let response = await fetch ('http://localhost:8100/api/automobiles/');
            if (response.ok){
                const data = await response.json();
                setAutoData(data.autos);
            } else {
                console.log("ERROR");
            }
            response = await fetch('http://localhost:8090/api/salespeople/');
            if (response.ok){
                const data = await response.json();
                setEmployeeData(data.salespeople);
            } else {
                console.log("ERROR");
            }
            response = await fetch('http://localhost:8090/api/customers/');
            if (response.ok){
                const data = await response.json();
                setCustomersData(data.customers);
            } else {
                console.log("ERROR");
            }
        };

        newData()
    }, [])

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit =  async (e) => {
        e.preventDefault();
        console.log(formData)
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch('http://localhost:8090/api/sales/', fetchConfig);
        if (response.ok) {
            document.getElementById("form").reset()
            setSubmit(true)
            setTimeout(() => {
            setSubmit(false)
            }, 606);
        } else {
            setSubmit(false)
            setBad(true)
            setTimeout(() => {
            setBad(false)
            }, 700);
        };
    };

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                { bad && <div className="alert alert-danger">Failed to upload</div>}
                { submitted && <div className="alert alert-success">Success!</div>}
                <h1>Record a new sale</h1>
              <form onSubmit={handleSubmit} id="form">
                <div className="form-floating mb-3">
                <select onChange={handleFormChange} name="automobile" className="form-select">
                        <option>Choose Automobile</option>
                        {autos.map(automobile => {
                        return (
                            <option key={automobile.id} value={automobile.vin}>{automobile.model.name} (VIN: {automobile.vin})</option>
                        )
                        })}
                    </select>
                </div>
                <div className="form-floating mb-3">
                <select onChange={handleFormChange} name="salesperson" className="form-select">
                      <option>Choose a Salesperson</option>
                      {salespeople.map(employee => {
                        return (
                            <option key={employee.employee_number} value={employee.employee_number}>{employee.name} (Employee#{employee.employee_number})</option>
                        )
                        })}
                    </select>
                </div>
                <div className="form-floating mb-3">
                <select onChange={handleFormChange} name="customer" className="form-select">
                        <option>Choose a customer</option>
                        {customers.map(customer => {
                        return (
                            <option key={customer.id} value={customer.name}>{customer.name}</option>
                        )
                        })}
                    </select>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.price} placeholder="Price"  name="price" className="form-control" />
                    <label htmlFor='price'>Price</label>
                </div>
                <Link to="/sales" className="btn btn-success" style={{float: "right"}}>View all sales</Link>
                <button className="btn btn-success">Finish</button>
              </form>
            </div>
          </div>
        </div>
    );

}

export default SalesForm;
