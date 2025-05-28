import { Link } from 'react-router-dom';
import { Users, LogIn } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <Users className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">My Family Plan</span>
          </Link>
          <div className="flex items-center space-x-4">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
