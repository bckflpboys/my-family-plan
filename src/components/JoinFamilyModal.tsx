import { useState } from 'react';
import { X, UserPlus, CreditCard, AlertCircle, Search, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { subscriptions as allSubscriptions } from '../utils/subscriptions';
import { countries } from '../utils/countries';

interface JoinFamilyModalProps {
  isOpen: boolean;
  onClose: () => void;
  familyName: string;
  familyId: string;
  subscriptions: Array<{
    name: string;
    price: string;
    costPerMember: string;
  }>;
}

export function JoinFamilyModal({ isOpen, onClose, familyName, familyId, subscriptions }: JoinFamilyModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>([]);
  const [userSubscriptionsToOffer, setUserSubscriptionsToOffer] = useState<{id: string, name: string, planType: 'individual' | 'family'}[]>([]);
  const [agreed, setAgreed] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [userNickname, setUserNickname] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userCountry, setUserCountry] = useState<string>('');
  const [subscriptionSearchQuery, setSubscriptionSearchQuery] = useState<string>('');
  const [familySubscriptionSearchQuery, setFamilySubscriptionSearchQuery] = useState<string>('');
  const [countrySearchQuery, setCountrySearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const handleSubscriptionToggle = (name: string) => {
    setSelectedSubscriptions(prev => 
      prev.includes(name)
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (userName.trim() === '' || userEmail.trim() === '' || userNickname.trim() === '') {
        // Show validation error
        return;
      }
      // Auto-select all subscriptions
      const allSubscriptionNames = subscriptions.map(sub => sub.name);
      setSelectedSubscriptions(allSubscriptionNames);
      // Skip step 2 and go directly to step 3
      setStep(3);
    } else if (step === 3) {
      // Move to confirmation screen
      setStep(4);
    } else if (step === 4) {
      // Here you would handle the actual join request
      console.log('Join request submitted', {
        familyId,
        userName,
        userNickname,
        userEmail,
        selectedSubscriptions,
        userSubscriptionsToOffer,
        agreed
      });
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden my-auto border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-4 sm:p-5 text-white relative shadow-lg">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-white/80 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-semibold flex items-center">
            <UserPlus className="h-5 w-5 mr-2" />
            Join Family
          </h2>
          <p className="mt-1 text-white/80">
            {step === 1 ? 'Your Information' : 
             step === 2 ? 'Select Subscriptions' : 
             'Complete Payment Details'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-4 sm:p-5 max-h-[70vh] overflow-y-auto">
            {step === 1 ? (
              /* Step 1: Your Information */
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4 p-3 bg-indigo-50 rounded-lg border-2 border-indigo-200">
                  You're joining <span className="font-semibold text-indigo-600">{familyName}</span>
                </div>
                
                <div className="space-y-4 border-2 border-indigo-200 rounded-xl p-4 shadow-md">
                  <div>
                    <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="userName"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm bg-white shadow"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="userNickname" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Nickname
                    </label>
                    <input
                      type="text"
                      id="userNickname"
                      value={userNickname}
                      onChange={(e) => setUserNickname(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm bg-white shadow"
                      placeholder="Enter your nickname"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="userEmail"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm bg-white shadow"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Country
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={countrySearchQuery}
                        onChange={(e) => setCountrySearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Search for your country"
                      />
                    </div>
                    <div className="mt-1 max-h-40 overflow-y-auto border-2 border-gray-300 rounded-lg shadow">
                      {countries
                        .filter(country => country.name.toLowerCase().includes(countrySearchQuery.toLowerCase()))
                        .map((country) => (
                          <div 
                            key={country.code} 
                            className={`px-3 py-2 text-sm cursor-pointer hover:bg-indigo-50/50 ${userCountry === country.code ? 'bg-indigo-100 text-indigo-800 font-medium' : ''}`}
                            onClick={() => setUserCountry(country.code)}
                          >
                            {country.name}
                          </div>
                        ))}
                      {countries.filter(country => country.name.toLowerCase().includes(countrySearchQuery.toLowerCase())).length === 0 && (
                        <div className="p-3 text-sm text-gray-500 text-center">
                          No countries found matching your search.
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Subscriptions in {familyName}
                    </label>
                    <div className="border-2 border-gray-300 rounded-lg divide-y-2 divide-gray-200 bg-gray-50 shadow">
                      {subscriptions.map((subscription, index) => (
                        <div key={index} className="p-2 sm:p-3">
                          <div>
                            <div className="font-medium text-sm sm:text-base">{subscription.name}</div>
                            <div className="text-xs sm:text-sm text-gray-500">
                              {subscription.price} - <span className="text-indigo-600">{subscription.costPerMember}</span> per member
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      These are the current subscriptions available in this family
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      What Are You Offering? <span className="text-xs text-indigo-600 font-normal">(Select up to 3)</span>
                    </label>
                    {/* Search input */}
                    <div className="relative mb-3">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={subscriptionSearchQuery}
                        onChange={(e) => setSubscriptionSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm shadow"
                        placeholder="Search your subscriptions..."
                      />
                    </div>

                    <div className="max-h-60 overflow-y-auto space-y-3 p-2 border-2 border-gray-300 rounded-lg shadow">
                      {allSubscriptions
                        .filter(sub => sub.name.toLowerCase().includes(subscriptionSearchQuery.toLowerCase()))
                        .map((subscription, index) => (
                          <div 
                            key={index} 
                            className={`p-2 sm:p-3 flex flex-col gap-2 border-2 rounded-lg ${userSubscriptionsToOffer.some(sub => sub.id === subscription.id) 
                              ? 'border-indigo-400 bg-indigo-50' 
                              : 'border-gray-300'}`
                            }
                          >
                            <div className="flex-1">
                              <div className="font-medium text-sm sm:text-base">{subscription.name}</div>
                              <div className="text-xs sm:text-sm text-gray-500">
                                {subscription.description}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {subscription.plans.some(plan => plan.type === 'individual') && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const existingIndex = userSubscriptionsToOffer.findIndex(sub => sub.id === subscription.id && sub.planType === 'individual');
                                    if (existingIndex >= 0) {
                                      // Remove if already selected
                                      setUserSubscriptionsToOffer(prev => prev.filter((_, i) => i !== existingIndex));
                                    } else {
                                      // Check if already at max selections
                                      if (userSubscriptionsToOffer.length >= 3) {
                                        // Don't add more than 3
                                        return;
                                      }
                                      // Add to selected
                                      setUserSubscriptionsToOffer(prev => [...prev, {
                                        id: subscription.id,
                                        name: subscription.name,
                                        planType: 'individual'
                                      }]);
                                    }
                                  }}
                                  className={`px-2 py-1 text-xs rounded-md ${userSubscriptionsToOffer.some(sub => sub.id === subscription.id && sub.planType === 'individual') 
                                    ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'}`}
                                >
                                  Individual
                                </button>
                              )}
                              {subscription.plans.some(plan => plan.type === 'family') && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const existingIndex = userSubscriptionsToOffer.findIndex(sub => sub.id === subscription.id && sub.planType === 'family');
                                    if (existingIndex >= 0) {
                                      // Remove if already selected
                                      setUserSubscriptionsToOffer(prev => prev.filter((_, i) => i !== existingIndex));
                                    } else {
                                      // Check if already at max selections
                                      if (userSubscriptionsToOffer.length >= 3) {
                                        // Don't add more than 3
                                        return;
                                      }
                                      // Add to selected
                                      setUserSubscriptionsToOffer(prev => [...prev, {
                                        id: subscription.id,
                                        name: subscription.name,
                                        planType: 'family'
                                      }]);
                                    }
                                  }}
                                  className={`px-2 py-1 text-xs rounded-md ${userSubscriptionsToOffer.some(sub => sub.id === subscription.id && sub.planType === 'family') 
                                    ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' 
                                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'}`}
                                >
                                  Family
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      {allSubscriptions.filter(sub => sub.name.toLowerCase().includes(subscriptionSearchQuery.toLowerCase())).length === 0 && (
                        <div className="p-4 text-center text-sm text-gray-500">
                          No subscriptions found matching your search.
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Select subscriptions you're willing to share with this family (max 3).
                      </p>
                      <p className="text-sm text-indigo-600 mt-1">
                        The family owner will choose which subscriptions to accept.
                      </p>
                      {userSubscriptionsToOffer.length >= 3 && (
                        <p className="text-amber-600 text-sm flex items-center mt-1">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Maximum of 3 subscriptions reached
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : step === 2 ? (
              /* Step 2: Select subscriptions */
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-600">
                    Select subscriptions you want to join from <span className="font-semibold text-indigo-600">{familyName}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const allSubscriptionNames = subscriptions.map(sub => sub.name);
                      setSelectedSubscriptions(allSubscriptionNames);
                    }}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors"
                  >
                    Join All Subscriptions
                  </button>
                </div>
                
                {/* Search input */}
                <div className="relative mb-3">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={familySubscriptionSearchQuery}
                    onChange={(e) => setFamilySubscriptionSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search family subscriptions..."
                  />
                </div>
                
                <div className="border rounded-lg divide-y max-h-60 overflow-y-auto">
                  {subscriptions
                    .filter(sub => sub.name.toLowerCase().includes(familySubscriptionSearchQuery.toLowerCase()))
                    .map((subscription, index) => (
                      <div key={index} className="p-2 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex-1">
                          <div className="font-medium text-sm sm:text-base">{subscription.name}</div>
                          <div className="text-xs sm:text-sm text-gray-500">
                            <span className="text-indigo-600">{subscription.costPerMember}</span> per month (save vs. {subscription.price})
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer self-end sm:self-auto">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={selectedSubscriptions.includes(subscription.name)}
                            onChange={() => handleSubscriptionToggle(subscription.name)}
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                    ))}
                  {subscriptions.filter(sub => sub.name.toLowerCase().includes(familySubscriptionSearchQuery.toLowerCase())).length === 0 && (
                    <div className="p-4 text-center text-sm text-gray-500">
                      No family subscriptions found matching your search.
                    </div>
                  )}
                </div>
                
                {selectedSubscriptions.length === 0 && (
                  <div className="text-amber-600 text-sm flex items-center mt-2">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Please select at least one subscription
                  </div>
                )}
              </div>
            ) : step === 3 ? (
              /* Step 3: Summary of selections */
              <div className="space-y-4">
                <div className="border-2 border-indigo-200 rounded-xl overflow-hidden shadow-md">
                  {/* Summary header */}
                  <div className="bg-indigo-50 p-3 border-b-2 border-indigo-200">
                    <h3 className="font-medium text-lg text-indigo-800">Membership Summary</h3>
                    <p className="text-sm text-indigo-600">Review your information before joining {familyName}</p>
                  </div>
                  
                  {/* Personal information section */}
                  <div className="p-4 border-b-2 border-indigo-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <UserPlus className="h-4 w-4 mr-2 text-indigo-500" />
                      Personal Information
                    </h4>
                    <div className="bg-white p-3 rounded-lg border-2 border-gray-300 shadow">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Name:</span>
                          <div className="font-medium">{userName}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Nickname:</span>
                          <div className="font-medium">{userNickname}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Email:</span>
                          <div className="font-medium">{userEmail}</div>
                        </div>
                        {userCountry && (
                          <div className="col-span-2">
                            <span className="text-gray-500">Country:</span>
                            <div className="font-medium">{countries.find(c => c.code === userCountry)?.name || userCountry}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Subscriptions section */}
                  <div className="p-4 border-b-2 border-indigo-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-indigo-500" />
                      Subscriptions You're Joining
                    </h4>
                    <div className="bg-white p-3 rounded-lg border-2 border-gray-300 shadow">
                      <div className="mb-3 bg-green-50 p-2 rounded-lg border-2 border-green-200">
                        <div className="text-sm text-green-700 font-medium flex items-center">
                          <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2 py-0.5 rounded">SAVINGS</span>
                          These are the savings you'll get by joining this family
                        </div>
                      </div>
                      
                      <div className="divide-y-2 divide-gray-200">
                        {selectedSubscriptions.map((name, index) => {
                          const sub = subscriptions.find(s => s.name === name);
                          return (
                            <div key={index} className="py-2 flex items-center justify-between text-sm">
                              <span className="font-medium">{name}</span>
                              <span className="text-green-600 font-semibold">
                                {sub?.costPerMember}
                              </span>
                            </div>
                          );
                        })}
                        <div className="py-3 flex justify-between font-medium">
                          <span className="text-green-700">Total monthly savings</span>
                          <span className="text-green-700 font-bold">
                            ${selectedSubscriptions.reduce((total, name) => {
                              const sub = subscriptions.find(s => s.name === name);
                              return total + parseFloat(sub?.costPerMember.replace(/[^0-9.]/g, '') || '0');
                            }, 0).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* User offerings section */}
                  {userSubscriptionsToOffer.length > 0 && (
                    <div className="p-4 border-b-2 border-indigo-200">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Subscriptions You're Offering
                      </h4>
                      <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm divide-y divide-gray-100">
                        {userSubscriptionsToOffer.map((userSub, index) => {
                          const subscription = allSubscriptions.find(s => s.id === userSub.id);
                          const plan = subscription?.plans.find(p => p.type === userSub.planType);
                          return (
                            <div key={index} className="py-2 flex items-center justify-between text-sm">
                              <span className="font-medium">{userSub.name}</span>
                              <span className="text-green-600 font-semibold">
                                {plan?.name} ({userSub.planType})
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 bg-gray-50 p-4 rounded-lg border-2 border-gray-300 shadow">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={() => setAgreed(!agreed)}
                      className="h-5 w-5 mt-0.5 text-indigo-600 focus:ring-indigo-500 rounded border-gray-400"
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      I agree to the <Link to="/terms-of-use" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">Terms of Use</Link> and <Link to="/terms-of-service" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">Terms of Service</Link>. I understand that my email and nickname will be shared with family members. No other personal information will be shared.
                    </span>
                  </label>
                </div>
              </div>
            ) : (
              /* Step 4: Confirmation */
              <div className="space-y-4">
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center shadow-md">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Request Submitted!</h3>
                  <p className="text-green-700 mb-4">Your request to join {familyName} has been sent.</p>
                  
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-4 text-left mb-4 shadow-sm">
                    <h4 className="font-medium text-gray-800 mb-2">What happens next?</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">1.</span>
                        <span>Your nickname and email will be shared with the family owner.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">2.</span>
                        <span>The family owner will review your subscription offerings and decide which to accept.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">3.</span>
                        <span>The approval process may take up to 7 days.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">4.</span>
                        <span>Once approved, you'll receive the emails and nicknames of all family members to add to your accepted subscription(s).</span>
                      </li>
                    </ul>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    We'll notify you by email once your request has been processed.
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* Footer */}
          <div className="p-4 sm:p-5 bg-gray-50 border-t flex justify-between">
            <button
              type="button"
              onClick={() => {
                if (step === 4) {
                  setStep(3);
                } else if (step > 1) {
                  setStep(1);
                } else {
                  onClose();
                }
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              {step === 1 ? 'Cancel' : step === 4 ? 'Back' : 'Back'}
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-sm font-medium rounded-md text-white ${step === 3 && !agreed ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
              disabled={step === 3 && !agreed}
            >
              {step === 3 ? 'Submit Request' : step === 4 ? 'Close' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JoinFamilyModal;
