'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import AuthButton from './AuthButton';
import MessagingButton from './MessagingButton';
import CareVacayLogo from './CareVacayLogo';

export default function HeaderNavigation() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="text-primary-500 hover:text-primary-600 transition-colors"
            aria-label="CareVacay Home"
          >
            <CareVacayLogo size="md" />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/listings" 
              className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
            >
              Find Stays
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
            >
              About
            </Link>
            <Link 
              href="/dashboard" 
              className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/provider/onboarding" 
              className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
            >
              Become a Host
            </Link>
            {user && (
              <MessagingButton
                currentUser={user}
                variant="icon"
                size="md"
              />
            )}
            <AuthButton />
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Open mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
