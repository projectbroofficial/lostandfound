import React, { useState } from 'react';
import { Search, MapPin, Plus, ArrowRight, Shield, Users, Clock, Heart } from 'lucide-react';
import { LostFoundItem } from '../App';
import ItemCard from './ItemCard';

interface HomePageProps {
  items: LostFoundItem[];
  onPostClick: () => void;
  onBrowseClick: () => void;
  onViewItem: (item: LostFoundItem) => void;
}

const HomePage: React.FC<HomePageProps> = ({ items, onPostClick, onBrowseClick, onViewItem }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const recentItems = items.slice(0, 6);
  const successStories = items.filter(item => item.resolved).length;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Lost something?
                <br />
                <span className="text-blue-200">We'll help you find it.</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Connect with your local community to reunite with lost belongings. 
                Post what you've lost or found, and help others do the same.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onPostClick}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2 group"
                >
                  <Plus className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span>Post an Item</span>
                </button>
                <button
                  onClick={onBrowseClick}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center space-x-2 group"
                >
                  <span>Browse Items</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">{items.length}</div>
                    <div className="text-blue-200">Items Posted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">{successStories}</div>
                    <div className="text-blue-200">Items Reunited</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">24h</div>
                    <div className="text-blue-200">Avg Response</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">95%</div>
                    <div className="text-blue-200">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      <section className="bg-white shadow-sm -mt-8 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Search</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Select Location</option>
                  <option value="downtown">Downtown</option>
                  <option value="university">University Area</option>
                  <option value="mall">Shopping Mall</option>
                  <option value="park">City Park</option>
                  <option value="transit">Public Transit</option>
                </select>
              </div>
              
              <button
                onClick={onBrowseClick}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to reunite with your lost belongings or help others find theirs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Plus className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">1. Post Your Item</h3>
              <p className="text-gray-600 leading-relaxed">
                Upload a photo and description of what you've lost or found. Include location details to help with matching.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">2. Search & Match</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse through local listings or let our system notify you of potential matches based on your item.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">3. Reunite</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect safely with the other person through our secure contact system and arrange the return.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Items */}
      {recentItems.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Recent Posts</h2>
                <p className="text-gray-600">Latest items from your community</p>
              </div>
              <button
                onClick={onBrowseClick}
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>View All</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentItems.map(item => (
                <ItemCard 
                  key={item.id} 
                  item={item} 
                  onClick={() => onViewItem(item)} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Lost Item?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our community of helpful neighbors and start your search today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onPostClick}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Post Lost Item
            </button>
            <button
              onClick={onPostClick}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Post Found Item
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;