import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { AuthButton } from './auth/AuthButton';

export function Navbar() {
  // We don't need to pass props to AuthButton as it uses the useAuth hook internally

  return (
    <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <Users className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">My Family Plan</span>
          </Link>
          <div className="flex items-center space-x-4">
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
