import mongoose, { Schema, Document } from 'mongoose';

export interface IStudySession extends Document {
  userId: mongoose.Types.ObjectId;
  roomId: mongoose.Types.ObjectId;
  
  startedAt: Date;
  endedAt?: Date;
  durationMinutes: number;
  
  pomodorosCompleted: number;
  focusMinutes: number;
  breakMinutes: number;
  
  topic: string;
  tags: string[];
  
  mood?: 'great' | 'good' | 'okay' | 'tired';
  notes?: string;
  
  achievementsUnlocked: string[];
  
  date: Date; // Date-only for heatmap queries
}

const StudySessionSchema = new Schema<IStudySession>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
      index: true 
    },
    roomId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Room', 
      required: true 
    },
    
    startedAt: { type: Date, required: true },
    endedAt: { type: Date },
    durationMinutes: { type: Number, required: true, min: 0 },
    
    pomodorosCompleted: { type: Number, default: 0, min: 0 },
    focusMinutes: { type: Number, default: 0, min: 0 },
    breakMinutes: { type: Number, default: 0, min: 0 },
    
    topic: { type: String, required: true },
    tags: [{ type: String }],
    
    mood: { 
      type: String, 
      enum: ['great', 'good', 'okay', 'tired'] 
    },
    notes: { type: String, maxlength: 500 },
    
    achievementsUnlocked: [{ type: String }],
    
    date: { type: Date, required: true, index: true },
  },
  { timestamps: true }
);

// Indexes for queries
StudySessionSchema.index({ userId: 1, date: -1 });
StudySessionSchema.index({ userId: 1, topic: 1 });
StudySessionSchema.index({ roomId: 1, startedAt: -1 });

export default mongoose.model<IStudySession>('StudySession', StudySessionSchema);
