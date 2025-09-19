'use client';

import { useState } from 'react';
import { Property } from '@/types';

interface FeedbackSummaryProps {
  property: Property;
  feedback?: {
    overallRating: number;
    totalReviews: number;
    accessibilityRating: number;
    supportRating: number;
    cleanlinessRating: number;
    communicationRating: number;
    recentReviews: Array<{
      id: string;
      participantName: string;
      rating: number;
      title: string;
      comment: string;
      createdAt: Date;
      wouldRecommend: boolean;
    }>;
  };
}

export default function FeedbackSummary({ property, feedback }: FeedbackSummaryProps) {
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Mock data if no feedback provided
  const mockFeedback = feedback || {
    overallRating: 4.5,
    totalReviews: 12,
    accessibilityRating: 4.8,
    supportRating: 4.2,
    cleanlinessRating: 4.6,
    communicationRating: 4.4,
    recentReviews: [
      {
        id: '1',
        participantName: 'John S.',
        rating: 5,
        title: 'Excellent accessible accommodation',
        comment: 'The apartment was perfect for my needs. Great accessibility features and the host was very accommodating.',
        createdAt: new Date('2024-01-15'),
        wouldRecommend: true
      },
      {
        id: '2',
        participantName: 'Sarah M.',
        rating: 4,
        title: 'Great location and clean space',
        comment: 'Very clean and well-maintained. The location was convenient and the host was responsive.',
        createdAt: new Date('2024-01-10'),
        wouldRecommend: true
      },
      {
        id: '3',
        participantName: 'Michael R.',
        rating: 5,
        title: 'Perfect for NDIS participants',
        comment: 'All the accessibility features worked perfectly. Highly recommend for anyone with mobility needs.',
        createdAt: new Date('2024-01-05'),
        wouldRecommend: true
      }
    ]
  };

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

  const getRatingPercentage = (rating: number) => {
    return (rating / 5) * 100;
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Very Good';
    if (rating >= 3.5) return 'Good';
    if (rating >= 3.0) return 'Fair';
    return 'Poor';
  };

  const displayedReviews = showAllReviews ? mockFeedback.recentReviews : mockFeedback.recentReviews.slice(0, 2);

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Guest Reviews</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <StarRating rating={mockFeedback.overallRating} size="lg" />
              <span className="text-gray-600">({mockFeedback.totalReviews} reviews)</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-sm font-medium ${
              mockFeedback.overallRating >= 4.5 ? 'bg-green-100 text-green-800' :
              mockFeedback.overallRating >= 4.0 ? 'bg-blue-100 text-blue-800' :
              mockFeedback.overallRating >= 3.5 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {getRatingLabel(mockFeedback.overallRating)}
            </span>
          </div>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Rating Breakdown</h4>
          {[
            { label: 'Accessibility', rating: mockFeedback.accessibilityRating },
            { label: 'Support Services', rating: mockFeedback.supportRating },
            { label: 'Cleanliness', rating: mockFeedback.cleanlinessRating },
            { label: 'Communication', rating: mockFeedback.communicationRating }
          ].map(({ label, rating }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{label}</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${getRatingPercentage(rating)}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-8">{rating.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation Rate */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Guest Satisfaction</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Would recommend</span>
              <span className="text-sm font-medium text-gray-900">
                {Math.round((mockFeedback.recentReviews.filter(r => r.wouldRecommend).length / mockFeedback.recentReviews.length) * 100)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">5-star reviews</span>
              <span className="text-sm font-medium text-gray-900">
                {Math.round((mockFeedback.recentReviews.filter(r => r.rating === 5).length / mockFeedback.recentReviews.length) * 100)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">NDIS approved</span>
              <span className="text-sm font-medium text-green-600">✓ Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900">Recent Reviews</h4>
          {mockFeedback.recentReviews.length > 2 && (
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              {showAllReviews ? 'Show Less' : `Show All ${mockFeedback.recentReviews.length} Reviews`}
            </button>
          )}
        </div>

        <div className="space-y-4">
          {displayedReviews.map((review) => (
            <div key={review.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h5 className="font-medium text-gray-900">{review.title}</h5>
                  <p className="text-sm text-gray-600">{review.participantName}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <StarRating rating={review.rating} size="sm" />
                  {review.wouldRecommend && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
              <p className="text-xs text-gray-500">{review.createdAt.toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* NDIS Specific Info */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-green-600">✓</span>
          <span className="font-medium text-green-900">NDIS Approved Accommodation</span>
        </div>
        <p className="text-sm text-green-800">
          This property has been verified to meet NDIS accessibility standards and has received positive feedback from NDIS participants.
        </p>
      </div>
    </div>
  );
}
