import React from 'react';
import TeamCard from './TeamCard';

function Teams() {
  const teams = [
    { name: "ThunderStrike", logo: "https://via.placeholder.com/150", rank: 1 },
    { name: "ShadowBlaze", logo: "https://via.placeholder.com/150", rank: 2 },
    { name: "NexusWolves", logo: "https://via.placeholder.com/150", rank: 3 },
    { name: "IronPhantoms", logo: "https://via.placeholder.com/150", rank: 4 },
  ];

  return (
    <section id="teams" className="py-16 bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Competing Teams</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teams.map((team) => (
            <TeamCard key={team.name} name={team.name} logo={team.logo} rank={team.rank} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Teams;