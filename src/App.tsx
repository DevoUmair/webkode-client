import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage from './Pages/Home'
import Navbar from './components/Shared/Navbar'
import RegisterPage from './Pages/Register'
import LoginPage from './Pages/Login'
import PricingPage from './Pages/Pricing'
import DashboardHome from './Pages/dashboard/DashboardHome'
import DashboardLayout from './layouts/DashboardLayout'
import AboutPage from './Pages/About'
import ProtectedRoute from './components/ProtectedRoute'
import Transfers from './Pages/dashboard/Transfers'
import Transactions from './Pages/dashboard/Transactions'
import Invoices from './Pages/dashboard/Invoice'
import { AdminDashboardHome } from './Pages/Admin/AdminHome'
import AdminDashboardLayout from './layouts/AdminDashboard'
import Unauthorized from './Pages/Unauthorized'
import { UserManagement } from './Pages/Admin/UserManagement'
import { CreateAdmin } from './Pages/Admin/CreateAdmin'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />


          <Route element={<ProtectedRoute allowedRoles={['user']} />}>
            <Route element={<DashboardLayout />}>
              <Route path="dashboard" element={<DashboardHome />} />
              <Route path="dashboard/transfers" element={<Transfers />} />
              <Route path="dashboard/transactions" element={<Transactions />} />
              <Route path="dashboard/invoices" element={<Invoices />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route element={<AdminDashboardLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboardHome />} />
              <Route path="/admin/dashboard/transactions" element={<Transactions />} />
              <Route path="/admin/dashboard/userManagement" element={<UserManagement/>} />
              <Route path="/admin/dashboard/newAdmin" element={<CreateAdmin/>} />


            </Route>
          </Route>
        
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
