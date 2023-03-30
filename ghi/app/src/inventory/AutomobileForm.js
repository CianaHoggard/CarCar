import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function AutomobileForm () {
  const [models, setModels] = useState([])
  const [bad, setBad] = useState(false);
  const [submitted, setSubmit] = useState(false);
  const [formData, setFormData] = useState({
    color: '',
    year: '',
    vin: '',
    model_id: "",

  })


  useEffect(() => {
  const getData = async () => {
      const url = 'http://localhost:8100/api/models/';
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setModels(data.models)
      } else {
          console.log('ERROR')
      }
    }


    getData();
  }, []);


  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const autoUrl = `http://localhost:8100/api/automobiles/`
    const response = await fetch(autoUrl, fetchConfig);
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
                <div className="shadow p-4 mt-4">
                { bad && <div className="alert alert-danger">Failed to upload</div>}
                { submitted && <div className="alert alert-success">Successfully added to Inventory!</div>}
                  <h1>Add an Automobile to Inventory</h1>
                  <form onSubmit={handleSubmit} id="create-auto-form">
                  <div className="form-floating mb-3">
                      <input onChange={handleInputChange} placeholder="color" required type="text" name="color" id="color" className="form-control"/>
                      <label htmlFor="color">Color</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input onChange={handleInputChange} placeholder="year" required type="text" name="year" id="year" className="form-control"/>
                      <label htmlFor="year">Year</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input onChange={handleInputChange} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control"/>
                      <label htmlFor="vin">VIN</label>
                  </div>
                  <div className="form-floating mb-3">
                  <select onChange={handleInputChange} name="model_id" className="form-select">
                      <option value="">Choose a Model</option>
                      {models.map(models => {
                          return (
                              <option key={models.id} value={models.id}>
                                    {models.name}
                              </option>
                          );
                          })}
                  </select>
              </div>
              <Link to="/inventory/automobiles" className="btn btn-success" style={{float: "right"}}>View Automobiles</Link>
              <button className="btn btn-success">Add!</button>
              </form>
              </div>
          </div>
          </div>
     );
  }

export default AutomobileForm
