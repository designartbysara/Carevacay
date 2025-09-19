'use client';

import { useState } from 'react';
import { Booking } from '@/types';

interface FeedbackFormProps {
  booking: Booking;
  onSubmit: (feedback: FeedbackData) => void;
  onCancel: () => void;
}

interface FeedbackData {
  overallRating: number;
  accessibilityRating: number;
  supportRating: number;
  cleanlinessRating: number;
  communicationRating: number;
  title: string;
  comment: string;
  wouldRecommend: boolean;
  highlights: string[];
  improvements: string[];
}

export default function FeedbackForm({ booking, onSubmit, onCancel }: FeedbackFormProps) {
  const [feedback, setFeedback] = useState<FeedbackData>({
    overallRating: 0,
    accessibilityRating: 0,
    supportRating: 0,
    cleanlinessRating: 0,
    communicationRating: 0,
    title: '',
    comment: '',
    wouldRecommend: false,
    highlights: [],
    improvements: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (category: keyof FeedbackData, rating: number) => {
    setFeedback(prev => ({ ...prev, [category]: rating }));
  };

  const handleInputChange = (field: keyof FeedbackData, value: string | boolean) => {
    setFeedback(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: 'highlights' | 'improvements', value: string) => {
    setFeedback(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(feedback);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ 
    rating, 
    onRatingChange, 
    label 
  }: { 
    rating: number; 
    onRatingChange: (rating: number) => void; 
    label: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
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

  const highlightOptions = [
    'Excellent accessibility features',
    'Great location',
    'Clean and well-maintained',
    'Helpful support staff',
    'Good value for money',
    'Comfortable accommodation',
    'Easy booking process',
    'Quick response from host'
  ];

  const improvementOptions = [
    'Better accessibility features',
    'Improved cleanliness',
    'More responsive communication',
    'Better location',
    'Lower pricing',
    'More amenities',
    'Better support services',
    'Improved booking process'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Leave Feedback</h2>
              <p className="text-gray-600">{booking.property.title}</p>
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
              rating={feedback.overallRating}
              onRatingChange={(rating) => handleRatingChange('overallRating', rating)}
              label="How would you rate your overall experience?"
            />
          </div>

          {/* Detailed Ratings */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Ratings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StarRating
                rating={feedback.accessibilityRating}
                onRatingChange={(rating) => handleRatingChange('accessibilityRating', rating)}
                label="Accessibility Features"
              />
              <StarRating
                rating={feedback.supportRating}
                onRatingChange={(rating) => handleRatingChange('supportRating', rating)}
                label="Support Services"
              />
              <StarRating
                rating={feedback.cleanlinessRating}
                onRatingChange={(rating) => handleRatingChange('cleanlinessRating', rating)}
                label="Cleanliness"
              />
              <StarRating
                rating={feedback.communicationRating}
                onRatingChange={(rating) => handleRatingChange('communicationRating', rating)}
                label="Communication"
              />
            </div>
          </div>

          {/* Written Feedback */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Written Feedback</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Review Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={feedback.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Summarize your experience in a few words"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Review
                </label>
                <textarea
                  id="comment"
                  value={feedback.comment}
                  onChange={(e) => handleInputChange('comment', e.target.value)}
                  rows={4}
                  placeholder="Tell us about your experience. What did you like? What could be improved?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What did you like most?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {highlightOptions.map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={feedback.highlights.includes(option)}
                    onChange={() => handleArrayChange('highlights', option)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Improvements */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What could be improved?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {improvementOptions.map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={feedback.improvements.includes(option)}
                    onChange={() => handleArrayChange('improvements', option)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendation</h3>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={feedback.wouldRecommend}
                onChange={(e) => handleInputChange('wouldRecommend', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                I would recommend this accommodation to other NDIS participants
              </span>
            </label>
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
              disabled={isSubmitting || feedback.overallRating === 0}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
