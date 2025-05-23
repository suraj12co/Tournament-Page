import React from 'react';

function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">E-Sport Elite Tournament</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="/" className="hover:text-gray-300">Home</a></li>
            <li><a href="/teams" className="hover:text-gray-300">Teams</a></li>
            <li><a href="/schedule" className="hover:text-gray-300">Schedule</a></li>
            <li><a href="/register" className="hover:text-gray-300">Register</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;