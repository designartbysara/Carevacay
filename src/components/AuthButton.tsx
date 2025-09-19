// src/components/AuthButton.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

export default function AuthButton() {
  const { user, logout, login } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLogin = (userData: { firstName: string; lastName: string; email: string; role: 'participant' | 'carer' | 'host' }) => {
    const user = {
      id: 'user-' + Date.now(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    login(user);
  };

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-700">
          Welcome, {user.firstName}
        </div>
        <button
          onClick={logout}
          className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowAuthModal(true)}
        className="bg-accent-400 text-white px-4 py-2 rounded-lg hover:bg-accent-500 transition-colors font-medium"
      >
        Sign In
      </button>
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
    </>
  );
}
