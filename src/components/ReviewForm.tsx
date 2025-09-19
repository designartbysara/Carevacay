'use client';

import { useState } from 'react';
import { Property, Review } from '@/types';

interface ReviewFormProps {
  property: Property;
  onSubmit: (review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  editingReview?: Review;
}

export default function ReviewForm({ property, onSubmit, onCancel, editingReview }: ReviewFormProps) {
  const [review, setReview] = useState({
    propertyId: property.id,
    participantId: 'participant-1', // In a real app, this would come from auth
    hostId: property.hostId,
    rating: editingReview?.rating || 0,
    title: editingReview?.title || '',
    comment: editingReview?.comment || '',
    accessibilityRating: editingReview?.accessibilityRating || 0,
    supportRating: editingReview?.supportRating || 0,
    cleanlinessRating: editingReview?.cleanlinessRating || 0,
    communicationRating: editingReview?.communicationRating || 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (category: keyof typeof review, rating: number) => {
    setReview(prev => ({ ...prev, [category]: rating }));
  };

  const handleInputChange = (field: keyof typeof review, value: string) => {
    setReview(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(review as Omit<Review, 'id' | 'createdAt' | 'updatedAt'>);
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ 
    rating, 
    onRatingChange, 
    label,
    required = false
  }: { 
    rating: number; 
    onRatingChange: (rating: number) => void; 
    label: string;
    required?: boolean;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`text-2xl transition-colors ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } hover:text-yellow-400`}
          >
            ★
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : 'Not rated'}
        </span>
      </div>
    </div>
  );

  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Very Good';
    if (rating >= 3.5) return 'Good';
    if (rating >= 3.0) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {editingReview ? 'Edit Review' : 'Write a Review'}
              </h2>
              <p className="text-gray-600">{property.title}</p>
            </div>
            <button
              type="button"
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Overall Rating */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Experience</h3>
            <StarRating
              rating={review.rating}
              onRatingChange={(rating) => handleRatingChange('rating', rating)}
              label="How would you rate your overall experience?"
              required
            />
            {review.rating > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                {getRatingLabel(review.rating)}
              </div>
            )}
          </div>

          {/* Detailed Ratings */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Ratings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StarRating
                rating={review.accessibilityRating}
                onRatingChange={(rating) => handleRatingChange('accessibilityRating', rating)}
                label="Accessibility Features"
                required
              />
              <StarRating
                rating={review.supportRating}
                onRatingChange={(rating) => handleRatingChange('supportRating', rating)}
                label="Support Services"
                required
              />
              <StarRating
                rating={review.cleanlinessRating}
                onRatingChange={(rating) => handleRatingChange('cleanlinessRating', rating)}
                label="Cleanliness"
                required
              />
              <StarRating
                rating={review.communicationRating}
                onRatingChange={(rating) => handleRatingChange('communicationRating', rating)}
                label="Communication"
                required
              />
            </div>
          </div>

          {/* Written Review */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Written Review</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Review Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  value={review.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Summarize your experience in a few words"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Review <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="comment"
                  value={review.comment}
                  onChange={(e) => handleInputChange('comment', e.target.value)}
                  rows={4}
                  placeholder="Tell us about your experience. What did you like? What could be improved?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
                <div className="mt-1 text-sm text-gray-500">
                  {review.comment.length}/500 characters
                </div>
              </div>
            </div>
          </div>

          {/* NDIS Specific Information */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">NDIS Review Guidelines</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Focus on accessibility features and how they met your needs</li>
              <li>• Mention any support services provided and their quality</li>
              <li>• Share how the accommodation supported your independence</li>
              <li>• Be specific about what worked well and what could be improved</li>
            </ul>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || review.rating === 0 || !review.title || !review.comment}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : editingReview ? 'Update Review' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
