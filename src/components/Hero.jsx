import React from 'react';
import { Link } from 'react-router-dom';
function Hero() {
  return (
    <section className="py-20 bg-gray-800 text-center">
      <div className="container mx-auto">
        <h2 className="text-5xl font-extrabold mb-4">Ultimate E-Sport Showdown 2025</h2>
        <p className="text-xl mb-8">Join the battle, claim the glory! Compete in the biggest e-sport event of the year.</p>
        <Link to="/tournament-register">
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
          Register Now
        </button>
        </Link>
      </div>
    </section>
  );
}

export default Hero;