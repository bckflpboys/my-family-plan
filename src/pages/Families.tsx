import { useState, useMemo } from 'react';
import { FamilyCard } from '../components/FamilyCard';
import { SearchBar, SubscriptionType } from '../components/SearchBar';
import { getSubscriptionByName, PlanType } from '../utils/subscriptions';

// Helper function to get subscription data from the utility
const getSubscriptionData = (name: string) => {
  const subscription = getSubscriptionByName(name);
  return subscription ? { name: subscription.name, icon: subscription.icon } : { name, icon: 'default' };
};

const mockFamilies = [
  {
    id: "1",
    name: "Smith Family",
    memberCount: 4,
    maxMembers: 6,
    country: "United States",
    subscriptions: [
      getSubscriptionData("Netflix"),
      getSubscriptionData("Spotify"),
      getSubscriptionData("YouTube Premium")
    ],
    isOwner: true
  },
  {
    id: "2",
    name: "Gaming Squad",
    memberCount: 5,
    maxMembers: 6,
    country: "Canada",
    subscriptions: [
      getSubscriptionData("Xbox Game Pass"),
      getSubscriptionData("PlayStation Plus"),
      getSubscriptionData("Nintendo Online")
    ]
  },
  {
    id: "3",
    name: "Movie Lovers",
    memberCount: 3,
    maxMembers: 6,
    country: "United Kingdom",
    subscriptions: [
      getSubscriptionData("Disney+"),
      getSubscriptionData("HBO Max"),
      getSubscriptionData("Apple TV+")
    ]
  },
  {
    id: "4",
    name: "Tech Enthusiasts",
    memberCount: 4,
    maxMembers: 5,
    country: "Germany",
    subscriptions: [
      getSubscriptionData("Netflix"),
      getSubscriptionData("Apple TV+")
    ]
  },
  {
    id: "5",
    name: "Music Group",
    memberCount: 6,
    maxMembers: 6,
    country: "France",
    subscriptions: [
      getSubscriptionData("Spotify"),
      getSubscriptionData("YouTube Premium")
    ]
  },
  {
    id: "6",
    name: "Anime Fans",
    memberCount: 3,
    maxMembers: 6,
    country: "Japan",
    subscriptions: [
      getSubscriptionData("Netflix"),
      getSubscriptionData("Crunchyroll")
    ]
  },
  {
    id: "7",
    name: "Creative Professionals",
    memberCount: 4,
    maxMembers: 5,
    country: "Australia",
    subscriptions: [
      getSubscriptionData("Adobe Creative Cloud"),
      getSubscriptionData("Microsoft 365")
    ]
  }
];

export function Families() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<SubscriptionType[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedPlanTypes, setSelectedPlanTypes] = useState<PlanType[]>([]);

  const filteredFamilies = useMemo(() => {
    const query = searchQuery.toLowerCase();
    
    return mockFamilies.filter(family => {
      // Filter by search query
      const matchesQuery = 
        family.name.toLowerCase().includes(query) ||
        family.subscriptions.some(sub => sub.name.toLowerCase().includes(query));
      
      // Filter by selected subscription types
      const matchesSubscriptions = 
        selectedSubscriptions.length === 0 || // If no subscriptions selected, show all
        family.subscriptions.some(sub => 
          selectedSubscriptions.includes(sub.name as SubscriptionType)
        );
      
      // Filter by selected countries
      const matchesCountries = 
        selectedCountries.length === 0 || // If no countries selected, show all
        (family.country && selectedCountries.includes(family.country));
      
      // Filter by selected plan types
      const matchesPlanTypes = 
        selectedPlanTypes.length === 0 || // If no plan types selected, show all
        family.subscriptions.some(sub => {
          // Get full subscription data including plans
          const fullSubscription = getSubscriptionByName(sub.name);
          if (!fullSubscription) return false;
          
          // Check if any of the subscription's plans match the selected plan types
          return fullSubscription.plans.some(plan => 
            selectedPlanTypes.includes(plan.type)
          );
        });
      
      return matchesQuery && matchesSubscriptions && matchesCountries && matchesPlanTypes;
    });
  }, [searchQuery, selectedSubscriptions, selectedCountries, selectedPlanTypes]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Families</h1>
          <p className="text-lg text-gray-600 mb-8">Join a family to start sharing subscriptions</p>
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            onFilterChange={setSelectedSubscriptions}
            onCountryFilterChange={setSelectedCountries}
            onPlanTypeFilterChange={setSelectedPlanTypes}
            placeholder="Search by family name or subscription..."
          />
        </div>

        {filteredFamilies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No families found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFamilies.map((family, index) => (
              <FamilyCard
                key={index}
                id={family.id}
                name={family.name}
                memberCount={family.memberCount}
                maxMembers={family.maxMembers}
                subscriptions={family.subscriptions}
                isOwner={family.isOwner}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}