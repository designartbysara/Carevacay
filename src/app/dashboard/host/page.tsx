'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { mockBookings, mockProperties } from '@/data/mockData';
import { Booking, Property } from '@/types';
import BookingStatusTracker from '@/components/BookingStatusTracker';

export default function HostDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'properties' | 'analytics'>('overview');
  const [bookingFilter, setBookingFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled' | 'completed'>('all');

  // Mock data - in a real app, this would come from an API
  const bookings = mockBookings;
  const properties = mockProperties;

  const filteredBookings = useMemo(() => {
    if (bookingFilter === 'all') return bookings;
    return bookings.filter(booking => booking.status === bookingFilter);
  }, [bookings, bookingFilter]);

  const handleBookingStatusUpdate = async (bookingId: string, newStatus: Booking['status']) => {
    // In a real app, this would make an API call
    console.log(`Updating booking ${bookingId} to status: ${newStatus}`);
    // For now, just show a success message
    alert(`Booking status updated to ${newStatus}`);
  };

  const getBookingStats = () => {
    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    const completed = bookings.filter(b => b.status === 'completed').length;
    const cancelled = bookings.filter(b => b.status === 'cancelled').length;

    return { total, pending, confirmed, completed, cancelled };
  };

  const getRevenueStats = () => {
    const totalRevenue = bookings
      .filter(b => b.status === 'completed')
      .reduce((sum, b) => sum + b.totalAmount, 0);
    
    const monthlyRevenue = bookings
      .filter(b => b.status === 'completed' && 
        new Date(b.checkOut).getMonth() === new Date().getMonth())
      .reduce((sum, b) => sum + b.totalAmount, 0);

    return { totalRevenue, monthlyRevenue };
  };

  const stats = getBookingStats();
  const revenue = getRevenueStats();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Host Dashboard</h1>
              <p className="text-gray-600">Manage your properties and bookings</p>
            </div>
            <Link
              href="/provider/onboarding"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Add New Property
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
              { id: 'bookings', label: 'Bookings', icon: '📅' },
              { id: 'properties', label: 'Properties', icon: '🏠' },
              { id: 'analytics', label: 'Analytics', icon: '📈' }
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
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <span className="text-2xl">⏳</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Confirmed</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${revenue.totalRevenue}</p>
                  </div>
                </div>
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
                <h3 className="text-lg font-semibold text-gray-900">All Bookings</h3>
                <div className="flex space-x-2">
                  {['all', 'pending', 'confirmed', 'cancelled', 'completed'].map((filter) => (
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
                    onStatusUpdate={handleBookingStatusUpdate}
                    canUpdateStatus={true}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Properties</h3>
                <Link
                  href="/provider/onboarding"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Add New Property
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <div key={property.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-gray-500">Property Image</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{property.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{property.address}, {property.city}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                        {property.stayType}
                      </span>
                      <span className="font-semibold text-gray-900">${property.basePrice}/night</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Dashboard</h3>
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📊</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Analytics Coming Soon</h4>
                <p className="text-gray-600">
                  Detailed analytics and reporting features will be available soon.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
