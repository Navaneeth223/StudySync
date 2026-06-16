'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Home, 
  Compass, 
  Trophy, 
  BarChart3, 
  User, 
  Settings,
  BookOpen,
  LogOut,
  Flame
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { logout, getCurrentUser } from '@/lib/auth';
import { toast } from 'sonner';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Browse Rooms', href: '/rooms', icon: Compass },
  { name: 'My Rooms', href: '/my-rooms', icon: BookOpen },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { name: 'My Stats', href: '/stats', icon: BarChart3 },
];

const bottomNav = [
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[var(--bg-surface)] border-r border-[var(--border-default)] flex flex-col z-30">
      {/* Logo */}
      <div className="p-6 border-b border-[var(--border-default)]">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--aurora-violet)] to-[var(--aurora-teal)] p-0.5">
              <div className="w-full h-full rounded-full bg-[var(--bg-surface)] flex items-center justify-center">
                <span className="text-xl">📚</span>
              </div>
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[var(--aurora-mint)] pulse-glow" />
          </div>
          <div>
            <h1 className="text-lg font-bold gradient-text group-hover:brightness-110 transition-all">
              StudySync
            </h1>
            <p className="text-xs text-[var(--text-muted)]">Study together</p>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                isActive
                  ? 'bg-[var(--bg-overlay)] text-[var(--text-primary)] shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-overlay)]'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive && 'text-[var(--aurora-violet)]')} />
              <span>{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--aurora-violet)]"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-[var(--border-default)]">
        {/* Streak card */}
        <div className="mb-4 p-3 rounded-lg bg-gradient-to-br from-[var(--aurora-violet)]/10 to-[var(--aurora-teal)]/10 border border-[var(--border-accent)]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-[var(--text-secondary)]">Current Streak</span>
            <Flame className="w-4 h-4 text-[var(--aurora-amber)]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[var(--text-primary)]">
              {currentUser?.currentStreak || 0}
            </span>
            <span className="text-xs text-[var(--text-muted)]">days</span>
          </div>
          <div className="mt-2 h-1.5 bg-[var(--bg-overlay)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--aurora-violet)] to-[var(--aurora-teal)]"
              initial={{ width: 0 }}
              animate={{ width: '80%' }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

        {/* Bottom nav */}
        <div className="space-y-1 mb-3">
          {bottomNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-[var(--bg-overlay)] text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-overlay)]'
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--aurora-rose)] hover:bg-[var(--bg-overlay)] transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
