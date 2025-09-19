'use client';

import { useState } from 'react';
import { Review, Property } from '@/types';
import { mockReviews } from '@/data/mockData';

interface ReviewListProps {
  property: Property;
  reviews: Review[];
  onEditReview?: (review: Review) => void;
  onDeleteReview?: (reviewId: string) => void;
  canEdit?: boolean;
}

export default function ReviewList({ 
  property, 
  reviews, 
  onEditReview, 
  onDeleteReview, 
  canEdit = false 
}: ReviewListProps) {
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  // Calculate average ratings
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const averageAccessibility = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.accessibilityRating, 0) / reviews.length
    : 0;

  const averageSupport = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.supportRating, 0) / reviews.length
    : 0;

  const averageCleanliness = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.cleanlinessRating, 0) / reviews.length
    : 0;

  const averageCommunication = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.communicationRating, 0) / reviews.length
    : 0;

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(review => filterRating === null || review.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  // Rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(review => review.rating === star).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(review => review.rating === star).length / reviews.length) * 100 
      : 0
  }));

  const StarRating = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    };

    return (
      <div className={`flex items-center ${sizeClasses[size]}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
        <span className="ml-1 text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Reviews & Ratings</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div>
            <div className="flex items-center mb-4">
              <div className="text-4xl font-bold text-gray-900 mr-4">
                {averageRating.toFixed(1)}
              </div>
              <div>
                <StarRating rating={averageRating} size="lg" />
                <p className="text-gray-600 mt-1">
                  Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map(({ star, count, percentage }) => (
                <div key={star} className="flex items-center">
                  <span className="text-sm text-gray-600 w-8">{star}★</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Ratings */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-3">Detailed Ratings</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Accessibility Features</span>
                <StarRating rating={averageAccessibility} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Support Services</span>
                <StarRating rating={averageSupport} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cleanliness</span>
                <StarRating rating={averageCleanliness} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Communication</span>
                <StarRating rating={averageCommunication} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white rounded-xl p-4 shadow-soft border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap gap-4">
            <div>
              <label htmlFor="sort-reviews" className="block text-sm font-medium text-gray-700 mb-1">
                Sort by
              </label>
              <select
                id="sort-reviews"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
              </select>
            </div>
            <div>
              <label htmlFor="filter-rating" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by rating
              </label>
              <select
                id="filter-rating"
                value={filterRating || ''}
                onChange={(e) => setFilterRating(e.target.value ? Number(e.target.value) : null)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All ratings</option>
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Showing {filteredReviews.length} of {reviews.length} reviews
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-soft border border-gray-100">
            <div className="text-gray-400 text-4xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews found</h3>
            <p className="text-gray-600">
              {filterRating ? `No reviews with ${filterRating} star${filterRating !== 1 ? 's' : ''} rating` : 'No reviews available for this property'}
            </p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold text-sm">
                      {getInitials(review.participant.firstName, review.participant.lastName)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {review.participant.firstName} {review.participant.lastName}
                    </h4>
                    <p className="text-sm text-gray-600">{formatDate(review.createdAt)}</p>
                  </div>
                </div>
                {canEdit && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEditReview?.(review)}
                      className="text-primary-600 hover:text-primary-700 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteReview?.(review.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
                <StarRating rating={review.rating} />
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

              {/* Detailed Ratings */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Accessibility</div>
                  <StarRating rating={review.accessibilityRating} size="sm" />
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Support</div>
                  <StarRating rating={review.supportRating} size="sm" />
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Cleanliness</div>
                  <StarRating rating={review.cleanlinessRating} size="sm" />
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Communication</div>
                  <StarRating rating={review.communicationRating} size="sm" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
