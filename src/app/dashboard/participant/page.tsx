'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { mockBookings } from '@/data/mockData';
import { Booking } from '@/types';
import BookingStatusTracker from '@/components/BookingStatusTracker';

export default function ParticipantDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'favorites' | 'profile'>('overview');
  const [bookingFilter, setBookingFilter] = useState<'all' | 'upcoming' | 'past' | 'cancelled'>('all');

  // Mock data - in a real app, this would come from an API
  const bookings = mockBookings;

  const filteredBookings = useMemo(() => {
    const now = new Date();
    switch (bookingFilter) {
      case 'upcoming':
        return bookings.filter(booking => 
          booking.status !== 'cancelled' && 
          new Date(booking.checkIn) > now
        );
      case 'past':
        return bookings.filter(booking => 
          booking.status === 'completed' || 
          (booking.status !== 'cancelled' && new Date(booking.checkOut) < now)
        );
      case 'cancelled':
        return bookings.filter(booking => booking.status === 'cancelled');
      default:
        return bookings;
    }
  }, [bookings, bookingFilter]);

  const getBookingStats = () => {
    const now = new Date();
    const total = bookings.length;
    const upcoming = bookings.filter(b => 
      b.status !== 'cancelled' && new Date(b.checkIn) > now
    ).length;
    const past = bookings.filter(b => 
      b.status === 'completed' || 
      (b.status !== 'cancelled' && new Date(b.checkOut) < now)
    ).length;
    const cancelled = bookings.filter(b => b.status === 'cancelled').length;

    return { total, upcoming, past, cancelled };
  };

  const stats = getBookingStats();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
              <p className="text-gray-600">Manage your bookings and preferences</p>
            </div>
            <Link
              href="/listings"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Find Accommodation
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
              { id: 'bookings', label: 'My Bookings', icon: '📅' },
              { id: 'favorites', label: 'Favorites', icon: '❤️' },
              { id: 'profile', label: 'Profile', icon: '👤' }
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
                    <span className="text-2xl">📅</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Upcoming</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.upcoming}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.past}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <span className="text-2xl">❌</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Cancelled</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/listings"
                  className="flex items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
                >
                  <span className="text-2xl mr-3">🔍</span>
                  <div>
                    <h4 className="font-medium text-gray-900">Find Accommodation</h4>
                    <p className="text-sm text-gray-600">Search for your next stay</p>
                  </div>
                </Link>
                <Link
                  href="/dashboard/participant?tab=bookings"
                  className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <span className="text-2xl mr-3">📅</span>
                  <div>
                    <h4 className="font-medium text-gray-900">View Bookings</h4>
                    <p className="text-sm text-gray-600">Manage your reservations</p>
                  </div>
                </Link>
                <Link
                  href="/dashboard/participant?tab=profile"
                  className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <span className="text-2xl mr-3">⚙️</span>
                  <div>
                    <h4 className="font-medium text-gray-900">Update Profile</h4>
                    <p className="text-sm text-gray-600">Manage your preferences</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
              <div className="space-y-4">
                {bookings.slice(0, 3).map((booking) => (
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
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {booking.status}
                      </span>
                      <span className="font-semibold text-gray-900">${booking.totalAmount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Filter Controls */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">My Bookings</h3>
                <div className="flex space-x-2">
                  {['all', 'upcoming', 'past', 'cancelled'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setBookingFilter(filter as any)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        bookingFilter === filter
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

            {/* Bookings List */}
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-xl shadow-soft p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Property Image</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-gray-900">{booking.property.title}</h4>
                        <p className="text-gray-600">{booking.property.address}, {booking.property.city}</p>
                        <p className="text-sm text-gray-500">
                          {booking.guests} guest{booking.guests !== 1 ? 's' : ''} • {booking.totalNights} night{booking.totalNights !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">${booking.totalAmount}</div>
                      <div className="text-sm text-gray-500">Total Amount</div>
                    </div>
                  </div>

                  <BookingStatusTracker
                    booking={booking}
                    canUpdateStatus={false}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Favorite Properties</h3>
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">❤️</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h4>
                <p className="text-gray-600 mb-6">
                  Start exploring properties and add them to your favorites.
                </p>
                <Link
                  href="/listings"
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Browse Properties
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h3>
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">👤</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Profile Management</h4>
                <p className="text-gray-600">
                  Profile management features will be available soon.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
