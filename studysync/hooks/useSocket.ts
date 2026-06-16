import { useEffect, useState } from 'react';
import { socketClient } from '@/lib/socket';
import type { Socket } from 'socket.io-client';
import type { ServerToClientEvents, ClientToServerEvents } from '@/types/socket.types';

/**
 * React hook for Socket.io connection
 * Automatically connects on mount and disconnects on unmount
 */
export function useSocket(token?: string) {
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Only connect if we have a token
    if (!token) {
      return;
    }

    setIsConnecting(true);

    // Connect to Socket.io
    const socketInstance = socketClient.connect(token);
    setSocket(socketInstance);

    // Connection status handlers
    const handleConnect = () => {
      setIsConnected(true);
      setIsConnecting(false);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      setIsConnecting(false);
    };

    const handleConnectError = () => {
      setIsConnecting(false);
    };

    socketInstance.on('connect', handleConnect);
    socketInstance.on('disconnect', handleDisconnect);
    socketInstance.on('connect_error', handleConnectError);

    // Cleanup on unmount
    return () => {
      socketInstance.off('connect', handleConnect);
      socketInstance.off('disconnect', handleDisconnect);
      socketInstance.off('connect_error', handleConnectError);
      
      // Note: We don't disconnect here to allow persistent connections
      // across component remounts. Call socketClient.disconnect() explicitly
      // when user logs out.
    };
  }, [token]);

  return {
    socket,
    isConnected,
    isConnecting,
    emit: socketClient.emit.bind(socketClient),
    on: socketClient.on.bind(socketClient),
    off: socketClient.off.bind(socketClient),
  };
}
