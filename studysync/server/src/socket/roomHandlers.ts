import { Server as SocketServer, Socket } from 'socket.io';
import Room from '../models/Room.model';
import Message from '../models/Message.model';
import { 
  addRoomParticipant, 
  removeRoomParticipant, 
  getRoomParticipants,
  setUserPresence 
} from '../config/redis';

export const handleRoomEvents = (io: SocketServer, socket: any) => {
  
  // Join room
  socket.on('room:join', async (data: { roomId: string; password?: string }) => {
    try {
      const { roomId, password } = data;
      const userId = socket.userId;
      const username = socket.username;

      // Find room
      const room = await Room.findById(roomId);
      if (!room) {
        socket.emit('error', { message: 'Room not found' });
        return;
      }

      // Check if room is active
      if (room.status !== 'active') {
        socket.emit('error', { message: 'Room is not active' });
        return;
      }

      // Check password for private rooms
      if (!room.isPublic && room.password !== password) {
        socket.emit('error', { message: 'Incorrect password' });
        return;
      }

      // Check participant limit
      const participants = await getRoomParticipants(roomId);
      if (participants.length >= room.maxParticipants) {
        socket.emit('error', { message: 'Room is full' });
        return;
      }

      // Join socket room
      socket.join(roomId);

      // Add to Redis
      await addRoomParticipant(roomId, userId);
      await setUserPresence(userId, roomId);

      // Get last 50 messages
      const messages = await Message.find({ roomId })
        .sort({ createdAt: -1 })
        .limit(50)
        .populate('userId', 'username avatar');

      // Send room data to user
      socket.emit('room:joined', {
        room,
        participants: participants.map(id => ({ userId: id })),
        messages: messages.reverse(),
        timer: {
          phase: room.currentPhase,
          timeRemaining: 0, // Calculate from timerStartedAt
          session: room.currentSession,
          isPaused: room.isPaused,
        },
      });

      // Notify others
      socket.to(roomId).emit('room:user-joined', {
        user: {
          userId,
          username,
          avatar: '',
        },
      });

      // Create system message
      const systemMessage = await Message.create({
        roomId,
        userId,
        content: `${username} joined the room`,
        type: 'system',
      });

      io.to(roomId).emit('chat:message', systemMessage);

      console.log(`✅ ${username} joined room ${roomId}`);

    } catch (error) {
      console.error('Error joining room:', error);
      socket.emit('error', { message: 'Failed to join room' });
    }
  });

  // Leave room
  socket.on('room:leave', async (data: { roomId: string }) => {
    try {
      const { roomId } = data;
      const userId = socket.userId;
      const username = socket.username;

      // Leave socket room
      socket.leave(roomId);

      // Remove from Redis
      await removeRoomParticipant(roomId, userId);

      // Notify others
      socket.to(roomId).emit('room:user-left', { userId });

      // Create system message
      const systemMessage = await Message.create({
        roomId,
        userId,
        content: `${username} left the room`,
        type: 'system',
      });

      io.to(roomId).emit('chat:message', systemMessage);

      console.log(`❌ ${username} left room ${roomId}`);

    } catch (error) {
      console.error('Error leaving room:', error);
    }
  });

  // Update presence status
  socket.on('presence:status', async (data: { roomId: string; status: string }) => {
    try {
      const { roomId, status } = data;
      const userId = socket.userId;

      // Broadcast status update
      io.to(roomId).emit('presence:update', { userId, status });

      console.log(`👤 ${socket.username} status: ${status}`);

    } catch (error) {
      console.error('Error updating presence:', error);
    }
  });
};
