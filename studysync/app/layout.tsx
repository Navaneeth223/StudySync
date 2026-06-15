import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'sonner';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'StudySync - Study Together. Focus Deeper.',
  description: 'Real-time collaborative study platform for students. Join topic-based study rooms, stay focused with shared Pomodoro timers, and hold each other accountable.',
  keywords: ['study', 'pomodoro', 'collaborative', 'focus', 'students', 'learning'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${jakarta.variable} font-sans antialiased aurora-bg min-h-screen`}>
        <Providers>
          {children}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
