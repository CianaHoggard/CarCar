import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';

function ManufacturerList() {
    const [manufacturers, setManufacturer] = useState([])
    const getData = async () => {
      const response = await fetch('http://localhost:8100/api/manufacturers/')
      if(response.ok) {
          const data = await response.json()
          setManufacturer(data.manufacturers)
      }
    }
    useEffect(() => {
      getData();
    }, [])


    return (
        <div>
          <h1>Manufacturers</h1>
          <hr></hr>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {manufacturers.map(manu =>{
                return (
                  <tr key={manu.name}>
                    <td>{manu.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <hr>
            </hr>
            <NavLink className="nav-link" to="new"><button className="btn btn-success">Add New Manufacturer</button></NavLink>
          </div>
        </div>
      )
}

export default ManufacturerList
