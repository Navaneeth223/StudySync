'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Flame, Clock, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Mock data
const liveRooms = [
  {
    id: '1',
    name: 'JEE Maths Marathon 🔥',
    topic: 'Mathematics',
    participants: 8,
    maxParticipants: 10,
    phase: 'focus',
    timeRemaining: '18:32',
    tags: ['calculus', 'integration'],
  },
  {
    id: '2',
    name: 'NEET Bio Blitz',
    topic: 'Science',
    participants: 6,
    maxParticipants: 12,
    phase: 'break',
    timeRemaining: '3:15',
    tags: ['biology', 'ncert'],
  },
  {
    id: '3',
    name: 'UPSC Current Affairs',
    topic: 'UPSC',
    participants: 12,
    maxParticipants: 15,
    phase: 'focus',
    timeRemaining: '22:45',
    tags: ['current-affairs', 'prelims'],
  },
];

const todayStats = {
  studyTime: 150, // minutes
  sessions: 4,
  streak: 14,
  weeklyTotal: 860,
};

export default function DashboardPage() {
  const hasStudiedToday = todayStats.studyTime > 0;

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="space-y-6 md:space-y-8"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants}>
          <div className="mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">
              Good evening, Navaneeth 🌙
            </h1>
          </div>
          
          {hasStudiedToday ? (
            <div className="glass p-4 md:p-6 rounded-xl border border-[var(--border-accent)]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm md:text-base text-[var(--text-secondary)] mb-1">
                    You've studied{' '}
                    <span className="text-[var(--aurora-teal)] font-semibold">
                      {Math.floor(todayStats.studyTime / 60)}h {todayStats.studyTime % 60}m
                    </span>{' '}
                    today.
                  </p>
                  <p className="text-[var(--text-primary)] text-base md:text-lg">
                    You're on a{' '}
                    <span className="gradient-text font-bold text-lg md:text-xl">
                      {todayStats.streak}-day streak 🔥
                    </span>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                  <Link
                    href="/rooms"
                    className="gradient-button px-4 md:px-5 py-2 md:py-2.5 rounded-lg font-medium text-white flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    Continue studying
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/rooms"
                    className="px-4 md:px-5 py-2 md:py-2.5 rounded-lg font-medium text-[var(--text-secondary)] bg-[var(--bg-overlay)] hover:bg-[var(--bg-elevated)] transition-colors border border-[var(--border-default)] text-center text-sm md:text-base"
                  >
                    Browse rooms
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass p-4 md:p-6 rounded-xl border border-[var(--border-accent)]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-[var(--text-primary)] text-base md:text-lg mb-1">
                    Ready to focus, Navaneeth?
                  </p>
                  <p className="text-sm md:text-base text-[var(--text-secondary)]">
                    Your{' '}
                    <span className="text-[var(--aurora-amber)] font-semibold">
                      {todayStats.streak}-day streak
                    </span>{' '}
                    is waiting. Don't break it today.
                  </p>
                </div>
                <Link
                  href="/rooms"
                  className="gradient-button px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  Find a room
                  <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
                </Link>
              </div>
            </div>
          )}
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4 md:p-5">
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-[var(--aurora-teal)]" />
              <span className="text-xs text-[var(--aurora-mint)] hidden sm:inline">+20m</span>
            </div>
            <div className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-1">
              {Math.floor(todayStats.studyTime / 60)}h {todayStats.studyTime % 60}m
            </div>
            <div className="text-xs md:text-sm text-[var(--text-secondary)]">Today</div>
          </div>

          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4 md:p-5">
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-[var(--aurora-violet)]" />
              <span className="text-xs text-[var(--aurora-mint)] hidden sm:inline">+2h</span>
            </div>
            <div className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-1">
              {Math.floor(todayStats.weeklyTotal / 60)}h {todayStats.weeklyTotal % 60}m
            </div>
            <div className="text-xs md:text-sm text-[var(--text-secondary)]">This Week</div>
          </div>

          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4 md:p-5">
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <Flame className="w-4 h-4 md:w-5 md:h-5 text-[var(--aurora-amber)]" />
              <span className="text-xs text-[var(--text-muted)] hidden sm:inline">Best: 21</span>
            </div>
            <div className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-1 flex items-baseline gap-1">
              {todayStats.streak}
              <span className="text-base md:text-lg">🔥</span>
            </div>
            <div className="text-xs md:text-sm text-[var(--text-secondary)]">Streak</div>
          </div>

          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <Users className="w-5 h-5 text-[var(--aurora-rose)]" />
              <span className="text-xs text-[var(--text-muted)]"}>Today</span>
            </div>
            <div className="text-2xl font-bold text-[var(--text-primary)] mb-1">
              {todayStats.sessions}
            </div>
            <div className="text-sm text-[var(--text-secondary)]">Sessions</div>
          </div>
        </motion.div>

        {/* Live Rooms */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-1">
                Happening Now
              </h2>
              <p className="text-xs md:text-sm text-[var(--text-secondary)] hidden sm:block">
                Join live study rooms with other students
              </p>
            </div>
            <Link
              href="/rooms"
              className="text-[var(--aurora-violet)] hover:text-[var(--aurora-teal)] font-medium text-xs md:text-sm transition-colors flex items-center gap-1 flex-shrink-0"
            >
              View all
              <ArrowRight className="w-3 md:w-4 h-3 md:h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {liveRooms.map((room) => (
              <motion.div
                key={room.id}
                whileHover={{ scale: 1.02 }}
                className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4 md:p-5 hover:border-[var(--border-accent)] transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1 line-clamp-1">
                      {room.name}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--aurora-violet)]/20 text-[var(--aurora-violet)] border border-[var(--aurora-violet)]/30">
                        {room.topic}
                      </span>
                      {room.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-[var(--text-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                    <div className="w-2 h-2 bg-[var(--aurora-mint)] rounded-full pulse-glow" />
                    LIVE
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(room.participants, 4))].map((_, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--aurora-violet)] to-[var(--aurora-teal)] border-2 border-[var(--bg-surface)] flex items-center justify-center text-xs font-semibold"
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                    {room.participants > 4 && (
                      <div className="w-7 h-7 rounded-full bg-[var(--bg-overlay)] border-2 border-[var(--bg-surface)] flex items-center justify-center text-xs font-medium text-[var(--text-secondary)]">
                        +{room.participants - 4}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-[var(--text-muted)]">
                    {room.participants}/{room.maxParticipants}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)]">
                  <div className="text-sm">
                    {room.phase === 'focus' ? (
                      <span className="text-[var(--aurora-violet)]">🍅 Focus · {room.timeRemaining}</span>
                    ) : (
                      <span className="text-[var(--aurora-mint)]">☕ Break · {room.timeRemaining}</span>
                    )}
                  </div>
                  <button className="text-sm font-medium text-[var(--aurora-violet)] hover:text-[var(--aurora-teal)] transition-colors">
                    Join
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Friends Activity (placeholder) */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-3 md:mb-4">
            Friends Activity
          </h2>
          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4 md:p-6">
            <div className="space-y-3 md:space-y-3">
              {[
                { name: 'Rahul', action: 'is studying in "NEET Bio Blitz"', time: '45m ago' },
                { name: 'Priya', action: 'completed 4 Pomodoros today', time: '2h ago' },
                { name: 'Ankit', action: 'joined "CAT Verbal Prep"', time: '3h ago' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[var(--aurora-violet)] to-[var(--aurora-teal)] flex items-center justify-center text-xs md:text-sm font-semibold flex-shrink-0">
                    {activity.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-[var(--text-primary)]">
                      <span className="font-medium">{activity.name}</span>{' '}
                      <span className="text-[var(--text-secondary)]">{activity.action}</span>
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
