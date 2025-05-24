import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: '🏠', label: 'Home' },
    { path: '/tournaments', icon: '🎮', label: 'Play' },
    { path: '/profile', icon: '👤', label: 'Account' },
  ];

  return (
    <nav className="bg-[rgba(44,54,57,0.9)] p-4 flex justify-around items-center border-t border-[rgba(255,255,255,0.1)] backdrop-blur-lg fixed bottom-0 left-0 right-0 z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center transition-colors ${
              isActive ? 'text-[#00C4B4]' : 'text-[#D3D3D3] hover:text-[#00C4B4]'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navbar;
