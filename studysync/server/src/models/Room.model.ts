import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
  createdBy: mongoose.Types.ObjectId;
  
  name: string;
  description?: string;
  topic: string;
  tags: string[];
  
  // Access
  isPublic: boolean;
  password?: string;
  maxParticipants: number;
  
  // Timer Config
  pomodoroConfig: {
    focusDuration: number;
    breakDuration: number;
    longBreakDuration: number;
    sessionsBeforeLongBreak: number;
    syncMode: 'synced' | 'individual';
  };
  
  // Room State (ephemeral, also in Redis)
  currentPhase: 'focus' | 'break' | 'longBreak' | 'idle';
  currentSession: number;
  timerStartedAt?: Date;
  timerPausedAt?: Date;
  isPaused: boolean;
  
  // Content
  sharedNotes?: string;
  whiteboardData?: string;
  
  // Ambient
  activeSound?: string;
  soundVolume: number;
  
  // Stats
  totalSessionsCompleted: number;
  totalMinutesFocused: number;
  allTimeParticipants: number;
  
  // Room pinning / featured
  isFeatured: boolean;
  pinnedAt?: Date;
  
  status: 'active' | 'archived';
}

const RoomSchema = new Schema<IRoom>(
  {
    createdBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    
    name: { 
      type: String, 
      required: true, 
      trim: true, 
      maxlength: 60 
    },
    description: { type: String, maxlength: 200 },
    topic: { 
      type: String, 
      required: true,
      enum: [
        'Mathematics',
        'Science',
        'Languages',
        'History',
        'Computer Science',
        'UPSC',
        'CAT',
        'JEE',
        'NEET',
        'General'
      ]
    },
    tags: [{ type: String }],
    
    isPublic: { type: Boolean, default: true },
    password: { type: String },
    maxParticipants: { type: Number, default: 10, min: 2, max: 50 },
    
    pomodoroConfig: {
      focusDuration: { type: Number, default: 25 },
      breakDuration: { type: Number, default: 5 },
      longBreakDuration: { type: Number, default: 15 },
      sessionsBeforeLongBreak: { type: Number, default: 4 },
      syncMode: { 
        type: String, 
        enum: ['synced', 'individual'], 
        default: 'synced' 
      },
    },
    
    currentPhase: { 
      type: String, 
      enum: ['focus', 'break', 'longBreak', 'idle'], 
      default: 'idle' 
    },
    currentSession: { type: Number, default: 0 },
    timerStartedAt: { type: Date },
    timerPausedAt: { type: Date },
    isPaused: { type: Boolean, default: false },
    
    sharedNotes: { type: String },
    whiteboardData: { type: String },
    
    activeSound: { type: String },
    soundVolume: { type: Number, default: 0.7, min: 0, max: 1 },
    
    totalSessionsCompleted: { type: Number, default: 0 },
    totalMinutesFocused: { type: Number, default: 0 },
    allTimeParticipants: { type: Number, default: 0 },
    
    isFeatured: { type: Boolean, default: false },
    pinnedAt: { type: Date },
    
    status: { 
      type: String, 
      enum: ['active', 'archived'], 
      default: 'active' 
    },
  },
  { timestamps: true }
);

// Indexes
RoomSchema.index({ topic: 1, status: 1 });
RoomSchema.index({ isPublic: 1, status: 1 });
RoomSchema.index({ isFeatured: 1, status: 1 });
RoomSchema.index({ createdBy: 1 });

export default mongoose.model<IRoom>('Room', RoomSchema);
