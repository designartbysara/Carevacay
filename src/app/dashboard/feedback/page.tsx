'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { mockBookings } from '@/data/mockData';
import { Booking } from '@/types';
import FeedbackForm from '@/components/FeedbackForm';

export default function FeedbackDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'my-feedback' | 'received-feedback'>('overview');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [feedbackFilter, setFeedbackFilter] = useState<'all' | 'positive' | 'negative' | 'recent'>('all');

  // Mock data - in a real app, this would come from an API
  const bookings = mockBookings;
  const mockFeedback = [
    {
      id: '1',
      bookingId: 'booking-1',
      propertyTitle: 'Accessible Melbourne Apartment',
      participantName: 'John Smith',
      overallRating: 5,
      accessibilityRating: 5,
      supportRating: 4,
      cleanlinessRating: 5,
      communicationRating: 5,
      title: 'Excellent accessible accommodation',
      comment: 'The apartment was perfect for my needs. Great accessibility features and the host was very accommodating.',
      wouldRecommend: true,
      highlights: ['Excellent accessibility features', 'Great location', 'Clean and well-maintained'],
      improvements: [],
      createdAt: new Date('2024-01-15'),
      isPositive: true
    },
    {
      id: '2',
      bookingId: 'booking-2',
      propertyTitle: 'Cozy Sydney House',
      participantName: 'Sarah Johnson',
      overallRating: 3,
      accessibilityRating: 2,
      supportRating: 3,
      cleanlinessRating: 4,
      communicationRating: 3,
      title: 'Good but needs accessibility improvements',
      comment: 'The house was clean and comfortable, but the accessibility features could be better. The host was responsive though.',
      wouldRecommend: false,
      highlights: ['Clean and well-maintained', 'Good value for money'],
      improvements: ['Better accessibility features', 'Improved support services'],
      createdAt: new Date('2024-01-10'),
      isPositive: false
    }
  ];

  const filteredFeedback = useMemo(() => {
    switch (feedbackFilter) {
      case 'positive':
        return mockFeedback.filter(f => f.isPositive);
      case 'negative':
        return mockFeedback.filter(f => !f.isPositive);
      case 'recent':
        return mockFeedback.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5);
      default:
        return mockFeedback;
    }
  }, [feedbackFilter]);

  const getFeedbackStats = () => {
    const total = mockFeedback.length;
    const positive = mockFeedback.filter(f => f.isPositive).length;
    const averageRating = mockFeedback.reduce((sum, f) => sum + f.overallRating, 0) / total;
    const recommendationRate = mockFeedback.filter(f => f.wouldRecommend).length / total * 100;

    return { total, positive, averageRating, recommendationRate };
  };

  const handleFeedbackSubmit = async (feedbackData: any) => {
    // In a real app, this would submit to the backend
    console.log('Feedback submitted:', feedbackData);
    alert('Thank you for your feedback!');
    setShowFeedbackForm(false);
    setSelectedBooking(null);
  };

  const handleLeaveFeedback = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowFeedbackForm(true);
  };

  const stats = getFeedbackStats();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Feedback Dashboard</h1>
              <p className="text-gray-600">Manage feedback and reviews</p>
            </div>
            <Link
              href="/dashboard"
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'my-feedback', label: 'My Feedback', icon: '✍️' },
              { id: 'received-feedback', label: 'Received Feedback', icon: '📥' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <span className="text-2xl">📝</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Feedback</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <span className="text-2xl">👍</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Positive Feedback</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.positive}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Average Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <span className="text-2xl">💯</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Recommendation Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.recommendationRate.toFixed(0)}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Feedback */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Feedback</h3>
              <div className="space-y-4">
                {mockFeedback.slice(0, 3).map((feedback) => (
                  <div key={feedback.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <span className="text-primary-600 font-semibold">
                        {feedback.participantName.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{feedback.title}</h4>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`text-sm ${
                                star <= feedback.overallRating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{feedback.comment}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{feedback.propertyTitle}</span>
                        <span>{feedback.createdAt.toLocaleDateString()}</span>
                        {feedback.wouldRecommend && (
                          <span className="text-green-600 font-medium">✓ Recommended</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* My Feedback Tab */}
        {activeTab === 'my-feedback' && (
          <div className="space-y-6">
            {/* Filter Controls */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">My Feedback</h3>
                <div className="flex space-x-2">
                  {['all', 'positive', 'negative', 'recent'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setFeedbackFilter(filter as any)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        feedbackFilter === filter
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bookings Available for Feedback */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Feedback</h3>
              <div className="space-y-4">
                {bookings.filter(b => b.status === 'completed').map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <span className="text-primary-600 font-semibold">
                          {booking.property.title.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{booking.property.title}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleLeaveFeedback(booking)}
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                    >
                      Leave Feedback
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* My Submitted Feedback */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">My Submitted Feedback</h3>
              <div className="space-y-4">
                {filteredFeedback.map((feedback) => (
                  <div key={feedback.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{feedback.title}</h4>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-sm ${
                              star <= feedback.overallRating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{feedback.comment}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{feedback.propertyTitle}</span>
                      <span>{feedback.createdAt.toLocaleDateString()}</span>
                      {feedback.wouldRecommend && (
                        <span className="text-green-600 font-medium">✓ Recommended</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Received Feedback Tab */}
        {activeTab === 'received-feedback' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Received Feedback</h3>
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📥</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">No feedback received yet</h4>
                <p className="text-gray-600">
                  Feedback from guests will appear here once you start receiving bookings.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Feedback Form Modal */}
      {showFeedbackForm && selectedBooking && (
        <FeedbackForm
          booking={selectedBooking}
          onSubmit={handleFeedbackSubmit}
          onCancel={() => {
            setShowFeedbackForm(false);
            setSelectedBooking(null);
          }}
        />
      )}
    </main>
  );
}
