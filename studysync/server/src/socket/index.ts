import { Server as SocketServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { createAdapter } from '@socket.io/redis-adapter';
import { getRedisClient } from '../config/redis';
import jwt from 'jsonwebtoken';

// Socket event handlers
import { handleRoomEvents } from './roomHandlers';
import { handleTimerEvents } from './timerHandlers';
import { handleChatEvents } from './chatHandlers';

export interface AuthSocket extends SocketServer {
  userId?: string;
  username?: string;
}

export const initializeSocket = (httpServer: HTTPServer): SocketServer => {
  const io = new SocketServer(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  // Redis adapter for scaling across multiple servers
  try {
    const redisClient = getRedisClient();
    const pubClient = redisClient;
    const subClient = pubClient.duplicate();
    
    io.adapter(createAdapter(pubClient, subClient));
    console.log('✅ Socket.io Redis adapter configured');
  } catch (error) {
    console.warn('⚠️  Socket.io running without Redis adapter');
  }

  // Authentication middleware
  io.use((socket: any, next) => {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
      socket.userId = decoded.userId;
      socket.username = decoded.username;
      next();
    } catch (error) {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  // Connection handler
  io.on('connection', (socket: any) => {
    console.log(`✅ User connected: ${socket.username} (${socket.id})`);

    // Register event handlers
    handleRoomEvents(io, socket);
    handleTimerEvents(io, socket);
    handleChatEvents(io, socket);

    // Disconnect handler
    socket.on('disconnect', () => {
      console.log(`❌ User disconnected: ${socket.username} (${socket.id})`);
    });

    // Error handler
    socket.on('error', (error: Error) => {
      console.error(`Socket error for ${socket.username}:`, error);
    });
  });

  return io;
};
