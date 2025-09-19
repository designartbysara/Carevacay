'use client';

import { useState } from 'react';
import { Booking } from '@/types';

interface BookingStatusTrackerProps {
  booking: Booking;
  onStatusUpdate?: (bookingId: string, newStatus: Booking['status']) => void;
  canUpdateStatus?: boolean;
}

export default function BookingStatusTracker({ 
  booking, 
  onStatusUpdate, 
  canUpdateStatus = false 
}: BookingStatusTrackerProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'confirmed':
        return '✅';
      case 'cancelled':
        return '❌';
      case 'completed':
        return '🎉';
      default:
        return '❓';
    }
  };

  const getStatusDescription = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return 'Awaiting host confirmation';
      case 'confirmed':
        return 'Booking confirmed and ready';
      case 'cancelled':
        return 'Booking has been cancelled';
      case 'completed':
        return 'Stay completed successfully';
      default:
        return 'Unknown status';
    }
  };

  const handleStatusUpdate = async (newStatus: Booking['status']) => {
    if (!canUpdateStatus || !onStatusUpdate) return;
    
    setIsUpdating(true);
    try {
      await onStatusUpdate(booking.id, newStatus);
    } catch (error) {
      console.error('Failed to update booking status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getAvailableStatusUpdates = () => {
    switch (booking.status) {
      case 'pending':
        return [
          { status: 'confirmed' as const, label: 'Confirm Booking', color: 'bg-green-600 hover:bg-green-700' },
          { status: 'cancelled' as const, label: 'Cancel Booking', color: 'bg-red-600 hover:bg-red-700' }
        ];
      case 'confirmed':
        return [
          { status: 'completed' as const, label: 'Mark as Completed', color: 'bg-blue-600 hover:bg-blue-700' },
          { status: 'cancelled' as const, label: 'Cancel Booking', color: 'bg-red-600 hover:bg-red-700' }
        ];
      case 'cancelled':
      case 'completed':
        return [];
      default:
        return [];
    }
  };

  const availableUpdates = getAvailableStatusUpdates();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getStatusIcon(booking.status)}</span>
          <div>
            <h3 className="font-semibold text-gray-900">Booking Status</h3>
            <p className="text-sm text-gray-600">{getStatusDescription(booking.status)}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>

      {/* Status Timeline */}
      <div className="mb-4">
        <div className="flex items-center space-x-4">
          {['pending', 'confirmed', 'completed'].map((status, index) => {
            const isActive = booking.status === status;
            const isCompleted = ['pending', 'confirmed', 'completed'].indexOf(booking.status) > index;
            
            return (
              <div key={status} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isActive || isCompleted 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {isCompleted ? '✓' : index + 1}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  isActive ? 'text-primary-600' : isCompleted ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
                {index < 2 && (
                  <div className={`w-8 h-0.5 ml-4 ${
                    isCompleted ? 'bg-primary-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Update Buttons */}
      {canUpdateStatus && availableUpdates.length > 0 && (
        <div className="flex space-x-3">
          {availableUpdates.map((update) => (
            <button
              key={update.status}
              onClick={() => handleStatusUpdate(update.status)}
              disabled={isUpdating}
              className={`px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors ${update.color} ${
                isUpdating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isUpdating ? 'Updating...' : update.label}
            </button>
          ))}
        </div>
      )}

      {/* Booking Details */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Check-in:</span>
            <span className="ml-2 font-medium text-gray-900">
              {new Date(booking.checkIn).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Check-out:</span>
            <span className="ml-2 font-medium text-gray-900">
              {new Date(booking.checkOut).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Guests:</span>
            <span className="ml-2 font-medium text-gray-900">{booking.guests}</span>
          </div>
          <div>
            <span className="text-gray-600">Total:</span>
            <span className="ml-2 font-medium text-gray-900">${booking.totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
