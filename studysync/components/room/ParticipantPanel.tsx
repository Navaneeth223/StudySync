'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Users, Coffee, Moon, Lock } from 'lucide-react';
import { RoomParticipant } from '@/types/room.types';
import { formatRelativeTime } from '@/lib/utils';

interface ParticipantPanelProps {
  participants: RoomParticipant[];
  currentUserId?: string;
}

const statusConfig = {
  focusing: {
    icon: '🍅',
    label: 'Focusing',
    color: 'var(--aurora-violet)',
    dotClass: 'bg-[var(--aurora-violet)] pulse-glow',
  },
  break: {
    icon: '☕',
    label: 'On break',
    color: 'var(--aurora-mint)',
    dotClass: 'bg-[var(--aurora-mint)] pulse-glow',
  },
  idle: {
    icon: '💤',
    label: 'Idle',
    color: 'var(--text-muted)',
    dotClass: 'bg-[var(--text-muted)]',
  },
  'focus-lock': {
    icon: '🔒',
    label: 'Focus lock',
    color: 'var(--aurora-teal)',
    dotClass: 'bg-[var(--aurora-teal)] pulse-glow',
  },
};

export function ParticipantPanel({ participants, currentUserId }: ParticipantPanelProps) {
  const sortedParticipants = [...participants].sort((a, b) => {
    // Current user first
    if (a.userId === currentUserId) return -1;
    if (b.userId === currentUserId) return 1;
    
    // Then by status priority: focus-lock > focusing > break > idle
    const priority = { 'focus-lock': 0, focusing: 1, break: 2, idle: 3 };
    return priority[a.status] - priority[b.status];
  });

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border-default)]">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
            <Users className="w-5 h-5" />
            People ({participants.length})
          </h3>
        </div>
      </div>

      {/* Participant list */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
        <AnimatePresence mode="popLayout">
          {sortedParticipants.map((participant) => {
            const isCurrentUser = participant.userId === currentUserId;
            const config = statusConfig[participant.status];

            return (
              <motion.div
                key={participant.userId}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--bg-overlay)] transition-colors group"
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--aurora-violet)] to-[var(--aurora-teal)] flex items-center justify-center text-sm font-semibold">
                    {participant.username[0].toUpperCase()}
                  </div>
                  {/* Status dot */}
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[var(--bg-surface)] ${config.dotClass}`}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[var(--text-primary)] truncate">
                      {participant.username}
                    </span>
                    {isCurrentUser && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--aurora-violet)]/20 text-[var(--aurora-violet)] border border-[var(--aurora-violet)]/30">
                        You
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span style={{ color: config.color }}>
                      {config.icon} {config.label}
                    </span>
                    {participant.sessionsToday > 0 && (
                      <>
                        <span className="text-[var(--text-muted)]">·</span>
                        <span className="text-[var(--text-muted)]">
                          🍅 ×{participant.sessionsToday} today
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Hover tooltip - show more info */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-xs text-[var(--text-muted)]">
                    {formatRelativeTime(participant.joinedAt)}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {participants.length === 0 && (
          <div className="text-center py-12 text-[var(--text-muted)]">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No one here yet</p>
          </div>
        )}
      </div>

      {/* Quick stats */}
      <div className="p-4 border-t border-[var(--border-default)] bg-[var(--bg-overlay)]">
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div>
            <div className="text-[var(--aurora-violet)] font-semibold text-base">
              {participants.filter((p) => p.status === 'focusing' || p.status === 'focus-lock').length}
            </div>
            <div className="text-[var(--text-muted)]">Focusing</div>
          </div>
          <div>
            <div className="text-[var(--aurora-mint)] font-semibold text-base">
              {participants.filter((p) => p.status === 'break').length}
            </div>
            <div className="text-[var(--text-muted)]">On Break</div>
          </div>
          <div>
            <div className="text-[var(--text-muted)] font-semibold text-base">
              {participants.filter((p) => p.status === 'idle').length}
            </div>
            <div className="text-[var(--text-muted)]">Idle</div>
          </div>
        </div>
      </div>
    </div>
  );
}
