'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockBookings } from '@/data/mockData';
import PaymentHistory from '@/components/PaymentHistory';

export default function PaymentsDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'methods' | 'invoices'>('overview');

  // Mock data - in a real app, this would come from an API
  const bookings = mockBookings;
  const totalSpent = 1200;
  const monthlySpent = 450;
  const pendingPayments = 280;
  const refunds = 150;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
              <p className="text-gray-600">Manage your payments and billing</p>
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
              { id: 'history', label: 'Payment History', icon: '💳' },
              { id: 'methods', label: 'Payment Methods', icon: '🔧' },
              { id: 'invoices', label: 'Invoices', icon: '📄' }
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
                  <div className="p-2 bg-green-100 rounded-lg">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-900">${totalSpent}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <span className="text-2xl">📅</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">This Month</p>
                    <p className="text-2xl font-bold text-gray-900">${monthlySpent}</p>
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
                    <p className="text-2xl font-bold text-gray-900">${pendingPayments}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <span className="text-2xl">↩️</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Refunds</p>
                    <p className="text-2xl font-bold text-gray-900">${refunds}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Payments */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Payments</h3>
              <div className="space-y-4">
                {[
                  {
                    id: '1',
                    description: 'Accessible Melbourne Apartment',
                    amount: 450,
                    status: 'completed',
                    date: '2024-01-15',
                    method: 'card'
                  },
                  {
                    id: '2',
                    description: 'Cozy Sydney House',
                    amount: 320,
                    status: 'completed',
                    date: '2024-01-10',
                    method: 'ndis'
                  },
                  {
                    id: '3',
                    description: 'Brisbane Accessible Unit',
                    amount: 280,
                    status: 'pending',
                    date: '2024-01-08',
                    method: 'bank_transfer'
                  }
                ].map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">
                        {payment.method === 'card' ? '💳' :
                         payment.method === 'ndis' ? '🏥' : '🏦'}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{payment.description}</h4>
                        <p className="text-sm text-gray-600">{payment.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold text-gray-900">${payment.amount}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods Summary */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💳</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Credit Card</h4>
                      <p className="text-sm text-gray-600">**** 1234</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🏥</span>
                    <div>
                      <h4 className="font-medium text-gray-900">NDIS Funding</h4>
                      <p className="text-sm text-gray-600">Plan: 12345678901</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🏦</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Bank Transfer</h4>
                      <p className="text-sm text-gray-600">Account: **** 5678</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment History Tab */}
        {activeTab === 'history' && (
          <PaymentHistory bookings={bookings} />
        )}

        {/* Payment Methods Tab */}
        {activeTab === 'methods' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Manage Payment Methods</h3>
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔧</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Payment Methods Management</h4>
                <p className="text-gray-600">
                  Payment method management features will be available soon.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoices & Receipts</h3>
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📄</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Invoices & Receipts</h4>
                <p className="text-gray-600">
                  Invoice and receipt management features will be available soon.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
