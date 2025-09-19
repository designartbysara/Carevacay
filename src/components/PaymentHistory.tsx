'use client';

import { useState } from 'react';
import { Booking } from '@/types';

interface PaymentHistoryProps {
  bookings: Booking[];
}

interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'card' | 'ndis' | 'bank_transfer';
  transactionId: string;
  createdAt: Date;
  description: string;
}

export default function PaymentHistory({ bookings }: PaymentHistoryProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'failed' | 'refunded'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'status'>('date');

  // Mock payment data - in a real app, this would come from an API
  const mockPayments: Payment[] = [
    {
      id: 'pay_1',
      bookingId: 'booking-1',
      amount: 450,
      status: 'completed',
      method: 'card',
      transactionId: 'txn_123456789',
      createdAt: new Date('2024-01-15'),
      description: 'Accessible Melbourne Apartment - 3 nights'
    },
    {
      id: 'pay_2',
      bookingId: 'booking-2',
      amount: 320,
      status: 'completed',
      method: 'ndis',
      transactionId: 'txn_987654321',
      createdAt: new Date('2024-01-10'),
      description: 'Cozy Sydney House - 2 nights'
    },
    {
      id: 'pay_3',
      bookingId: 'booking-3',
      amount: 280,
      status: 'pending',
      method: 'bank_transfer',
      transactionId: 'txn_456789123',
      createdAt: new Date('2024-01-08'),
      description: 'Brisbane Accessible Unit - 2 nights'
    },
    {
      id: 'pay_4',
      bookingId: 'booking-4',
      amount: 150,
      status: 'refunded',
      method: 'card',
      transactionId: 'txn_789123456',
      createdAt: new Date('2024-01-05'),
      description: 'Melbourne Studio - 1 night (Cancelled)'
    }
  ];

  const filteredPayments = mockPayments.filter(payment => 
    filter === 'all' || payment.status === filter
  ).sort((a, b) => {
    switch (sortBy) {
      case 'amount':
        return b.amount - a.amount;
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return b.createdAt.getTime() - a.createdAt.getTime();
    }
  });

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method: Payment['method']) => {
    switch (method) {
      case 'card':
        return '💳';
      case 'ndis':
        return '🏥';
      case 'bank_transfer':
        return '🏦';
      default:
        return '💰';
    }
  };

  const getTotalAmount = () => {
    return mockPayments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0);
  };

  const getPendingAmount = () => {
    return mockPayments
      .filter(p => p.status === 'pending')
      .reduce((sum, p) => sum + p.amount, 0);
  };

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-green-600 text-xl">💰</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-600">Total Paid</p>
              <p className="text-xl font-bold text-green-900">${getTotalAmount()}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-yellow-600 text-xl">⏳</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-yellow-600">Pending</p>
              <p className="text-xl font-bold text-yellow-900">${getPendingAmount()}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-blue-600 text-xl">📊</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-600">Total Transactions</p>
              <p className="text-xl font-bold text-blue-900">{mockPayments.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6">
        {['all', 'completed', 'pending', 'failed', 'refunded'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as any)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Payments List */}
      <div className="space-y-4">
        {filteredPayments.map((payment) => (
          <div key={payment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{getMethodIcon(payment.method)}</div>
                <div>
                  <h4 className="font-medium text-gray-900">{payment.description}</h4>
                  <p className="text-sm text-gray-600">
                    {payment.createdAt.toLocaleDateString()} • {payment.transactionId}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-semibold text-gray-900">${payment.amount}</div>
                  <div className="text-sm text-gray-500">
                    {payment.method === 'card' ? 'Credit Card' :
                     payment.method === 'ndis' ? 'NDIS Funding' :
                     'Bank Transfer'}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                  {payment.status}
                </span>
              </div>
            </div>

            {/* Payment Details */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Transaction ID: {payment.transactionId}</span>
                <span>Booking ID: {payment.bookingId}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPayments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">💳</div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">No payments found</h4>
          <p className="text-gray-600">
            {filter === 'all' 
              ? 'You haven\'t made any payments yet.'
              : `No ${filter} payments found.`
            }
          </p>
        </div>
      )}
    </div>
  );
}
