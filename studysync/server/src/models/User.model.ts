import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password?: string;
  avatar?: string;
  googleId?: string;
  
  // Profile
  bio?: string;
  goal?: string;
  subjects: string[];
  institution?: string;
  
  // Streak & Stats
  currentStreak: number;
  longestStreak: number;
  totalStudyMinutes: number;
  totalSessions: number;
  lastStudyDate?: Date;
  
  // Preferences
  defaultPomodoro: {
    focusDuration: number;
    breakDuration: number;
    longBreakDuration: number;
    sessionsBeforeLongBreak: number;
  };
  preferredSounds: string[];
  timezone: string;
  
  // Social
  friends: mongoose.Types.ObjectId[];
  friendRequests: mongoose.Types.ObjectId[];
  
  // Achievements
  achievements: string[];
  
  // Subscription
  plan: 'free' | 'plus';
  
  isOnline: boolean;
  lastSeen: Date;
  
  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    username: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true,
      match: /^[a-z0-9_]+$/
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    password: { type: String, minlength: 6 },
    avatar: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    
    bio: { type: String, maxlength: 200 },
    goal: { type: String, maxlength: 100 },
    subjects: [{ type: String }],
    institution: { type: String },
    
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    totalStudyMinutes: { type: Number, default: 0 },
    totalSessions: { type: Number, default: 0 },
    lastStudyDate: { type: Date },
    
    defaultPomodoro: {
      focusDuration: { type: Number, default: 25 },
      breakDuration: { type: Number, default: 5 },
      longBreakDuration: { type: Number, default: 15 },
      sessionsBeforeLongBreak: { type: Number, default: 4 },
    },
    preferredSounds: [{ type: String }],
    timezone: { type: String, default: 'UTC' },
    
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    
    achievements: [{ type: String }],
    
    plan: { type: String, enum: ['free', 'plus'], default: 'free' },
    
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });
UserSchema.index({ isOnline: 1 });

export default mongoose.model<IUser>('User', UserSchema);
