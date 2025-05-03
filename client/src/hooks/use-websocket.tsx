import { useState, useEffect, useCallback, useRef, createContext, useContext, ReactNode } from 'react';
// Comment out useAuth to prevent API requests
// import { useAuth } from '../lib/useAuth';
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

// Simplified WebSocket Provider
export function WebSocketProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  // Mock user data instead of using useAuth
  const user = { id: 1, username: 'demo_user' };
  const { toast } = useToast();
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const maxRetries = 3;
  const [retryCount, setRetryCount] = useState(0);

  // Initialize or reconnect WebSocket
  const connectWebSocket = useCallback(() => {
    try {
      // Check if we've tried too many times
      if (retryCount >= maxRetries) {
        setConnectionError("پیش نمایش در حال حاضر در دسترس نیست. لطفا صفحه را رفرش کنید.");
        return;
      }
      
      // Clean up existing connection
      if (socketRef.current) {
        socketRef.current.onclose = null;
        socketRef.current.onerror = null;
        socketRef.current.onmessage = null;
        socketRef.current.onopen = null;
        socketRef.current.close();
        socketRef.current = null;
      }
      
      // Cancel any pending reconnect
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      
      // Create new connection
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws?t=${Date.now()}`;
      
      console.log(`Connecting to WebSocket (attempt ${retryCount + 1}/${maxRetries})...`);
      const socket = new WebSocket(wsUrl);
      socketRef.current = socket;
      
      // Set up event handlers
      socket.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setConnectionError(null);
        setRetryCount(0); // Reset retry count on success
        
        // Authenticate if user is logged in
        if (user) {
          sendAuthMessage();
        }
      };
      
      socket.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        
        // Try to reconnect after delay
        reconnectTimeoutRef.current = setTimeout(() => {
          setRetryCount(prev => prev + 1);
          connectWebSocket();
        }, 3000);
      };
      
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
      
      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log('WebSocket message received:', message.type);
          setLastMessage(message);
          handleMessage(message);
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
      setConnectionError('Connection failed');
    }
  }, [user, retryCount]);
  
  // Send authentication message
  const sendAuthMessage = useCallback(() => {
    if (user && socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      try {
        socketRef.current.send(JSON.stringify({
          type: 'auth',
          userId: user.id,
          username: user.username
        }));
      } catch (error) {
        console.error('Failed to send auth message:', error);
      }
    }
  }, [user]);
  
  // Handle incoming messages
  const handleMessage = useCallback((message: WebSocketMessage) => {
    switch (message.type) {
      case 'notification':
        toast({
          title: message.sender || 'سیستم',
          description: message.message,
          variant: "default"
        });
        break;
        
      case 'health_data':
        // Just log in this simplified version
        console.log('Health data received:', message);
        break;
        
      case 'challenge_update':
        toast({
          title: 'بروزرسانی چالش',
          description: `${message.username} در یک چالش پیشرفت کرد!`,
          variant: "default"
        });
        break;
        
      case 'user_status':
        if (message.status === 'online') {
          toast({
            title: 'کاربر آنلاین',
            description: `${message.username} اکنون آنلاین است`,
            variant: "default"
          });
        }
        break;
    }
  }, [toast]);
  
  // Generic message sender
  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      try {
        socketRef.current.send(JSON.stringify(message));
      } catch (error) {
        console.error('Failed to send message:', error);
        // Try to reconnect
        connectWebSocket();
      }
    } else {
      console.warn('WebSocket not connected, cannot send message');
      connectWebSocket();
    }
  }, [connectWebSocket]);
  
  // Convenience methods for specific message types
  const sendHealthUpdate = useCallback((metric: any) => {
    sendMessage({ type: 'health_update', metric });
  }, [sendMessage]);
  
  const sendChallengeProgress = useCallback((challengeId: number, progress: number) => {
    sendMessage({ type: 'challenge_progress', challengeId, progress });
  }, [sendMessage]);
  
  const sendNotification = useCallback((targetUserId: number, message: string) => {
    sendMessage({ type: 'notification', targetUserId, message });
  }, [sendMessage]);
  
  const sendPing = useCallback(() => {
    sendMessage({ type: 'ping', timestamp: new Date() });
  }, [sendMessage]);
  
  // Connect when component mounts
  useEffect(() => {
    // اتصال وب‌سوکت کاملاً غیرفعال شده است تا برنامه بدون خطا بارگذاری شود
    console.log('WebSocket functionality is disabled to prevent connection errors');
    
    // No connection attempted, no ping interval
    return () => {
      // No cleanup needed since we're not connecting
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);
  
  // Reconnect when user changes
  useEffect(() => {
    if (user && isConnected) {
      sendAuthMessage();
    }
  }, [user, isConnected, sendAuthMessage]);
  
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