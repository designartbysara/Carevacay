'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  type: 'text' | 'image' | 'file';
  bookingId?: string;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  bookingId?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface MessagingContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  startConversation: (participantId: string, bookingId?: string) => Promise<void>;
  sendMessage: (content: string, type?: 'text' | 'image' | 'file') => Promise<void>;
  selectConversation: (conversationId: string) => void;
  markAsRead: (conversationId: string) => void;
  deleteConversation: (conversationId: string) => void;
  searchConversations: (query: string) => Conversation[];
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

export function useMessaging() {
  const context = useContext(MessagingContext);
  if (context === undefined) {
    throw new Error('useMessaging must be used within a MessagingProvider');
  }
  return context;
}

interface MessagingProviderProps {
  children: ReactNode;
  currentUser: User;
}

export function MessagingProvider({ children, currentUser }: MessagingProviderProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data for development
  useEffect(() => {
    // In a real app, this would fetch from an API
    const mockConversations: Conversation[] = [
      {
        id: 'conv-1',
        participants: [
          currentUser,
          {
            id: 'host-1',
            email: 'sarah@carevacay.com',
            firstName: 'Sarah',
            lastName: 'Johnson',
            role: 'host',
            phone: '+61 400 123 456',
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2024-01-15'),
          }
        ],
        lastMessage: {
          id: 'msg-1',
          senderId: 'host-1',
          receiverId: currentUser.id,
          content: 'Thank you for your booking! I\'m looking forward to hosting you.',
          timestamp: new Date('2024-03-10T10:30:00'),
          isRead: true,
          type: 'text',
          bookingId: 'booking-1',
        },
        unreadCount: 0,
        bookingId: 'booking-1',
        createdAt: new Date('2024-03-10'),
        updatedAt: new Date('2024-03-10'),
      },
      {
        id: 'conv-2',
        participants: [
          currentUser,
          {
            id: 'host-2',
            email: 'mike@carevacay.com',
            firstName: 'Mike',
            lastName: 'Chen',
            role: 'host',
            phone: '+61 400 234 567',
            createdAt: new Date('2024-02-01'),
            updatedAt: new Date('2024-02-01'),
          }
        ],
        lastMessage: {
          id: 'msg-2',
          senderId: currentUser.id,
          receiverId: 'host-2',
          content: 'Hi, I have a question about the accessibility features.',
          timestamp: new Date('2024-03-12T14:20:00'),
          isRead: false,
          type: 'text',
        },
        unreadCount: 1,
        createdAt: new Date('2024-03-12'),
        updatedAt: new Date('2024-03-12'),
      },
    ];

    setConversations(mockConversations);
  }, [currentUser]);

  const startConversation = async (participantId: string, bookingId?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, this would make an API call
      const existingConversation = conversations.find(conv => 
        conv.participants.some(p => p.id === participantId) && 
        conv.bookingId === bookingId
      );

      if (existingConversation) {
        setCurrentConversation(existingConversation);
        await loadMessages(existingConversation.id);
      } else {
        // Create new conversation
        const newConversation: Conversation = {
          id: `conv-${Date.now()}`,
          participants: [currentUser, { id: participantId } as User], // In real app, fetch user details
          unreadCount: 0,
          bookingId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        setConversations(prev => [...prev, newConversation]);
        setCurrentConversation(newConversation);
        setMessages([]);
      }
    } catch (err) {
      setError('Failed to start conversation');
      console.error('Error starting conversation:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (content: string, type: 'text' | 'image' | 'file' = 'text') => {
    if (!currentConversation || !content.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        senderId: currentUser.id,
        receiverId: currentConversation.participants.find(p => p.id !== currentUser.id)?.id || '',
        content: content.trim(),
        timestamp: new Date(),
        isRead: false,
        type,
        bookingId: currentConversation.bookingId,
      };

      // Add message to current conversation
      setMessages(prev => [...prev, newMessage]);

      // Update conversation's last message
      setConversations(prev => prev.map(conv => 
        conv.id === currentConversation.id 
          ? { ...conv, lastMessage: newMessage, updatedAt: new Date() }
          : conv
      ));

      // In a real app, this would send to a WebSocket or API
      console.log('Message sent:', newMessage);
    } catch (err) {
      setError('Failed to send message');
      console.error('Error sending message:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const selectConversation = async (conversationId: string) => {
    const conversation = conversations.find(conv => conv.id === conversationId);
    if (conversation) {
      setCurrentConversation(conversation);
      await loadMessages(conversationId);
      markAsRead(conversationId);
    }
  };

  const loadMessages = async (conversationId: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would fetch from an API
      const mockMessages: Message[] = [
        {
          id: 'msg-1',
          senderId: 'host-1',
          receiverId: currentUser.id,
          content: 'Hello! Thank you for your interest in my property.',
          timestamp: new Date('2024-03-10T10:00:00'),
          isRead: true,
          type: 'text',
          bookingId: 'booking-1',
        },
        {
          id: 'msg-2',
          senderId: currentUser.id,
          receiverId: 'host-1',
          content: 'Hi! I\'m interested in booking your accessible apartment.',
          timestamp: new Date('2024-03-10T10:15:00'),
          isRead: true,
          type: 'text',
          bookingId: 'booking-1',
        },
        {
          id: 'msg-3',
          senderId: 'host-1',
          receiverId: currentUser.id,
          content: 'That\'s great! I\'d be happy to answer any questions you have.',
          timestamp: new Date('2024-03-10T10:30:00'),
          isRead: true,
          type: 'text',
          bookingId: 'booking-1',
        },
      ];

      setMessages(mockMessages);
    } catch (err) {
      setError('Failed to load messages');
      console.error('Error loading messages:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = (conversationId: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, unreadCount: 0 }
        : conv
    ));
  };

  const deleteConversation = (conversationId: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    if (currentConversation?.id === conversationId) {
      setCurrentConversation(null);
      setMessages([]);
    }
  };

  const searchConversations = (query: string): Conversation[] => {
    if (!query.trim()) return conversations;
    
    return conversations.filter(conv => 
      conv.participants.some(p => 
        p.firstName.toLowerCase().includes(query.toLowerCase()) ||
        p.lastName.toLowerCase().includes(query.toLowerCase()) ||
        p.email.toLowerCase().includes(query.toLowerCase())
      ) ||
      conv.lastMessage?.content.toLowerCase().includes(query.toLowerCase())
    );
  };

  const value: MessagingContextType = {
    conversations,
    currentConversation,
    messages,
    isLoading,
    error,
    startConversation,
    sendMessage,
    selectConversation,
    markAsRead,
    deleteConversation,
    searchConversations,
  };

  return (
    <MessagingContext.Provider value={value}>
      {children}
    </MessagingContext.Provider>
  );
}
