'use client';

import { motion } from 'framer-motion';
import { Lock, Users, Clock } from 'lucide-react';
import { getTopicColor } from '@/lib/utils';
import { RoomCard as RoomCardType } from '@/types/room.types';

interface RoomCardProps {
  room: RoomCardType;
  onJoin?: (roomId: string) => void;
}

export function RoomCard({ room, onJoin }: RoomCardProps) {
  const topicColor = getTopicColor(room.topic);
  const participantPercentage = (room.currentParticipants / room.maxParticipants) * 100;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl overflow-hidden hover:border-[var(--border-accent)] hover:shadow-[var(--shadow-room)] transition-all cursor-pointer group"
      style={{
        borderLeft: `4px solid ${topicColor}`,
      }}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:gradient-text transition-all">
              {room.name}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-xs px-2.5 py-1 rounded-full font-medium border"
                style={{
                  backgroundColor: `${topicColor}20`,
                  color: topicColor,
                  borderColor: `${topicColor}40`,
                }}
              >
                {room.topic}
              </span>
              {room.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-[var(--text-muted)] bg-[var(--bg-overlay)] px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Live indicator or lock */}
          {!room.isPublic ? (
            <Lock className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
          ) : room.currentParticipants > 0 ? (
            <div className="flex items-center gap-1 text-xs text-[var(--aurora-mint)] flex-shrink-0">
              <div className="w-2 h-2 bg-[var(--aurora-mint)] rounded-full pulse-glow" />
              LIVE
            </div>
          ) : null}
        </div>

        {/* Participants */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex -space-x-2">
              {room.participants.slice(0, 4).map((participant, i) => (
                <div
                  key={participant.userId}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--aurora-violet)] to-[var(--aurora-teal)] border-2 border-[var(--bg-surface)] flex items-center justify-center text-xs font-semibold"
                  title={participant.username}
                >
                  {participant.username[0].toUpperCase()}
                </div>
              ))}
              {room.currentParticipants > 4 && (
                <div className="w-8 h-8 rounded-full bg-[var(--bg-overlay)] border-2 border-[var(--bg-surface)] flex items-center justify-center text-xs font-medium text-[var(--text-secondary)]">
                  +{room.currentParticipants - 4}
                </div>
              )}
              {room.currentParticipants === 0 && (
                <div className="text-sm text-[var(--text-muted)] flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Be the first to join
                </div>
              )}
            </div>
            <span className="text-xs text-[var(--text-muted)]">
              {room.currentParticipants}/{room.maxParticipants}
            </span>
          </div>

          {/* Participant fill bar */}
          <div className="h-1.5 bg-[var(--bg-overlay)] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(to right, ${topicColor}, ${topicColor}cc)`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${participantPercentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Timer status */}
        {room.currentPhase !== 'idle' && (
          <div className="flex items-center gap-2 mb-3 text-sm">
            <Clock className="w-4 h-4" />
            {room.currentPhase === 'focus' ? (
              <span className="text-[var(--aurora-violet)]">
                🍅 Focus · {Math.floor((room.timerRemaining || 0) / 60)}:{String((room.timerRemaining || 0) % 60).padStart(2, '0')} remaining
              </span>
            ) : room.currentPhase === 'break' ? (
              <span className="text-[var(--aurora-mint)]">
                ☕ Break · {Math.floor((room.timerRemaining || 0) / 60)}:{String((room.timerRemaining || 0) % 60).padStart(2, '0')} remaining
              </span>
            ) : (
              <span className="text-[var(--aurora-teal)]">
                🌟 Long Break · {Math.floor((room.timerRemaining || 0) / 60)}:{String((room.timerRemaining || 0) % 60).padStart(2, '0')} remaining
              </span>
            )}
          </div>
        )}

        {/* Join button */}
        <button
          onClick={() => onJoin?.(room._id)}
          className="w-full gradient-button text-white font-medium rounded-lg px-4 py-2.5 text-sm transition-all"
        >
          {!room.isPublic ? 'Join with password' : 'Join Room'}
        </button>
      </div>
    </motion.div>
  );
}
