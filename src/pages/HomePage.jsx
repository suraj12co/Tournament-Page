import React, { useState } from 'react';

const HomePage = () => {
  const [activeMatchTab, setActiveMatchTab] = useState('Ongoing');
  const [activeGameTab, setActiveGameTab] = useState('Tournament');

  const matchTabs = ['Ongoing', 'Upcoming', 'Completed'];
  const gameTabs = ['Tournament', 'Solo'];
  const games = [
    { name: 'FF MAX BR', image: 'https://via.placeholder.com/150' },
    { name: 'Clash Squad CS 1V1', image: 'https://via.placeholder.com/150' },
    { name: 'Clash Squad CS 2V2', image: 'https://via.placeholder.com/150' },
    { name: 'Survival', image: 'https://via.placeholder.com/150' },
    { name: 'Lone Wolf LW 1V1', image: 'https://via.placeholder.com/150' },
    { name: 'Lone Wolf LW 2V2', image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className="min-h-screen bg-[#1C2526] text-white font-sans flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-[#1C2526] shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-xl">G</span>
          </div>
          <div>
            <p className="text-sm opacity-70">Welcome Back,</p>
            <h1 className="text-lg font-semibold">Battle2Win</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-[rgba(44,54,57,0.8)] px-3 py-1 rounded-full">
          <span className="text-yellow-400">💰</span>
          <span className="text-sm font-medium">2.50</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Banner */}
        <div className="relative bg-[rgba(44,54,57,0.8)] rounded-2xl shadow-2xl border border-[rgba(255,255,255,0.1)] backdrop-blur-lg overflow-hidden">
          <img
            src="https://via.placeholder.com/400x150"
            alt="Banner"
            className="w-full h-32 object-cover opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium">1. JOIN OUR WHATSAPP CHANNEL</p>
              <p className="text-xs opacity-70">2. GIVEAWAYS & MORE UPDATES!</p>
            </div>
            <button className="bg-gradient-to-r from-[#00C4B4] to-[#34C759] text-white rounded-lg px-4 py-2 text-sm font-semibold hover:scale-105 hover:shadow-[0_0_12px_rgba(0,196,180,0.5)] transition-all">
              Join Now
            </button>
          </div>
        </div>

        {/* My Matches Section */}
        <section>
          <h2 className="text-xl font-semibold mb-3">My Matches</h2>
          <div className="flex space-x-4 mb-4">
            {matchTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveMatchTab(tab)}
                className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeMatchTab === tab
                    ? 'bg-gradient-to-r from-[#00C4B4] to-[#34C759] text-white'
                    : 'bg-[rgba(255,255,255,0.05)] text-[#D3D3D3]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="text-center text-[#D3D3D3] py-4">
            No {activeMatchTab.toLowerCase()} matches found.
          </div>
        </section>

        {/* Esports Games Section */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Esports Games</h2>
          <div className="flex space-x-4 mb-4">
            {gameTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveGameTab(tab)}
                className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeGameTab === tab
                    ? 'bg-gradient-to-r from-[#00C4B4] to-[#34C759] text-white'
                    : 'bg-[rgba(255,255,255,0.05)] text-[#D3D3D3]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {games.map((game) => (
              <div
                key={game.name}
                className="bg-[rgba(255,255,255,0.05)] rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-32 object-cover"
                />
                <p className="p-2 text-sm font-medium text-center">{game.name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-[rgba(44,54,57,0.9)] p-4 flex justify-around items-center border-t border-[rgba(255,255,255,0.1)] backdrop-blur-lg">
        <button className="flex flex-col items-center text-[#D3D3D3] hover:text-[#00C4B4] transition-colors">
          <span className="text-xl">💰</span>
          <span className="text-xs">Earn</span>
        </button>
        <button className="flex flex-col items-center text-[#00C4B4]">
          <span className="text-xl">🎮</span>
          <span className="text-xs">Play</span>
        </button>
        <button className="flex flex-col items-center text-[#D3D3D3] hover:text-[#00C4B4] transition-colors">
          <span className="text-xl">👤</span>
          <span className="text-xs">Account</span>
        </button>
      </nav>
    </div>
  );
};

export default HomePage;