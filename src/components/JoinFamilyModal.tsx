import { useState } from 'react';
import { X, UserPlus, CreditCard, AlertCircle, Search, Globe } from 'lucide-react';
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
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>([]);
  const [userSubscriptionsToOffer, setUserSubscriptionsToOffer] = useState<{id: string, name: string, planType: 'individual' | 'family'}[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [agreed, setAgreed] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
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
      if (userName.trim() === '' || userEmail.trim() === '') {
        // Show validation error
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (selectedSubscriptions.length === 0) {
        // Show validation error
        return;
      }
      setStep(3);
    } else {
      // Here you would handle the actual join request
      console.log('Join request submitted', {
        familyId,
        userName,
        userEmail,
        selectedSubscriptions,
        userSubscriptionsToOffer,
        paymentMethod,
        agreed
      });
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 sm:p-5 text-white relative">
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
                <div className="text-sm text-gray-600 mb-4">
                  You're joining <span className="font-semibold text-indigo-600">{familyName}</span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="userName"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter your name"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                    <div className="mt-1 max-h-40 overflow-y-auto border border-gray-200 rounded-md">
                      {countries
                        .filter(country => country.name.toLowerCase().includes(countrySearchQuery.toLowerCase()))
                        .map((country) => (
                          <div 
                            key={country.code} 
                            className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 ${userCountry === country.code ? 'bg-indigo-50 text-indigo-700' : ''}`}
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
                    <div className="border rounded-lg divide-y">
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
                      What Are You Offering?
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
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Search your subscriptions..."
                      />
                    </div>

                    <div className="max-h-60 overflow-y-auto space-y-2 p-1">
                      {allSubscriptions
                        .filter(sub => sub.name.toLowerCase().includes(subscriptionSearchQuery.toLowerCase()))
                        .map((subscription, index) => (
                          <div 
                            key={index} 
                            className={`p-2 sm:p-3 flex flex-col gap-2 border rounded-lg ${userSubscriptionsToOffer.some(sub => sub.id === subscription.id) 
                              ? 'border-indigo-300 bg-indigo-50' 
                              : 'border-gray-200'}`
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
                                    const isSelected = userSubscriptionsToOffer.some(sub => sub.id === subscription.id && sub.planType === 'individual');
                                    if (isSelected) {
                                      // Remove this subscription
                                      setUserSubscriptionsToOffer(prev => prev.filter(sub => sub.id !== subscription.id));
                                    } else {
                                      // Remove any existing selection for this subscription and add the individual plan
                                      setUserSubscriptionsToOffer(prev => [
                                        ...prev.filter(sub => sub.id !== subscription.id),
                                        {id: subscription.id, name: subscription.name, planType: 'individual'}
                                      ]);
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
                                    const isSelected = userSubscriptionsToOffer.some(sub => sub.id === subscription.id && sub.planType === 'family');
                                    if (isSelected) {
                                      // Remove this subscription
                                      setUserSubscriptionsToOffer(prev => prev.filter(sub => sub.id !== subscription.id));
                                    } else {
                                      // Remove any existing selection for this subscription and add the family plan
                                      setUserSubscriptionsToOffer(prev => [
                                        ...prev.filter(sub => sub.id !== subscription.id),
                                        {id: subscription.id, name: subscription.name, planType: 'family'}
                                      ]);
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
                    <p className="text-sm text-gray-500 mt-2">
                      Select subscriptions you're willing to share with this family
                    </p>
                  </div>
                </div>
              </div>
            ) : step === 2 ? (
              /* Step 2: Select subscriptions */
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-2">
                  Select subscriptions you want to join from <span className="font-semibold text-indigo-600">{familyName}</span>
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
            ) : (
              /* Step 3: Payment details */
              <div className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Your Information</h3>
                  <div className="bg-gray-50 p-2 sm:p-3 rounded-lg mb-3">
                    <div className="text-sm">
                      <div className="font-medium">{userName}</div>
                      <div className="text-gray-500">{userEmail}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Subscriptions You're Joining</h3>
                  <div className="bg-indigo-50 p-2 sm:p-3 rounded-lg mb-3">
                    {selectedSubscriptions.map((name, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{name}</span>
                        <span className="font-medium text-indigo-600">
                          {subscriptions.find(s => s.name === name)?.costPerMember}
                        </span>
                      </div>
                    ))}
                    <div className="mt-2 pt-2 border-t border-indigo-100 flex justify-between font-medium">
                      <span>Total monthly</span>
                      <span className="text-indigo-600">
                        ${selectedSubscriptions.reduce((total, name) => {
                          const sub = subscriptions.find(s => s.name === name);
                          return total + parseFloat(sub?.costPerMember.replace('$', '') || '0');
                        }, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  {userSubscriptionsToOffer.length > 0 && (
                    <>
                      <h3 className="text-sm font-medium text-gray-700 mb-1">Subscriptions You're Offering</h3>
                      <div className="bg-green-50 p-2 sm:p-3 rounded-lg">
                        {userSubscriptionsToOffer.map((userSub, index) => {
                          const subscription = allSubscriptions.find(s => s.id === userSub.id);
                          const plan = subscription?.plans.find(p => p.type === userSub.planType);
                          return (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <span>{userSub.name}</span>
                              <span className="font-medium text-green-600">
                                {plan?.name} ({userSub.planType})
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="creditCard"
                        checked={paymentMethod === 'creditCard'}
                        onChange={() => setPaymentMethod('creditCard')}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <CreditCard className="h-5 w-5 text-gray-400 ml-2 mr-2" />
                      <span>Credit / Debit Card</span>
                    </label>
                    
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={() => setPaymentMethod('paypal')}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 font-semibold text-blue-600">Pay</span>
                      <span className="font-semibold text-blue-800">Pal</span>
                    </label>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={() => setAgreed(!agreed)}
                      className="h-4 w-4 mt-1 text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      I agree to the family rules and understand that my payment will be processed on the 1st of each month. I can cancel my membership with 7 days notice.
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 p-3 sm:p-4 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(prev => prev > 1 ? prev - 1 as 1 | 2 | 3 : prev)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              disabled={
                (step === 1 && (userName.trim() === '' || userEmail.trim() === '')) ||
                (step === 2 && selectedSubscriptions.length === 0) ||
                (step === 3 && (!paymentMethod || !agreed))
              }
              className={`px-5 py-2 rounded-lg text-white font-medium ${
                (step === 1 && userName.trim() !== '' && userEmail.trim() !== '') ||
                (step === 2 && selectedSubscriptions.length > 0) ||
                (step === 3 && paymentMethod && agreed)
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-indigo-300 cursor-not-allowed'
              } ml-auto transition-colors`}
            >
              {step === 3 ? 'Join Family' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JoinFamilyModal;
