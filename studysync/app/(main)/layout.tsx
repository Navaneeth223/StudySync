'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { motion, AnimatePresence } from 'framer-motion';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-64 z-50"
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="lg:pl-64">
        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
