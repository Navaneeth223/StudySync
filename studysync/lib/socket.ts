import { io, Socket } from 'socket.io-client';
import type { 
  ServerToClientEvents, 
  ClientToServerEvents 
} from '@/types/socket.types';

class SocketClient {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  /**
   * Initialize Socket.io connection
   * @param token - JWT authentication token
   */
  connect(token: string): Socket<ServerToClientEvents, ClientToServerEvents> {
    if (this.socket?.connected) {
      return this.socket;
    }

    const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';

    this.socket = io(SOCKET_URL, {
      auth: { token },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: this.maxReconnectAttempts,
      timeout: 20000,
    });

    // Connection event handlers
    this.socket.on('connect', () => {
      console.log('✅ Socket.io connected:', this.socket?.id);
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Socket.io disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket.io connection error:', error.message);
      this.reconnectAttempts++;
      
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('Max reconnection attempts reached');
      }
    });

    this.socket.on('error', (error: any) => {
      console.error('Socket.io error:', error);
    });

    return this.socket;
  }

  /**
   * Get the current socket instance
   */
  getSocket(): Socket<ServerToClientEvents, ClientToServerEvents> | null {
    return this.socket;
  }

  /**
   * Check if socket is connected
   */
  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  /**
   * Disconnect socket
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  /**
   * Emit event with type safety
   */
  emit<K extends keyof ClientToServerEvents>(
    event: K,
    data: Parameters<ClientToServerEvents[K]>[0]
  ): void {
    if (this.socket?.connected) {
      this.socket.emit(event, data as any);
    } else {
      console.warn('Socket not connected. Cannot emit:', event);
    }
  }

  /**
   * Listen to event with type safety
   */
  on<K extends keyof ServerToClientEvents>(
    event: K,
    callback: ServerToClientEvents[K]
  ): void {
    if (this.socket) {
      this.socket.on(event, callback as any);
    }
  }

  /**
   * Remove event listener
   */
  off<K extends keyof ServerToClientEvents>(
    event: K,
    callback?: ServerToClientEvents[K]
  ): void {
    if (this.socket) {
      if (callback) {
        this.socket.off(event, callback as any);
      } else {
        this.socket.off(event);
      }
    }
  }
}

// Export singleton instance
export const socketClient = new SocketClient();

// Export type-safe socket instance getter
export const getSocket = () => socketClient.getSocket();
