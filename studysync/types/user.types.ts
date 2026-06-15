export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  googleId?: string;
  
  // Profile
  bio?: string;
  goal?: string;
  subjects: string[];
  institution?: string;
  
  // Streak & Stats
  currentStreak: number;
  longestStreak: number;
  totalStudyMinutes: number;
  totalSessions: number;
  lastStudyDate?: Date;
  
  // Preferences
  defaultPomodoro: PomodoroConfig;
  preferredSounds: string[];
  timezone: string;
  
  // Social
  friends: string[];
  friendRequests: string[];
  
  // Achievements
  achievements: string[];
  
  // Subscription
  plan: 'free' | 'plus';
  
  isOnline: boolean;
  lastSeen: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PomodoroConfig {
  focusDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  sessionsBeforeLongBreak: number;
}

export interface UserProfile {
  _id: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
  goal?: string;
  subjects: string[];
  institution?: string;
  currentStreak: number;
  totalStudyMinutes: number;
  totalSessions: number;
  achievements: string[];
  isOnline: boolean;
}
