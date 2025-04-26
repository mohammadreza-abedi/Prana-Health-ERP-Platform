import { useState, useEffect, useCallback, useRef, createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/lib/useAuth';
import { useToast } from '@/hooks/use-toast';

// Types for websocket messages
type MessageType = 
  | 'connection' 
  | 'auth' 
  | 'notification' 
  | 'health_update' 
  | 'health_data' 
  | 'challenge_progress' 
  | 'challenge_update' 
  | 'user_status' 
  | 'ping' 
  | 'pong' 
  | 'error';

interface WebSocketMessage {
  type: MessageType;
  [key: string]: any;
}

interface WebSocketContextType {
  isConnected: boolean;
  lastMessage: WebSocketMessage | null;
  sendMessage: (message: WebSocketMessage) => void;
  connectionError: string | null;
  // Specific methods for common operations
  sendHealthUpdate: (metric: any) => void;
  sendChallengeProgress: (challengeId: number, progress: number) => void;
  sendNotification: (targetUserId: number, message: string) => void;
  sendPing: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize WebSocket connection
  const connectWebSocket = useCallback(() => {
    try {
      // Clean up any existing connection
      if (socketRef.current) {
        socketRef.current.close();
      }

      // Clear any pending reconnects
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      // Determine WebSocket URL based on current protocol and host
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws`;
      
      // Create new WebSocket connection
      const socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      // Connection opened
      socket.addEventListener('open', () => {
        console.log('WebSocket connection established');
        setIsConnected(true);
        setConnectionError(null);
        
        // If user is authenticated, send auth message
        if (user) {
          socket.send(JSON.stringify({
            type: 'auth',
            userId: user.id,
            username: user.username
          }));
        }
      });

      // Connection closed
      socket.addEventListener('close', (event) => {
        console.log('WebSocket connection closed', event);
        setIsConnected(false);
        
        // Attempt to reconnect after delay
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('Attempting to reconnect...');
          connectWebSocket();
        }, 5000);
      });

      // Connection error
      socket.addEventListener('error', (error) => {
        console.error('WebSocket error:', error);
        setConnectionError('Connection error occurred');
        setIsConnected(false);
      });

      // Listen for messages
      socket.addEventListener('message', (event) => {
        try {
          const message = JSON.parse(event.data) as WebSocketMessage;
          console.log('Received WebSocket message:', message);
          setLastMessage(message);
          
          // Handle specific message types
          handleIncomingMessage(message);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      });
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      setConnectionError('Failed to establish connection');
    }
  }, [user]);

  // Handle incoming messages
  const handleIncomingMessage = useCallback((message: WebSocketMessage) => {
    switch (message.type) {
      case 'notification':
        // Display toast notification
        toast({
          title: `${message.sender || 'System'}`,
          description: message.message,
          variant: "info"
        });
        break;
        
      case 'health_data':
        // Handle incoming health data (for admin/HR users)
        console.log('Received health data:', message);
        break;
        
      case 'challenge_update':
        // Handle challenge updates
        toast({
          title: 'Challenge Update',
          description: `${message.username} made progress on a challenge!`,
          variant: "default"
        });
        break;
        
      case 'user_status':
        // Handle user status changes
        if (message.status === 'online') {
          toast({
            title: 'User Online',
            description: `${message.username} is now online`,
            variant: "success"
          });
        }
        break;
    }
  }, [toast]);

  // Send message to server
  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected, cannot send message');
      setConnectionError('Connection lost. Reconnecting...');
      
      // Try to reconnect
      connectWebSocket();
    }
  }, [connectWebSocket]);

  // Convenience methods for common operations
  const sendHealthUpdate = useCallback((metric: any) => {
    sendMessage({
      type: 'health_update',
      metric
    });
  }, [sendMessage]);

  const sendChallengeProgress = useCallback((challengeId: number, progress: number) => {
    sendMessage({
      type: 'challenge_progress',
      challengeId,
      progress
    });
  }, [sendMessage]);

  const sendNotification = useCallback((targetUserId: number, message: string) => {
    sendMessage({
      type: 'notification',
      targetUserId,
      message
    });
  }, [sendMessage]);

  const sendPing = useCallback(() => {
    sendMessage({
      type: 'ping',
      timestamp: new Date()
    });
  }, [sendMessage]);

  // Connect on mount and when user changes
  useEffect(() => {
    let mounted = true;
    
    // Initial connection
    if (mounted) {
      connectWebSocket();
    }
    
    // Set up ping interval to keep connection alive
    const pingInterval = setInterval(() => {
      if (isConnected && socketRef.current?.readyState === WebSocket.OPEN) {
        sendPing();
      }
    }, 30000); // 30 seconds
    
    // Cleanup on unmount
    return () => {
      mounted = false;
      
      if (socketRef.current) {
        socketRef.current.onclose = null; // Remove the auto-reconnect logic
        socketRef.current.close();
      }
      
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      
      clearInterval(pingInterval);
    };
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        isConnected,
        lastMessage,
        sendMessage,
        connectionError,
        sendHealthUpdate,
        sendChallengeProgress,
        sendNotification,
        sendPing
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
}