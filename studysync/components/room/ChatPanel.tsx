'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Smile } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

interface Message {
  _id: string;
  userId: string;
  username: string;
  avatar?: string;
  content: string;
  type: 'text' | 'system';
  createdAt: Date;
}

interface ChatPanelProps {
  messages?: Message[];
  currentUserId?: string;
  onSendMessage?: (content: string) => void;
  isFocusTime?: boolean;
}

export function ChatPanel({
  messages = [],
  currentUserId,
  onSendMessage,
  isFocusTime = false,
}: ChatPanelProps) {
  const [message, setMessage] = useState('');
  const [showChat, setShowChat] = useState(!isFocusTime);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSendMessage?.(message);
    setMessage('');
    inputRef.current?.focus();
  };

  return (
    <div className="h-full flex flex-col bg-[var(--bg-surface)]">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border-default)]">
        <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
          💬 Room Chat
        </h3>
      </div>

      {/* Focus time overlay */}
      {isFocusTime && !showChat && (
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <div>
            <div className="text-4xl mb-3">🤫</div>
            <p className="text-[var(--text-secondary)] mb-2">Focus time — chat later</p>
            <button
              onClick={() => setShowChat(true)}
              className="text-sm text-[var(--aurora-violet)] hover:text-[var(--aurora-teal)] transition-colors underline"
            >
              I know, show me anyway
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      {(!isFocusTime || showChat) && (
        <>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {msg.type === 'system' ? (
                    <div className="text-center text-xs text-[var(--text-muted)] py-2">
                      {msg.content}
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--aurora-violet)] to-[var(--aurora-teal)] flex items-center justify-center text-xs font-semibold">
                          {msg.username[0].toUpperCase()}
                        </div>
                      </div>

                      {/* Message content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-medium text-[var(--text-primary)] text-sm">
                            {msg.username}
                          </span>
                          {msg.userId === currentUserId && (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--aurora-violet)]/20 text-[var(--aurora-violet)]">
                              You
                            </span>
                          )}
                          <span className="text-xs text-[var(--text-muted)]">
                            {formatRelativeTime(msg.createdAt)}
                          </span>
                        </div>
                        <p className="text-[var(--text-secondary)] text-sm break-words">
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />

            {messages.length === 0 && (
              <div className="text-center py-12 text-[var(--text-muted)]">
                <div className="text-4xl mb-3">💬</div>
                <p className="text-sm">No messages yet</p>
                <p className="text-xs mt-1">Say hi to start the conversation!</p>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[var(--border-default)]">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                maxLength={500}
                className="flex-1 bg-[var(--bg-overlay)] border border-[var(--border-default)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--aurora-violet)] focus:border-transparent transition-all"
              />
              
              <button
                type="button"
                className="p-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] transition-colors"
                title="Emoji picker (coming soon)"
              >
                <Smile className="w-5 h-5" />
              </button>

              <button
                type="submit"
                disabled={!message.trim()}
                className="gradient-button p-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </form>
            
            {message.length > 400 && (
              <div className="mt-2 text-xs text-[var(--text-muted)] text-right">
                {message.length}/500
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
