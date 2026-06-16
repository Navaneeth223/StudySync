'use client';

import { Search, Bell, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCurrentUser } from '@/lib/auth';

interface TopbarProps {
  onMenuClick?: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const currentUser = getCurrentUser();
  return (
    <header className="sticky top-0 z-20 h-16 bg-[var(--bg-surface)]/80 backdrop-blur-lg border-b border-[var(--border-default)]">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left section - Mobile menu + Search */}
        <div className="flex items-center gap-4 flex-1">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-[var(--bg-overlay)] transition-colors"
          >
            <Menu className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>

          {/* Search bar */}
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search rooms, users..."
              className="w-full bg-[var(--bg-overlay)] border border-[var(--border-default)] rounded-lg pl-11 pr-4 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--aurora-violet)] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right section - Notifications + Avatar */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-[var(--bg-overlay)] transition-colors">
            <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--aurora-rose)] rounded-full pulse-glow" />
          </button>

          {/* User avatar */}
          <button className="flex items-center gap-3 p-1.5 pr-3 rounded-lg hover:bg-[var(--bg-overlay)] transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--aurora-violet)] to-[var(--aurora-teal)] flex items-center justify-center text-sm font-semibold">
              {currentUser?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium text-[var(--text-primary)]">
                {currentUser?.name || 'User'}
              </div>
              <div className="text-xs text-[var(--text-muted)]">
                @{currentUser?.username || 'user'}
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
