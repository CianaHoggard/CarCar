import React, { useEffect, useState } from "react";

const CustomerForm = () => {
    const [bad, setBad] = useState(false);
    const [submitted, setSubmit] = useState(false);
    const [customer, setCustomers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone_number: ''
    });


const getData = async () => {
    const url = "http://localhost:8090/api/customers/";
    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        setCustomers(data.customer);
    } else {
        console.log("ERROR");
    }
    };

    useEffect(() => {
    getData();
    }, []);


    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch("http://localhost:8090/api/customers/", fetchConfig);
        if (response.ok) {
            document.getElementById("form").reset()
            setSubmit(true)
            setTimeout(() => {
                setSubmit(false)
              }, 606);
          } else {
            setBad(false)
            setSubmit(true)
            setTimeout(() => {
                setBad(false)
              }, 700);
          };
      };


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-3 mt-4">
                { bad && <div className="alert alert-danger">Failed to upload</div>}
                { submitted && <div className="alert alert-success">Success!</div>}
                  <h1>Add a customer</h1>
                    <form onSubmit={handleSubmit} id="form">
                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} placeholder="..." type="text" name="name" className="form-control"/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} placeholder="..." type="text" name="address" className="form-control"/>
                            <label htmlFor="address">Address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} placeholder="..." type="text" name="phone_number" className="form-control"/>
                            <label htmlFor="phone_number">Phone Number</label>
                        </div>
                    <button className="btn btn-success">Add</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default CustomerForm;
