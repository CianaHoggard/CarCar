import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function AppointmentForm () {
    const [technicians, setTechnicians] = useState([]);
    const [bad, setBad] = useState(false);
    const [submitted, setSubmit] = useState(false);
    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setTechnicians(data.technicians)
        } else{
            console.log('error')
        }
      }

    useEffect(() => {

      fetchData();
    }, []);

  const handleInputChange = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setMyUpdates({...myUpdates, [name]: value})
  }

  const [myUpdates, setMyUpdates] = useState({});
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(myUpdates)
    const appointmentsURL = `http://localhost:8080/api/appointments/`
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(myUpdates),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(appointmentsURL, fetchConfig);

    if (response.ok) {
      const newAppointment = await response.json();
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
}

    return (
        <div className="container">
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            { bad && <div className="alert alert-danger">Failed to upload</div>}
              { submitted && <div className="alert alert-success">Success!</div>}
                <h1>Create a new Appointment</h1>
                <form onSubmit={handleSubmit} id="create-location-form">
                <div className="form-floating mb-3">
                    <input placeholder="vin" required type="text" name="vin" onChange={handleInputChange} id="vin" className="form-control"/>
                    <label htmlFor="vin">VIN #</label>
                </div>
                <div className="form-floating mb-3">
                    <input placeholder="customer_name" required type="text" onChange={handleInputChange} name="customer_name" id="customer_name" className="form-control"/>
                    <label htmlFor="customer_name">Customer Name</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea placeholder="Reason" required type="text" name="reason" onChange={handleInputChange} id="reason" className="form-control"/>
                    <label htmlFor="reason">Reason</label>
                </div>
                <div className="form-floating mb-3">
                    <input placeholder="Appointment Time" required type="datetime-local" name="appointment_time" onChange={handleInputChange} id="appointment_time" className="form-control"/>
                    <label htmlFor="appointment_time">Appointment Time</label>
                </div>
                <select required name="technician" onChange={handleInputChange} id="technician" className="form-select">
                    <option value="">Choose a technician</option>
                    {technicians.map(technician => {
                        return (
                            <option key={technician.employee_number} value={technician.name} >
                                {technician.name}
                            </option>
                        );
                        })}
                </select>
                <hr></hr>
                <button className="btn btn-success">Create</button>
                </form>
            </div>
            </div>
        </div>
        </div>
    );
}

export default AppointmentForm
