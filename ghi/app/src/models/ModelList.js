import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function ModelList() {
    const [models, setModels] = useState([])
    const getData = async () => {
      const response = await fetch('http://localhost:8100/api/models/')
      if(response.ok) {
          const data = await response.json()
          setModels(data.models)
      }
    }
    useEffect(() => {
      getData();
    }, [])


    return (
        <div>
          <h1>Models</h1>
          <hr></hr>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Picture</th>
                <th>Manufacturer</th>
              </tr>
            </thead>
            <tbody>
              {models.map(model =>{
                return (
                  <tr key={model.name}>
                    <td>{model.name}</td>
                    <td><img src={model.picture_url} height="150px"/></td>
                    <td>{model.manufacturer.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <hr>
            </hr>
            <NavLink className="nav-link" to="new"><button className="btn btn-success">Add New Model</button></NavLink>
          </div>
        </div>
      )
  }

export default ModelList
