'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Share2, Settings, LogOut, Maximize2 } from 'lucide-react';
import { TimerPanel } from '@/components/room/TimerPanel';
import { ParticipantPanel } from '@/components/room/ParticipantPanel';
import { ChatPanel } from '@/components/room/ChatPanel';
import { getTopicColor } from '@/lib/utils';
import Link from 'next/link';

// Mock data - will be replaced with real data from Socket.io
const mockRoom = {
  _id: '1',
  name: 'JEE Maths Marathon 🔥',
  topic: 'Mathematics',
  createdBy: 'user1',
  pomodoroConfig: {
    focusDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    sessionsBeforeLongBreak: 4,
    syncMode: 'synced' as const,
  },
};

const mockParticipants = [
  {
    userId: 'current',
    username: 'navaneeth',
    avatar: '',
    status: 'focusing' as const,
    joinedAt: new Date(Date.now() - 1000 * 60 * 45),
    sessionsToday: 3,
  },
  {
    userId: 'user2',
    username: 'rahul',
    avatar: '',
    status: 'focusing' as const,
    joinedAt: new Date(Date.now() - 1000 * 60 * 30),
    sessionsToday: 2,
  },
  {
    userId: 'user3',
    username: 'priya',
    avatar: '',
    status: 'break' as const,
    joinedAt: new Date(Date.now() - 1000 * 60 * 20),
    sessionsToday: 4,
  },
  {
    userId: 'user4',
    username: 'ankit',
    avatar: '',
    status: 'focusing' as const,
    joinedAt: new Date(Date.now() - 1000 * 60 * 15),
    sessionsToday: 1,
  },
];

const mockMessages = [
  {
    _id: '1',
    userId: 'system',
    username: 'System',
    content: '─── Timer started: 25 min Focus ───',
    type: 'system' as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    _id: '2',
    userId: 'user2',
    username: 'rahul',
    content: 'Good luck everyone! 🔥',
    type: 'text' as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 9),
  },
  {
    _id: '3',
    userId: 'user3',
    username: 'priya',
    content: 'Let\'s crush this session!',
    type: 'text' as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 8),
  },
];

type TabType = 'timer' | 'whiteboard' | 'notes';

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('timer');
  const [isFocusLock, setIsFocusLock] = useState(false);
  const [showMobilePanel, setShowMobilePanel] = useState<'participants' | 'chat' | null>(null);

  const roomId = params.roomId as string;
  const topicColor = getTopicColor(mockRoom.topic);
  const isRoomCreator = mockRoom.createdBy === 'current';

  const handleLeaveRoom = () => {
    // TODO: Disconnect from Socket.io and leave room
    router.push('/rooms');
  };

  const handleShareRoom = () => {
    // TODO: Copy room link to clipboard
    navigator.clipboard.writeText(`${window.location.origin}/rooms/${roomId}`);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Room Header */}
      <header className="h-14 md:h-16 bg-[var(--bg-surface)] border-b border-[var(--border-default)] px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
          <Link
            href="/rooms"
            className="p-2 rounded-lg hover:bg-[var(--bg-overlay)] transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-[var(--text-secondary)]" />
          </Link>

          <div className="flex-1 min-w-0">
            <h1 className="text-sm md:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2 truncate">
              <span className="truncate">{mockRoom.name}</span>
            </h1>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  backgroundColor: `${topicColor}20`,
                  color: topicColor,
                }}
              >
                {mockRoom.topic}
              </span>
              <div className="flex items-center gap-1 text-xs text-[var(--aurora-mint)]">
                <div className="w-1.5 h-1.5 bg-[var(--aurora-mint)] rounded-full pulse-glow" />
                LIVE · {mockParticipants.length}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
          <button
            onClick={handleShareRoom}
            className="p-2 rounded-lg hover:bg-[var(--bg-overlay)] transition-colors hidden md:block"
            title="Share room"
          >
            <Share2 className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>

          {isRoomCreator && (
            <button
              className="p-2 rounded-lg hover:bg-[var(--bg-overlay)] transition-colors hidden md:block"
              title="Room settings"
            >
              <Settings className="w-5 h-5 text-[var(--text-secondary)]" />
            </button>
          )}

          <button
            onClick={() => setIsFocusLock(true)}
            className="p-2 rounded-lg hover:bg-[var(--bg-overlay)] transition-colors hidden md:block"
            title="Focus Lock"
          >
            <Maximize2 className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>

          <button
            onClick={handleLeaveRoom}
            className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-medium text-xs md:text-sm text-[var(--aurora-rose)] hover:bg-[var(--aurora-rose)]/10 transition-colors flex items-center gap-1 md:gap-2"
          >
            <LogOut className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Leave</span>
          </button>
        </div>
      </header>

      {/* Main content - 3 panel layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Participants */}
        <aside className="w-80 bg-[var(--bg-surface)] border-r border-[var(--border-default)] hidden lg:block">
          <ParticipantPanel
            participants={mockParticipants}
            currentUserId="current"
          />
        </aside>

        {/* Center Panel - Timer/Whiteboard/Notes */}
        <main className="flex-1 flex flex-col bg-[var(--bg-base)]">
          {/* Tab navigation */}
          <div className="border-b border-[var(--border-default)] bg-[var(--bg-surface)]">
            <div className="flex items-center gap-1 px-6">
              {[
                { id: 'timer', label: '🍅 Timer' },
                { id: 'whiteboard', label: '✏️ Whiteboard' },
                { id: 'notes', label: '📝 Notes' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-4 py-3 font-medium text-sm transition-all relative ${
                    activeTab === tab.id
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="room-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--aurora-violet)] to-[var(--aurora-teal)]"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'timer' && (
              <TimerPanel
                focusDuration={mockRoom.pomodoroConfig.focusDuration}
                breakDuration={mockRoom.pomodoroConfig.breakDuration}
                longBreakDuration={mockRoom.pomodoroConfig.longBreakDuration}
                sessionsBeforeLongBreak={mockRoom.pomodoroConfig.sessionsBeforeLongBreak}
                isSynced={mockRoom.pomodoroConfig.syncMode === 'synced'}
                canControl={isRoomCreator}
              />
            )}

            {activeTab === 'whiteboard' && (
              <div className="h-full flex items-center justify-center text-[var(--text-secondary)]">
                <div className="text-center">
                  <div className="text-6xl mb-4">✏️</div>
                  <p className="text-lg font-medium mb-2">Whiteboard</p>
                  <p className="text-sm text-[var(--text-muted)]">
                    Excalidraw integration coming soon
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="h-full flex items-center justify-center text-[var(--text-secondary)]">
                <div className="text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-lg font-medium mb-2">Shared Notes</p>
                  <p className="text-sm text-[var(--text-muted)]">
                    Tiptap collaborative editor coming soon
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Right Panel - Chat */}
        <aside className="w-96 border-l border-[var(--border-default)] hidden lg:block">
          <ChatPanel
            messages={mockMessages}
            currentUserId="current"
            onSendMessage={(content) => console.log('Send:', content)}
            isFocusTime={false}
          />
        </aside>
      </div>

      {/* Focus Lock Overlay (modal) */}
      {isFocusLock && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-[var(--bg-base)] z-50 flex items-center justify-center"
        >
          <div className="text-center">
            <div className="text-6xl mb-6">🔒</div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              Focus Lock Active
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-md">
              You can't leave until the timer ends. You chose this. Stay strong.
            </p>

            {/* Show timer */}
            <div className="mb-12">
              <TimerPanel
                focusDuration={mockRoom.pomodoroConfig.focusDuration}
                breakDuration={mockRoom.pomodoroConfig.breakDuration}
                longBreakDuration={mockRoom.pomodoroConfig.longBreakDuration}
                sessionsBeforeLongBreak={mockRoom.pomodoroConfig.sessionsBeforeLongBreak}
                isSynced={false}
                canControl={false}
              />
            </div>

            <button
              onClick={() => setIsFocusLock(false)}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--aurora-rose)] transition-colors"
            >
              Emergency Exit — I really need to
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
