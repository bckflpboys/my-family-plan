import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, LogOut, User, ChevronDown, Settings, UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/useAuth';

export function AuthButton() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAuthenticated, session, signOut: handleSignOut } = useAuth();
  
  // Debug logs
  console.log('AuthButton - isAuthenticated:', isAuthenticated);
  console.log('AuthButton - session:', session);
  
  const userName = session?.user?.name || '';
  const userImage = session?.user?.image || '';

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const onSignOut = async () => {
    await handleSignOut();
  };

  console.log('AuthButton - Rendering authenticated state:', isAuthenticated);
  
  if (isAuthenticated) {
    return (
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 focus:outline-none"
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 border-2 border-indigo-300">
            {userImage ? (
              <img src={userImage} alt={userName} className="h-full w-full rounded-full" />
            ) : (
              <User className="h-4 w-4" />
            )}
          </div>
          <span className="hidden md:block text-sm font-medium text-gray-700">{userName || 'User'}</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>

        {dropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border-2 border-indigo-300"
            onBlur={() => setDropdownOpen(false)}
          >
            <Link
              to="/profile"
              className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 flex items-center"
              onClick={() => setDropdownOpen(false)}
            >
              <User className="h-4 w-4 mr-2 text-indigo-500" />
              Your Profile
            </Link>
            <Link
              to="/settings"
              className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 flex items-center"
              onClick={() => setDropdownOpen(false)}
            >
              <Settings className="h-4 w-4 mr-2 text-indigo-500" />
              Settings
            </Link>
            <button
              onClick={() => {
                onSignOut();
                setDropdownOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2 text-indigo-500" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Link
        to="/auth/signin"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <LogIn className="h-4 w-4 mr-2" />
        Sign In
      </Link>
      <Link
        to="/auth/signin?signup=true"
        className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <UserPlus className="h-4 w-4 mr-2" />
        Sign Up
      </Link>
    </div>
  );
}

export default AuthButton;
