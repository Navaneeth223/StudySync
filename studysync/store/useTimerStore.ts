import { create } from 'zustand';
import { TimerPhase, TimerState } from '@/types/timer.types';

interface TimerStore extends TimerState {
  // Actions
  startTimer: (phase: TimerPhase, duration: number) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  stopTimer: () => void;
  tick: () => void;
  syncTimer: (state: Partial<TimerState>) => void;
  nextPhase: () => void;
  reset: () => void;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  phase: 'idle',
  timeRemaining: 0,
  isRunning: false,
  isPaused: false,
  currentSession: 0,
  totalSessions: 4,
  startedAt: undefined,

  startTimer: (phase, duration) => {
    set({
      phase,
      timeRemaining: duration,
      isRunning: true,
      isPaused: false,
      startedAt: Date.now(),
      currentSession: phase === 'focus' ? get().currentSession + 1 : get().currentSession,
    });
  },

  pauseTimer: () => {
    set({ isPaused: true, isRunning: false });
  },

  resumeTimer: () => {
    set({ isPaused: false, isRunning: true });
  },

  stopTimer: () => {
    set({
      phase: 'idle',
      timeRemaining: 0,
      isRunning: false,
      isPaused: false,
      startedAt: undefined,
    });
  },

  tick: () => {
    const { timeRemaining, isRunning } = get();
    if (!isRunning || timeRemaining <= 0) return;

    set({ timeRemaining: Math.max(0, timeRemaining - 1) });

    if (timeRemaining - 1 <= 0) {
      // Timer complete
      get().stopTimer();
    }
  },

  syncTimer: (state) => {
    set(state);
  },

  nextPhase: () => {
    const { phase, currentSession, totalSessions } = get();
    
    if (phase === 'focus') {
      // Check if it's time for long break
      if (currentSession >= totalSessions) {
        set({ phase: 'longBreak' });
      } else {
        set({ phase: 'break' });
      }
    } else {
      // After any break, go back to focus
      set({ phase: 'focus' });
    }
  },

  reset: () => {
    set({
      phase: 'idle',
      timeRemaining: 0,
      isRunning: false,
      isPaused: false,
      currentSession: 0,
      totalSessions: 4,
      startedAt: undefined,
    });
  },
}));
