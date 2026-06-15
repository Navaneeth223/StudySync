export type TimerPhase = 'focus' | 'break' | 'longBreak' | 'idle';

export interface TimerState {
  phase: TimerPhase;
  timeRemaining: number;
  isRunning: boolean;
  isPaused: boolean;
  currentSession: number;
  totalSessions: number;
  startedAt?: number;
}

export interface StudySession {
  _id: string;
  userId: string;
  roomId: string;
  
  startedAt: Date;
  endedAt?: Date;
  durationMinutes: number;
  
  pomodorosCompleted: number;
  focusMinutes: number;
  breakMinutes: number;
  
  topic: string;
  tags: string[];
  
  mood?: 'great' | 'good' | 'okay' | 'tired';
  notes?: string;
  
  achievementsUnlocked: string[];
  
  date: Date;
  createdAt: Date;
}
