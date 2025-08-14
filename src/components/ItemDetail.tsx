import React, { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, User, Mail, Phone, MessageCircle, CheckCircle } from 'lucide-react';
import { LostFoundItem } from '../App';

interface ItemDetailProps {
  item: LostFoundItem;
  onBack: () => void;
  onMarkResolved: () => void;
  darkMode: boolean;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ item, onBack, onMarkResolved, darkMode }) => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactMessage, setContactMessage] = useState('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message
    alert('Message sent! The item owner will contact you soon.');
    setShowContactForm(false);
    setContactMessage('');
  };

  return (
    <div className={darkMode ? 'min-h-screen bg-gray-900 text-gray-100 py-8' : 'min-h-screen bg-gray-50 text-gray-900 py-8'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
  <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={onBack}
            className={darkMode ? 'p-2 text-gray-300 hover:text-white transition-colors' : 'p-2 text-gray-600 hover:text-gray-900 transition-colors'}
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <nav className={darkMode ? 'text-sm text-gray-400 mb-1' : 'text-sm text-gray-500 mb-1'}>
              <span>Browse Items</span> / <span className={darkMode ? 'text-gray-100' : 'text-gray-900'}>{item.title}</span>
            </nav>
            <h1 className={darkMode ? 'text-3xl font-bold text-gray-100' : 'text-3xl font-bold text-gray-900'}>{item.title}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className={darkMode ? 'bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden' : 'bg-white rounded-xl shadow-sm border overflow-hidden'}>
              {/* Image */}
              {item.imageUrl && (
                <div className="relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-64 lg:h-96 object-cover"
                  />
                  {item.resolved && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-green-500 text-white px-3 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Resolved</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="p-6">
                {/* Status and Category */}
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.status === 'lost'
                      ? (darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800')
                      : (darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800')
                  }`}>
                    {item.status === 'lost' ? 'Lost Item' : 'Found Item'}
                  </span>
                  <span className={darkMode ? 'px-3 py-1 rounded-full text-sm font-medium bg-gray-900 text-gray-200' : 'px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800'}>
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                  </span>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className={darkMode ? 'text-lg font-semibold text-gray-100 mb-3' : 'text-lg font-semibold text-gray-900 mb-3'}>Description</h3>
                  <p className={darkMode ? 'text-gray-300 leading-relaxed whitespace-pre-wrap' : 'text-gray-700 leading-relaxed whitespace-pre-wrap'}>
                    {item.description}
                  </p>
                </div>

                {/* Details */}
                <div className="border-t pt-6">
                  <h3 className={darkMode ? 'text-lg font-semibold text-gray-100 mb-4' : 'text-lg font-semibold text-gray-900 mb-4'}>Details</h3>
                  <div className="space-y-3">
                    <div className={darkMode ? 'flex items-center text-gray-400' : 'flex items-center text-gray-600'}>
                      <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                      <span className="font-medium mr-2">Location:</span>
                      <span>{item.location}</span>
                    </div>
                    
                    <div className={darkMode ? 'flex items-center text-gray-400' : 'flex items-center text-gray-600'}>
                      <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                      <span className="font-medium mr-2">
                        Date {item.status === 'lost' ? 'Lost' : 'Found'}:
                      </span>
                      <span>{formatDate(item.dateOccurred)}</span>
                    </div>
                    
                    <div className={darkMode ? 'flex items-center text-gray-400' : 'flex items-center text-gray-600'}>
                      <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                      <span className="font-medium mr-2">Posted:</span>
                      <span>{formatDate(item.datePosted)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className={darkMode ? 'bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6' : 'bg-white rounded-xl shadow-sm border p-6'}>
              <h3 className={darkMode ? 'text-lg font-semibold text-gray-100 mb-4' : 'text-lg font-semibold text-gray-900 mb-4'}>Contact Information</h3>
              
              <div className="space-y-3 mb-6">
                <div className={darkMode ? 'flex items-center text-gray-400' : 'flex items-center text-gray-600'}>
                  <User className="h-5 w-5 mr-3 text-gray-400" />
                  <span>{item.contactName}</span>
                </div>
                
                <div className={darkMode ? 'flex items-center text-gray-400' : 'flex items-center text-gray-600'}>
                  <Mail className="h-5 w-5 mr-3 text-gray-400" />
                  <a 
                    href={`mailto:${item.contactEmail}`}
                    className={darkMode ? 'text-blue-400 hover:text-blue-300 transition-colors' : 'text-blue-600 hover:text-blue-700 transition-colors'}
                  >
                    {item.contactEmail}
                  </a>
                </div>
                
                {item.contactPhone && (
                  <div className={darkMode ? 'flex items-center text-gray-400' : 'flex items-center text-gray-600'}>
                    <Phone className="h-5 w-5 mr-3 text-gray-400" />
                    <a 
                      href={`tel:${item.contactPhone}`}
                      className={darkMode ? 'text-blue-400 hover:text-blue-300 transition-colors' : 'text-blue-600 hover:text-blue-700 transition-colors'}
                    >
                      {item.contactPhone}
                    </a>
                  </div>
                )}
              </div>

              {!item.resolved && (
                <div className="space-y-3">
                  <button
                    onClick={() => setShowContactForm(!showContactForm)}
                    className={darkMode ? 'w-full bg-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2' : 'w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2'}
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Send Message</span>
                  </button>
                  
                  <button
                    onClick={onMarkResolved}
                    className={darkMode ? 'w-full bg-green-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-800 transition-colors flex items-center justify-center space-x-2' : 'w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2'}
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span>Mark as Resolved</span>
                  </button>
                </div>
              )}
            </div>

            {/* Contact Form */}
            {showContactForm && !item.resolved && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Send a Message</h3>
                <form onSubmit={handleContactSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message
                    </label>
                    <textarea
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Hi! I think I found/lost your item. Let me know how we can connect..."
                      rows={4}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Send
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Safety Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">Safety Tips</h3>
              <ul className="text-sm text-yellow-700 space-y-2">
                <li>• Meet in public places</li>
                <li>• Bring a friend if possible</li>
                <li>• Verify item details before meeting</li>
                <li>• Trust your instincts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;