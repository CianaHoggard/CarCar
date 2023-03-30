import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';

function TechnicianList () {
    const [technicians, setTechnician] = useState([])
    const getData = async () => {
      const response = await fetch('http://localhost:8080/api/technicians/')
      if(response.ok) {
          const data = await response.json()
          setTechnician(data.technicians)
      }
    }
    useEffect(() => {
      getData();
    }, [])


    return (
        <div>
          <h1>Technicians</h1>
          <hr></hr>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Employee Number</th>
              </tr>
            </thead>
            <tbody>
              {technicians.map(technician =>{
                return (
                  <tr key={technicians.employee_number}>
                    <td>{technician.name}</td>
                    <td>{technician.employee_number}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <hr>
            </hr>
            <NavLink className="nav-link" to="new"><button className="btn btn-success">Add New Technician</button></NavLink>
          </div>
        </div>
      )
  }

export default TechnicianList
