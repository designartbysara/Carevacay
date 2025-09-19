'use client';

import { useState } from 'react';
import { Booking } from '@/types';

interface PaymentFormProps {
  booking: Booking;
  onPaymentSuccess: (paymentId: string) => void;
  onPaymentError: (error: string) => void;
  onCancel: () => void;
}

export default function PaymentForm({ booking, onPaymentSuccess, onPaymentError, onCancel }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'ndis' | 'bank_transfer'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    ndisNumber: '',
    planName: '',
    bankAccount: '',
    bsb: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // In a real app, this would integrate with Stripe
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      const paymentId = `pay_${Date.now()}`;
      onPaymentSuccess(paymentId);
    } catch (error) {
      onPaymentError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value: string) => {
    return value.replace(/\D/g, '').replace(/(.{2})/, '$1/').slice(0, 5);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Payment</h2>
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

          {/* Booking Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Booking Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Check-in:</span>
                <span className="text-gray-900">{new Date(booking.checkIn).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-out:</span>
                <span className="text-gray-900">{new Date(booking.checkOut).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guests:</span>
                <span className="text-gray-900">{booking.guests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nights:</span>
                <span className="text-gray-900">{booking.totalNights}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total:</span>
                <span>${booking.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
            <div className="space-y-3">
              <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <div className="ml-3">
                  <div className="font-medium text-gray-900">Credit/Debit Card</div>
                  <div className="text-sm text-gray-600">Visa, Mastercard, American Express</div>
                </div>
              </label>

              <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="ndis"
                  checked={paymentMethod === 'ndis'}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <div className="ml-3">
                  <div className="font-medium text-gray-900">NDIS Funding</div>
                  <div className="text-sm text-gray-600">Pay using your NDIS plan</div>
                </div>
              </label>

              <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <div className="ml-3">
                  <div className="font-medium text-gray-900">Bank Transfer</div>
                  <div className="text-sm text-gray-600">Direct bank transfer</div>
                </div>
              </label>
            </div>
          </div>

          {/* Payment Details */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  id="cardholderName"
                  value={paymentData.cardholderName}
                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    value={paymentData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="123"
                    maxLength={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'ndis' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-blue-600">ℹ️</span>
                  <span className="font-medium text-blue-900">NDIS Funding</span>
                </div>
                <p className="text-sm text-blue-800">
                  Your NDIS plan will be verified and the payment will be processed through your plan manager.
                </p>
              </div>

              <div>
                <label htmlFor="ndisNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  NDIS Number
                </label>
                <input
                  type="text"
                  id="ndisNumber"
                  value={paymentData.ndisNumber}
                  onChange={(e) => handleInputChange('ndisNumber', e.target.value)}
                  placeholder="12345678901"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="planName" className="block text-sm font-medium text-gray-700 mb-2">
                  Plan Name
                </label>
                <input
                  type="text"
                  id="planName"
                  value={paymentData.planName}
                  onChange={(e) => handleInputChange('planName', e.target.value)}
                  placeholder="Enter your plan name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          )}

          {paymentMethod === 'bank_transfer' && (
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-yellow-600">⚠️</span>
                  <span className="font-medium text-yellow-900">Bank Transfer</span>
                </div>
                <p className="text-sm text-yellow-800">
                  You will receive bank transfer details after booking confirmation. Payment must be completed within 24 hours.
                </p>
              </div>

              <div>
                <label htmlFor="bankAccount" className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Account Number
                </label>
                <input
                  type="text"
                  id="bankAccount"
                  value={paymentData.bankAccount}
                  onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                  placeholder="Enter your bank account number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="bsb" className="block text-sm font-medium text-gray-700 mb-2">
                  BSB
                </label>
                <input
                  type="text"
                  id="bsb"
                  value={paymentData.bsb}
                  onChange={(e) => handleInputChange('bsb', e.target.value)}
                  placeholder="123-456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-green-600">🔒</span>
              <span className="font-medium text-green-900">Secure Payment</span>
            </div>
            <p className="text-sm text-green-800 mt-1">
              Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.
            </p>
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
              disabled={isProcessing}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : `Pay $${booking.totalAmount}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
