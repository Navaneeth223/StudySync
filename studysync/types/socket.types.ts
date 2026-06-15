export interface ServerToClientEvents {
  // Room
  'room:joined': (data: RoomJoinedData) => void;
  'room:user-joined': (data: UserJoinedData) => void;
  'room:user-left': (data: { userId: string }) => void;
  'room:updated': (data: { room: any }) => void;
  
  // Timer
  'timer:sync': (data: TimerSyncData) => void;
  'timer:phase-change': (data: { newPhase: string; session: number }) => void;
  'timer:complete': (data: { totalSessions: number; message: string }) => void;
  
  // Chat
  'chat:message': (message: any) => void;
  'chat:reaction': (data: { messageId: string; reactions: any[] }) => void;
  'chat:deleted': (data: { messageId: string }) => void;
  'chat:typing': (data: { userId: string; username: string }) => void;
  
  // Whiteboard
  'whiteboard:update': (data: WhiteboardUpdateData) => void;
  
  // Notes
  'notes:update': (data: { content: string; userId: string }) => void;
  
  // Presence
  'presence:update': (data: { userId: string; status: string }) => void;
  'presence:online': (data: { userIds: string[] }) => void;
  
  // Sound
  'sound:update': (data: { sounds: SoundConfig[] }) => void;
  
  // Achievements
  'achievement:unlocked': (data: { achievement: any }) => void;
}

export interface ClientToServerEvents {
  // Room
  'room:join': (data: { roomId: string; userId: string; password?: string }) => void;
  'room:leave': (data: { roomId: string; userId: string }) => void;
  
  // Timer
  'timer:start': (data: { roomId: string; phase: string }) => void;
  'timer:pause': (data: { roomId: string }) => void;
  'timer:resume': (data: { roomId: string }) => void;
  'timer:skip': (data: { roomId: string }) => void;
  'timer:reset': (data: { roomId: string }) => void;
  
  // Chat
  'chat:send': (data: { roomId: string; content: string; type: string }) => void;
  'chat:react': (data: { roomId: string; messageId: string; emoji: string }) => void;
  'chat:delete': (data: { roomId: string; messageId: string }) => void;
  
  // Whiteboard
  'whiteboard:update': (data: { roomId: string; elements: any; appState: any }) => void;
  
  // Notes
  'notes:update': (data: { roomId: string; content: string }) => void;
  
  // Presence
  'presence:status': (data: { roomId: string; status: string }) => void;
  'presence:typing': (data: { roomId: string }) => void;
  'presence:cursor': (data: { roomId: string; x: number; y: number }) => void;
  
  // Sound
  'sound:change': (data: { roomId: string; sounds: SoundConfig[] }) => void;
}

export interface RoomJoinedData {
  room: any;
  participants: any[];
  messages: any[];
  timer: TimerSyncData;
}

export interface UserJoinedData {
  user: {
    userId: string;
    username: string;
    avatar?: string;
  };
}

export interface TimerSyncData {
  phase: 'focus' | 'break' | 'longBreak' | 'idle';
  timeRemaining: number;
  session: number;
  isPaused: boolean;
  startedAt?: Date;
}

export interface WhiteboardUpdateData {
  elements: any;
  appState: any;
  userId: string;
}

export interface SoundConfig {
  id: string;
  volume: number;
}
