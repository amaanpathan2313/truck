import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminHome from './Components/AdminSection/AdminHome'
// import './App.css'
import Index from './Components/Authentication/Index'
import Login from './Components/Authentication/Login'
import Registration from './Components/Authentication/Registration'
import EditDriver from './Components/EditDriver'
import ManageDriver from './Components/ManageDriver'
import ManageTruckInformation from './Components/ManageTruckInformation'
import Revenue from './Components/Revenue'
import TransportHistory from './Components/TransportHistory'
import TruckMaintanance from './Components/TruckMaintanance'
import TruckLocation from './Components/UserSection/TruckLocation'
import UserHome from './Components/UserSection/Userhome'
import DriverProfile from './components/UserSection/DriverProfile';


function App() {
 
  return (
    <>
     <Routes>
      <Route path='/' element={<Index/>}/>
      <Route path='/registration' element={<Registration/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/userhome' element={<UserHome/>}/>
      <Route path='/adminhome' element={<AdminHome/>}/>
      <Route path='/managedriver' element={<ManageDriver/>}/>
      <Route path='/managetruckinformation' element={<ManageTruckInformation/>}/>
      <Route path='/transporthistory' element={<TransportHistory/>}/>
      <Route path='/revenue' element={<Revenue/>}/>
      <Route path='/truckmaintanance' element={<TruckMaintanance/>}/>
      <Route path='/editdriver/:id' element={<EditDriver/>}/>
      <Route path='/trucklocation' element={<TruckLocation/>}/>
      <Route path="/DriverProfile" element={<DriverProfile />} />

     </Routes>
    </>
  )
}

export default App
