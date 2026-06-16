'use client';

import { BookOpen } from 'lucide-react';

export default function MyRoomsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-8">
        My Rooms
      </h1>
      <div className="text-center py-20">
        <BookOpen className="w-16 h-16 mx-auto mb-4 text-[var(--text-muted)] opacity-50" />
        <p className="text-[var(--text-secondary)]">Coming soon</p>
      </div>
    </div>
  );
}
