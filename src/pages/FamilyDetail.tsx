import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Users, Calendar, Plus, CreditCard, MapPin, Globe, Map,
  UserPlus, DollarSign, Percent, Check, X, Clock, Shield, BookOpen, User
} from 'lucide-react';
import { getRegionNameByCountry } from '../utils/regions';

// Define types for mock data
interface Subscription {
  name: string;
  icon: string;
  plan: string;
  price: string;
  planType: string;
  sharedWith: string[];
  paymentDue: string;
  costPerMember: string;
}

interface Member {
  name: string;
  role: string;
  avatar: string;
  joinDate: string;
  paymentStatus: string;
  subscriptions: string[];
}

interface FamilyDetail {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  maxMembers: number;
  createdDate: string;
  owner: string;
  country: string;
  countryRestriction: string;
  status: string;
  planTypes: string[];
  monthlySavings: number;
  savingsPercentage: number;
  rules: string[];
  subscriptions: Subscription[];
  members: Member[];
}

// Mock data for family details
const mockFamilyDetails: FamilyDetail[] = [
  {
    id: "1",
    name: "Smith Family",
    description: "A family group for sharing entertainment subscriptions.",
    memberCount: 4,
    maxMembers: 6,
    createdDate: "2025-01-15",
    owner: "John Smith",
    country: "United States",
    countryRestriction: "single",
    status: "open",
    planTypes: ["family"],
    monthlySavings: 42.99,
    savingsPercentage: 58,
    rules: [
      "Payment due on the 1st of each month",
      "No sharing login details outside the family",
      "Notify at least 7 days before leaving"
    ],
    subscriptions: [
      { 
        name: "Netflix", 
        icon: "netflix",
        plan: "Premium",
        price: "$19.99/month",
        planType: "family",
        sharedWith: ["Alice", "Bob", "Charlie"],
        paymentDue: "2025-06-01",
        costPerMember: "$5.00"
      },
      { 
        name: "Spotify", 
        icon: "spotify",
        plan: "Family",
        price: "$14.99/month",
        planType: "family",
        sharedWith: ["Alice", "Bob"],
        paymentDue: "2025-06-01",
        costPerMember: "$5.00"
      },
      { 
        name: "YouTube Premium", 
        icon: "youtube",
        plan: "Family",
        price: "$22.99/month",
        planType: "family",
        sharedWith: ["Alice", "Charlie"],
        paymentDue: "2025-06-15",
        costPerMember: "$7.66"
      }
    ],
    members: [
      { 
        name: "John Smith", 
        role: "Owner", 
        avatar: "JS",
        joinDate: "2025-01-15",
        paymentStatus: "paid",
        subscriptions: ["Netflix", "Spotify", "YouTube Premium"]
      },
      { 
        name: "Alice Smith", 
        role: "Member", 
        avatar: "AS",
        joinDate: "2025-01-16",
        paymentStatus: "paid",
        subscriptions: ["Netflix", "Spotify", "YouTube Premium"]
      },
      { 
        name: "Bob Smith", 
        role: "Member", 
        avatar: "BS",
        joinDate: "2025-01-20",
        paymentStatus: "pending",
        subscriptions: ["Netflix", "Spotify"]
      },
      { 
        name: "Charlie Smith", 
        role: "Member", 
        avatar: "CS",
        joinDate: "2025-02-01",
        paymentStatus: "paid",
        subscriptions: ["Netflix", "YouTube Premium"]
      }
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
    country: "Canada",
    countryRestriction: "region",
    status: "open",
    planTypes: ["family"],
    monthlySavings: 35.50,
    savingsPercentage: 45,
    rules: [
      "Split payments equally among members",
      "Notify before canceling any subscription",
      "No sharing login details with non-members"
    ],
    subscriptions: [
      { 
        name: "Xbox Game Pass", 
        icon: "xbox",
        plan: "Ultimate",
        price: "$16.99/month",
        planType: "family",
        sharedWith: ["Mike", "Sarah", "David", "Emma"],
        paymentDue: "2025-06-05",
        costPerMember: "$4.25"
      },
      { 
        name: "PlayStation Plus", 
        icon: "playstation",
        plan: "Premium",
        price: "$17.99/month",
        planType: "family",
        sharedWith: ["Mike", "Sarah", "Emma"],
        paymentDue: "2025-06-10",
        costPerMember: "$6.00"
      },
      { 
        name: "Nintendo Online", 
        icon: "nintendo",
        plan: "Family",
        price: "$34.99/year",
        planType: "family",
        sharedWith: ["David", "Emma"],
        paymentDue: "2025-07-01",
        costPerMember: "$17.50"
      }
    ],
    members: [
      { 
        name: "Alex Johnson", 
        role: "Owner", 
        avatar: "AJ",
        joinDate: "2025-02-20",
        paymentStatus: "paid",
        subscriptions: ["Xbox Game Pass", "PlayStation Plus", "Nintendo Online"]
      },
      { 
        name: "Mike Williams", 
        role: "Member", 
        avatar: "MW",
        joinDate: "2025-02-21",
        paymentStatus: "paid",
        subscriptions: ["Xbox Game Pass", "PlayStation Plus"]
      },
      { 
        name: "Sarah Davis", 
        role: "Member", 
        avatar: "SD",
        joinDate: "2025-02-22",
        paymentStatus: "pending",
        subscriptions: ["Xbox Game Pass", "PlayStation Plus"]
      },
      { 
        name: "David Brown", 
        role: "Member", 
        avatar: "DB",
        joinDate: "2025-02-25",
        paymentStatus: "paid",
        subscriptions: ["Xbox Game Pass", "Nintendo Online"]
      },
      { 
        name: "Emma Wilson", 
        role: "Member", 
        avatar: "EW",
        joinDate: "2025-03-01",
        paymentStatus: "paid",
        subscriptions: ["Xbox Game Pass", "PlayStation Plus", "Nintendo Online"]
      }
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
    country: "United Kingdom",
    countryRestriction: "all",
    status: "open",
    planTypes: ["individual", "family"],
    monthlySavings: 25.99,
    savingsPercentage: 40,
    rules: [
      "Payment due on the 15th of each month",
      "Two strikes for late payments means removal",
      "Respect content preferences of other members"
    ],
    subscriptions: [
      { 
        name: "Disney+", 
        icon: "disney",
        plan: "Premium",
        price: "$13.99/month",
        planType: "individual",
        sharedWith: ["Ryan", "Sophia"],
        paymentDue: "2025-06-15",
        costPerMember: "$4.66"
      },
      { 
        name: "HBO Max", 
        icon: "hbo",
        plan: "Ad-Free",
        price: "$15.99/month",
        planType: "individual",
        sharedWith: ["Ryan"],
        paymentDue: "2025-06-20",
        costPerMember: "$8.00"
      },
      { 
        name: "Apple TV+", 
        icon: "apple",
        plan: "Standard",
        price: "$9.99/month",
        planType: "individual",
        sharedWith: ["Sophia"],
        paymentDue: "2025-06-25",
        costPerMember: "$5.00"
      }
    ],
    members: [
      { 
        name: "Olivia Taylor", 
        role: "Owner", 
        avatar: "OT",
        joinDate: "2025-03-10",
        paymentStatus: "paid",
        subscriptions: ["Disney+", "HBO Max", "Apple TV+"]
      },
      { 
        name: "Ryan Miller", 
        role: "Member", 
        avatar: "RM",
        joinDate: "2025-03-12",
        paymentStatus: "paid",
        subscriptions: ["Disney+", "HBO Max"]
      },
      { 
        name: "Sophia Anderson", 
        role: "Member", 
        avatar: "SA",
        joinDate: "2025-03-15",
        paymentStatus: "pending",
        subscriptions: ["Disney+", "Apple TV+"]
      }
    ]
  }
];

const SubscriptionCard = ({ subscription }: { subscription: Subscription }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Subscription header */}
      <div className="bg-indigo-50 p-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-3">
            <span className="text-indigo-700 font-bold">{subscription.name.charAt(0)}</span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{subscription.name}</h3>
            <div className="flex items-center text-gray-600 text-xs">
              <span className="mr-2">{subscription.price}</span>
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
                {subscription.plan}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full flex items-center">
            {subscription.planType === 'individual' ? (
              <>
                <User className="h-3 w-3 mr-1" />
                Individual
              </>
            ) : (
              <>
                <Users className="h-3 w-3 mr-1" />
                Family
              </>
            )}
          </span>
        </div>
      </div>
      
      {/* Subscription details */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
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
          <div>
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-gray-500">Cost per member:</p>
                <p className="font-medium text-gray-900">{subscription.costPerMember}</p>
              </div>
              <div>
                <p className="text-gray-500">Next payment:</p>
                <p className="font-medium text-gray-900">{new Date(subscription.paymentDue).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MemberCard = ({ member }: { member: Member }) => {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
          {member.avatar}
        </div>
        <div>
          <div className="font-semibold">{member.name}</div>
          <div className="text-sm text-gray-500">{member.role}</div>
        </div>
      </div>
      <div className="mt-2 text-sm">
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>Joined: {member.joinDate}</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <CreditCard size={14} />
          <span>Status: <span className={`font-medium ${member.paymentStatus === 'paid' ? 'text-green-500' : 'text-amber-500'}`}>
            {member.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
          </span></span>
        </div>
        <div className="mt-1">
          <span className="text-xs text-gray-500">Subscriptions: {member.subscriptions.length}</span>
        </div>
      </div>
    </div>
  );
};

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

        {/* Family header with gradient background */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center">
                <h1 className="text-3xl font-bold flex items-center">
                  {family.name}
                </h1>
                <span className="ml-3 px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                  ID: {family.id}
                </span>
                {family.status === 'open' && (
                  <span className="ml-2 px-3 py-1 bg-green-500/20 text-white text-sm font-medium rounded-full flex items-center">
                    <Check className="h-3 w-3 mr-1" />
                    Open
                  </span>
                )}
                {family.status === 'closed' && (
                  <span className="ml-2 px-3 py-1 bg-red-500/20 text-white text-sm font-medium rounded-full flex items-center">
                    <X className="h-3 w-3 mr-1" />
                    Closed
                  </span>
                )}
                {family.status === 'pending' && (
                  <span className="ml-2 px-3 py-1 bg-yellow-500/20 text-white text-sm font-medium rounded-full flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </span>
                )}
              </div>
              <p className="mt-2 text-white/80">{family.description}</p>
            </div>
          </div>
          
          {/* Family stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-white/80" />
                  <h3 className="font-medium">Members</h3>
                </div>
                {family.memberCount < family.maxMembers && (
                  <button className="px-3 py-1 bg-white text-indigo-600 text-sm font-medium rounded-md flex items-center hover:bg-indigo-50 transition-colors shadow-sm">
                    <UserPlus className="h-3.5 w-3.5 mr-1" />
                    Join
                  </button>
                )}
              </div>
              <p className="text-2xl font-bold">{family.memberCount}/{family.maxMembers}</p>
              <p className="text-sm text-white/70">{family.maxMembers - family.memberCount} slots available</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <DollarSign className="h-5 w-5 mr-2 text-white/80" />
                <h3 className="font-medium">Monthly Savings</h3>
              </div>
              <p className="text-2xl font-bold">${family.monthlySavings?.toFixed(2) || '0.00'}</p>
              <p className="text-sm text-white/70"><Percent className="h-3 w-3 inline mr-1" />{family.savingsPercentage}% cheaper than individual</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center mb-2">
                {family.countryRestriction === 'all' && <Globe className="h-5 w-5 mr-2 text-white/80" />}
                {family.countryRestriction === 'single' && <MapPin className="h-5 w-5 mr-2 text-white/80" />}
                {family.countryRestriction === 'region' && <Map className="h-5 w-5 mr-2 text-white/80" />}
                <h3 className="font-medium">Location</h3>
              </div>
              <p className="text-xl font-bold">
                {family.countryRestriction === 'all' && 'All Countries'}
                {family.countryRestriction === 'single' && family.country}
                {family.countryRestriction === 'region' && `${getRegionNameByCountry(family.country || '')} Region`}
              </p>
              <p className="text-sm text-white/70">
                {family.countryRestriction === 'all' && 'Accepts members worldwide'}
                {family.countryRestriction === 'single' && 'Country restricted'}
                {family.countryRestriction === 'region' && 'Region restricted'}
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Calendar className="h-5 w-5 mr-2 text-white/80" />
                <h3 className="font-medium">Created</h3>
              </div>
              <p className="text-xl font-bold">{new Date(family.createdDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
              <p className="text-sm text-white/70">by {family.owner}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left column: Subscriptions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Subscriptions
                  </h2>
                  <button className="inline-flex items-center px-3 py-1.5 border border-white/30 text-sm font-medium rounded-md text-white bg-white/10 hover:bg-white/20 transition-colors">
                    <Plus className="h-4 w-4 mr-1" />
                    Add New
                  </button>
                </div>
              </div>
              
              <div className="p-5">
                <div className="space-y-6">
                  {family.subscriptions.map((subscription, index) => (
                    <SubscriptionCard key={index} subscription={subscription} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Members and Rules */}
          <div className="space-y-8">
            {/* Members */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Members
                  </h2>
                  <button className="inline-flex items-center px-3 py-1.5 border border-white/30 text-sm font-medium rounded-md text-white bg-white/10 hover:bg-white/20 transition-colors">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Invite
                  </button>
                </div>
              </div>
              
              <div className="p-5">
                <div className="space-y-4">
                  {family.members.map((member, index) => (
                    <MemberCard key={index} member={member} />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Family Rules */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-5">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Family Rules
                </h2>
              </div>
              
              <div className="p-5">
                <ul className="space-y-3">
                  {family.rules?.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <Shield className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
