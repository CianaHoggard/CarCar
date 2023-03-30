import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";


function SaleList() {
    const [sales, setSales] = useState([])
    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/')
        const data = await response.json()
        setSales(data.sales)
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <h1>List of All Sales</h1>
            <table className="table table-striped">
            <thead>
                <tr>
                    <th>Salesperson</th>
                    <th>Employee Number</th>
                    <th>Purchaser's Name</th>
                    <th>Automobile VIN</th>
                    <th>Sale Price</th>
                </tr>
            </thead>
            <tbody>
                {sales.map(sale => {
                    return (
                        <tr key={sale.automobile.vin}>
                            <td>{sale.salesperson.name}</td>
                            <td>{sale.salesperson.employee_number}</td>
                            <td>{sale.customer.name}</td>
                            <td>{sale.automobile.vin}</td>
                            <td>{sale.price}</td>
                        </tr>
                    );
                 })}
            </tbody>
        </table>
     <div>
        <NavLink className="nav-link" aria-current="page" to="new">
          <button className="btn btn-success">Add!</button>
        </NavLink>
      </div>
      </div>
    )
}

export default SaleList;
