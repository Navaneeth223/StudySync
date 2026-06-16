'use client';

import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimerControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onSkip: () => void;
  onReset?: () => void;
  canControl?: boolean;
}

export function TimerControls({
  isRunning,
  isPaused,
  onStart,
  onPause,
  onResume,
  onSkip,
  onReset,
  canControl = true,
}: TimerControlsProps) {
  if (!canControl) {
    return (
      <div className="text-center text-sm text-[var(--text-muted)]">
        Only the room creator can control the timer
      </div>
    );
  }

  if (!isRunning && !isPaused) {
    // Idle state - show start button
    return (
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="gradient-button px-8 py-4 rounded-xl font-semibold text-white text-lg flex items-center gap-3 shadow-lg"
        >
          <Play className="w-6 h-6 fill-current" />
          Start Focus Session
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3">
      {/* Pause/Resume button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={isPaused ? onResume : onPause}
        className="gradient-button px-6 py-3 rounded-lg font-medium text-white flex items-center gap-2"
      >
        {isPaused ? (
          <>
            <Play className="w-5 h-5 fill-current" />
            Resume
          </>
        ) : (
          <>
            <Pause className="w-5 h-5 fill-current" />
            Pause
          </>
        )}
      </motion.button>

      {/* Skip button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSkip}
        className="px-6 py-3 rounded-lg font-medium text-[var(--text-secondary)] bg-[var(--bg-overlay)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] transition-all border border-[var(--border-default)] flex items-center gap-2"
      >
        <SkipForward className="w-5 h-5" />
        Skip
      </motion.button>

      {/* Reset button (optional, only for room creator) */}
      {onReset && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="px-4 py-3 rounded-lg text-[var(--text-muted)] hover:text-[var(--aurora-rose)] hover:bg-[var(--bg-overlay)] transition-all"
          title="Reset timer"
        >
          <RotateCcw className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  );
}
