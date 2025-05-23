import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Import the Supabase client

const EsportsArena = () => {
  const [user, setUser] = useState(null); // Store the logged-in user
  const [loading, setLoading] = useState(true); // Loading state for session check
  const [selectedDate, setSelectedDate] = useState(''); // Selected date for tournaments
  const [tournaments, setTournaments] = useState([]); // Available tournaments for the date
  const [bookingLoading, setBookingLoading] = useState({}); // Loading state for booking buttons
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  // Check if a user is logged in on component mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error fetching session:', error);
        setError('Failed to check authentication status.');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Fetch tournaments for the selected date
  const fetchTournaments = async (date) => {
    if (!date) return;

    try {
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .eq('date', date);

      if (error) {
        throw error;
      }

      setTournaments(data || []);
    } catch (error) {
      setError(error.message || 'Failed to fetch tournaments.');
      setTournaments([]);
    }
  };

  // Handle date change
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    fetchTournaments(date);
  };

  // Handle booking a tournament slot
  const handleBookSlot = async (tournamentId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    setBookingLoading((prev) => ({ ...prev, [tournamentId]: true }));
    setError(null);

    try {
      // Check if the user has already booked this tournament
      const { data: existingBooking, error: bookingError } = await supabase
        .from('bookings')
        .select('id')
        .eq('user_id', user.id)
        .eq('tournament_id', tournamentId)
        .single();

      if (bookingError && bookingError.code !== 'PGRST116') {
        throw bookingError;
      }

      if (existingBooking) {
        setError('You have already booked this tournament.');
        return;
      }

      // Check if slots are available
      const { data: tournament, error: tournamentError } = await supabase
        .from('tournaments')
        .select('available_slots')
        .eq('id', tournamentId)
        .single();

      if (tournamentError) {
        throw tournamentError;
      }

      if (tournament.available_slots <= 0) {
        setError('No slots available for this tournament.');
        return;
      }

      // Book the slot
      const { error: insertError } = await supabase
        .from('bookings')
        .insert({ user_id: user.id, tournament_id: tournamentId });

      if (insertError) {
        throw insertError;
      }

      // Update available slots
      const { error: updateError } = await supabase
        .from('tournaments')
        .update({ available_slots: tournament.available_slots - 1 })
        .eq('id', tournamentId);

      if (updateError) {
        throw updateError;
      }

      // Refresh the tournament list
      fetchTournaments(selectedDate);
      alert('Slot booked successfully!');
    } catch (error) {
      setError(error.message || 'Failed to book the slot.');
    } finally {
      setBookingLoading((prev) => ({ ...prev, [tournamentId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#1C2526] font-sans">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1C2526] font-sans">
      <h1 className="text-white text-5xl mb-8 drop-shadow-lg">Esports Arena</h1>
      <div className="bg-[rgba(44,54,57,0.8)] p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-[rgba(255,255,255,0.1)] backdrop-blur-lg">
        {user ? (
          <>
            <p className="text-[#D3D3D3] text-center mb-6 text-lg">
              Welcome, <span className="text-[#00C4B4]">{user.email}</span>! Book a tournament slot.
            </p>
            {error && (
              <div className="mb-4 text-red-500 text-center">
                {error}
              </div>
            )}
            <div className="mb-5">
              <label className="block mb-2 text-[#D3D3D3] font-medium text-lg">Select Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                min={new Date().toISOString().split('T')[0]} // Disable past dates
                className="w-full p-3 border border-[rgba(255,255,255,0.2)] rounded-lg bg-[rgba(255,255,255,0.05)] text-white text-base focus:outline-none focus:border-[#00C4B4] focus:ring-2 focus:ring-[#00C4B4] transition duration-300"
              />
            </div>
            {selectedDate && tournaments.length > 0 ? (
              <div className="space-y-4">
                {tournaments.map((tournament) => (
                  <div key={tournament.id} className="p-4 bg-[rgba(255,255,255,0.05)] rounded-lg">
                    <h3 className="text-white text-lg font-semibold">{tournament.name}</h3>
                    <p className="text-[#D3D3D3] text-sm">
                      Date: {new Date(tournament.date).toLocaleDateString()}
                    </p>
                    <p className="text-[#D3D3D3] text-sm">
                      Available Slots: {tournament.available_slots}/{tournament.total_slots}
                    </p>
                    <button
                      onClick={() => handleBookSlot(tournament.id)}
                      disabled={bookingLoading[tournament.id] || tournament.available_slots <= 0}
                      className="mt-2 w-full p-2 bg-gradient-to-r from-[#00C4B4] to-[#34C759] text-white rounded-lg text-sm font-semibold cursor-pointer hover:scale-105 hover:shadow-[0_0_12px_rgba(0,196,180,0.5)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {bookingLoading[tournament.id] ? 'Booking...' : 'Book Slot'}
                    </button>
                  </div>
                ))}
              </div>
            ) : selectedDate ? (
              <p className="text-[#D3D3D3] text-center">No tournaments available on this date.</p>
            ) : null}
          </>
        ) : (
          <>
            <p className="text-[#D3D3D3] text-center mb-6 text-lg">
              Join the ultimate esports experience! Log in to book a tournament slot.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full p-3 mb-4 bg-gradient-to-r from-[#00C4B4] to-[#34C759] text-white rounded-lg text-base font-semibold cursor-pointer hover:scale-105 hover:shadow-[0_0_12px_rgba(0,196,180,0.5)] transition-all duration-200"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="w-full p-3 bg-gradient-to-r from-[#FF9500] to-[#AF52DE] text-white rounded-lg text-base font-semibold cursor-pointer hover:scale-105 hover:shadow-[0_0_12px_rgba(255,149,0,0.5)] transition-all duration-200"
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EsportsArena;