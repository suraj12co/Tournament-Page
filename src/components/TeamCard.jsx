import React from 'react';

function TeamCard({ name, logo, rank }) {
  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <img src={logo} alt={`${name} logo`} className="w-32 h-32 mx-auto mb-4 rounded-full" />
      <h3 className="text-2xl font-bold text-center">{name}</h3>
      <p className="text-center text-gray-400">Rank: {rank}</p>
    </div>
  );
}

export default TeamCard;