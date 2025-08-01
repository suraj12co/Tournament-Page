import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Landing from '../pages/Landing';
import ResetPassword from '../pages/ResetPassword';
import TournamentRegister from '../components/TournamentRegister';
import HomePage from '../pages/HomePage';
import AdminLogin from '../pages/admin page/AdminLogin';
import Profile from '../pages/Profile';
import Tournaments from '../pages/Tournaments';
import Test from '../components/Test';
import AddTournaments from '../pages/admin page/AddTournaments';
import AdminDashboard from '../pages/admin page/AdminDashboard';
import AdminProfile from '../pages/admin page/AdminProfile';
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
      <Route path="/test" element={<Test />} />
      <Route path="/add-tournaments" element={<AddTournaments />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-profile" element={<AdminProfile />} />
      {/* Add more routes as needed */}
      <Route path="*" element={<Landing />} />
    </Routes>
  )
}

export default AppRoutes