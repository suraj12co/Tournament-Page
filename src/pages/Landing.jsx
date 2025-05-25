import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="relative min-h-screen bg-[#1C2526] text-white flex flex-col justify-center items-center overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <div className="absolute w-96 h-96 bg-[#00C4B4]/10 rounded-full blur-3xl animate-pulse top-10 left-10"></div>
        <div className="absolute w-96 h-96 bg-[#34C759]/10 rounded-full blur-3xl animate-pulse bottom-10 right-10"></div>
      </div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight animate-fade-in-down">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C4B4] to-[#34C759]">
            🔥 E-Sports Tournament Organisation 🔥
          </span>
        </h1>
        <p className="text-lg md:text-2xl mb-10 max-w-2xl mx-auto opacity-90 animate-fade-in-up">
          Join the ultimate battle of champions, compete with the best, and rise to legendary glory!
        </p>
        <div className="flex-col sm:flex-row space-y-4 sm:space-y-2 sm:space-x-6 animate-fade-in-up">
          <Link to="/login">
            <button className="px-8 py-3 mx-1 bg-gradient-to-r from-[#00C4B4] to-[#34C759] text-white rounded-lg text-lg font-semibold cursor-pointer hover:scale-105 hover:shadow-[0_0_12px_rgba(0,196,180,0.5)] transition-all duration-200">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-8 py-3 mx-1 bg-gradient-to-r from-[#FF9500] to-[#AF52DE] text-white rounded-lg text-lg font-semibold cursor-pointer hover:scale-105 hover:shadow-[0_0_12px_rgba(255,149,0,0.5)] transition-all duration-200">
              Register
            </button>
          </Link>
        </div>
        <p className="mt-8 text-sm md:text-base opacity-70">
          Admin?{' '}
          <Link to="/login" className="text-[#00C4B4] hover:text-[#34C759] hover:underline transition-colors">
            Login here
          </Link>{' '}
          and start your journey!
        </p>
      </div>
    </div>
  );
};

export default Landing;