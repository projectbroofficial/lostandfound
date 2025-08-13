import React, { useState, useEffect } from 'react';
import { Search, MapPin, Plus, Heart, Shield, Users } from 'lucide-react';
import HomePage from './components/HomePage';
import PostItem from './components/PostItem';
import BrowseItems from './components/BrowseItems';
import ItemDetail from './components/ItemDetail';

export type ItemStatus = 'lost' | 'found';
export type ItemCategory = 'electronics' | 'wallets' | 'keys' | 'jewelry' | 'clothing' | 'bags' | 'pets' | 'documents' | 'other';

export interface LostFoundItem {
  id: string;
  title: string;
  description: string;
  category: ItemCategory;
  status: ItemStatus;
  location: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  imageUrl?: string;
  datePosted: string;
  dateOccurred: string;
  resolved?: boolean;
}

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'post' | 'browse' | 'detail'>('home');
  const [selectedItem, setSelectedItem] = useState<LostFoundItem | null>(null);
  const [items, setItems] = useState<LostFoundItem[]>([]);

  // Load items from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem('lostFoundItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Save items to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('lostFoundItems', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<LostFoundItem, 'id' | 'datePosted'>) => {
    const newItem: LostFoundItem = {
      ...item,
      id: Date.now().toString(),
      datePosted: new Date().toISOString(),
    };
    setItems(prev => [newItem, ...prev]);
  };

  const markResolved = (itemId: string) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, resolved: true } : item
    ));
  };

  const viewItem = (item: LostFoundItem) => {
    setSelectedItem(item);
    setCurrentView('detail');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => setCurrentView('home')}
            >
              <div className="bg-blue-600 rounded-lg p-2 group-hover:bg-blue-700 transition-colors">
                <Search className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Lost & Found Hub</h1>
                <p className="text-sm text-gray-600">Reconnecting people with their belongings</p>
              </div>
            </div>
            
            <nav className="flex items-center space-x-6">
              <button
                onClick={() => setCurrentView('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'home' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentView('browse')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'browse' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Browse Items
              </button>
              <button
                onClick={() => setCurrentView('post')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Post Item</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {currentView === 'home' && (
          <HomePage 
            items={items} 
            onPostClick={() => setCurrentView('post')}
            onBrowseClick={() => setCurrentView('browse')}
            onViewItem={viewItem}
          />
        )}
        
        {currentView === 'post' && (
          <PostItem 
            onSubmit={(item) => {
              addItem(item);
              setCurrentView('browse');
            }}
            onCancel={() => setCurrentView('home')}
          />
        )}
        
        {currentView === 'browse' && (
          <BrowseItems 
            items={items}
            onViewItem={viewItem}
          />
        )}
        
        {currentView === 'detail' && selectedItem && (
          <ItemDetail 
            item={selectedItem}
            onBack={() => setCurrentView('browse')}
            onMarkResolved={() => {
              markResolved(selectedItem.id);
              setCurrentView('browse');
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-600 rounded-lg p-2">
                  <Search className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">Lost & Found Hub</span>
              </div>
              <p className="text-gray-600">
                Connecting communities to help reunite people with their lost belongings.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                How It Works
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>Safe & Secure</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span>Location Based</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>Community Driven</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Statistics
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>{items.length} items posted</p>
                <p>{items.filter(item => item.resolved).length} items reunited</p>
                <p className="flex items-center space-x-1">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>Community powered</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;