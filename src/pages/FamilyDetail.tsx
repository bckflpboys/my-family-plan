import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Crown, Calendar, Plus, CreditCard } from 'lucide-react';

// Mock data for family details
const mockFamilyDetails = [
  {
    id: "1",
    name: "Smith Family",
    description: "A family group for sharing entertainment subscriptions.",
    memberCount: 4,
    maxMembers: 6,
    createdDate: "2025-01-15",
    owner: "John Smith",
    subscriptions: [
      { 
        name: "Netflix", 
        icon: "netflix",
        plan: "Premium",
        price: "$19.99/month",
        sharedWith: ["Alice", "Bob", "Charlie"]
      },
      { 
        name: "Spotify", 
        icon: "spotify",
        plan: "Family",
        price: "$14.99/month",
        sharedWith: ["Alice", "Bob"]
      },
      { 
        name: "YouTube Premium", 
        icon: "youtube",
        plan: "Family",
        price: "$22.99/month",
        sharedWith: ["Alice", "Charlie"]
      }
    ],
    members: [
      { name: "John Smith", role: "Owner", avatar: "JS" },
      { name: "Alice Smith", role: "Member", avatar: "AS" },
      { name: "Bob Smith", role: "Member", avatar: "BS" },
      { name: "Charlie Smith", role: "Member", avatar: "CS" }
    ]
  },
  {
    id: "2",
    name: "Gaming Squad",
    description: "A group for sharing gaming subscriptions and services.",
    memberCount: 5,
    maxMembers: 6,
    createdDate: "2025-02-20",
    owner: "Alex Johnson",
    subscriptions: [
      { 
        name: "Xbox Game Pass", 
        icon: "xbox",
        plan: "Ultimate",
        price: "$16.99/month",
        sharedWith: ["Mike", "Sarah", "David", "Emma"]
      },
      { 
        name: "PlayStation Plus", 
        icon: "playstation",
        plan: "Premium",
        price: "$17.99/month",
        sharedWith: ["Mike", "Sarah", "Emma"]
      },
      { 
        name: "Nintendo Online", 
        icon: "nintendo",
        plan: "Family",
        price: "$34.99/year",
        sharedWith: ["David", "Emma"]
      }
    ],
    members: [
      { name: "Alex Johnson", role: "Owner", avatar: "AJ" },
      { name: "Mike Williams", role: "Member", avatar: "MW" },
      { name: "Sarah Davis", role: "Member", avatar: "SD" },
      { name: "David Brown", role: "Member", avatar: "DB" },
      { name: "Emma Wilson", role: "Member", avatar: "EW" }
    ]
  },
  {
    id: "3",
    name: "Movie Lovers",
    description: "A group dedicated to sharing streaming services for movies and TV shows.",
    memberCount: 3,
    maxMembers: 6,
    createdDate: "2025-03-10",
    owner: "Olivia Taylor",
    subscriptions: [
      { 
        name: "Disney+", 
        icon: "disney",
        plan: "Premium",
        price: "$13.99/month",
        sharedWith: ["Ryan", "Sophia"]
      },
      { 
        name: "HBO Max", 
        icon: "hbo",
        plan: "Ad-Free",
        price: "$15.99/month",
        sharedWith: ["Ryan"]
      },
      { 
        name: "Apple TV+", 
        icon: "apple",
        plan: "Standard",
        price: "$9.99/month",
        sharedWith: ["Sophia"]
      }
    ],
    members: [
      { name: "Olivia Taylor", role: "Owner", avatar: "OT" },
      { name: "Ryan Miller", role: "Member", avatar: "RM" },
      { name: "Sophia Anderson", role: "Member", avatar: "SA" }
    ]
  }
];

export function FamilyDetail() {
  const { id } = useParams<{ id: string }>();
  const family = mockFamilyDetails.find(f => f.id === id);

  if (!family) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Family Not Found</h1>
            <p className="text-gray-600 mb-8">The family you're looking for doesn't exist or has been removed.</p>
            <Link 
              to="/families" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Families
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-6">
          <Link 
            to="/families" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Families
          </Link>
        </div>

        {/* Family header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                {family.name}
                <span className="ml-2 px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                  ID: {family.id}
                </span>
              </h1>
              <p className="mt-2 text-gray-600">{family.description}</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="flex items-center text-gray-700">
                <Users className="h-5 w-5 mr-1 text-indigo-600" />
                <span>{family.memberCount}/{family.maxMembers} members</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Calendar className="h-5 w-5 mr-1 text-indigo-600" />
                <span>Created: {family.createdDate}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center">
            <Crown className="h-5 w-5 mr-2 text-yellow-500" />
            <span className="text-gray-700">Owner: {family.owner}</span>
          </div>
        </div>

        {/* Subscriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Subscriptions</h2>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4 mr-1" />
                Add New
              </button>
            </div>
            <div className="space-y-6">
              {family.subscriptions.map((subscription, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{subscription.name}</h3>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      {subscription.plan}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <CreditCard className="h-4 w-4 mr-1" />
                    <span>{subscription.price}</span>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Shared with:</p>
                    <div className="flex flex-wrap gap-1">
                      {subscription.sharedWith.map((member, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full"
                        >
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Members */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Members</h2>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4 mr-1" />
                Invite
              </button>
            </div>
            <div className="space-y-4">
              {family.members.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-medium">
                      {member.avatar}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                  </div>
                  {member.role === "Owner" && (
                    <span className="inline-flex items-center">
                      <Crown className="h-4 w-4 text-yellow-500" />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            Request to Join
          </button>
          <button className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors">
            Share Family
          </button>
        </div>
      </div>
    </div>
  );
}
