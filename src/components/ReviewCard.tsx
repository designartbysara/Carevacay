'use client';

import { useState } from 'react';
import { Review } from '@/types';

interface ReviewCardProps {
  review: Review;
  showFullReview?: boolean;
  onEdit?: (review: Review) => void;
  onDelete?: (reviewId: string) => void;
  canEdit?: boolean;
}

export default function ReviewCard({ 
  review, 
  showFullReview = false, 
  onEdit, 
  onDelete, 
  canEdit = false 
}: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(showFullReview);

  const StarRating = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    };

    return (
      <div className={`flex items-center space-x-1 ${sizeClasses[size]}`}>
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

  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Very Good';
    if (rating >= 3.5) return 'Good';
    if (rating >= 3.0) return 'Fair';
    return 'Poor';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
      {/* Review Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
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
          <div className="flex items-center space-x-2">
            {onEdit && (
              <button
                onClick={() => onEdit(review)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Edit review"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(review.id)}
                className="text-gray-400 hover:text-red-600 transition-colors"
                title="Delete review"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Overall Rating */}
      <div className="mb-4">
        <div className="flex items-center space-x-3 mb-2">
          <StarRating rating={review.rating} size="md" />
          <span className={`px-2 py-1 rounded-full text-sm font-medium ${
            review.rating >= 4.5 ? 'bg-green-100 text-green-800' :
            review.rating >= 4.0 ? 'bg-blue-100 text-blue-800' :
            review.rating >= 3.5 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {getRatingLabel(review.rating)}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 text-lg">{review.title}</h3>
      </div>

      {/* Review Content */}
      <div className="mb-4">
        <p className={`text-gray-700 leading-relaxed ${
          !isExpanded && review.comment.length > 200 ? 'line-clamp-3' : ''
        }`}>
          {review.comment}
        </p>
        {review.comment.length > 200 && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm mt-2"
          >
            Read more
          </button>
        )}
        {isExpanded && review.comment.length > 200 && (
          <button
            onClick={() => setIsExpanded(false)}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm mt-2"
          >
            Show less
          </button>
        )}
      </div>

      {/* Detailed Ratings */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">Detailed Ratings</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Accessibility</span>
            <StarRating rating={review.accessibilityRating} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Support Services</span>
            <StarRating rating={review.supportRating} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Cleanliness</span>
            <StarRating rating={review.cleanlinessRating} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Communication</span>
            <StarRating rating={review.communicationRating} size="sm" />
          </div>
        </div>
      </div>

      {/* NDIS Specific Info */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <span className="text-green-600 mr-1">✓</span>
            NDIS Participant
          </span>
          <span className="flex items-center">
            <span className="text-blue-600 mr-1">🏥</span>
            Verified Stay
          </span>
        </div>
        <div className="text-xs text-gray-500">
          Review ID: {review.id}
        </div>
      </div>
    </div>
  );
}
