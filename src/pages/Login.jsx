import { React, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
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
        localStorage.setItem("supabase_token", data.session.access_token);
        navigate('/home');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError(error.message || 'An error occurred during login.');
    } finally {
      toast.error("Login failed. Please check your credentials.");
      setLoading(false);
    }
  };
  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email to reset your password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      alert('Password reset email sent! Check your inbox.');
    } catch (error) {
      setError(error.message || 'An error occurred while sending the reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1C2526] font-sans">
      <h2 className="text-white text-4xl mb-5 drop-shadow-lg">Login</h2>
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
          onClick={handleLogin}
          disabled={loading}
          className="w-full p-3 bg-gradient-to-r from-[#00C4B4] to-[#34C759] text-white rounded-lg text-base font-semibold cursor-pointer hover:scale-105 hover:shadow-[0_0_12px_rgba(0,196,180,0.5)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="mt-4 text-center">
          <a
            href="#"
            onClick={handleForgotPassword}
            className="text-[#FF9500] text-sm flex items-center justify-center gap-1 hover:text-[#AF52DE] hover:underline transition-colors"
          >
            <span className="text-base">🔑</span> Forgot Password?
          </a>
          <p className="mt-4 text-sm text-center text-[#D3D3D3]">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-400 hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;