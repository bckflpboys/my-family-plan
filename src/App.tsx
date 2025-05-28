
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Users, UserPlus, Share2, Shield } from 'lucide-react';
import { Families } from './pages/Families';
import { FamilyDetail } from './pages/FamilyDetail';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">Share Subscriptions</span>
              <br />
              <span className="text-gray-900">with Family</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
              Create or join family groups to share premium subscriptions like YouTube Premium, Spotify Family, Apple TV+, and more. Save money together.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg">
                <UserPlus className="h-5 w-5 mr-2" />
                Create Family
              </button>
              <Link
                to="/families"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-indigo-600 bg-white border-2 border-indigo-100 hover:bg-indigo-50 transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md"
              >
                <Users className="h-5 w-5 mr-2" />
                Join Family
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">Simple steps to start sharing subscriptions with your family</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative group">
              <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-200 group-hover:scale-105">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl w-14 h-14 flex items-center justify-center mb-6">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Create or Join Families</h3>
                <p className="text-gray-600 leading-relaxed">Start your own family group or join an existing one. Connect with others who want to share subscriptions and save money together.</p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-200 group-hover:scale-105">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl w-14 h-14 flex items-center justify-center mb-6">
                  <Share2 className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Share Subscriptions</h3>
                <p className="text-gray-600 leading-relaxed">Add your subscription services to the family pool. Get access to other members' shared subscriptions and maximize the value of family plans.</p>
              </div>
            </div>

            <div className="relative group">
              <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-200 group-hover:scale-105">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl w-14 h-14 flex items-center justify-center mb-6">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Trusted</h3>
                <p className="text-gray-600 leading-relaxed">Your subscription details and personal information are protected. Share safely with verified family members in a trusted environment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Sharing?</h2>
            <p className="text-lg text-indigo-100 mb-8">Join our community of families sharing premium subscriptions today.</p>
            <button className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-full text-white hover:bg-white hover:text-indigo-600 transform transition-all duration-200 hover:scale-105">
              <UserPlus className="h-5 w-5 mr-2" />
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router future={{ 
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/families" element={<Families />} />
        <Route path="/families/:id" element={<FamilyDetail />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;