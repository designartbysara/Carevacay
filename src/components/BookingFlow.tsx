// src/components/BookingFlow.tsx
'use client';

import { useState } from 'react';
import { Property } from '@/types';

interface BookingFlowProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingFlow({ property, isOpen, onClose }: BookingFlowProps) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequirements: '',
    accessibilityNeeds: [] as string[],
    supportWorkerRequired: property.supportWorkerRequired,
  });

  const handleInputChange = (field: string, value: string | number) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleAccessibilityNeedChange = (need: string) => {
    setBookingData(prev => ({
      ...prev,
      accessibilityNeeds: prev.accessibilityNeeds.includes(need)
        ? prev.accessibilityNeeds.filter(n => n !== need)
        : [...prev.accessibilityNeeds, need]
    }));
  };

  const calculateTotal = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    
    const checkInDate = new Date(bookingData.checkIn);
    const checkOutDate = new Date(bookingData.checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const baseTotal = property.basePrice * nights;
    const cleaningFee = property.cleaningFee || 0;
    const serviceFee = property.serviceFee || 0;
    
    return baseTotal + cleaningFee + serviceFee;
  };

  const handleSubmit = () => {
    // In a real app, this would submit to the backend
    console.log('Booking submitted:', bookingData);
    alert('Booking submitted successfully! (This is a demo)');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Book Your Stay</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <div className={`w-16 h-1 ${step >= 3 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
            </div>
          </div>

          {/* Step 1: Dates and Guests */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Select your dates and guests</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in date
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    value={bookingData.checkIn}
                    onChange={(e) => handleInputChange('checkIn', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out date
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    value={bookingData.checkOut}
                    onChange={(e) => handleInputChange('checkOut', e.target.value)}
                    min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                  Number of guests
                </label>
                <select
                  id="guests"
                  value={bookingData.guests}
                  onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {Array.from({ length: property.maxGuests }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>{num} guest{num !== 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Important Information</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Minimum stay: {property.minimumStay} night{property.minimumStay !== 1 ? 's' : ''}</li>
                  <li>• Maximum stay: {property.maximumStay || 'No limit'} night{property.maximumStay !== 1 ? 's' : ''}</li>
                  <li>• Support worker: {property.supportWorkerRequired ? (property.supportWorkerProvided ? 'Provided' : 'Required') : 'Not required'}</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 2: Special Requirements */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Special requirements and accessibility needs</h3>
              
              <div>
                <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-2">
                  Special requirements or requests
                </label>
                <textarea
                  id="specialRequirements"
                  value={bookingData.specialRequirements}
                  onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                  rows={4}
                  placeholder="Please let us know about any special requirements, dietary needs, or other requests..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Accessibility needs
                </label>
                <div className="space-y-2">
                  {[
                    'Wheelchair access required',
                    'Mobility assistance needed',
                    'Visual impairment support',
                    'Hearing impairment support',
                    'Cognitive support required',
                    'Personal care assistance',
                    'Medication management',
                    'Communication support'
                  ].map((need) => (
                    <label key={need} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={bookingData.accessibilityNeeds.includes(need)}
                        onChange={() => handleAccessibilityNeedChange(need)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{need}</span>
                    </label>
                  ))}
                </div>
              </div>

              {property.supportWorkerRequired && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">Support Worker Required</h4>
                  <p className="text-sm text-yellow-800">
                    This property requires a support worker. {property.supportWorkerProvided 
                      ? 'A support worker will be provided by the host.' 
                      : 'Please ensure you have a support worker available for your stay.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review and Confirm */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Review your booking</h3>
              
              {/* Property Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">{property.title}</h4>
                <p className="text-sm text-gray-600">{property.address}, {property.city}</p>
                <p className="text-sm text-gray-600">Stay type: {property.stayType}</p>
              </div>

              {/* Booking Details */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-in</span>
                  <span className="text-gray-900">{bookingData.checkIn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-out</span>
                  <span className="text-gray-900">{bookingData.checkOut}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Guests</span>
                  <span className="text-gray-900">{bookingData.guests} guest{bookingData.guests !== 1 ? 's' : ''}</span>
                </div>
                {bookingData.specialRequirements && (
                  <div>
                    <span className="text-gray-600 block mb-1">Special requirements</span>
                    <span className="text-gray-900 text-sm">{bookingData.specialRequirements}</span>
                  </div>
                )}
                {bookingData.accessibilityNeeds.length > 0 && (
                  <div>
                    <span className="text-gray-600 block mb-1">Accessibility needs</span>
                    <div className="text-gray-900 text-sm">
                      {bookingData.accessibilityNeeds.join(', ')}
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing Breakdown */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Pricing breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">${property.basePrice} × nights</span>
                    <span className="text-gray-900">${property.basePrice * (bookingData.checkIn && bookingData.checkOut ? 
                      Math.ceil((new Date(bookingData.checkOut).getTime() - new Date(bookingData.checkIn).getTime()) / (1000 * 60 * 60 * 24)) : 0)}</span>
                  </div>
                  {property.cleaningFee && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cleaning fee</span>
                      <span className="text-gray-900">${property.cleaningFee}</span>
                    </div>
                  )}
                  {property.serviceFee && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service fee</span>
                      <span className="text-gray-900">${property.serviceFee}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">NDIS Approved</h4>
                <p className="text-sm text-green-800">
                  This property is NDIS approved and meets accessibility standards. 
                  Your booking will be processed securely and you&apos;ll receive confirmation via email.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={() => step > 1 ? setStep(step - 1) : onClose()}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {step > 1 ? 'Back' : 'Cancel'}
            </button>
            
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && (!bookingData.checkIn || !bookingData.checkOut)}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
