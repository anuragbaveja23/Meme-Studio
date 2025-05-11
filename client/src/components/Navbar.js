import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            Meme Engine
          </Link>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/create"
                  className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark"
                >
                  Create Meme
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 