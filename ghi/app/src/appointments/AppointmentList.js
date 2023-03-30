import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';

function AppointmentList () {
    const [appointments, setAppointment] = useState([])
    const getData = async () => {
      const response = await fetch('http://localhost:8080/api/appointments/')
      if(response.ok) {
          const data = await response.json()
          setAppointment(data.appointments)
      }
    }
    useEffect(() => {
      getData();
    }, [])

    const handleFinished = async (e) => {
      const href = e.target.name
      const  url = `http://localhost:8080${href}`
      const fetchConfig = {
        method: "put",
        body: JSON.stringify({"finished": true}),
        headers: {
          'Content-Type': 'application/json',
        },
      }
        const response = await fetch(url, fetchConfig);

        if (response.ok) {
          console.log(true)
      } else {
        console.error(response)
      }
    }

    useEffect(()=>{
      handleFinished();
    })

    const handleDelete = async (e) => {
      const href = e.target.name;
      const url = `http://localhost:8080${href}`
      const deleteResponse = await fetch(url, {method: 'DELETE'});
      if(deleteResponse.ok) {
          console.log(deleteResponse)
      } else {
        console.error(deleteResponse)
      }
    }

    useEffect(()=>{
      handleDelete();
    })

    function is_vip(appointment){
      if(appointment === true){
        return <img src="https://thumbs.dreamstime.com/b/vip-golden-crown-53393995.jpg" width="30px" />
      } else {
        return ''
      }
    }

    return (
        <div>
          <h1>Service Appointments</h1>
          <hr></hr>
          <table className="table">
            <thead>
              <tr>
                <th>VIN</th>
                <th>VIP</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Technician</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments
              .filter(appointment => appointment.finished === false)
              .map(appointment =>{
                return (
                  <tr key={appointment.href}>
                    <td> { appointment.vin } </td>
                    <td>{is_vip(appointment.vip)}</td>
                    <td>{appointment.customer_name}</td>
                    <td>{new Date(appointment.appointment_time).toLocaleDateString()}</td>
                    <td>{ new Date(appointment.appointment_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                    <td>{ appointment.reason}</td>
                    <td>{ appointment.technician.name }</td>
                    <td><button onClick={handleDelete} name={appointment.href} className="btn btn-danger">Cancel</button><button onClick={handleFinished}  className="btn btn-success" name={appointment.href}>Finished</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
          <NavLink className="nav-link" aria-current="page" to="new"><button type="button" className="btn btn-success">Create New Appointment</button></NavLink>
          <NavLink className="nav-link" to="history"><button className="btn btn-success">Appointment History</button></NavLink>
          </div>
        </div>
      )
  }

export default AppointmentList
