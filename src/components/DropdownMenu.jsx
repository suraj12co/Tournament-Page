import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setCurrentUser(session.user);
      } else {
        navigate('/login');
      }
    };

    fetchSession();

    // Listen for auth state changes
    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setCurrentUser(session.user);
      } else {
        setCurrentUser(null);
        navigate('/login');
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="menu-page">
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>{currentUser.email}</h2>
          <button onClick={toggleSidebar} className="toggle-button">
            {isOpen ? '✖' : '☰'}
          </button>
        </div>
        <div className="sidebar-menu">
          <a href="/home"><span className="menu-icon">🏠</span>{isOpen && 'Home'}</a>
          <a href="/tournament-register"><span className="menu-icon">🎮</span>{isOpen && 'Tournament Register'}</a>
          <a href="#" onClick={handleLogout}><span className="menu-icon">🚪</span>{isOpen && 'Logout'}</a>
        </div>
      </div>
      <div className="main-content">
        <h1>Welcome to the Tournament Hub!</h1>
      </div>

      <style>
        {`
          .menu-page {
            min-height: 100vh;
            background: #1C2526;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            color: #FFFFFF;
          }
          .sidebar {
            background: rgba(44, 54, 57, 0.9);
            backdrop-filter: blur(10px);
            width: 250px;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            transition: width 0.3s ease;
            border-right: 1px solid rgba(255, 255, 255, 0.1);
            overflow: hidden;
          }
          .sidebar.closed {
            width: 60px;
          }
          .sidebar-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          .sidebar-header h2 {
            color: #FFFFFF;
            margin: 0;
            font-size: 1.5rem;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .toggle-button {
            background: none;
            border: none;
            color: #D3D3D3;
            font-size: 20px;
            cursor: pointer;
            transition: color 0.3s ease;
          }
          .toggle-button:hover {
            color: #00C4B4;
          }
          .sidebar-menu {
            padding: 20px 0;
          }
          .sidebar-menu a {
            display: flex;
            align-items: centeHomePage
            text-decoration: none;
            font-size: 16px;
            font-weight: 500;
            transition: background 0.3s ease, color 0.3s ease;
          }
          .sidebar-menu a:hover {
            background: linear-gradient(90deg, #00C4B4, #34C759);
            color: #FFFFFF;
            text-shadow: 0 0 5px rgba(0, 196, 180, 0.5);
          }
          .menu-icon {
            margin-right: 10px;
            font-size: 20px;
            width: 20px;
            text-align: center;
          }
          .main-content {
            margin-left: 250px;
            padding: 40px;
            flex: 1;
            transition: margin-left 0.3s ease;
          }
          .menu-page .closed + .main-content {
            margin-left: 60px;
          }
          .main-content h1 {
            color: #FFFFFF;
            font-size: 2.5rem;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          }
        `}
      </style>
    </div>
  );
};

export default DropdownMenu;