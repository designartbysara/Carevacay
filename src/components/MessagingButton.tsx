'use client';

import { useState } from 'react';
import { User } from '@/types';
import Messaging from './Messaging';

interface MessagingButtonProps {
  currentUser: User;
  participantId?: string;
  participantName?: string;
  bookingId?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'sm' | 'md' | 'lg';
}

export default function MessagingButton({
  currentUser,
  participantId,
  participantName,
  bookingId,
  className = '',
  variant = 'primary',
  size = 'md',
}: MessagingButtonProps) {
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);

  const handleOpenMessaging = () => {
    setIsMessagingOpen(true);
  };

  const handleCloseMessaging = () => {
    setIsMessagingOpen(false);
  };

  const getButtonClasses = () => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    const variantClasses = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
      secondary: 'bg-white text-primary-600 border border-primary-600 hover:bg-primary-50 focus:ring-primary-500',
      icon: 'p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
    };

    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  };

  const getIconSize = () => {
    const sizeMap = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };
    return sizeMap[size];
  };

  const getButtonContent = () => {
    if (variant === 'icon') {
      return (
        <svg className={getIconSize()} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
    }

    return (
      <>
        <svg className={`${getIconSize()} mr-2`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {participantName ? `Message ${participantName}` : 'Message'}
      </>
    );
  };

  return (
    <>
      <button
        onClick={handleOpenMessaging}
        className={getButtonClasses()}
        title={participantName ? `Message ${participantName}` : 'Open messages'}
      >
        {getButtonContent()}
      </button>

      <Messaging
        currentUser={currentUser}
        isOpen={isMessagingOpen}
        onClose={handleCloseMessaging}
        initialParticipantId={participantId}
        bookingId={bookingId}
      />
    </>
  );
}
