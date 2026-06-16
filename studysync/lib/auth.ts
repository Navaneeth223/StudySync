// Demo authentication for development
// This will be replaced with NextAuth.js in production

interface DemoUser {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  goal: string;
  currentStreak: number;
}

// Demo users database
const DEMO_USERS: Record<string, { password: string; user: DemoUser }> = {
  'demo@studysync.com': {
    password: 'demo123',
    user: {
      id: '1',
      name: 'Navaneeth Kumar',
      username: 'navaneeth',
      email: 'demo@studysync.com',
      avatar: '',
      goal: 'JEE Preparation',
      currentStreak: 14,
    },
  },
  'rahul@studysync.com': {
    password: 'demo123',
    user: {
      id: '2',
      name: 'Rahul Sharma',
      username: 'rahul',
      email: 'rahul@studysync.com',
      avatar: '',
      goal: 'NEET Preparation',
      currentStreak: 7,
    },
  },
  'priya@studysync.com': {
    password: 'demo123',
    user: {
      id: '3',
      name: 'Priya Patel',
      username: 'priya',
      email: 'priya@studysync.com',
      avatar: '',
      goal: 'CAT Preparation',
      currentStreak: 21,
    },
  },
};

// Storage keys
const USER_KEY = 'studysync_user';
const TOKEN_KEY = 'studysync_token';

/**
 * Demo login function
 */
export const demoLogin = (email: string, password: string): { success: boolean; user?: DemoUser; error?: string } => {
  const userRecord = DEMO_USERS[email.toLowerCase()];

  if (!userRecord) {
    return { success: false, error: 'Invalid email or password' };
  }

  if (userRecord.password !== password) {
    return { success: false, error: 'Invalid email or password' };
  }

  // Generate a simple token (in production, use JWT)
  const token = btoa(`${email}:${Date.now()}`);

  // Store in localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_KEY, JSON.stringify(userRecord.user));
    localStorage.setItem(TOKEN_KEY, token);
  }

  return { success: true, user: userRecord.user };
};

/**
 * Demo register function
 */
export const demoRegister = (data: {
  name: string;
  username: string;
  email: string;
  password: string;
  goal: string;
}): { success: boolean; user?: DemoUser; error?: string } => {
  // Check if email already exists
  if (DEMO_USERS[data.email.toLowerCase()]) {
    return { success: false, error: 'Email already exists' };
  }

  // Create new user
  const newUser: DemoUser = {
    id: Date.now().toString(),
    name: data.name,
    username: data.username,
    email: data.email,
    goal: data.goal,
    currentStreak: 0,
  };

  // In a real app, this would save to database
  // For demo, just add to memory (will be lost on reload)
  DEMO_USERS[data.email.toLowerCase()] = {
    password: data.password,
    user: newUser,
  };

  // Generate token
  const token = btoa(`${data.email}:${Date.now()}`);

  // Store in localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    localStorage.setItem(TOKEN_KEY, token);
  }

  return { success: true, user: newUser };
};

/**
 * Get current user from localStorage
 */
export const getCurrentUser = (): DemoUser | null => {
  if (typeof window === 'undefined') return null;

  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

/**
 * Get current token
 */
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null && getToken() !== null;
};

/**
 * Logout user
 */
export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }
};

/**
 * Get demo credentials for display
 */
export const getDemoCredentials = () => {
  return {
    email: 'demo@studysync.com',
    password: 'demo123',
  };
};
