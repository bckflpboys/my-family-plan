import { Users, Crown, MapPin, Clock, UserPlus, Check, X, User, Layers, Globe, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getRegionNameByCountry } from '../utils/regions';

interface Subscription {
  name: string;
  icon: string;
}

interface FamilyCardProps {
  id?: string;
  name: string;
  memberCount: number;
  maxMembers: number;
  country?: string;
  countryRestriction?: 'all' | 'single' | 'region';
  subscriptions: Subscription[];
  isOwner?: boolean;
  createdDate?: string;
  status?: 'open' | 'closed' | 'pending';
  planTypes?: string[];
}

export function FamilyCard({ 
  id = '1', 
  name, 
  memberCount, 
  maxMembers, 
  country, 
  countryRestriction = 'single',
  subscriptions, 
  isOwner = false,
  createdDate = '2025-01-15',
  status = 'open',
  planTypes = ['individual']
}: FamilyCardProps) {
  // Calculate available slots
  const availableSlots = maxMembers - memberCount;
  
  // Determine status color and icon
  const getStatusInfo = () => {
    switch(status) {
      case 'open':
        return { color: 'bg-green-100 text-green-800', icon: <Check className="h-3 w-3 mr-1" /> };
      case 'closed':
        return { color: 'bg-red-100 text-red-800', icon: <X className="h-3 w-3 mr-1" /> };
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="h-3 w-3 mr-1" /> };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: null };
    }
  };
  
  const statusInfo = getStatusInfo();
  
  // Format date to be more readable
  const formattedDate = new Date(createdDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  // Render plan type badges
  const renderPlanTypes = () => {
    const getPlanTypeInfo = (type: string) => {
      switch(type) {
        case 'individual':
          return { 
            icon: <User className="h-4 w-4 mr-1" />,
            label: 'Individual Plans',
            color: 'bg-blue-100 text-blue-800 border-blue-200',
            tooltip: 'Shared between family members (one login for all).'
          };
        case 'family':
          return { 
            icon: <Users className="h-4 w-4 mr-1" />,
            label: 'Family Plans',
            color: 'bg-purple-100 text-purple-800 border-purple-200',
            tooltip: 'Each family member gets their own account.'
          };
        case 'both':
          return { 
            icon: <Layers className="h-4 w-4 mr-1" />,
            label: 'Mixed Plans',
            color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
            tooltip: 'Includes both individual and family plans.'
          };
        default:
          return { 
            icon: <User className="h-4 w-4 mr-1" />,
            label: 'Unknown Plan',
            color: 'bg-gray-100 text-gray-800 border-gray-200',
            tooltip: 'Plan type information not available.'
          };
      }
    };
    
    return (
      <div className="flex flex-wrap gap-2">
        {planTypes.map((type, index) => {
          const info = getPlanTypeInfo(type);
          return (
            <div 
              key={index}
              className={`relative flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${info.color} border group cursor-help`}
              title={info.tooltip}
            >
              {info.icon}
              {info.label}
              
              {/* Tooltip that appears on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-48 text-center shadow-lg z-10">
                {info.tooltip}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-t-4 border-l-4 border-r-4 border-transparent border-t-gray-900 w-0 h-0"></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-200 hover:scale-105 hover:shadow-2xl border-3 border-indigo-600">
      {/* Card header with gradient */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 relative border-b-3 border-indigo-500">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-white flex items-center">
            {name}
            {isOwner && <Crown className="h-5 w-5 ml-2 text-yellow-300" />}
          </h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
            {statusInfo.icon}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        
        {/* Member count indicator */}
        <div className="mt-2 flex items-center">
          <div className="bg-white/20 rounded-full px-3 py-1 text-sm text-white flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{memberCount}/{maxMembers} members</span>
          </div>
          
          {availableSlots > 0 && (
            <div className="ml-2 bg-green-500/20 rounded-full px-3 py-1 text-sm text-white flex items-center">
              <UserPlus className="h-4 w-4 mr-1" />
              <span>{availableSlots} {availableSlots === 1 ? 'slot' : 'slots'} left</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Card content */}
      <div className="p-5 border-t-0">
        <div className="flex flex-wrap justify-between mb-4 pb-3 border-b border-gray-200">
          <div className="flex items-center text-gray-600 mb-2 mr-4 group relative cursor-help">
            {countryRestriction === 'all' && (
              <>
                <Globe className="h-4 w-4 mr-1 text-indigo-500" />
                <span className="text-sm">All Countries</span>
              </>
            )}
            {countryRestriction === 'single' && (
              <>
                <MapPin className="h-4 w-4 mr-1 text-indigo-500" />
                <span className="text-sm">{country} Only</span>
              </>
            )}
            {countryRestriction === 'region' && (
              <>
                <Map className="h-4 w-4 mr-1 text-indigo-500" />
                <span className="text-sm">{getRegionNameByCountry(country || '')} Region</span>
              </>
            )}
            
            {/* Country restriction tooltip */}
            <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-48 text-center shadow-lg z-10">
              {countryRestriction === 'all' && 'Accepts members from all countries worldwide'}
              {countryRestriction === 'single' && `Only accepts members from ${country}`}
              {countryRestriction === 'region' && `Accepts members from countries in the ${getRegionNameByCountry(country || '')} region`}
              <div className="absolute top-full left-4 border-t-4 border-l-4 border-r-4 border-transparent border-t-gray-900 w-0 h-0"></div>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 mb-2">
            <Clock className="h-4 w-4 mr-1 text-indigo-500" />
            <span className="text-sm">Created {formattedDate}</span>
          </div>
        </div>
        
        {/* Plan Types */}
        <div className="mb-4 pb-3 border-b border-gray-200">
          {renderPlanTypes()}
        </div>
        
        {/* Subscriptions */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Active Subscriptions:</p>
          <div className="flex flex-wrap gap-2">
            {subscriptions.map((sub, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium border border-indigo-100 shadow-sm"
              >
                {sub.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Card footer */}
      <div className="border-t border-gray-100 p-4">
        <Link 
          to={`/families/${id}`}
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-all duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}