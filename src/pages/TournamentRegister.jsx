import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    game: '',
    skillLevel: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add backend submission logic here (e.g., API call)
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-16">
        <div className="container mx-auto max-w-lg">
          <h2 className="text-4xl font-bold text-center mb-8">Register for E-Sport Tournament</h2>
          <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <label htmlFor="name" className="block text-lg font-medium mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:outline-none focus:border-purple-600"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-medium mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:outline-none focus:border-purple-600"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="game" className="block text-lg font-medium mb-2">Select Game</label>
              <select
                id="game"
                name="game"
                value={formData.game}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:outline-none focus:border-purple-600"
                required
              >
                <option value="" disabled>Select a game</option>
                <option value="valorant">Valorant</option>
                <option value="league-of-legends">League of Legends</option>
                <option value="csgo">Counter-Strike 2</option>
                <option value="dota2">Dota 2</option>
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor="skillLevel" className="block text-lg font-medium mb-2">Skill Level</label>
              <select
                id="skillLevel"
                name="skillLevel"
                value={formData.skillLevel}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:outline-none focus:border-purple-600"
                required
              >
                <option value="" disabled>Select your skill level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="professional">Professional</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition duration-300"
            >
              Submit Registration
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Register;