import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Landing from '../pages/Landing';
import ResetPassword from '../pages/ResetPassword';
import TournamentRegister from '../components/TournamentRegister';
import HomePage from '../pages/HomePage';
import AdminLogin from '../pages/AdminLogin';
import Profile from '../pages/Profile';
import Tournaments from '../pages/Tournaments';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/tournament-register" element={<TournamentRegister />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Landing />} />
      <Route path="/tournaments" element={<Tournaments />} />
    </Routes>
  )
}

export default AppRoutes