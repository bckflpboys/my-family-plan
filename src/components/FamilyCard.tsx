import { Users, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Subscription {
  name: string;
  icon: string;
}

interface FamilyCardProps {
  id?: string;
  name: string;
  memberCount: number;
  maxMembers: number;
  subscriptions: Subscription[];
  isOwner?: boolean;
}

export function FamilyCard({ id = '1', name, memberCount, maxMembers, subscriptions, isOwner = false }: FamilyCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-200 hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          {name}
          {isOwner && <Crown className="h-5 w-5 ml-2 text-yellow-500" />}
        </h3>
        <div className="flex items-center text-gray-600">
          <Users className="h-5 w-5 mr-1" />
          <span>{memberCount}/{maxMembers}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <p className="text-sm text-gray-600">Active Subscriptions:</p>
        <div className="flex flex-wrap gap-2">
          {subscriptions.map((sub, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium"
            >
              {sub.name}
            </span>
          ))}
        </div>
      </div>
      
      <Link 
        to={`/families/${id}`}
        className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        View Details
      </Link>
    </div>
  );
}