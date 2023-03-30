import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppointmentList from './appointments/AppointmentList';
import MainPage from './MainPage';
import AppointmentForm from './appointments/AppointmentForm'
import AppointmentHistory from './appointments/AppointmentHistory';
import Nav from './Nav';
import AutomobileForm from './inventory/AutomobileForm';
import AutomobileList from './inventory/AutomobileList';
import SalesPersonForm from './sales/SalesPersonForm';
import SalesPersonHistory from './sales/SalesPersonHistory';
import SalesList from './sales/SalesList';
import SalesForm from './sales/SalesForm';
import TechnicianForm from './technician/TechnicianForm';
import TechnicianList from './technician/TechnicianList';
import CustomerForm from './CustomerForm';
import ManufacturerForm from './manufacturers/ManufacturerForm';
import ManufacturerList from './manufacturers/ManufacturerList';
import ModelList from './models/ModelList'
import ModelForm from './models/ModelForm';



function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/appointments">
            <Route path='' element={<AppointmentList />} />
            <Route path='new' element={<AppointmentForm />}/>
            <Route path='history' element={<AppointmentHistory />} />
          </Route>
          <Route path='/technicians'>
            <Route path="" element={<TechnicianList />} />
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="inventory">
            <Route path="automobiles" element={<AutomobileList />} />
            <Route path="automobiles/new" element={<AutomobileForm />} />
          </Route>
          <Route path="sales">
            <Route path="newemployee" element={<SalesPersonForm/>}/>
            <Route path="employeehistory" element={<SalesPersonHistory/>}/>
            <Route path="" element={<SalesList/>}/>
            <Route path="new" element={<SalesForm/>}/>
          </Route>
          <Route path="customers">
            <Route path="new" element={<CustomerForm />} />
          </Route>
          <Route path="/manufacturers">
            <Route path="" element={<ManufacturerList />} />
            <Route path='new' element={<ManufacturerForm />} />
          </Route>
          <Route path="/models">
            <Route path="" element={<ModelList/>} />
            <Route path="new" element={<ModelForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
