// Core types for Carevacay NDIS platform

export type StayType = 'STA' | 'SIL' | 'Respite' | 'SDA' | 'MTA';

export type UserRole = 'participant' | 'carer' | 'host' | 'provider';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NDISParticipant extends User {
  role: 'participant';
  ndisNumber?: string;
  supportNeeds?: string[];
  accessibilityRequirements?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface Carer extends User {
  role: 'carer';
  participantId?: string; // If caring for a specific participant
  qualifications?: string[];
  experience?: string;
}

export interface Host extends User {
  role: 'host';
  businessName?: string;
  abn?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  properties: Property[];
}

export interface Property {
  id: string;
  title: string;
  description: string;
  stayType: StayType;
  hostId: string;
  host: Host;
  
  // Location
  address: string;
  city: string;
  state: string;
  postcode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  
  // Property details
  images: string[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  accessibilityFeatures: string[];
  amenities: string[];
  
  // Pricing
  basePrice: number; // per night
  cleaningFee?: number;
  serviceFee?: number;
  
  // Availability
  isAvailable: boolean;
  minimumStay: number; // minimum nights
  maximumStay?: number; // maximum nights
  
  // NDIS specific
  ndisApproved: boolean;
  supportWorkerRequired: boolean;
  supportWorkerProvided: boolean;
  specializedEquipment?: string[];
  
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  propertyId: string;
  property: Property;
  participantId: string;
  participant: NDISParticipant;
  carerId?: string;
  carer?: Carer;
  
  // Booking details
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalNights: number;
  
  // Pricing
  basePrice: number;
  cleaningFee?: number;
  serviceFee?: number;
  totalAmount: number;
  
  // Special requirements
  specialRequirements?: string;
  accessibilityNeeds?: string[];
  supportWorkerRequired: boolean;
  
  // Status
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  hostNotes?: string;
  participantNotes?: string;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchFilters {
  location?: string;
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  stayType?: StayType[];
  maxPrice?: number;
  minPrice?: number;
  accessibilityFeatures?: string[];
  amenities?: string[];
}

export interface Review {
  id: string;
  bookingId: string;
  propertyId: string;
  participantId: string;
  hostId: string;
  
  rating: number; // 1-5 stars
  title: string;
  comment: string;
  
  // NDIS specific ratings
  accessibilityRating: number;
  supportRating: number;
  cleanlinessRating: number;
  communicationRating: number;
  
  createdAt: Date;
  updatedAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
