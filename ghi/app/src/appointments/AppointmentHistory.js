import React, { useEffect, useState } from 'react';

function AppointmentHistory(){
    const [inputValue, setInputValue] = useState([])
    const [filterAppointments, setFilterAppointments] = useState([])

    const handleSubmit = async (e) => {
      if(inputValue.length > 16){
        const response = await fetch(`http://localhost:8080/api/appointments/${inputValue}`)
        if(response.ok) {
            const data = await response.json()
            setFilterAppointments(data)
        }
      }
    }
    useEffect(() => {
      handleSubmit();
    }, [])

    const handleInputChange = async(e) => {
      const value = e.target.value
      if(value.length===17){
        setInputValue(value)
      }
    }

    useEffect(() => {
      handleInputChange();
    })

    return (
        <div>
            <div>
            <h1>Service History</h1>
            <hr></hr>
            <div class="input-group">
              <div class="form-inline">
                  <input class="form-control mr-sm-2" type="search" placeholder="Search VIN#" aria-label="Search"onChange={handleInputChange} className="vin" autoFocus></input>
                  <button class="btn btn-outline-success" onClick={handleSubmit} type="submit">Search</button>
                </div>
              </div>
        </div>
          <table className="table">
            <thead>
              <tr>
                <th>VIN</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Technician</th>
              </tr>
            </thead>
            <tbody>
              {filterAppointments
              .filter(appointment => appointment.finished === true)
              .map(appointment =>{
                return (
                  <tr key={appointment.href}>
                    <td> { appointment.vin } </td>
                    <td>{appointment.customer_name}</td>
                    <td>{new Date(appointment.appointment_time).toLocaleDateString()}</td>
                    <td>{ new Date(appointment.appointment_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                    <td>{ appointment.reason}</td>
                    <td>{ appointment.technician.name }</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
    )
}

export default AppointmentHistory
