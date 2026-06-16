'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { demoLogin, getDemoCredentials } from '@/lib/auth';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const demoCredentials = getDemoCredentials();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Demo login
    const result = demoLogin(email, password);
    
    if (result.success) {
      toast.success(`Welcome back, ${result.user?.name}!`);
      router.push('/dashboard');
    } else {
      setError(result.error || 'Login failed');
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail(demoCredentials.email);
    setPassword(demoCredentials.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating context cards */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <motion.div
          className="absolute top-20 left-10 glass px-4 py-3 rounded-lg"
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="text-sm text-[var(--text-secondary)]">
            🍅 25:00 · Focus Mode · 3 people studying
          </div>
        </motion.div>

        <motion.div
          className="absolute top-40 right-20 glass px-4 py-3 rounded-lg"
          animate={{
            y: [0, 10, 0],
            x: [0, -5, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          <div className="text-sm text-[var(--text-secondary)]">
            📚 Mathematics · 8 online now
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-1/4 glass px-4 py-3 rounded-lg"
          animate={{
            y: [0, -15, 0],
            x: [0, 8, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        >
          <div className="text-sm text-[var(--text-secondary)]">
            🔥 Day 14 streak · Keep going!
          </div>
        </motion.div>
      </div>

      {/* Main auth card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo and tagline */}
        <div className="text-center mb-6 md:mb-8">
          <motion.div
            className="inline-flex items-center gap-3 mb-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[var(--aurora-violet)] to-[var(--aurora-teal)] p-0.5">
                <div className="w-full h-full rounded-full bg-[var(--bg-base)] flex items-center justify-center">
                  <span className="text-xl md:text-2xl">📚</span>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[var(--aurora-mint)] pulse-glow" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold gradient-text">StudySync</h1>
          </motion.div>
          <p className="text-[var(--text-secondary)] text-sm md:text-base">
            Study together. Focus deeper.
          </p>
        </div>

        {/* Demo credentials banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4 p-4 bg-gradient-to-r from-[var(--aurora-violet)]/10 to-[var(--aurora-teal)]/10 border border-[var(--aurora-violet)]/30 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">🎯</div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                Demo Login Credentials
              </h3>
              <div className="text-xs text-[var(--text-secondary)] space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--text-muted)]">Email:</span>
                  <code className="px-2 py-0.5 bg-[var(--bg-overlay)] rounded text-[var(--aurora-teal)]">
                    {demoCredentials.email}
                  </code>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--text-muted)]">Password:</span>
                  <code className="px-2 py-0.5 bg-[var(--bg-overlay)] rounded text-[var(--aurora-teal)]">
                    {demoCredentials.password}
                  </code>
                </div>
              </div>
              <button
                onClick={handleDemoLogin}
                className="mt-2 text-xs text-[var(--aurora-violet)] hover:text-[var(--aurora-teal)] transition-colors font-medium"
              >
                → Click to auto-fill
              </button>
            </div>
          </div>
        </motion.div>

        {/* Form card */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-1">
              Welcome back
            </h2>
            <p className="text-[var(--text-secondary)] text-sm">
              Sign in to continue your study journey
            </p>
          </div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-[var(--aurora-rose)]/10 border border-[var(--aurora-rose)]/30 rounded-lg flex items-center gap-2 text-sm text-[var(--aurora-rose)]"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Email/Password form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[var(--bg-overlay)] border border-[var(--border-default)] rounded-lg pl-11 pr-4 py-2.5 md:py-3 text-sm md:text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--aurora-violet)] focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[var(--bg-overlay)] border border-[var(--border-default)] rounded-lg pl-11 pr-4 py-2.5 md:py-3 text-sm md:text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--aurora-violet)] focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[var(--border-default)] bg-[var(--bg-overlay)] text-[var(--aurora-violet)] focus:ring-2 focus:ring-[var(--aurora-violet)] focus:ring-offset-0"
                />
                <span className="text-[var(--text-secondary)]">Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-button text-white font-semibold rounded-lg px-4 py-2.5 md:py-3 text-sm md:text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center text-sm">
            <span className="text-[var(--text-secondary)]">
              Don't have an account?{' '}
            </span>
            <Link
              href="/register"
              className="text-[var(--aurora-violet)] hover:text-[var(--aurora-teal)] font-medium transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating context cards */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 glass px-4 py-3 rounded-lg"
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="text-sm text-[var(--text-secondary)]">
            🍅 25:00 · Focus Mode · 3 people studying
          </div>
        </motion.div>

        <motion.div
          className="absolute top-40 right-20 glass px-4 py-3 rounded-lg"
          animate={{
            y: [0, 10, 0],
            x: [0, -5, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          <div className="text-sm text-[var(--text-secondary)]">
            📚 Mathematics · 8 online now
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-1/4 glass px-4 py-3 rounded-lg"
          animate={{
            y: [0, -15, 0],
            x: [0, 8, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        >
          <div className="text-sm text-[var(--text-secondary)]">
            🔥 Day 14 streak · Keep going!
          </div>
        </motion.div>
      </div>

      {/* Main auth card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo and tagline */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center gap-3 mb-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--aurora-violet)] to-[var(--aurora-teal)] p-0.5">
                <div className="w-full h-full rounded-full bg-[var(--bg-base)] flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--aurora-mint)] pulse-glow" />
            </div>
            <h1 className="text-3xl font-bold gradient-text">StudySync</h1>
          </motion.div>
          <p className="text-[var(--text-secondary)] text-base">
            Study together. Focus deeper.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-8 shadow-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
              Welcome back
            </h2>
            <p className="text-[var(--text-secondary)] text-sm">
              Sign in to continue your study journey
            </p>
          </div>

          {/* Google OAuth button */}
          <button
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 rounded-lg px-4 py-3 font-medium hover:bg-gray-100 transition-colors mb-6"
            onClick={() => {
              // TODO: Implement Google OAuth
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border-default)]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[var(--bg-surface)] text-[var(--text-muted)]">
                or
              </span>
            </div>
          </div>

          {/* Email/Password form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[var(--bg-overlay)] border border-[var(--border-default)] rounded-lg pl-11 pr-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--aurora-violet)] focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[var(--bg-overlay)] border border-[var(--border-default)] rounded-lg pl-11 pr-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--aurora-violet)] focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[var(--border-default)] bg-[var(--bg-overlay)] text-[var(--aurora-violet)] focus:ring-2 focus:ring-[var(--aurora-violet)] focus:ring-offset-0"
                />
                <span className="text-[var(--text-secondary)]">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-[var(--aurora-violet)] hover:text-[var(--aurora-teal)] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-button text-white font-semibold rounded-lg px-4 py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center text-sm">
            <span className="text-[var(--text-secondary)]">
              Don't have an account?{' '}
            </span>
            <Link
              href="/register"
              className="text-[var(--aurora-violet)] hover:text-[var(--aurora-teal)] font-medium transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
