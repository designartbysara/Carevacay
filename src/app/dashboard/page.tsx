// src/app/dashboard/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [userRole, setUserRole] = useState<'participant' | 'carer' | 'host' | 'provider'>('participant');
  const router = useRouter();

  // In a real app, this would be determined by authentication
  const handleRoleSelection = (role: 'participant' | 'carer' | 'host' | 'provider') => {
    setUserRole(role);
    // Redirect to the appropriate dashboard
    if (role === 'host' || role === 'provider') {
      router.push('/dashboard/host');
    } else {
      router.push('/dashboard/participant');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Choose your role to access the appropriate dashboard</p>
            </div>
            <Link
              href="/"
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Role Selection */}
        <div className="bg-white rounded-xl shadow-soft p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Select Your Role</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                role: 'participant', 
                label: 'NDIS Participant', 
                icon: '👤', 
                description: 'Find and book accessible accommodation',
                color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
                textColor: 'text-blue-700'
              },
              { 
                role: 'carer', 
                label: 'Carer', 
                icon: '🤝', 
                description: 'Support participants with bookings',
                color: 'bg-green-50 border-green-200 hover:bg-green-100',
                textColor: 'text-green-700'
              },
              { 
                role: 'host', 
                label: 'Host', 
                icon: '🏠', 
                description: 'Manage your properties and bookings',
                color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
                textColor: 'text-purple-700'
              },
              { 
                role: 'provider', 
                label: 'Provider', 
                icon: '🏢', 
                description: 'Manage your accommodation business',
                color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
                textColor: 'text-orange-700'
              }
            ].map(({ role, label, icon, description, color, textColor }) => (
              <button
                key={role}
                onClick={() => handleRoleSelection(role as any)}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${color} hover:shadow-lg transform hover:-translate-y-1`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{label}</h3>
                  <p className="text-sm text-gray-600 mb-4">{description}</p>
                  <div className={`text-sm font-medium ${textColor}`}>
                    Access Dashboard →
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Access Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/listings"
            className="bg-white rounded-xl shadow-soft p-6 hover:shadow-medium transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-100 rounded-lg">
                <span className="text-2xl">🔍</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Find Accommodation</h3>
                <p className="text-sm text-gray-600">Search for accessible stays</p>
              </div>
            </div>
          </Link>

          <Link
            href="/provider/onboarding"
            className="bg-white rounded-xl shadow-soft p-6 hover:shadow-medium transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-accent-100 rounded-lg">
                <span className="text-2xl">🏠</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">List Your Property</h3>
                <p className="text-sm text-gray-600">Become a host</p>
              </div>
            </div>
          </Link>

          <Link
            href="/about"
            className="bg-white rounded-xl shadow-soft p-6 hover:shadow-medium transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-secondary-100 rounded-lg">
                <span className="text-2xl">❓</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Get Help</h3>
                <p className="text-sm text-gray-600">Support and FAQ</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}