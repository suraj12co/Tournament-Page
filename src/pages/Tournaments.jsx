import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Tournaments = () => {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTournament, setSelectedTournament] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [joining, setJoining] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
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

    const openModal = async (tournament) => {
        setSelectedTournament(tournament);
        const { data: { user } } = await supabase.auth.getUser();
        const { data: registrationData, error: registrationError } = await supabase
            .from('tournament_registrations')
            .select('id')
            .eq('user_id', user.id)
            .eq('tournament_id', tournament.id);

        if (registrationError) {
            console.error('Error checking registration:', registrationError);
        } else {
            setIsRegistered(registrationData.length > 0);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTournament(null);
        setIsRegistered(false);
    };

    const handleJoinTournament = async () => {
        if (!selectedTournament || isRegistered) return;

        setJoining(true);
        const { data: { user } } = await supabase.auth.getUser();
        const { error } = await supabase
            .from('tournament_registrations')
            .insert({
                user_id: user.id,
                tournament_id: selectedTournament.id,
            });

        if (error) {
            alert('Failed to join tournament. Please try again.');
        } else {
            
            alert('Successfully joined the tournament!');
            setIsRegistered(true);
        }
        setJoining(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#1C2526] text-white text-xl">
                Loading tournaments...
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-[#1C2526] font-sans p-4">
            <h2 className="text-white text-4xl mb-8 drop-shadow-lg">Tournaments</h2>
            <div className="w-full max-w-2xl">
                {tournaments.length === 0 ? (
                    <p className="text-[#D3D3D3] text-center text-lg">
                        There's no tournament available right now. Please check back later.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {tournaments.map((tournament) => (
                            <div
                                key={tournament.id}
                                className="bg-[rgba(44,54,57,0.8)] p-6 rounded-2xl shadow-2xl border border-[rgba(255,255,255,0.1)] backdrop-blur-lg text-white"
                            >
                                <h3 className="text-xl font-semibold mb-2">{tournament.name}</h3>
                                <p className="text-[#D3D3D3] mb-2">
                                    <span className="font-medium">Players:</span>{' '}
                                    {tournament.players || 'No data available'}
                                </p>
                                <p className="text-[#D3D3D3] mb-1">
                                    <span className="font-medium">Date:</span>{' '}
                                    {new Date(tournament.date).toLocaleDateString()}
                                </p>
                                <p className="text-[#D3D3D3] mb-1">
                                    <span className="font-medium">Time:</span>{' '}
                                    {new Date(tournament.date).toLocaleTimeString()}
                                </p>
                                <button
                                    className="mt-4 w-full p-3 bg-gradient-to-r from-[#FF3B30] to-[#FF9500] text-white rounded-lg text-base font-semibold hover:scale-105 hover:shadow-[0_0_12px_rgba(255,59,48,0.5)] transition-all duration-200"
                                    onClick={() => openModal(tournament)}
                                >
                                    View Details
                                </button>
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

            {/* Modal for Tournament Details */}
            {isModalOpen && selectedTournament && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[rgba(44,54,57,0.95)] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-[rgba(255,255,255,0.1)] backdrop-blur-lg text-white">
                        <h3 className="text-2xl font-semibold mb-4">{selectedTournament.name}</h3>
                        <p className="text-[#D3D3D3] mb-2">
                            <span className="font-medium">Date:</span>{' '}
                            {new Date(selectedTournament.date).toLocaleDateString()}
                        </p>
                        <p className="text-[#D3D3D3] mb-2">
                            <span className="font-medium">Time:</span>{' '}
                            {new Date(selectedTournament.date).toLocaleTimeString()}
                        </p>
                        <p className="text-[#D3D3D3] mb-2">
                            <span className="font-medium">Location:</span>{' '}
                            {selectedTournament.location || 'Not specified'}
                        </p>
                        <p className="text-[#D3D3D3] mb-4">
                            <span className="font-medium">Players:</span>{' '}
                            {selectedTournament.players || 'No data available'}
                        </p>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleJoinTournament}
                                className="flex-1 p-3 bg-gradient-to-r from-[#FF3B30] to-[#FF9500] text-white rounded-lg text-base font-semibold hover:scale-105 hover:shadow-[0_0_12px_rgba(255,59,48,0.5)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={joining || isRegistered}
                            >
                                {joining ? 'Joining...' : isRegistered ? 'Registered' : 'Join Now'}
                            </button>
                            <button
                                onClick={closeModal}
                                className="flex-1 p-3 bg-[rgba(255,255,255,0.1)] text-white rounded-lg text-base font-semibold hover:bg-[rgba(255,255,255,0.2)] transition-all duration-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tournaments;