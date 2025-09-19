// src/app/listings/[id]/ListingDetailClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Property, Review } from '@/types';
import BookingFlow from '@/components/BookingFlow';
import ReviewList from '@/components/ReviewList';
import ReviewForm from '@/components/ReviewForm';
import MessagingButton from '@/components/MessagingButton';
import { mockReviews } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

interface ListingDetailClientProps {
  property: Property;
}

export default function ListingDetailClient({ property }: ListingDetailClientProps) {
  const { user } = useAuth();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [reviews, setReviews] = useState<Review[]>(
    mockReviews.filter(review => review.propertyId === property.id)
  );

  const handleBookNow = () => {
    setShowBookingModal(true);
  };

  const handleWriteReview = () => {
    setEditingReview(null);
    setShowReviewForm(true);
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setShowReviewForm(true);
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId));
  };

  const handleSubmitReview = async (reviewData: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `review-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (editingReview) {
      setReviews(prev => prev.map(review => 
        review.id === editingReview.id 
          ? { ...newReview, id: editingReview.id, createdAt: editingReview.createdAt }
          : review
      ));
    } else {
      setReviews(prev => [...prev, newReview]);
    }

    setShowReviewForm(false);
    setEditingReview(null);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/listings" className="text-gray-500 hover:text-gray-700">Listings</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-xl overflow-hidden mb-4">
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">Property Image {selectedImageIndex + 1}</span>
                </div>
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index - 1)}
                    className={`aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden ${
                      selectedImageIndex === index - 1 ? 'ring-2 ring-primary-500' : ''
                    }`}
                  >
                    <div className="w-full h-20 bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-gray-500">{index}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-display font-bold text-2xl text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>📍 {property.address}, {property.city}, {property.state} {property.postcode}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">
                    ${property.basePrice}
                    <span className="text-lg font-normal text-gray-500">/night</span>
                  </div>
                  {property.cleaningFee && (
                    <div className="text-sm text-gray-500">
                      +${property.cleaningFee} cleaning fee
                    </div>
                  )}
                </div>
              </div>

              {/* Stay Type Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-500">
                  {property.stayType}
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="font-semibold text-lg text-gray-900 mb-3">About this place</h2>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              {/* Property Features */}
              <div className="mb-8">
                <h2 className="font-semibold text-lg text-gray-900 mb-4">Property features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">👥</span>
                    <span className="text-gray-700">Up to {property.maxGuests} guests</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🛏️</span>
                    <span className="text-gray-700">{property.bedrooms} bedroom{property.bedrooms !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🚿</span>
                    <span className="text-gray-700">{property.bathrooms} bathroom{property.bathrooms !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📅</span>
                    <span className="text-gray-700">Min {property.minimumStay} night{property.minimumStay !== 1 ? 's' : ''} stay</span>
                  </div>
                </div>
              </div>

              {/* Accessibility Features */}
              <div className="mb-8">
                <h2 className="font-semibold text-lg text-gray-900 mb-4">Accessibility features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.accessibilityFeatures.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3">
                      <span className="text-green-600">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h2 className="font-semibold text-lg text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-3">
                      <span className="text-primary-600">•</span>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* NDIS Information */}
              <div className="mb-8 p-4 bg-green-50 rounded-lg border border-green-200">
                <h2 className="font-semibold text-lg text-gray-900 mb-3">NDIS Information</h2>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">NDIS Approved</span>
                    <span className="text-green-600 font-medium">✓ Verified</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Support Worker Required</span>
                    <span className="text-gray-700">
                      {property.supportWorkerRequired ? 'Yes' : 'No'}
                      {property.supportWorkerRequired && property.supportWorkerProvided && ' (Provided)'}
                    </span>
                  </div>
                  {property.specializedEquipment && property.specializedEquipment.length > 0 && (
                    <div>
                      <span className="text-gray-700">Specialized Equipment: </span>
                      <span className="text-gray-600">{property.specializedEquipment.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Host Information */}
              <div className="mb-8">
                <h2 className="font-semibold text-lg text-gray-900 mb-4">Hosted by {property.host.firstName}</h2>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold">
                        {property.host.firstName[0]}{property.host.lastName[0]}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{property.host.firstName} {property.host.lastName}</div>
                      <div className="text-sm text-gray-600">{property.host.businessName}</div>
                      <div className="text-sm text-gray-500">Verified Host</div>
                    </div>
                  </div>
                  {user && (
                    <MessagingButton
                      currentUser={user}
                      participantId={property.hostId}
                      participantName={`${property.host.firstName} ${property.host.lastName}`}
                      variant="secondary"
                      size="sm"
                    />
                  )}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mb-8">
                <h2 className="font-semibold text-lg text-gray-900 mb-4">Location</h2>
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Map placeholder - {property.address}</span>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-lg text-gray-900">Reviews</h2>
                  <button
                    onClick={handleWriteReview}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    Write a Review
                  </button>
                </div>
                <ReviewList
                  property={property}
                  reviews={reviews}
                  onEditReview={handleEditReview}
                  onDeleteReview={handleDeleteReview}
                  canEdit={true} // In a real app, this would check if user is the review author
                />
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    ${property.basePrice}
                    <span className="text-lg font-normal text-gray-500">/night</span>
                  </div>
                  {property.cleaningFee && (
                    <div className="text-sm text-gray-500">
                      +${property.cleaningFee} cleaning fee
                    </div>
                  )}
                </div>

                <button
                  onClick={handleBookNow}
                  className="w-full bg-accent-400 text-white py-3 px-4 rounded-lg hover:bg-accent-500 transition-colors font-medium text-lg mb-4"
                >
                  Book Now
                </button>

                <div className="text-center text-sm text-gray-600">
                  You won&apos;t be charged yet
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Booking details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-in</span>
                      <span className="text-gray-900">Select dates</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-out</span>
                      <span className="text-gray-900">Select dates</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Guests</span>
                      <span className="text-gray-900">1 guest</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">What&apos;s included</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span>24/7 support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span>Accessibility features</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span>NDIS approved</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span>Verified host</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Flow Modal */}
      <BookingFlow
        property={property}
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />

      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewForm
          property={property}
          onSubmit={handleSubmitReview}
          onCancel={() => {
            setShowReviewForm(false);
            setEditingReview(null);
          }}
          editingReview={editingReview || undefined}
        />
      )}
    </main>
  );
}
