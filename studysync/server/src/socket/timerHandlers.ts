import { Server as SocketServer, Socket } from 'socket.io';
import Room from '../models/Room.model';
import { setRoomState, getRoomState } from '../config/redis';

export const handleTimerEvents = (io: SocketServer, socket: any) => {
  
  // Start timer
  socket.on('timer:start', async (data: { roomId: string; phase: string }) => {
    try {
      const { roomId, phase } = data;
      const userId = socket.userId;

      const room = await Room.findById(roomId);
      if (!room) {
        socket.emit('error', { message: 'Room not found' });
        return;
      }

      // Check if user is room creator (for synced mode)
      if (room.pomodoroConfig.syncMode === 'synced' && room.createdBy.toString() !== userId) {
        socket.emit('error', { message: 'Only room creator can control synced timer' });
        return;
      }

      // Update room state
      room.currentPhase = phase as any;
      room.timerStartedAt = new Date();
      room.isPaused = false;
      if (phase === 'focus') {
        room.currentSession += 1;
      }
      await room.save();

      // Cache in Redis
      await setRoomState(roomId, {
        phase,
        startedAt: room.timerStartedAt,
        session: room.currentSession,
        isPaused: false,
      });

      // Broadcast to room
      io.to(roomId).emit('timer:sync', {
        phase,
        timeRemaining: phase === 'focus' 
          ? room.pomodoroConfig.focusDuration * 60 
          : room.pomodoroConfig.breakDuration * 60,
        session: room.currentSession,
        isPaused: false,
        startedAt: room.timerStartedAt,
      });

      console.log(`⏱️  Timer started in room ${roomId}: ${phase}`);

    } catch (error) {
      console.error('Error starting timer:', error);
      socket.emit('error', { message: 'Failed to start timer' });
    }
  });

  // Pause timer
  socket.on('timer:pause', async (data: { roomId: string }) => {
    try {
      const { roomId } = data;
      const userId = socket.userId;

      const room = await Room.findById(roomId);
      if (!room) return;

      if (room.pomodoroConfig.syncMode === 'synced' && room.createdBy.toString() !== userId) {
        socket.emit('error', { message: 'Only room creator can control synced timer' });
        return;
      }

      room.isPaused = true;
      room.timerPausedAt = new Date();
      await room.save();

      io.to(roomId).emit('timer:sync', {
        phase: room.currentPhase,
        timeRemaining: 0, // Calculate based on elapsed time
        session: room.currentSession,
        isPaused: true,
        startedAt: room.timerStartedAt,
      });

      console.log(`⏸️  Timer paused in room ${roomId}`);

    } catch (error) {
      console.error('Error pausing timer:', error);
    }
  });

  // Resume timer
  socket.on('timer:resume', async (data: { roomId: string }) => {
    try {
      const { roomId } = data;
      const userId = socket.userId;

      const room = await Room.findById(roomId);
      if (!room) return;

      if (room.pomodoroConfig.syncMode === 'synced' && room.createdBy.toString() !== userId) {
        socket.emit('error', { message: 'Only room creator can control synced timer' });
        return;
      }

      room.isPaused = false;
      room.timerStartedAt = new Date();
      await room.save();

      io.to(roomId).emit('timer:sync', {
        phase: room.currentPhase,
        timeRemaining: 0, // Calculate remaining time
        session: room.currentSession,
        isPaused: false,
        startedAt: room.timerStartedAt,
      });

      console.log(`▶️  Timer resumed in room ${roomId}`);

    } catch (error) {
      console.error('Error resuming timer:', error);
    }
  });

  // Skip phase
  socket.on('timer:skip', async (data: { roomId: string }) => {
    try {
      const { roomId } = data;
      const userId = socket.userId;

      const room = await Room.findById(roomId);
      if (!room) return;

      if (room.pomodoroConfig.syncMode === 'synced' && room.createdBy.toString() !== userId) {
        socket.emit('error', { message: 'Only room creator can control synced timer' });
        return;
      }

      // Determine next phase
      let nextPhase: string;
      if (room.currentPhase === 'focus') {
        if (room.currentSession >= room.pomodoroConfig.sessionsBeforeLongBreak) {
          nextPhase = 'longBreak';
          room.currentSession = 0;
        } else {
          nextPhase = 'break';
        }
      } else {
        nextPhase = 'idle';
      }

      room.currentPhase = nextPhase as any;
      await room.save();

      io.to(roomId).emit('timer:phase-change', {
        newPhase: nextPhase,
        session: room.currentSession,
      });

      console.log(`⏭️  Timer skipped in room ${roomId} to ${nextPhase}`);

    } catch (error) {
      console.error('Error skipping timer:', error);
    }
  });

  // Reset timer
  socket.on('timer:reset', async (data: { roomId: string }) => {
    try {
      const { roomId } = data;
      const userId = socket.userId;

      const room = await Room.findById(roomId);
      if (!room) return;

      if (room.createdBy.toString() !== userId) {
        socket.emit('error', { message: 'Only room creator can reset timer' });
        return;
      }

      room.currentPhase = 'idle';
      room.currentSession = 0;
      room.isPaused = false;
      room.timerStartedAt = undefined;
      await room.save();

      io.to(roomId).emit('timer:sync', {
        phase: 'idle',
        timeRemaining: 0,
        session: 0,
        isPaused: false,
      });

      console.log(`🔄 Timer reset in room ${roomId}`);

    } catch (error) {
      console.error('Error resetting timer:', error);
    }
  });
};
