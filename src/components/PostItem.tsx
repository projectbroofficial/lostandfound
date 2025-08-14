import { useState } from 'react';
import { Upload, MapPin, Calendar, User, Mail, Phone, ArrowLeft } from 'lucide-react';
import { ItemStatus, ItemCategory, LostFoundItem } from '../App';

interface PostItemProps {
  onSubmit: (item: Omit<LostFoundItem, 'id' | 'datePosted'>) => void;
  onCancel: () => void;
  darkMode: boolean;
}

const categories: { value: ItemCategory; label: string }[] = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'wallets', label: 'Wallets & Purses' },
  { value: 'keys', label: 'Keys' },
  { value: 'jewelry', label: 'Jewelry & Watches' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'bags', label: 'Bags & Backpacks' },
  { value: 'pets', label: 'Pets' },
  { value: 'documents', label: 'Documents & IDs' },
  { value: 'other', label: 'Other' },
];

const locations = [
  'Downtown',
  'University Area',
  'Shopping Mall',
  'City Park',
  'Public Transit',
  'Coffee Shop',
  'Restaurant',
  'Library',
  'Gym/Fitness Center',
  'Airport',
  'Hospital',
  'School',
  'Other',
];

const PostItem: React.FC<PostItemProps> = ({ onSubmit, onCancel, darkMode }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'other' as ItemCategory,
    status: 'lost' as ItemStatus,
    location: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    imageUrl: '',
    dateOccurred: '',
  });

  // Removed unused imageFile state
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const maxDescriptionLength = 300;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const itemData: Omit<LostFoundItem, 'id' | 'datePosted'> = {
      ...formData,
      imageUrl: imagePreview || undefined,
    };
    onSubmit(itemData);
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      category: 'other',
      status: 'lost',
      location: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      imageUrl: '',
      dateOccurred: '',
    });
    setImagePreview(null);
  };

  return (
    <div className={darkMode ? 'min-h-screen bg-gray-900 text-gray-100 py-8' : 'min-h-screen bg-gray-50 text-gray-900 py-8'}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={darkMode ? 'bg-gray-800 rounded-xl shadow-lg border border-gray-700' : 'bg-white rounded-xl shadow-lg'}>
          <div className={darkMode ? 'px-6 py-4 border-b border-gray-700 flex items-center space-x-4' : 'px-6 py-4 border-b border-gray-200 flex items-center space-x-4'}>
            <button
              onClick={onCancel}
              className={darkMode ? 'p-2 text-gray-300 hover:text-white transition-colors' : 'p-2 text-gray-600 hover:text-gray-900 transition-colors'}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className={darkMode ? 'text-2xl font-bold text-gray-100' : 'text-2xl font-bold text-gray-900'}>Post an Item</h1>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Help reunite items with their owners</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Status Selection */}
            <div>
              <label className="text-base font-medium text-gray-900">What would you like to post?</label>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <label className="relative">
                  <input
                    type="radio"
                    name="status"
                    value="lost"
                    checked={formData.status === 'lost'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as ItemStatus })}
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.status === 'lost' 
                      ? 'border-red-500 bg-red-50 text-red-700' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <div className="text-center">
                      <div className="text-lg font-semibold">Lost Item</div>
                      <div className="text-sm opacity-75">I lost something</div>
                    </div>
                  </div>
                </label>
                
                <label className="relative">
                  <input
                    type="radio"
                    name="status"
                    value="found"
                    checked={formData.status === 'found'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as ItemStatus })}
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.status === 'found' 
                      ? 'border-green-500 bg-green-50 text-green-700' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <div className="text-center">
                      <div className="text-lg font-semibold">Found Item</div>
                      <div className="text-sm opacity-75">I found something</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo (Optional but recommended)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                <div className="space-y-1 text-center">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto h-32 w-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          // setImageFile(null); // removed unused imageFile
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Black iPhone 13, Brown leather wallet, Silver ring"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as ItemCategory })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                maxLength={maxDescriptionLength}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                placeholder="Provide detailed description including size, color, brand, distinguishing features..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="text-right text-xs mt-1" style={{ color: formData.description.length >= maxDescriptionLength ? '#dc2626' : '#6b7280' }}>
                {formData.description.length}/{maxDescriptionLength} characters
              </div>
            </div>

            {/* Location and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Location *
                </label>
                <select
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select location</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Date {formData.status === 'lost' ? 'Lost' : 'Found'} *
                </label>
                <input
                  type="date"
                  required
                  value={formData.dateOccurred}
                  onChange={(e) => setFormData({ ...formData, dateOccurred: e.target.value })}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline h-4 w-4 mr-1" />
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="inline h-4 w-4 mr-1" />
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Post {formData.status === 'lost' ? 'Lost' : 'Found'} Item
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostItem;