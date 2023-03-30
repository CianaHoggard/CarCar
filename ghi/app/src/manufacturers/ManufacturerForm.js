import React, { useEffect, useState } from 'react';


function ManufacturerForm() {
    const [bad, setBad] = useState(false);
    const [submitted, setSubmit] = useState(false);
    const [myUpdates, setMyUpdates] = useState({});

    const handleInputChange = async (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setMyUpdates({...myUpdates, [name]: value})
    }


    const handleSubmit = async (event) => {
      event.preventDefault();
      const manufacturerURL = `http://localhost:8100/api/manufacturers/`
      const fetchConfig = {
        method: "post",
        body: JSON.stringify(myUpdates),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(manufacturerURL, fetchConfig);

      if (response.ok) {
        const newManufacturer = await response.json();
        setMyUpdates([])
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
    useEffect(() => {

        handleSubmit();
      }, []);

    return (
        <div className="container">
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
               { bad && <div className="alert alert-danger">Failed to upload</div>}
                { submitted && <div className="alert alert-success">Success!</div>}
                <h1>Add a new Manufacturer</h1>
                <form onSubmit={handleSubmit} id="create-location-form">
                <div className="form-floating mb-3">
                    <input placeholder="name" required type="text" name="name" onChange={handleInputChange} id="name" className="form-control"/>
                    <label htmlFor="name">Name</label>
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

export default ManufacturerForm
