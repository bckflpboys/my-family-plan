import React, { useState, useMemo } from 'react';
import { FamilyCard } from '../components/FamilyCard';
import { SearchBar } from '../components/SearchBar';

const mockFamilies = [
  {
    name: "Smith Family",
    memberCount: 4,
    maxMembers: 6,
    subscriptions: [
      { name: "Netflix", icon: "netflix" },
      { name: "Spotify", icon: "spotify" },
      { name: "YouTube Premium", icon: "youtube" }
    ],
    isOwner: true
  },
  {
    name: "Gaming Squad",
    memberCount: 5,
    maxMembers: 6,
    subscriptions: [
      { name: "Xbox Game Pass", icon: "xbox" },
      { name: "PlayStation Plus", icon: "playstation" },
      { name: "Nintendo Online", icon: "nintendo" }
    ]
  },
  {
    name: "Movie Lovers",
    memberCount: 3,
    maxMembers: 6,
    subscriptions: [
      { name: "Disney+", icon: "disney" },
      { name: "HBO Max", icon: "hbo" },
      { name: "Apple TV+", icon: "apple" }
    ]
  }
];

export function Families() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFamilies = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return mockFamilies.filter(family => 
      family.name.toLowerCase().includes(query) ||
      family.subscriptions.some(sub => sub.name.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Families</h1>
          <p className="text-lg text-gray-600 mb-8">Join a family to start sharing subscriptions</p>
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
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