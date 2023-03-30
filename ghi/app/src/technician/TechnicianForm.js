import React, { useEffect, useState } from 'react';


function TechnicianForm() {

    const handleInputChange = async (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setMyUpdates({...myUpdates, [name]: value})
    }

    const [myUpdates, setMyUpdates] = useState({});
    const handleSubmit = async (event) => {
      event.preventDefault();
      const techniciansURL = `http://localhost:8080/api/technicians/`
      const fetchConfig = {
        method: "post",
        body: JSON.stringify(myUpdates),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(techniciansURL, fetchConfig);

      if (response.ok) {
        const newTechnician = await response.json();
        console.log(newTechnician)
       } else {
        console.log('error')
       }
    }
    useEffect(() => {

        handleSubmit();
      }, []);

    return (
        <div className="container">
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Add a new Technician</h1>
                <form onSubmit={handleSubmit} id="create-location-form">
                <div className="form-floating mb-3">
                    <input placeholder="name" required type="text" name="name" onChange={handleInputChange} id="name" className="form-control"/>
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input placeholder="employee_number" required type="text" name="employee_number" onChange={handleInputChange} id="employee_number" className="form-control"/>
                    <label htmlFor="employee_number">Employee number</label>
                </div>
                <hr></hr>
                <button className="btn btn-success">Create</button>
                </form>
            </div>
            </div>
        </div>
        </div>
    );
}

export default TechnicianForm
