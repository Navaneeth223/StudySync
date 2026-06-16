'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import { TOPICS } from '@/lib/constants';
import { RoomCard } from '@/components/discover/RoomCard';
import { RoomCard as RoomCardType } from '@/types/room.types';

// Mock data
const mockRooms: RoomCardType[] = [
  {
    _id: '1',
    name: 'JEE Maths Marathon 🔥',
    topic: 'Mathematics',
    tags: ['calculus', 'integration', 'jee-advanced'],
    isPublic: true,
    maxParticipants: 10,
    currentParticipants: 8,
    currentPhase: 'focus',
    timerRemaining: 1112,
    isFeatured: true,
    participants: [
      { userId: '1', username: 'rahul', avatar: '', status: 'focusing', joinedAt: new Date(), sessionsToday: 3 },
      { userId: '2', username: 'priya', avatar: '', status: 'focusing', joinedAt: new Date(), sessionsToday: 2 },
      { userId: '3', username: 'ankit', avatar: '', status: 'break', joinedAt: new Date(), sessionsToday: 4 },
      { userId: '4', username: 'neha', avatar: '', status: 'focusing', joinedAt: new Date(), sessionsToday: 1 },
      { userId: '5', username: 'amit', avatar: '', status: 'focusing', joinedAt: new Date(), sessionsToday: 5 },
      { userId: '6', username: 'sarah', avatar: '', status: 'idle', joinedAt: new Date(), sessionsToday: 2 },
      { userId: '7', username: 'david', avatar: '', status: 'focusing', joinedAt: new Date(), sessionsToday: 3 },
      { userId: '8', username: 'maya', avatar: '', status: 'focusing', joinedAt: new Date(), sessionsToday: 2 },
    ],
  },
  {
    _id: '2',
    name: 'NEET Bio Blitz',
    topic: 'Science',
    tags: ['biology', 'ncert', 'class-12'],
    isPublic: true,
    maxParticipants: 12,
    currentParticipants: 6,
    currentPhase: 'break',
    timerRemaining: 195,
    isFeatured: false,
    participants: [
      { userId: '9', username: 'ravi', avatar: '', status: 'break', joinedAt: new Date(), sessionsToday: 2 },
      { userId: '10', username: 'pooja', avatar: '', status: 'break', joinedAt: new Date(), sessionsToday: 3 },
      { userId: '11', username: 'karan', avatar: '', status: 'break', joinedAt: new Date(), sessionsToday: 1 },
      { userId: '12', username: 'isha', avatar: '', status: 'break', joinedAt: new Date(), sessionsToday: 4 },
      { userId: '13', username: 'rohan', avatar: '', status: 'break', joinedAt: new Date(), sessionsToday: 2 },
      { userId: '14', username: 'sneha', avatar: '', status: 'break', joinedAt: new Date(), sessionsToday: 3 },
    ],
  },
  {
    _id: '3',
    name: 'UPSC Current Affairs Deep Dive',
    topic: 'UPSC',
    tags: ['current-affairs', 'prelims', 'newspaper'],
    isPublic: true,
    maxParticipants: 15,
    currentParticipants: 12,
    currentPhase: 'focus',
    timerRemaining: 1365,
    isFeatured: true,
    participants: Array(12).fill(null).map((_, i) => ({
      userId: `u${i}`,
      username: `user${i}`,
      avatar: '',
      status: 'focusing' as const,
      joinedAt: new Date(),
      sessionsToday: Math.floor(Math.random() * 5) + 1,
    })),
  },
  {
    _id: '4',
    name: 'CAT Quant Practice',
    topic: 'CAT',
    tags: ['quantitative', 'cat-2026', 'arithmetic'],
    isPublic: false,
    maxParticipants: 8,
    currentParticipants: 5,
    currentPhase: 'focus',
    timerRemaining: 945,
    isFeatured: false,
    participants: Array(5).fill(null).map((_, i) => ({
      userId: `c${i}`,
      username: `cat_aspirant${i}`,
      avatar: '',
      status: 'focusing' as const,
      joinedAt: new Date(),
      sessionsToday: Math.floor(Math.random() * 4) + 1,
    })),
  },
  {
    _id: '5',
    name: 'DSA Problem Solving',
    topic: 'Computer Science',
    tags: ['dsa', 'leetcode', 'interviews'],
    isPublic: true,
    maxParticipants: 10,
    currentParticipants: 7,
    currentPhase: 'focus',
    timerRemaining: 780,
    isFeatured: false,
    participants: Array(7).fill(null).map((_, i) => ({
      userId: `d${i}`,
      username: `coder${i}`,
      avatar: '',
      status: 'focusing' as const,
      joinedAt: new Date(),
      sessionsToday: Math.floor(Math.random() * 6) + 1,
    })),
  },
  {
    _id: '6',
    name: 'Peaceful Study Space',
    topic: 'General',
    tags: ['quiet', 'focus', 'accountability'],
    isPublic: true,
    maxParticipants: 20,
    currentParticipants: 0,
    currentPhase: 'idle',
    isFeatured: false,
    participants: [],
  },
];

export default function RoomsPage() {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLiveOnly, setShowLiveOnly] = useState(false);

  const filteredRooms = mockRooms.filter((room) => {
    const matchesTopic = selectedTopic === 'all' || room.topic === selectedTopic;
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          room.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLive = !showLiveOnly || room.currentParticipants > 0;
    
    return matchesTopic && matchesSearch && matchesLive;
  });

  const studyingCount = mockRooms.reduce((sum, room) => sum + room.currentParticipants, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
              Study Rooms
            </h1>
            <p className="text-[var(--text-secondary)]">
              <span className="text-[var(--aurora-mint)] font-semibold">{studyingCount}</span> students studying right now
            </p>
          </div>
          <button className="gradient-button px-5 py-2.5 rounded-lg font-medium text-white flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Room
          </button>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          {/* Topic filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
            <button
              onClick={() => setSelectedTopic('all')}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                selectedTopic === 'all'
                  ? 'bg-gradient-to-r from-[var(--aurora-violet)] to-[var(--aurora-teal)] text-white'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-overlay)] border border-[var(--border-default)]'
              }`}
            >
              All Rooms
            </button>
            {TOPICS.map((topic) => (
              <button
                key={topic.value}
                onClick={() => setSelectedTopic(topic.value)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                  selectedTopic === topic.value
                    ? 'text-white border'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-overlay)] border border-[var(--border-default)]'
                }`}
                style={
                  selectedTopic === topic.value
                    ? {
                        backgroundColor: topic.color,
                        borderColor: `${topic.color}80`,
                      }
                    : undefined
                }
              >
                {topic.emoji} {topic.label}
              </button>
            ))}
          </div>

          {/* Search and sort */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rooms..."
                className="w-full bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg pl-11 pr-4 py-2.5 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--aurora-violet)] focus:border-transparent transition-all"
              />
            </div>

            <label className="flex items-center gap-2 px-4 py-2.5 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg cursor-pointer hover:bg-[var(--bg-overlay)] transition-colors">
              <input
                type="checkbox"
                checked={showLiveOnly}
                onChange={(e) => setShowLiveOnly(e.target.checked)}
                className="w-4 h-4 rounded border-[var(--border-default)] bg-[var(--bg-overlay)] text-[var(--aurora-violet)] focus:ring-2 focus:ring-[var(--aurora-violet)] focus:ring-offset-0"
              />
              <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)]">
                <div className="w-2 h-2 bg-[var(--aurora-mint)] rounded-full pulse-glow" />
                Live Now
              </div>
            </label>

            <button className="p-2.5 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg hover:bg-[var(--bg-overlay)] transition-colors">
              <SlidersHorizontal className="w-5 h-5 text-[var(--text-secondary)]" />
            </button>
          </div>
        </div>
      </div>

      {/* Room Grid */}
      {filteredRooms.length > 0 ? (
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredRooms.map((room) => (
            <motion.div
              key={room._id}
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
            >
              <RoomCard room={room} onJoin={(id) => console.log('Join room:', id)} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
            No rooms found
          </h3>
          <p className="text-[var(--text-secondary)] mb-6">
            Try adjusting your filters or create a new room
          </p>
          <button className="gradient-button px-6 py-3 rounded-lg font-medium text-white inline-flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Room
          </button>
        </div>
      )}
    </div>
  );
}
