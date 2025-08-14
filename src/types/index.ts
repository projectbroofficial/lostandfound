// Centralized type exports for the app

export type ItemStatus = 'lost' | 'found';
export type ItemCategory =
  | 'electronics'
  | 'wallets'
  | 'keys'
  | 'jewelry'
  | 'clothing'
  | 'bags'
  | 'pets'
  | 'documents'
  | 'other';

export interface LostFoundItem {
  id: string;
  title: string;
  description: string;
  category: ItemCategory;
  status: ItemStatus;
  location: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  imageUrl?: string;
  dateOccurred: string;
  datePosted: string;
}
