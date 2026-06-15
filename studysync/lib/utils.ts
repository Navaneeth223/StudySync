import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}m`;
  }
  
  if (mins === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${mins}m`;
}

export function formatTimer(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (seconds < 60) {
    return 'just now';
  }
  
  if (minutes < 60) {
    return `${minutes}m ago`;
  }
  
  if (hours < 24) {
    return `${hours}h ago`;
  }
  
  if (days < 7) {
    return `${days}d ago`;
  }
  
  return new Date(date).toLocaleDateString();
}

export function getTopicColor(topic: string): string {
  const colors: Record<string, string> = {
    'Mathematics': '#7C3AED',
    'Science': '#0EA5E9',
    'Languages': '#F43F5E',
    'History': '#F59E0B',
    'Computer Science': '#06B6D4',
    'UPSC': '#EA580C',
    'CAT': '#9333EA',
    'JEE': '#7C3AED',
    'NEET': '#10B981',
    'General': '#64748B',
  };
  
  return colors[topic] || colors['General'];
}

export function calculateStreak(lastStudyDate?: Date): number {
  if (!lastStudyDate) return 0;
  
  const now = new Date();
  const last = new Date(lastStudyDate);
  
  // Reset time to midnight for comparison
  now.setHours(0, 0, 0, 0);
  last.setHours(0, 0, 0, 0);
  
  const diffTime = now.getTime() - last.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // If last study was today or yesterday, streak is maintained
  return diffDays <= 1 ? 1 : 0;
}

export function isStreakActive(lastStudyDate?: Date): boolean {
  if (!lastStudyDate) return false;
  
  const now = new Date();
  const last = new Date(lastStudyDate);
  
  now.setHours(0, 0, 0, 0);
  last.setHours(0, 0, 0, 0);
  
  const diffTime = now.getTime() - last.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays <= 1;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function validateRoomPassword(password: string): boolean {
  return password.length >= 4;
}

export function generateRoomCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
