import { useState, useEffect } from "react";


function SalesPersonHistory() {
    const [sales, setSales] = useState([])
    const [salespeople, setSalesEmployee] = useState([])
    const [filterValue, setFilterValue] = useState('')


    useEffect(()=> {
        const loadData = async () => {
          let response = await fetch('http://localhost:8090/api/salespeople/');
          if (response.ok) {
            const data = await response.json();
            setSalesEmployee(data.salespeople);
          } else {
            console.log("Failed to retrieve salespeople");
          }
          response = await fetch('http://localhost:8090/api/sales/');
          if (response.ok) {
            const data = await response.json();
            setSales(data.sales);
          } else {
            console.log("Failed to retrieve sales");
          }
        };
        loadData()
      }, []);

    const handleChange = (e) => {
      setFilterValue(e.target.value)
    }

    return (
        <div className="container">
          <h1>Employee Sales History</h1>
          <select onChange={handleChange} name="salesperson" className="form-select">
            <option value=''>Select a Salesperson</option>
            {salespeople.map(salesperson=> {
              return(
                <option key={salesperson.employee_name} value={salesperson.employee_name}>{salesperson.name}</option>
              )
            })}
          </select>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Employee Number</th>
                <th>Customer Name</th>
                <th>Automobile VIN</th>
                <th>Sale Price</th>
              </tr>
            </thead>
            <tbody>
            { sales.filter(sale => sale.salesperson.name.includes(filterValue) ).map(filtered => (

                  <tr key={filtered.id}>
                    <td>{ filtered.salesperson.name }</td>
                    <td>{ filtered.salesperson.employee_number }</td>
                    <td>{ filtered.customer.name }</td>
                    <td>{ filtered.automobile.vin }</td>
                    <td>{ filtered.price }</td>
                  </tr>
                ))}
            </tbody>
          </table>

        </div>

        );
      }

export default SalesPersonHistory;
