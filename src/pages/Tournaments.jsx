import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Tournaments = () => {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserAndFetchTournaments = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) {
                navigate('/login');
                return;
            }

            const { data, error: fetchError } = await supabase
                .from('tournaments')
                .select('*')
                .order('date', { ascending: true });
                
            if (fetchError) {
                console.error('Error fetching tournaments:', fetchError);
            } else {
                setTournaments(data);
            }
            setLoading(false);
        };

        checkUserAndFetchTournaments();
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#1C2526] text-white text-xl">
                Loading tournaments...
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-[#1C2526] font-sans p-4">
            <h2 className="text-white text-4xl mb-8 drop-shadow-lg">Registered Tournaments</h2>
            <div className="w-full max-w-2xl">
                {tournaments.length === 0 ? (
                    <p className="text-[#D3D3D3] text-center text-lg">
                        There's no tournament available right now. Please check back later.
                        <br />
                    </p>
                ) : (
                    <div className="space-y-4">
                        {tournaments.map((tournament) => (
                            <div
                                key={tournament.id}
                                className="bg-[rgba(44,54,57,0.8)] p-6 rounded-2xl shadow-2xl border border-[rgba(255,255,255,0.1)] backdrop-blur-lg text-white"
                            >
                                <h3 className="text-xl font-semibold mb-2">{tournament.name}</h3>
                                <p className="text-[#D3D3D3] mb-1">
                                    <span className="font-medium">Date:</span>{' '}
                                    {new Date(tournament.date).toLocaleDateString()}
                                </p>
                                <p className="text-[#D3D3D3] mb-1">
                                    <span className="font-medium">Location:</span>{' '}
                                    {tournament.location || 'Not specified'}
                                </p>
                                <p className="text-[#D3D3D3]">
                                    <span className="font-medium">Registered:</span>{' '}
                                    {new Date(tournament.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
                <button
                    onClick={() => navigate('/profile')}
                    className="mt-8 w-full p-3 bg-gradient-to-r from-[#FF3B30] to-[#FF9500] text-white rounded-lg text-base font-semibold hover:scale-105 hover:shadow-[0_0_12px_rgba(255,59,48,0.5)] transition-all duration-200"
                >
                    Back to Profile
                </button>
            </div>
        </div>
    );
};

export default Tournaments;