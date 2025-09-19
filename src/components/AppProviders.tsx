'use client';

import { useAuth } from '@/contexts/AuthContext';
import { MessagingProvider } from '@/contexts/MessagingContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  const { user } = useAuth();

  return (
    <MessagingProvider currentUser={user || { id: 'guest', email: 'guest@example.com', firstName: 'Guest', lastName: 'User', role: 'participant', createdAt: new Date(), updatedAt: new Date() }}>
      {children}
    </MessagingProvider>
  );
}
