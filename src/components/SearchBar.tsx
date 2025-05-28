import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, X, Globe, Music, Users, User, Map } from 'lucide-react';
import { countries } from '../utils/countries';
import { subscriptions, PlanType } from '../utils/subscriptions';
import { regions, getRegionNameByCountry } from '../utils/regions';

// Use the subscription names from the utility for type checking
export type SubscriptionType = string;

export type FilterType = 'subscription' | 'country' | 'plan';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterChange?: (filters: SubscriptionType[]) => void;
  onCountryFilterChange?: (countries: string[]) => void;
  onPlanTypeFilterChange?: (planTypes: PlanType[]) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, onFilterChange, onCountryFilterChange, onPlanTypeFilterChange, placeholder = 'Search families...' }: SearchBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilterType, setActiveFilterType] = useState<FilterType>('subscription');
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<SubscriptionType[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedPlanTypes, setSelectedPlanTypes] = useState<PlanType[]>([]);
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  const [subscriptionSearchQuery, setSubscriptionSearchQuery] = useState('');
  
  // Get subscription names and filter them based on search query
  const subscriptionTypes = useMemo(() => {
    const allSubscriptionNames = subscriptions.map(sub => sub.name);
    if (!subscriptionSearchQuery) return allSubscriptionNames;
    
    const query = subscriptionSearchQuery.toLowerCase();
    return allSubscriptionNames.filter(name => 
      name.toLowerCase().includes(query)
    );
  }, [subscriptionSearchQuery]);

  // Filtered countries based on search
  const filteredCountries = useMemo(() => {
    if (!countrySearchQuery) return countries;
    const query = countrySearchQuery.toLowerCase();
    return countries.filter(country => 
      country.name.toLowerCase().includes(query)
    );
  }, [countrySearchQuery]);

  // Update parent component when subscription filters change
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(selectedSubscriptions);
    }
  }, [selectedSubscriptions, onFilterChange]);

  // Update parent component when country filters change
  useEffect(() => {
    if (onCountryFilterChange) {
      onCountryFilterChange(selectedCountries);
    }
  }, [selectedCountries, onCountryFilterChange]);

  // Update parent component when plan type filters change
  useEffect(() => {
    if (onPlanTypeFilterChange) {
      onPlanTypeFilterChange(selectedPlanTypes);
    }
  }, [selectedPlanTypes, onPlanTypeFilterChange]);

  // Toggle a subscription filter
  const toggleSubscription = (subscription: SubscriptionType) => {
    setSelectedSubscriptions(prev => 
      prev.includes(subscription)
        ? prev.filter(item => item !== subscription)
        : [...prev, subscription]
    );
  };

  // Toggle a country filter
  const toggleCountry = (country: string) => {
    setSelectedCountries(prev => 
      prev.includes(country)
        ? prev.filter(item => item !== country)
        : [...prev, country]
    );
  };

  // Toggle a plan type filter
  const togglePlanType = (planType: PlanType) => {
    setSelectedPlanTypes(prev => 
      prev.includes(planType)
        ? prev.filter(item => item !== planType)
        : [...prev, planType]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    if (activeFilterType === 'subscription') {
      setSelectedSubscriptions([]);
    } else if (activeFilterType === 'country') {
      setSelectedCountries([]);
    } else if (activeFilterType === 'plan') {
      setSelectedPlanTypes([]);
    }
  };
  
  // Get total filter count
  const totalFilterCount = selectedSubscriptions.length + selectedCountries.length + selectedPlanTypes.length;

  return (
    <div className="w-full mx-auto space-y-3">
      <div className="flex gap-2 max-w-md w-full mx-auto">
        {/* Search input */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border-2 border-indigo-400 rounded-full bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
            placeholder={placeholder}
          />
        </div>
        
        {/* Filter button */}
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`flex items-center justify-center px-3 py-2 border-2 ${isFilterOpen ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-indigo-400 bg-white text-gray-700'} rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-colors`}
          aria-expanded={isFilterOpen}
          aria-controls="filter-panel"
        >
          <Filter className="h-5 w-5" />
          <span className="ml-1 hidden sm:inline">Filter</span>
          {totalFilterCount > 0 && (
            <span className="ml-1 flex items-center justify-center h-5 w-5 text-xs font-medium text-white bg-indigo-600 rounded-full">
              {totalFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter panel */}
      {isFilterOpen && (
        <div id="filter-panel" className="bg-white rounded-xl shadow-md p-4 max-w-md mx-auto border-2 border-indigo-400">
          {/* Filter type tabs */}
          <div className="flex mb-4 border-b-2 border-indigo-300">
            <button
              onClick={() => setActiveFilterType('subscription')}
              className={`flex items-center px-4 py-2 text-sm font-medium ${activeFilterType === 'subscription' ? 'text-indigo-700 border-b-3 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Music className="h-4 w-4 mr-2" />
              Subscriptions
            </button>
            <button
              onClick={() => setActiveFilterType('country')}
              className={`flex items-center px-4 py-2 text-sm font-medium ${activeFilterType === 'country' ? 'text-indigo-700 border-b-3 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Globe className="h-4 w-4 mr-2" />
              Countries
            </button>
            <button
              onClick={() => setActiveFilterType('plan')}
              className={`flex items-center px-4 py-2 text-sm font-medium ${activeFilterType === 'plan' ? 'text-indigo-700 border-b-3 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Users className="h-4 w-4 mr-2" />
              Plan Types
            </button>
          </div>
          
          {/* Header with clear button */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-gray-900">
              {activeFilterType === 'subscription' ? 'Filter by subscription' : 
               activeFilterType === 'country' ? 'Filter by country' : 'Filter by plan type'}
            </h3>
            {((activeFilterType === 'subscription' && selectedSubscriptions.length > 0) || 
              (activeFilterType === 'country' && selectedCountries.length > 0) ||
              (activeFilterType === 'plan' && selectedPlanTypes.length > 0)) && (
              <button 
                onClick={clearFilters}
                className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center"
              >
                <X className="h-3 w-3 mr-1" />
                Clear all
              </button>
            )}
          </div>
          
          {/* Subscription filters */}
          {activeFilterType === 'subscription' && (
            <>
              <div className="mb-3">
                <input
                  type="text"
                  value={subscriptionSearchQuery}
                  onChange={(e) => setSubscriptionSearchQuery(e.target.value)}
                  placeholder="Search subscriptions..."
                  className="w-full px-3 py-2 text-sm border-2 border-indigo-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
                />
              </div>
              <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                {subscriptionTypes.map((subscription) => (
                  <button
                    key={subscription}
                    onClick={() => toggleSubscription(subscription)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${selectedSubscriptions.includes(subscription) 
                      ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-400' 
                      : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'}`}
                  >
                    {subscription}
                  </button>
                ))}
                {subscriptionTypes.length === 0 && (
                  <p className="text-sm text-gray-500 py-2">No subscriptions found matching your search.</p>
                )}
              </div>
            </>
          )}
          
          {/* Country filters */}
          {activeFilterType === 'country' && (
            <>
              <div className="mb-3">
                <input
                  type="text"
                  value={countrySearchQuery}
                  onChange={(e) => setCountrySearchQuery(e.target.value)}
                  placeholder="Search countries or regions..."
                  className="w-full px-3 py-2 text-sm border-2 border-indigo-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
                />
              </div>
              
              {/* Region headers */}
              <div className="mb-3">
                <h4 className="text-xs font-semibold text-gray-500 mb-2">Regions</h4>
                <div className="flex flex-wrap gap-2">
                  {regions.map((region) => (
                    <button
                      key={region.id}
                      onClick={() => region.countries.forEach(country => {
                        if (!selectedCountries.includes(country.name)) {
                          toggleCountry(country.name);
                        }
                      })}
                      className="flex items-center px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 text-blue-800 border-2 border-blue-300 hover:bg-blue-100 transition-colors"
                    >
                      <Map className="h-3 w-3 mr-1" />
                      {region.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-2">
                <h4 className="text-xs font-semibold text-gray-500 mb-2">Countries</h4>
              </div>
              
              <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                {filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => toggleCountry(country.name)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${selectedCountries.includes(country.name) 
                      ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-400' 
                      : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'}`}
                    title={`Region: ${getRegionNameByCountry(country.name)}`}
                  >
                    {country.name}
                  </button>
                ))}
              </div>
            </>
          )}
          
          {/* Plan type filters */}
          {activeFilterType === 'plan' && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => togglePlanType('individual')}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedPlanTypes.includes('individual') 
                    ? 'bg-purple-100 text-purple-800 border-2 border-purple-400' 
                    : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'}`}
                >
                  <User className="h-4 w-4 mr-2" />
                  Individual
                </button>
                <button
                  onClick={() => togglePlanType('family')}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedPlanTypes.includes('family') 
                    ? 'bg-purple-100 text-purple-800 border-2 border-purple-400' 
                    : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'}`}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Family
                </button>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-800 border-2 border-blue-300">
                <h4 className="font-medium mb-1">About Plan Types:</h4>
                <p className="mb-2"><strong>Individual Plans:</strong> Shared between family members (one login for all).</p>
                <p><strong>Family Plans:</strong> Each family member gets their own account.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Selected filters display (when filter panel is closed) */}
      {!isFilterOpen && (selectedSubscriptions.length > 0 || selectedCountries.length > 0 || selectedPlanTypes.length > 0) && (
        <div className="flex flex-wrap items-center gap-2 max-w-md mx-auto">
          <span className="text-xs text-gray-500">Filters:</span>
          
          {/* Subscription filters */}
          {selectedSubscriptions.map(filter => (
            <span 
              key={`sub-${filter}`} 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-300"
            >
              <Music className="h-3 w-3 mr-1" />
              {filter}
              <button 
                onClick={() => toggleSubscription(filter)}
                className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-600"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          
          {/* Country filters */}
          {selectedCountries.map(country => (
            <span 
              key={`country-${country}`} 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-300"
            >
              <Globe className="h-3 w-3 mr-1" />
              {country}
              <button 
                onClick={() => toggleCountry(country)}
                className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          
          {/* Plan type filters */}
          {selectedPlanTypes.map(planType => (
            <span 
              key={`plan-${planType}`} 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-300"
            >
              {planType === 'individual' ? <User className="h-3 w-3 mr-1" /> : <Users className="h-3 w-3 mr-1" />}
              {planType === 'individual' ? 'Individual' : planType === 'family' ? 'Family' : 'Group'}
              <button 
                onClick={() => togglePlanType(planType)}
                className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-purple-400 hover:bg-purple-200 hover:text-purple-600"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}