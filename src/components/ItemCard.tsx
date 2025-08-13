import React from 'react';
import { MapPin, Calendar, User, CheckCircle } from 'lucide-react';
import { LostFoundItem } from '../App';

interface ItemCardProps {
  item: LostFoundItem;
  onClick: () => void;
}

const categoryColors: Record<string, string> = {
  electronics: 'bg-blue-100 text-blue-800',
  wallets: 'bg-green-100 text-green-800',
  keys: 'bg-yellow-100 text-yellow-800',
  jewelry: 'bg-purple-100 text-purple-800',
  clothing: 'bg-pink-100 text-pink-800',
  bags: 'bg-indigo-100 text-indigo-800',
  pets: 'bg-orange-100 text-orange-800',
  documents: 'bg-gray-100 text-gray-800',
  other: 'bg-gray-100 text-gray-800',
};

const ItemCard: React.FC<ItemCardProps> = ({ item, onClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getDaysAgo = (dateString: string) => {
    const days = Math.floor((Date.now() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 cursor-pointer group ${
        item.resolved ? 'opacity-75' : ''
      }`}
    >
      {/* Image */}
      {item.imageUrl && (
        <div className="relative">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {item.resolved && (
            <div className="absolute top-3 right-3">
              <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                <CheckCircle className="h-3 w-3" />
                <span>Resolved</span>
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="p-4">
        {/* Status Badge */}
        <div className="flex items-center justify-between mb-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.status === 'lost' 
              ? 'bg-red-100 text-red-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {item.status === 'lost' ? 'Lost' : 'Found'}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            categoryColors[item.category] || categoryColors.other
          }`}>
            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Meta Information */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{item.status === 'lost' ? 'Lost' : 'Found'} on {formatDate(item.dateOccurred)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <User className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">Posted by {item.contactName}</span>
            <span className="ml-auto text-xs">{getDaysAgo(item.datePosted)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;