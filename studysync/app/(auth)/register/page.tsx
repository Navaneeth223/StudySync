'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Loader2, GraduationCap, Building2, AlertCircle } from 'lucide-react';
import { STUDY_GOALS } from '@/lib/constants';
import { demoRegister } from '@/lib/auth';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    goal: '',
    institution: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!formData.goal) {
      setError('Please select your study goal');
      return;
    }

    setIsLoading(true);
    
    // Demo register
    const result = demoRegister({
      name: formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      goal: formData.goal,
    });
    
    if (result.success) {
      toast.success(`Welcome to StudySync, ${result.user?.name}!`);
      router.push('/dashboard');
    } else {
      setError(result.error || 'Registration failed');
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl relative z-10"
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
            Join thousands of students studying together
          </p>
        </div>

        {/* Form card */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-1">
              Create your account
            </h2>
            <p className="text-[var(--text-secondary)] text-sm">
              Start your study journey today
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
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl relative z-10"
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
            Join thousands of students studying together
          </p>
        </div>

        {/* Form card */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-8 shadow-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
              Create your account
            </h2>
            <p className="text-[var(--text-secondary)] text-sm">
              Start your study journey today
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

          {/* Registration form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-overlay)] border border-[var(--border-default)] rounded-lg pl-11 pr-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--aurora-violet)] focus:border-transparent transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] font-mono">
                    @
                  </span>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-overlay)] border border-[var(--border-default)] rounded-lg pl-9 pr-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--aurora-violet)] focus:border-transparent transition-all"
                    placeholder="johndoe"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[var(--bg-overlay)] border border-[var(--border-default)] rounded-lg pl-11 pr-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--aurora-violet)] focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-overlay)] border border-[var(--border-default)] rounded-lg pl-11 pr-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--aurora-violet)] focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-overlay)] border border-[var(--border-default)] rounded-lg pl-11 pr-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--aurora-violet)] focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Study Goal */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                What are you studying for?
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full bg-[var(--bg-overlay)] border border-[var(--border-default)] rounded-lg pl-11 pr-4 py-3 text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--aurora-violet)] focus:border-transparent transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled>Select your goal</option>
                  {STUDY_GOALS.map(goal => (
                    <option key={goal} value={goal}>{goal}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Institution (Optional) */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Institution <span className="text-[var(--text-muted)]">(optional)</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className="w-full bg-[var(--bg-overlay)] border border-[var(--border-default)] rounded-lg pl-11 pr-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--aurora-violet)] focus:border-transparent transition-all"
                  placeholder="Your college or school"
                />
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 rounded border-[var(--border-default)] bg-[var(--bg-overlay)] text-[var(--aurora-violet)] focus:ring-2 focus:ring-[var(--aurora-violet)] focus:ring-offset-0"
                required
              />
              <label htmlFor="terms" className="text-sm text-[var(--text-secondary)] leading-relaxed">
                I agree to the{' '}
                <Link href="/terms" className="text-[var(--aurora-violet)] hover:text-[var(--aurora-teal)] transition-colors">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-[var(--aurora-violet)] hover:text-[var(--aurora-teal)] transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-button text-white font-semibold rounded-lg px-4 py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Sign in link */}
          <div className="mt-6 text-center text-sm">
            <span className="text-[var(--text-secondary)]">
              Already have an account?{' '}
            </span>
            <Link
              href="/login"
              className="text-[var(--aurora-violet)] hover:text-[var(--aurora-teal)] font-medium transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
