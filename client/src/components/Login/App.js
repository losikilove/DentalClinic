import React from 'react';
import {  BrowserRouter,  Routes,  Route,} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./Login/Login";
// // Dentist API
import DentistHome from './Dentist/DentistHome';
import DentistViewPatient from './Dentist/DentistViewPatient';
import DentistViewDentist from './Dentist/DentistViewDentist';
import DentistViewStaff from './Dentist/DentistViewStaff';
import DentistViewMedicine from './Dentist/DentistViewMedicine';
// // Admin API
// import AdminHome from './Admin/AdminDashboard';
// import AdminViewAppointmentDetail from './Admin/AdminViewAppointmentDetail';
// import AdminViewDentist from './Admin/AdminViewDentist';
// import AdminViewMedicine from './Admin/AdminViewMedicine';
// import AdminViewStaff from './Admin/AdminViewStaff';
// import AdminViewStaffDetail from './Admin/AdminViewStaffDetail';
// import AdminViewDentistDetail from './Admin/AdminViewDentistDetail';
// import AdminAddDentist from "./Admin/AdminAddDentist";
// import AdminAddStaff from "./Admin/AdminAddStaff";
// import AdminUpdateMedicine from "./Admin/AdminUpdateMedicine";
function App() {
  return (
    <div>
      <BrowserRouter>
      <ToastContainer position='top-center' />
      <Routes>

        <Route exact path='/' element={<Login/>} />
        <Route path='/74823xxxfw3748424' element={<DentistHome/>} />
        <Route path='/9034828xa374823' element={<DentistViewPatient/>} />
        <Route path='/47283478347xcas478' element={<DentistViewDentist/>} />
        <Route path='/3472hjqwbe32434d782374' element={<DentistViewStaff/>} />
        <Route path='/eq98hdwbrg363242342' element={<DentistViewMedicine/>} />

        {/* Admin */}
        {/* <Route exact path='/AdminHome' element={<AdminHome/>} />
        <Route exact path='/AdmingetAppoinmentDetail/:AID' element={<AdminViewAppointmentDetail/>} />
        <Route exact path='/AdminViewDentistDetail/:DID' element={<AdminViewDentistDetail/>} />
        <Route exact path='/AdminViewStaffDetail/:SID' element={<AdminViewStaffDetail/>} />
        <Route exact path='/AdminViewDentist' element={<AdminViewDentist/>} />
        <Route exact path='/AdminAddDentist' element={<AdminAddDentist/>} />
        <Route exact path='/AdminViewStaff' element={<AdminViewStaff/>} />
        <Route exact path='/AdminViewMedicine' element={<AdminViewMedicine/>} />
        <Route exact path='/AdminAddStaff' element={<AdminAddStaff/>} />
        <Route exact path='/AdminUpdateMedicine/:Medicine' element={<AdminUpdateMedicine/>} /> */}

        {/* <Route path='/AddAccount' element={<AddAccount/>} />
        <Route path='/getInfor/:Username' element={<ViewAccount/>} />
        <Route path='/update-account/:Username' element={<UpdateAccount/>} /> */}
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
