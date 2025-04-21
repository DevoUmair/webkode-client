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
function App() {

  return (
    <>
      <BrowserRouter>
        {/* <Navbar/> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="about" element={<AboutPage />} />

        {/* proteted routes */}
          <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="dashboard/transfers" element={<Transfers />} />
            <Route path="dashboard/transactions" element={<Transactions />} />
            <Route path="dashboard/invoices" element={<Invoices />} />
            {/* <Route path="dashboard/balance" element={<BalancePage />} />
            <Route path="dashboard/settings" element={<SettingsPage />} /> */}
          </Route>
        </Route>
        </Routes>
      
       
    </BrowserRouter>
    </>
  )
}

export default App
