'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PomodoroRing } from '../timer/PomodoroRing';
import { TimerControls } from '../timer/TimerControls';
import { useTimerStore } from '@/store/useTimerStore';
import { Repeat } from 'lucide-react';

interface TimerPanelProps {
  focusDuration?: number;
  breakDuration?: number;
  longBreakDuration?: number;
  sessionsBeforeLongBreak?: number;
  isSynced?: boolean;
  canControl?: boolean;
}

export function TimerPanel({
  focusDuration = 25,
  breakDuration = 5,
  longBreakDuration = 15,
  sessionsBeforeLongBreak = 4,
  isSynced = true,
  canControl = true,
}: TimerPanelProps) {
  const {
    phase,
    timeRemaining,
    isRunning,
    isPaused,
    currentSession,
    totalSessions,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    tick,
    nextPhase,
  } = useTimerStore();

  // Timer tick effect
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, tick]);

  const handleStart = () => {
    startTimer('focus', focusDuration * 60);
  };

  const handlePause = () => {
    pauseTimer();
  };

  const handleResume = () => {
    resumeTimer();
  };

  const handleSkip = () => {
    nextPhase();
    stopTimer();
  };

  const handleReset = () => {
    stopTimer();
  };

  const getTotalDuration = () => {
    switch (phase) {
      case 'focus':
        return focusDuration * 60;
      case 'break':
        return breakDuration * 60;
      case 'longBreak':
        return longBreakDuration * 60;
      default:
        return 0;
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      {/* Session counter */}
      {phase !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <div className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wide">
            Session {currentSession} of {totalSessions}
          </div>
        </motion.div>
      )}

      {/* Timer ring */}
      <div className="mb-8">
        <PomodoroRing
          phase={phase}
          timeRemaining={timeRemaining}
          totalDuration={getTotalDuration()}
          isRunning={isRunning && !isPaused}
        />
      </div>

      {/* Controls */}
      <div className="mb-6">
        <TimerControls
          isRunning={isRunning}
          isPaused={isPaused}
          onStart={handleStart}
          onPause={handlePause}
          onResume={handleResume}
          onSkip={handleSkip}
          onReset={canControl ? handleReset : undefined}
          canControl={canControl}
        />
      </div>

      {/* Session dots */}
      {phase !== 'idle' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 mb-4"
        >
          {Array.from({ length: totalSessions }).map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i < currentSession
                  ? 'bg-[var(--aurora-violet)]'
                  : 'bg-[var(--bg-overlay)] border border-[var(--border-default)]'
              }`}
            />
          ))}
          <span className="text-xs text-[var(--text-muted)] ml-2">
            Sessions completed
          </span>
        </motion.div>
      )}

      {/* Next break info */}
      {phase === 'focus' && (
        <div className="text-sm text-[var(--text-secondary)] text-center">
          {currentSession >= totalSessions ? (
            <>Long break after this session 🌟</>
          ) : (
            <>Short break after this session ☕</>
          )}
        </div>
      )}

      {/* Sync indicator */}
      {isSynced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 flex items-center gap-2 text-xs text-[var(--text-muted)] bg-[var(--bg-overlay)] px-4 py-2 rounded-full border border-[var(--border-subtle)]"
        >
          <Repeat className="w-3.5 h-3.5" />
          Timer synced with room
        </motion.div>
      )}
    </div>
  );
}
