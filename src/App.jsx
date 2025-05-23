import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import ResetPassword from './pages/ResetPassword';
import TournamentRegister from './pages/TournamentRegister';
import HomePage from './pages/HomePage';
import AdminLogin from './pages/AdminLogin';


function App() {
  return (
    <Router>
      <Routes>        
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dropdown" element={<DropdownMenu />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/tournament-register" element={<TournamentRegister />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin-login" element={<AdminLogin />} />

      </Routes>
    </Router>
  );
}

export default App;