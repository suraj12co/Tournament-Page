import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { toast } from 'react-hot-toast';
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedPhone = phone.trim();

  const handleRegister = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name: trimmedName, phone: trimmedPhone },
          emailRedirectTo: `${window.location.origin}/home`
        }
      });

      if (error) throw error;

      if (data.user) {
        const { error: dbError } = await supabase.from("users").insert([
          { id: data.user.id, name, email, phone }
        ]);
        if (dbError) throw dbError;

        toast.success('Check your email to confirm your account.');
        navigate('/login');
      }
    } catch (error) {
      setError(error.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1C2526] font-sans">
      <h2 className="text-white text-4xl mb-5 drop-shadow-lg">Register</h2>
      <div className="bg-[rgba(44,54,57,0.8)] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-[rgba(255,255,255,0.1)] backdrop-blur-lg">
        {error && (
          <div className="mb-4 text-red-500 text-center">{error}</div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <div className="mb-5">
            <label className="block mb-2 text-[#D3D3D3] font-medium text-lg">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              className="w-full p-3 border border-[rgba(255,255,255,0.2)] rounded-lg bg-[rgba(255,255,255,0.05)] text-white text-base focus:outline-none focus:border-[#00C4B4] focus:ring-2 focus:ring-[#00C4B4] transition duration-300 disabled:opacity-50"
            />
          </div>
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
            <label className="block mb-2 text-[#D3D3D3] font-medium text-lg">Phone:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          <div className="mb-5">
            <label className="block mb-2 text-[#D3D3D3] font-medium text-lg">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full p-3 border border-[rgba(255,255,255,0.2)] rounded-lg bg-[rgba(255,255,255,0.05)] text-white text-base focus:outline-none focus:border-[#00C4B4] focus:ring-2 focus:ring-[#00C4B4] transition duration-300 disabled:opacity-50"
            />
          </div>
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full p-3 bg-gradient-to-r from-[#FF9500] to-[#AF52DE] text-white rounded-lg text-base font-semibold cursor-pointer hover:scale-105 hover:shadow-[0_0_12px_rgba(255,149,0,0.5)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-[#D3D3D3]">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;