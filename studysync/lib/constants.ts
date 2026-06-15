import { TopicType } from '@/types/room.types';

export const TOPICS: { value: TopicType; label: string; color: string; emoji: string }[] = [
  { value: 'Mathematics', label: 'Mathematics', color: '#7C3AED', emoji: '📐' },
  { value: 'Science', label: 'Science', color: '#0EA5E9', emoji: '🔬' },
  { value: 'Languages', label: 'Languages', color: '#F43F5E', emoji: '🗣️' },
  { value: 'History', label: 'History', color: '#F59E0B', emoji: '📜' },
  { value: 'Computer Science', label: 'Computer Science', color: '#06B6D4', emoji: '💻' },
  { value: 'UPSC', label: 'UPSC', color: '#EA580C', emoji: '🎯' },
  { value: 'CAT', label: 'CAT', color: '#9333EA', emoji: '📊' },
  { value: 'JEE', label: 'JEE', color: '#7C3AED', emoji: '⚛️' },
  { value: 'NEET', label: 'NEET', color: '#10B981', emoji: '⚕️' },
  { value: 'General', label: 'General', color: '#64748B', emoji: '📚' },
];

export const AMBIENT_SOUNDS = [
  { id: 'rain', label: 'Rain', emoji: '🌧️', file: '/sounds/rain.mp3' },
  { id: 'cafe', label: 'Café', emoji: '☕', file: '/sounds/cafe.mp3' },
  { id: 'library', label: 'Library', emoji: '📚', file: '/sounds/library.mp3' },
  { id: 'whitenoise', label: 'White Noise', emoji: '📻', file: '/sounds/whitenoise.mp3' },
  { id: 'fireplace', label: 'Fireplace', emoji: '🔥', file: '/sounds/fireplace.mp3' },
  { id: 'ocean', label: 'Ocean', emoji: '🌊', file: '/sounds/ocean.mp3' },
];

export const POMODORO_PRESETS = [
  { label: 'Classic', focus: 25, break: 5, longBreak: 15, sessions: 4 },
  { label: 'Extended', focus: 45, break: 10, longBreak: 30, sessions: 3 },
  { label: 'Sprint', focus: 20, break: 5, longBreak: 10, sessions: 4 },
  { label: 'Deep Work', focus: 90, break: 20, longBreak: 30, sessions: 2 },
];

export const DEFAULT_POMODORO = {
  focusDuration: 25,
  breakDuration: 5,
  longBreakDuration: 15,
  sessionsBeforeLongBreak: 4,
};

export const STUDY_GOALS = [
  'JEE Preparation',
  'NEET Preparation',
  'UPSC Preparation',
  'CAT Preparation',
  'College Exams',
  'Professional Certification',
  'Self Learning',
  'Other',
];

export const ACHIEVEMENTS = [
  {
    _id: 'first_pomodoro',
    name: 'First Pomodoro',
    description: 'Complete your first Pomodoro',
    icon: '🍅',
    rarity: 'common',
  },
  {
    _id: 'streak_3',
    name: '3-Day Streak',
    description: '3-day study streak',
    icon: '🔥',
    rarity: 'common',
  },
  {
    _id: 'streak_7',
    name: '7-Day Streak',
    description: '7-day study streak',
    icon: '🔥',
    rarity: 'rare',
  },
  {
    _id: 'streak_30',
    name: '30-Day Streak',
    description: '30-day study streak',
    icon: '🔥',
    rarity: 'epic',
  },
  {
    _id: 'streak_100',
    name: '100-Day Streak',
    description: '100-day study streak',
    icon: '🔥',
    rarity: 'legendary',
  },
  {
    _id: 'night_owl',
    name: 'Night Owl',
    description: 'Study past midnight',
    icon: '🌙',
    rarity: 'common',
  },
  {
    _id: 'early_bird',
    name: 'Early Bird',
    description: 'Study before 6am',
    icon: '🌅',
    rarity: 'common',
  },
  {
    _id: 'marathon',
    name: 'Marathon',
    description: '8+ hours in one day',
    icon: '⚡',
    rarity: 'rare',
  },
  {
    _id: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Join 10 different rooms',
    icon: '👥',
    rarity: 'common',
  },
  {
    _id: 'top_10',
    name: 'Top 10',
    description: 'Reach top 10 on weekly leaderboard',
    icon: '🏆',
    rarity: 'rare',
  },
  {
    _id: 'subject_master',
    name: 'Subject Master',
    description: '100 hours in one subject',
    icon: '📚',
    rarity: 'epic',
  },
  {
    _id: 'team_player',
    name: 'Team Player',
    description: 'Study with 50 unique people',
    icon: '🤝',
    rarity: 'rare',
  },
];

export const RARITY_COLORS = {
  common: '#64748B',
  rare: '#0EA5E9',
  epic: '#9333EA',
  legendary: '#F59E0B',
};

export const MAX_ROOM_NAME_LENGTH = 60;
export const MAX_MESSAGE_LENGTH = 500;
export const MAX_BIO_LENGTH = 200;
export const MAX_GOAL_LENGTH = 100;
