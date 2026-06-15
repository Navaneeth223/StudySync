import { PomodoroConfig } from './user.types';

export interface Room {
  _id: string;
  createdBy: string;
  
  name: string;
  description?: string;
  topic: string;
  tags: string[];
  
  // Access
  isPublic: boolean;
  password?: string;
  maxParticipants: number;
  
  // Timer Config
  pomodoroConfig: RoomPomodoroConfig;
  
  // Room State
  currentPhase: 'focus' | 'break' | 'longBreak' | 'idle';
  currentSession: number;
  timerStartedAt?: Date;
  timerPausedAt?: Date;
  isPaused: boolean;
  
  // Content
  sharedNotes?: string;
  whiteboardData?: string;
  
  // Ambient
  activeSound?: string;
  soundVolume: number;
  
  // Stats
  totalSessionsCompleted: number;
  totalMinutesFocused: number;
  allTimeParticipants: number;
  
  // Room pinning / featured
  isFeatured: boolean;
  pinnedAt?: Date;
  
  status: 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomPomodoroConfig extends PomodoroConfig {
  syncMode: 'synced' | 'individual';
}

export interface RoomCard {
  _id: string;
  name: string;
  topic: string;
  tags: string[];
  isPublic: boolean;
  maxParticipants: number;
  currentParticipants: number;
  currentPhase: 'focus' | 'break' | 'longBreak' | 'idle';
  timerRemaining?: number;
  isFeatured: boolean;
  participants: RoomParticipant[];
}

export interface RoomParticipant {
  userId: string;
  username: string;
  avatar?: string;
  status: 'focusing' | 'break' | 'idle' | 'focus-lock';
  joinedAt: Date;
  sessionsToday: number;
}

export interface CreateRoomInput {
  name: string;
  description?: string;
  topic: string;
  tags: string[];
  isPublic: boolean;
  password?: string;
  maxParticipants: number;
  pomodoroConfig: RoomPomodoroConfig;
  activeSound?: string;
}

export type TopicType = 
  | 'Mathematics' 
  | 'Science' 
  | 'Languages' 
  | 'History' 
  | 'Computer Science' 
  | 'UPSC' 
  | 'CAT' 
  | 'JEE' 
  | 'NEET'
  | 'General';
