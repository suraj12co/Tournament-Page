import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [userPhoto, setUserPhoto] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error || !data?.session) {
                navigate('/login');
            }
            const { data: userData, error: userError } = await supabase
                .from("users")
                .select("*")
                .eq("id", data.session.user.id)
                .single();

            if (userError) return navigate("/signin", { replace: true });
            setLoading(false);
            setUser(userData);
            setDisplayName(userData.name || '');
            setProfilePicture(userData.profile_pictures || "https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain");
        };
        getUser();
    }, [navigate]);
    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (!file || !user) return;
        const filePath = `user_${user.id}/profile_pictures/${file.name}_${Date.now()}`;
        if (user.profile_picture) {
            const oldFilePath = user.profile_picture.split("/").slice(-2).join("/");
            await supabase.storage.from("profile-pictures").remove([oldFilePath]);
            console.log("Old profile picture removed:", oldFilePath);
        }
        await supabase.storage.from("profile-pictures").upload(filePath, file, { cacheControl: "3600", upsert: true });
        const { data: publicUrlData } = supabase.storage.from("profile-pictures").getPublicUrl(filePath);
        const imageUrl = publicUrlData.publicUrl;
        await supabase.from("users").update({ profile_pictures: imageUrl }).eq("id", user.id);
        setUserPhoto(imageUrl);
        setUser({ ...user, profile_picture: imageUrl });
        alert("Profile picture updated successfully!");
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    const handleDisplayNameChange = async (e) => {
        setDisplayName(e.target.value);
        setUpdating(true);

        const { error } = await supabase.auth.updateUser({
            data: { display_name: e.target.value, profile_picture: profilePicture },
        });

        if (error) {
            console.error('Update error:', error);
        }
        setUpdating(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#1C2526] text-white text-xl">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#1C2526] font-sans p-4">
            <h2 className="text-white text-4xl mb-8 drop-shadow-lg">My Profile</h2>
            <div className="bg-[rgba(44,54,57,0.8)] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-[rgba(255,255,255,0.1)] backdrop-blur-lg text-white">
                <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                        {profilePicture ? (
                            <img
                                src={profilePicture}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border-2 border-[rgba(255,255,255,0.2)] mb-4"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center mb-4">
                                <span className="text-[#D3D3D3] text-xl">No Image</span>
                            </div>
                        )}
                        <label className="absolute bottom-0 right-0 bg-[#FF9500] rounded-full p-2 cursor-pointer hover:bg-[#FF3B30] transition-all duration-200">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handlePhotoChange}
                                disabled={updating}
                            />
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 9a2 2 0 012-2h3.93a2 2 0 001.66-.9l1.11-1.48a2 2 0 011.66-.9H18a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </label>
                    </div>
                    <input
                        type="text"
                        value={displayName}
                        onChange={handleDisplayNameChange}
                        placeholder="Enter display name"
                        className="w-full p-2 bg-[rgba(255,255,255,0.05)] text-white rounded-lg border border-[rgba(255,255,255,0.1)] focus:outline-none focus:ring-2 focus:ring-[#FF9500] text-center text-lg"
                        disabled={updating}
                    />
                </div>
                <div className="mb-4">
                    <p className="text-[#D3D3D3] font-medium text-lg mb-1">Email:</p>
                    <p className="text-base">{user?.email}</p>
                </div>
                <div className="mb-6">
                    <p className="text-[#D3D3D3] font-medium text-lg mb-1">Joined:</p>
                    <p className="text-base">
                        {new Date(user?.created_at).toLocaleDateString()}
                    </p>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full p-3 bg-gradient-to-r from-[#FF3B30] to-[#FF9500] text-white rounded-lg text-base font-semibold hover:scale-105 hover:shadow-[0_0_12px_rgba(255,59,48,0.5)] transition-all duration-200 disabled:opacity-50"
                    disabled={updating}
                >
                    {updating ? 'Updating...' : 'Logout'}
                </button>
            </div>
        </div>
    );
};

export default Profile;