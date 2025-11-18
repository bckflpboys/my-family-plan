
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Users, UserPlus, Share2, Shield, CreditCard, DollarSign, Percent, Globe, CheckCircle, Star, Map } from 'lucide-react';
import { regions } from './utils/regions';
import { Families } from './pages/Families';
import { FamilyDetail } from './pages/FamilyDetail';
import { TermsOfService } from './pages/TermsOfService';
import { TermsOfUse } from './pages/TermsOfUse';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { SignIn } from './pages/auth/signin';
import { UserManagement } from './pages/admin/UserManagement';
import { SessionProvider } from './providers/SessionProvider';
import { AuthProvider } from './contexts/AuthContext';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 border-b-2 border-indigo-300">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 right-0 h-96 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-300 rounded-full blur-3xl"></div>
          <div className="absolute top-10 right-0 w-80 h-80 bg-purple-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-1.5 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-6 border-2 border-indigo-400 shadow-md">
              <Star className="h-4 w-4 mr-2 text-indigo-600" />
              Save up to 70% on your subscription costs
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">Share Subscriptions</span>
              <br />
              <span className="text-gray-900">with Family & Friends</span>
            </h1>
            
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed border-l-4 border-r-4 border-indigo-200 px-6 py-4 bg-white/50 rounded-lg">
              Create or join family groups to share premium subscriptions like YouTube Premium, Spotify Family, Netflix, and Disney+. Manage everything in one place and save money together.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <div className="flex items-center text-sm text-gray-600 bg-white px-3 py-1.5 rounded-full shadow-sm border-2 border-indigo-300">
                <CheckCircle className="h-4 w-4 mr-1.5 text-indigo-500" />
                Easy to manage
              </div>
              <div className="flex items-center text-sm text-gray-600 bg-white px-3 py-1.5 rounded-full shadow-sm border-2 border-indigo-300">
                <CheckCircle className="h-4 w-4 mr-1.5 text-indigo-500" />
                Secure sharing
              </div>
              <div className="flex items-center text-sm text-gray-600 bg-white px-3 py-1.5 rounded-full shadow-sm border-2 border-indigo-300">
                <CheckCircle className="h-4 w-4 mr-1.5 text-indigo-500" />
                Global community
              </div>
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg border-2 border-indigo-500">
                <UserPlus className="h-5 w-5 mr-2" />
                Create Family
              </button>
              <Link
                to="/families"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-indigo-600 bg-white border-2 border-indigo-400 hover:bg-indigo-50 transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md"
              >
                <Users className="h-5 w-5 mr-2" />
                Join Family
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white border-b-2 border-indigo-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider px-3 py-1 bg-indigo-100 rounded-full border border-indigo-300">Features</span>
            <h2 className="mt-2 text-4xl font-bold text-gray-900 tracking-tight">How My Family Plan Works</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">Simple steps to start sharing subscriptions and save money with family and friends</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="relative group">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-indigo-400 transform transition-all duration-200 group-hover:scale-105 group-hover:border-indigo-500 h-full flex flex-col">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl w-16 h-16 flex items-center justify-center mb-6 shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-indigo-200">Create or Join Families</h3>
                <p className="text-gray-600 leading-relaxed flex-grow">
                  Start your own family group or join an existing one. Connect with others who want to share subscriptions and save money together. You can create multiple families for different groups of people.
                </p>
                <div className="mt-4 pt-4 border-t-2 border-indigo-200">
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-5 w-5 mr-2 text-indigo-500" />
                      Global or regional family groups
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-5 w-5 mr-2 text-indigo-500" />
                      Invite friends and family members
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="relative group">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-indigo-400 transform transition-all duration-200 group-hover:scale-105 group-hover:border-indigo-500 h-full flex flex-col">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl w-16 h-16 flex items-center justify-center mb-6 shadow-lg">
                  <Share2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-indigo-200">Share Subscriptions</h3>
                <p className="text-gray-600 leading-relaxed flex-grow">
                  Add your subscription services to the family pool. Get access to other members' shared subscriptions and maximize the value of family plans. Track costs and savings in one place.
                </p>
                <div className="mt-4 pt-4 border-t-2 border-indigo-200">
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-5 w-5 mr-2 text-indigo-500" />
                      Support for 50+ popular services
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-5 w-5 mr-2 text-indigo-500" />
                      Individual and family plan sharing
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative group">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-indigo-400 transform transition-all duration-200 group-hover:scale-105 group-hover:border-indigo-500 h-full flex flex-col">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl w-16 h-16 flex items-center justify-center mb-6 shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-indigo-200">Secure & Trusted</h3>
                <p className="text-gray-600 leading-relaxed flex-grow">
                  Your subscription details and personal information are protected. Share safely with verified family members in a trusted environment with clear terms of service.
                </p>
                <div className="mt-4 pt-4 border-t-2 border-indigo-200">
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-5 w-5 mr-2 text-indigo-500" />
                      Minimal information sharing
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-5 w-5 mr-2 text-indigo-500" />
                      Clear privacy controls
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Savings Section */}
      <div className="py-24 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 border-y-2 border-indigo-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Global Savings</span>
            <h2 className="mt-2 text-4xl font-bold text-gray-900 tracking-tight">Share Across Regions</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">Our platform supports subscription sharing across different regions worldwide</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regions.slice(0, 6).map((region) => (
              <div key={region.id} className="bg-white rounded-2xl shadow-xl p-6 border-2 border-indigo-400 transform transition-all duration-200 hover:scale-105 hover:border-indigo-500">
                <div className="flex items-center mb-4 border-b-2 border-indigo-200 pb-3">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl w-12 h-12 flex items-center justify-center mr-4 shadow-md">
                    <Map className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{region.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Share subscriptions with family members across {region.countries.length} countries in {region.name}.
                </p>
                <div className="flex flex-wrap gap-1 mt-3 pt-2 border-t-2 border-indigo-200">
                  {region.countries.slice(0, 3).map((country) => (
                    <span key={country.code} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border-2 border-indigo-400 shadow-sm">
                      {country.name}
                    </span>
                  ))}
                  {region.countries.length > 3 && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border-2 border-gray-400 shadow-sm">
                      +{region.countries.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border-3 border-white/30 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-3">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Sharing?</h2>
                <p className="text-lg text-indigo-100 mb-4">Join our community of families sharing premium subscriptions today and start saving up to 70% on your monthly bills.</p>
                
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex items-center text-white">
                    <DollarSign className="h-5 w-5 mr-2 text-indigo-200" />
                    <span>Save money</span>
                  </div>
                  <div className="flex items-center text-white">
                    <CreditCard className="h-5 w-5 mr-2 text-indigo-200" />
                    <span>Manage subscriptions</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Globe className="h-5 w-5 mr-2 text-indigo-200" />
                    <span>Global sharing</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2 flex flex-col items-center justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30 w-full max-w-md">
                  <div className="text-center mb-6">
                    <Percent className="h-10 w-10 mx-auto text-white mb-2" />
                    <p className="text-white text-lg font-medium">Start saving today</p>
                  </div>
                  
                  <div className="space-y-4">
                    <Link
                      to="/families"
                      className="w-full inline-flex items-center justify-center px-6 py-3 border-2 border-white text-base font-medium rounded-xl text-white hover:bg-white hover:text-indigo-600 transform transition-all duration-200"
                    >
                      <Users className="h-5 w-5 mr-2" />
                      Browse Families
                    </Link>
                    
                    <button className="w-full inline-flex items-center justify-center px-6 py-3 bg-white text-base font-medium rounded-xl text-indigo-600 hover:bg-indigo-50 transform transition-all duration-200">
                      <UserPlus className="h-5 w-5 mr-2" />
                      Create Your Family
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="mt-2 text-4xl font-bold text-gray-900 tracking-tight">What Our Users Say</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">Real stories from families sharing subscriptions on our platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg border-2 border-indigo-200 relative">
              <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                <div className="bg-indigo-500 rounded-full p-2 shadow-lg">
                  <Star className="h-6 w-6 text-white" fill="white" />
                </div>
              </div>
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400" fill="#FBBF24" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-6 flex-grow">
                  "My family saves over $30 each month by sharing our streaming subscriptions. The platform makes it so easy to manage who has access to what!"
                </p>
                <div className="flex items-center">
                  <div className="bg-indigo-100 rounded-full h-12 w-12 flex items-center justify-center mr-4 text-indigo-700 font-bold">
                    JD
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">John Doe</h4>
                    <p className="text-sm text-gray-600">Family group of 5</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg border-2 border-indigo-200 relative">
              <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                <div className="bg-indigo-500 rounded-full p-2 shadow-lg">
                  <Star className="h-6 w-6 text-white" fill="white" />
                </div>
              </div>
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400" fill="#FBBF24" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-6 flex-grow">
                  "I was paying for 6 different streaming services. Now our extended family shares the cost and we all get access to everything. It's a game-changer!"
                </p>
                <div className="flex items-center">
                  <div className="bg-indigo-100 rounded-full h-12 w-12 flex items-center justify-center mr-4 text-indigo-700 font-bold">
                    AS
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Alice Smith</h4>
                    <p className="text-sm text-gray-600">Family group of 8</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg border-2 border-indigo-200 relative">
              <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                <div className="bg-indigo-500 rounded-full p-2 shadow-lg">
                  <Star className="h-6 w-6 text-white" fill="white" />
                </div>
              </div>
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400" fill="#FBBF24" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-6 flex-grow">
                  "The legal pages gave me confidence that everything is above board. We're saving money while staying compliant with the terms of our subscriptions."
                </p>
                <div className="flex items-center">
                  <div className="bg-indigo-100 rounded-full h-12 w-12 flex items-center justify-center mr-4 text-indigo-700 font-bold">
                    RJ
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Robert Johnson</h4>
                    <p className="text-sm text-gray-600">Family group admin</p>
                  </div>
                </div>
              </div>
            </div>
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
      {/* Wrap the entire app with SessionProvider and AuthProvider */}
      <SessionProvider>
        <AuthProvider>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/families" element={<Families />} />
            <Route path="/families/:id" element={<FamilyDetail />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/admin/users" element={<UserManagement />} />
          </Routes>
          

          
          <Footer />
        </AuthProvider>
      </SessionProvider>
    </Router>
  );
}

export default App;