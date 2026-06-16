import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  roomId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  
  content: string;
  type: 'text' | 'system' | 'reaction' | 'image';
  
  systemEvent?: string;
  
  reactions: Array<{
    emoji: string;
    userIds: mongoose.Types.ObjectId[];
  }>;
  
  isDeleted: boolean;
}

const MessageSchema = new Schema<IMessage>(
  {
    roomId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Room', 
      required: true,
      index: true 
    },
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    
    content: { 
      type: String, 
      required: true, 
      maxlength: 500 
    },
    type: { 
      type: String, 
      enum: ['text', 'system', 'reaction', 'image'], 
      default: 'text' 
    },
    
    systemEvent: { type: String },
    
    reactions: [{
      emoji: { type: String, required: true },
      userIds: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    }],
    
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Index for fetching room messages
MessageSchema.index({ roomId: 1, createdAt: -1 });

export default mongoose.model<IMessage>('Message', MessageSchema);
