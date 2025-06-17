import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const [activeMatchTab, setActiveMatchTab] = useState('Ongoing');
  const [activeGameTab, setActiveGameTab] = useState('Tournament');
  const matchTabs = ['Ongoing', 'Upcoming', 'Completed'];
  const gameTabs = ['Team', 'Solo'];
  const [balance, setBalance] = useState(0.0);
  const [userPhoto, setUserPhoto] = useState("");
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const teamGames = [
    { name: 'FF MAX BR', image: 'https://news.seagm.com/wp-content/uploads/2021/04/free-fire-clash-squad-season-6-feat2x.jpg' },
    { name: 'Clash Squad CS 4V4', image: 'https://staticg.sportskeeda.com/editor/2022/01/e65fd-16426564526595-1920.jpg' },
    { name: 'Clash Squad CS 2V2', image: 'https://i.ytimg.com/vi/XBdoVebYXXk/maxresdefault.jpg' },
    { name: 'Lone Wolf LW 2V2', image: 'https://i.ytimg.com/vi/XBdoVebYXXk/maxresdefault.jpg' },
  ];

  const soloGames = [
    { name: 'Survival', image: 'https://news.seagm.com/wp-content/uploads/2021/04/free-fire-clash-squad-season-6-feat2x.jpg' },
    { name: 'Lone Wolf LW 1V1', image: 'https://th.bing.com/th/id/OIP.3NNc_cX3J9l1RH19OtC-xwHaEK?rs=1&pid=ImgDetMain' },
  ];
  useEffect(() => {
  const getUser = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data?.session?.user?.id) {
      navigate('/login');
      return;
    }

    const userId = data.session.user.id;
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (userError || !userData) {
      navigate("/login", { replace: true });
      return;
    }


    setDisplayName(userData.name || '');
    setUserPhoto(
      userData.profile_pictures?.trim()
        ? userData.profile_pictures
        : "https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain"
    );
    setBalance(userData.balance ?? 0.0);
    setLoading(false);
  };

  getUser();
}, [navigate]);


  return (
    <div className="min-h-screen bg-[#1C2526] text-white font-sans flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-[#1C2526] shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <img
              src={userPhoto || "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"}
              alt="Profile" className='w-full h-full rounded-full object-cover'
            />
          </div>
          <div>
            <p className="text-sm opacity-70">Welcome Back,</p>
            <h1 className="text-lg font-semibold">{displayName}</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-[rgba(44,54,57,0.8)] px-3 py-1 rounded-full">
          <span className="text-yellow-400">💰</span>
          <span className="text-sm font-medium">{balance.toFixed(2)}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Banner */}
        <div className="relative bg-[rgba(44,54,57,0.8)] rounded-2xl shadow-2xl border border-[rgba(255,255,255,0.1)] backdrop-blur-lg overflow-hidden">
          <img
            src="https://logospng.org/download/whatsapp/logo-whatsapp-verde-icone-ios-android-4096.png"
            alt="Banner"
            className="w-full h-32 object-cover opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium">1. JOIN OUR WHATSAPP CHANNEL</p>
              <p className="text-xs opacity-70">2. GIVEAWAYS & MORE UPDATES!</p>
            </div>
            <button onClick={() => window.open('https://chat.whatsapp.com/GLVRCjJj2IV0kCw6vI1ZtM')} className="bg-gradient-to-r from-[#00C4B4] to-[#34C759] text-white rounded-lg px-4 py-2 text-sm font-semibold hover:scale-105 hover:shadow-[0_0_12px_rgba(0,196,180,0.5)] transition-all">
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
                className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${activeMatchTab === tab
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
                className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${activeGameTab === tab
                  ? 'bg-gradient-to-r from-[#00C4B4] to-[#34C759] text-white'
                  : 'bg-[rgba(255,255,255,0.05)] text-[#D3D3D3]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {(activeGameTab === 'Solo' ? soloGames : teamGames).map((game) => (
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
    </div>
  );
};

export default HomePage;
