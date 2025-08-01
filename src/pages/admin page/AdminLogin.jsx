import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      if (data.session) {
        // Check if the user has admin privileges (this is a placeholder; adjust based on your Supabase setup)
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single();
        if (userError) throw userError;
        if (userData?.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          setError('You do not have admin privileges.');
          console.log('User does not have admin privileges:', userData);
          await supabase.auth.signOut();
        }
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError(error.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1C2526] font-sans">
      <h2 className="text-white text-4xl mb-5 drop-shadow-lg">Admin Login</h2>
      <div className="bg-[rgba(44,54,57,0.8)] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-[rgba(255,255,255,0.1)] backdrop-blur-lg">
        {error && (
          <div className="mb-4 text-red-500 text-center">{error}</div>
        )}
        <div className="mb-5">
          <label className="block mb-2 text-[#D3D3D3] font-medium text-lg">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="w-full p-3 border border-[rgba(255,255,255,0.2)] rounded-lg bg-[rgba(255,255,255,0.05)] text-white text-base focus:outline-none focus:border-[#00C4B4] focus:ring-2 focus:ring-[#00C4B4] transition duration-300 disabled:opacity-50"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-[#D3D3D3] font-medium text-lg">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="w-full p-3 border border-[rgba(255,255,255,0.2)] rounded-lg bg-[rgba(255,255,255,0.05)] text-white text-base focus:outline-none focus:border-[#00C4B4] focus:ring-2 focus:ring-[#00C4B4] transition duration-300 disabled:opacity-50"
          />
        </div>
        <button
          onClick={handleAdminLogin}
          disabled={loading}
          className="w-full p-3 bg-gradient-to-r from-[#00C4B4] to-[#34C759] text-white rounded-lg text-base font-semibold cursor-pointer hover:scale-105 hover:shadow-[0_0_12px_rgba(0,196,180,0.5)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging in...' : 'Login as Admin'}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;