import { Routes,Route } from "react-router-dom";
import Home from "../pages/Home";
import Summary from "../pages/Summary";
import Dashboard from "../pages/Dashboard";
import React from 'react'
// import RHFDemo from "../pages/RHFDemo";
// import Reactquerydemo from "../pages/Reactquerydemo";
import LoginForm from "../components/loginForm";
// import User from '../components/User';
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      
      <Route path="/login" element={<LoginForm/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      }/>
      <Route path="/summary" element={
                <ProtectedRoute>
                    <Summary />
                </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />
      {/* <Route path="/RHF" element={<RHFDemo/>}/>
      <Route path="/RHF1" element={<Reactquerydemo/>}/>
      <Route path="/user" element={<User/>}/> */}
    </Routes>
  )
}

export default AppRoutes
