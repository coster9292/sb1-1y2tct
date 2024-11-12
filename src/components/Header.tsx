import React, { useState } from 'react';
import { Car, Settings, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="relative">
              <div className="absolute inset-0 bg-teal-200 rounded-lg blur-sm group-hover:blur-md transition-all"></div>
              <Car className="h-8 w-8 text-teal-600 relative" />
            </div>
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
              Autoyard
            </h1>
          </div>

          <nav className="flex items-center gap-4">
            <div className="bg-gray-100/50 p-1.5 rounded-xl flex gap-1">
              <Link
                to="/"
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 
                  ${isActive('/') 
                    ? 'text-teal-700'
                    : 'text-gray-700 hover:text-teal-600'
                  }`}
              >
                {isActive('/') && (
                  <div className="absolute inset-0 bg-white rounded-lg shadow-sm animate-fade-in"></div>
                )}
                <span className="relative">Car Screener</span>
              </Link>
              <Link
                to="/auto-agent"
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                  ${isActive('/auto-agent')
                    ? 'text-teal-700'
                    : 'text-gray-700 hover:text-teal-600'
                  }`}
              >
                {isActive('/auto-agent') && (
                  <div className="absolute inset-0 bg-white rounded-lg shadow-sm animate-fade-in"></div>
                )}
                <span className="relative">Auto Agent</span>
              </Link>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center
                         hover:bg-teal-100 transition-colors"
              >
                <span className="text-teal-600 font-medium">
                  {user?.email.charAt(0).toUpperCase()}
                </span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                  </div>
                  <Link
                    to="/settings"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}