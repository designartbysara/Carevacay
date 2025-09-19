'use client';

import { useState, useRef, useEffect } from 'react';
import { useMessaging } from '@/contexts/MessagingContext';
import { User } from '@/types';

interface MessagingProps {
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
  initialParticipantId?: string;
  bookingId?: string;
}

export default function Messaging({ 
  currentUser, 
  isOpen, 
  onClose, 
  initialParticipantId,
  bookingId 
}: MessagingProps) {
  const {
    conversations,
    currentConversation,
    messages,
    isLoading,
    error,
    startConversation,
    sendMessage,
    selectConversation,
    searchConversations,
  } = useMessaging();

  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [showConversationList, setShowConversationList] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredConversations = searchConversations(searchQuery);

  useEffect(() => {
    if (initialParticipantId) {
      startConversation(initialParticipantId, bookingId);
      setShowConversationList(false);
    }
  }, [initialParticipantId, bookingId, startConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || isLoading) return;

    await sendMessage(messageInput);
    setMessageInput('');
  };

  const handleConversationSelect = async (conversationId: string) => {
    await selectConversation(conversationId);
    setShowConversationList(false);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-AU', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const messageDate = new Date(date);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    return new Intl.DateTimeFormat('en-AU', {
      month: 'short',
      day: 'numeric',
    }).format(messageDate);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowConversationList(!showConversationList)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Conversation List */}
          <div className={`${showConversationList ? 'flex' : 'hidden'} lg:flex flex-col w-full lg:w-80 border-r border-gray-200`}>
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  {searchQuery ? 'No conversations found' : 'No conversations yet'}
                </div>
              ) : (
                filteredConversations.map((conversation) => {
                  const otherParticipant = conversation.participants.find(p => p.id !== currentUser.id);
                  const isActive = currentConversation?.id === conversation.id;
                  
                  return (
                    <button
                      key={conversation.id}
                      onClick={() => handleConversationSelect(conversation.id)}
                      className={`w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 ${
                        isActive ? 'bg-primary-50 border-l-4 border-l-primary-500' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-semibold text-sm">
                            {getInitials(otherParticipant?.firstName || '', otherParticipant?.lastName || '')}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900 truncate">
                              {otherParticipant?.firstName} {otherParticipant?.lastName}
                            </h3>
                            {conversation.lastMessage && (
                              <span className="text-xs text-gray-500">
                                {formatTime(conversation.lastMessage.timestamp)}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {conversation.lastMessage?.content || 'No messages yet'}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <div className="flex justify-end mt-1">
                              <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1">
                                {conversation.unreadCount}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`${!showConversationList ? 'flex' : 'hidden'} lg:flex flex-col flex-1`}>
            {currentConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setShowConversationList(true)}
                      className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold text-sm">
                        {getInitials(
                          currentConversation.participants.find(p => p.id !== currentUser.id)?.firstName || '',
                          currentConversation.participants.find(p => p.id !== currentUser.id)?.lastName || ''
                        )}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {currentConversation.participants.find(p => p.id !== currentUser.id)?.firstName}{' '}
                        {currentConversation.participants.find(p => p.id !== currentUser.id)?.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {currentConversation.participants.find(p => p.id !== currentUser.id)?.role === 'host' ? 'Host' : 'Participant'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      No messages yet. Start the conversation!
                    </div>
                  ) : (
                    messages.map((message, index) => {
                      const isOwn = message.senderId === currentUser.id;
                      const showDate = index === 0 || 
                        new Date(message.timestamp).toDateString() !== 
                        new Date(messages[index - 1].timestamp).toDateString();

                      return (
                        <div key={message.id}>
                          {showDate && (
                            <div className="text-center text-sm text-gray-500 py-2">
                              {formatDate(message.timestamp)}
                            </div>
                          )}
                          <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              isOwn 
                                ? 'bg-primary-600 text-white' 
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <p className="text-sm">{message.content}</p>
                              <p className={`text-xs mt-1 ${
                                isOwn ? 'text-primary-100' : 'text-gray-500'
                              }`}>
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={!messageInput.trim() || isLoading}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Sending...' : 'Send'}
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-4xl mb-4">💬</div>
                  <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                  <p>Choose a conversation from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-50 border-t border-red-200">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
