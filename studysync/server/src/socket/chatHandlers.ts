import { Server as SocketServer, Socket } from 'socket.io';
import Message from '../models/Message.model';

export const handleChatEvents = (io: SocketServer, socket: any) => {
  
  // Send message
  socket.on('chat:send', async (data: { roomId: string; content: string; type?: string }) => {
    try {
      const { roomId, content, type = 'text' } = data;
      const userId = socket.userId;
      const username = socket.username;

      // Validate content
      if (!content || content.trim().length === 0) {
        return;
      }

      if (content.length > 500) {
        socket.emit('error', { message: 'Message too long (max 500 characters)' });
        return;
      }

      // Create message
      const message = await Message.create({
        roomId,
        userId,
        content: content.trim(),
        type,
      });

      // Populate user data
      await message.populate('userId', 'username avatar');

      // Broadcast to room
      io.to(roomId).emit('chat:message', message);

      console.log(`💬 ${username} in room ${roomId}: ${content.substring(0, 50)}...`);

    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  // React to message
  socket.on('chat:react', async (data: { roomId: string; messageId: string; emoji: string }) => {
    try {
      const { roomId, messageId, emoji } = data;
      const userId = socket.userId;

      const message = await Message.findById(messageId);
      if (!message) {
        socket.emit('error', { message: 'Message not found' });
        return;
      }

      // Find existing reaction
      const reactionIndex = message.reactions.findIndex(r => r.emoji === emoji);

      if (reactionIndex >= 0) {
        // Toggle reaction
        const userIndex = message.reactions[reactionIndex].userIds.findIndex(
          id => id.toString() === userId
        );

        if (userIndex >= 0) {
          // Remove reaction
          message.reactions[reactionIndex].userIds.splice(userIndex, 1);
          
          // Remove reaction group if empty
          if (message.reactions[reactionIndex].userIds.length === 0) {
            message.reactions.splice(reactionIndex, 1);
          }
        } else {
          // Add reaction
          message.reactions[reactionIndex].userIds.push(userId);
        }
      } else {
        // Create new reaction
        message.reactions.push({
          emoji,
          userIds: [userId],
        });
      }

      await message.save();

      // Broadcast reaction update
      io.to(roomId).emit('chat:reaction', {
        messageId,
        reactions: message.reactions,
      });

    } catch (error) {
      console.error('Error reacting to message:', error);
    }
  });

  // Delete message
  socket.on('chat:delete', async (data: { roomId: string; messageId: string }) => {
    try {
      const { roomId, messageId } = data;
      const userId = socket.userId;

      const message = await Message.findById(messageId);
      if (!message) {
        socket.emit('error', { message: 'Message not found' });
        return;
      }

      // Check if user owns the message
      if (message.userId.toString() !== userId) {
        socket.emit('error', { message: 'You can only delete your own messages' });
        return;
      }

      message.isDeleted = true;
      message.content = '[deleted]';
      await message.save();

      // Broadcast deletion
      io.to(roomId).emit('chat:deleted', { messageId });

    } catch (error) {
      console.error('Error deleting message:', error);
    }
  });

  // Typing indicator
  socket.on('presence:typing', (data: { roomId: string }) => {
    const { roomId } = data;
    socket.to(roomId).emit('chat:typing', {
      userId: socket.userId,
      username: socket.username,
    });
  });
};
