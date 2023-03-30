import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function AutomobileList() {
    const [autos, setAutomobiles] = useState([])

    const getData = async (e) => {
        const url = await fetch(`http://localhost:8100/api/automobiles/`);
        const data = await url.json()
        setAutomobiles(data.autos)
    }

    useEffect(() => {
        getData();
    }, [])

  return (
    <div>
      <h1>Available Automobiles</h1>
      <table className="table ">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Color</th>
            <th>Model</th>
            <th>Year</th>
            <th>Manufacturer</th>
            <th>Vehicle</th>
          </tr>
        </thead>
        <tbody>
          {autos?.map(automobile => {
            return (
              <tr key={automobile.href}>
                <td>
                {automobile.vin}
                </td>
                <td>{automobile.color}</td>
                <td>{automobile.model.name}</td>
                <td>{automobile.year}</td>
                <td>{automobile.model.manufacturer.name}</td>
                <td><img src={ automobile.model.picture_url } alt="car" width="200px"></img></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <NavLink className="nav-link" aria-current="page" to="new">
          <button className="btn btn-success">Add Automobile</button>
        </NavLink>
      </div>
    </div>
  );
}

export default AutomobileList;
