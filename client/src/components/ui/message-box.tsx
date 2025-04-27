import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  MoreHorizontal, 
  Search, 
  PlusCircle, 
  Send, 
  User, 
  Users, 
  Image, 
  File, 
  Paperclip, 
  Mic, 
  Smile, 
  X,
  Check,
  CheckCheck,
  ArrowDown,
  Filter,
  Settings,
  Phone,
  Video,
  Pin,
  Star,
  Archive,
  ChevronRight,
  ChevronLeft,
  Loader2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface User {
  id: string;
  name: string;
  avatar?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  department?: string;
  lastSeen?: Date;
  isTyping?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  attachments?: Array<{
    id: string;
    type: 'image' | 'file' | 'voice';
    url: string;
    name?: string;
    size?: number;
  }>;
}

export interface Conversation {
  id: string;
  participants: User[];
  messages: Message[];
  unreadCount: number;
  lastMessageAt: Date;
  isPinned?: boolean;
  isGroup?: boolean;
  groupName?: string;
  groupAvatar?: string;
}

interface MessageBoxProps {
  conversations: Conversation[];
  currentUser: User;
  onSendMessage: (conversationId: string, content: string, attachments?: any[]) => void;
  onMarkAsRead: (conversationId: string) => void;
  onCreateConversation: (participants: string[]) => void;
}

// Format relative time
const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Less than a minute
  if (diff < 60) return 'همین الان';
  
  // Less than an hour
  if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} دقیقه پیش`;
  }
  
  // Less than a day
  if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} ساعت پیش`;
  }
  
  // Less than a week
  if (diff < 604800) {
    const days = Math.floor(diff / 86400);
    return `${days} روز پیش`;
  }
  
  // Format as date
  const day = date.getDate();
  const month = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'][date.getMonth()];
  return `${day} ${month}`;
};

// Format message time
const formatMessageTime = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'ب.ظ' : 'ق.ظ';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  
  return `${hours}:${minutesStr} ${ampm}`;
};

// Get user status color
const getStatusColor = (status?: 'online' | 'offline' | 'away' | 'busy'): string => {
  switch(status) {
    case 'online': return 'bg-green-500';
    case 'away': return 'bg-yellow-500';
    case 'busy': return 'bg-red-500';
    case 'offline': return 'bg-gray-400';
    default: return 'bg-gray-400';
  }
};

// Conversation list item component
const ConversationItem = ({ 
  conversation, 
  currentUser, 
  isActive,
  onClick,
}: { 
  conversation: Conversation;
  currentUser: User;
  isActive: boolean;
  onClick: () => void;
}) => {
  // Get other participant in direct conversations
  const otherParticipant = conversation.isGroup 
    ? null
    : conversation.participants.find(p => p.id !== currentUser.id);
  
  // Get last message
  const lastMessage = conversation.messages.length > 0 
    ? conversation.messages[conversation.messages.length - 1] 
    : null;
  
  // Get display name and avatar
  const displayName = conversation.isGroup 
    ? conversation.groupName || 'گروه'
    : otherParticipant?.name || 'ناشناس';
  
  const avatarSrc = conversation.isGroup
    ? conversation.groupAvatar
    : otherParticipant?.avatar;
  
  // Check if any participant is typing
  const isAnyoneTyping = conversation.participants.some(p => p.isTyping && p.id !== currentUser.id);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex items-center p-3 cursor-pointer transition-all gap-3 rounded-xl",
        isActive 
          ? "bg-tiffany/10 dark:bg-tiffany/20"
          : "hover:bg-slate-100 dark:hover:bg-slate-800"
      )}
      onClick={onClick}
    >
      {/* Avatar */}
      <div className="relative">
        <Avatar className="h-10 w-10">
          {avatarSrc ? (
            <img src={avatarSrc} alt={displayName} />
          ) : (
            <div className="h-10 w-10 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
              {conversation.isGroup ? (
                <Users className="h-5 w-5" />
              ) : (
                displayName.charAt(0)
              )}
            </div>
          )}
        </Avatar>
        
        {/* Status indicator for direct messages */}
        {!conversation.isGroup && otherParticipant?.status && (
          <span className={cn(
            "absolute bottom-0 left-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900",
            getStatusColor(otherParticipant.status)
          )}></span>
        )}
        
        {/* Group participants count */}
        {conversation.isGroup && (
          <span className="absolute bottom-0 left-0 w-4 h-4 rounded-full bg-slate-700 text-white text-[10px] flex items-center justify-center border-2 border-white dark:border-slate-900">
            {conversation.participants.length}
          </span>
        )}
      </div>
      
      {/* Conversation details */}
      <div className="flex-grow min-w-0">
        <div className="flex items-center justify-between">
          <h3 className={cn(
            "font-medium text-sm truncate",
            conversation.unreadCount > 0 ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"
          )}>
            {displayName}
          </h3>
          <span className="text-xs text-slate-500 whitespace-nowrap flex-shrink-0">
            {lastMessage ? formatRelativeTime(lastMessage.timestamp) : ''}
          </span>
        </div>
        
        <div className="flex items-center justify-between mt-1">
          <p className={cn(
            "text-xs truncate max-w-[150px]",
            isAnyoneTyping ? "text-tiffany italic" : "text-slate-500 dark:text-slate-400",
            conversation.unreadCount > 0 ? "font-medium" : "font-normal"
          )}>
            {isAnyoneTyping ? (
              <>در حال نوشتن<span className="inline-flex">...</span></>
            ) : lastMessage ? (
              lastMessage.senderId === currentUser.id ? (
                <span className="flex items-center gap-1">
                  {lastMessage.status === 'read' ? (
                    <CheckCheck className="h-3 w-3 text-tiffany" />
                  ) : lastMessage.status === 'delivered' ? (
                    <CheckCheck className="h-3 w-3" />
                  ) : (
                    <Check className="h-3 w-3" />
                  )}
                  {lastMessage.content}
                </span>
              ) : (
                lastMessage.content
              )
            ) : (
              "بدون پیام"
            )}
          </p>
          
          {/* Unread badge or pinned indicator */}
          <div className="flex items-center gap-1">
            {conversation.isPinned && (
              <Pin className="h-3 w-3 text-slate-400" />
            )}
            
            {conversation.unreadCount > 0 && (
              <Badge variant="default" className="h-5 min-w-5 flex items-center justify-center bg-tiffany text-white">
                {conversation.unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Message bubble component
const MessageBubble = ({ 
  message, 
  isSender, 
  showAvatar, 
  senderInfo 
}: { 
  message: Message; 
  isSender: boolean;
  showAvatar: boolean;
  senderInfo?: User;
}) => {
  return (
    <div className={cn(
      "flex mb-2",
      isSender ? "justify-end" : "justify-start"
    )}>
      {/* Receiver avatar */}
      {!isSender && showAvatar && (
        <div className="ml-2 flex-shrink-0">
          <Avatar className="h-8 w-8">
            {senderInfo?.avatar ? (
              <img src={senderInfo.avatar} alt={senderInfo.name} />
            ) : (
              <div className="h-8 w-8 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                {senderInfo?.name.charAt(0) || <User className="h-4 w-4" />}
              </div>
            )}
          </Avatar>
        </div>
      )}
      
      <div className={cn(
        "max-w-[80%]",
      )}>
        {/* Message container */}
        <div className={cn(
          "p-3 rounded-2xl text-sm shadow-sm",
          isSender 
            ? "bg-tiffany text-white rounded-br-none" 
            : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200 dark:border-slate-700"
        )}>
          {message.content}
          
          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.attachments.map(attachment => (
                <div key={attachment.id} className="rounded-lg overflow-hidden">
                  {attachment.type === 'image' ? (
                    <img src={attachment.url} alt="تصویر" className="w-full h-auto max-h-[200px] object-cover" />
                  ) : attachment.type === 'file' ? (
                    <div className="flex items-center bg-slate-100 dark:bg-slate-700 p-2 rounded-lg">
                      <File className="h-5 w-5 ml-2 text-slate-500" />
                      <div className="overflow-hidden">
                        <p className="text-xs truncate">{attachment.name}</p>
                        <p className="text-xs text-slate-500">
                          {attachment.size ? `${Math.round(attachment.size / 1024)} KB` : ''}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center bg-slate-100 dark:bg-slate-700 p-2 rounded-lg">
                      <Mic className="h-5 w-5 ml-2 text-slate-500" />
                      <p className="text-xs">پیام صوتی</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Message meta */}
        <div className={cn(
          "flex items-center mt-1 text-xs text-slate-500",
          isSender ? "justify-end" : "justify-start"
        )}>
          <span>{formatMessageTime(message.timestamp)}</span>
          
          {/* Delivery status */}
          {isSender && (
            <span className="mr-1">
              {message.status === 'read' ? (
                <CheckCheck className="h-3 w-3 text-tiffany" />
              ) : message.status === 'delivered' ? (
                <CheckCheck className="h-3 w-3" />
              ) : (
                <Check className="h-3 w-3" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Active conversation header
const ConversationHeader = ({ 
  conversation, 
  currentUser,
  onBack
}: { 
  conversation: Conversation; 
  currentUser: User;
  onBack: () => void;
}) => {
  const otherParticipant = !conversation.isGroup 
    ? conversation.participants.find(p => p.id !== currentUser.id)
    : null;
  
  const displayName = conversation.isGroup 
    ? conversation.groupName || 'گروه' 
    : otherParticipant?.name || 'ناشناس';
  
  const avatarSrc = conversation.isGroup 
    ? conversation.groupAvatar 
    : otherParticipant?.avatar;
  
  const status = !conversation.isGroup ? otherParticipant?.status : undefined;
  
  // Get status text
  const getStatusText = () => {
    if (conversation.isGroup) {
      const onlineCount = conversation.participants.filter(p => p.status === 'online').length;
      return `${conversation.participants.length} عضو، ${onlineCount} آنلاین`;
    }
    
    if (!otherParticipant) return '';
    
    if (otherParticipant.isTyping) return 'در حال نوشتن...';
    
    switch(status) {
      case 'online': return 'آنلاین';
      case 'away': return 'غایب';
      case 'busy': return 'مشغول';
      case 'offline': 
        return otherParticipant.lastSeen 
          ? `آخرین بازدید ${formatRelativeTime(otherParticipant.lastSeen)}`
          : 'آفلاین';
      default: return '';
    }
  };
  
  return (
    <div className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden">
          <ChevronRight className="h-5 w-5" />
        </button>
        
        <div className="relative">
          <Avatar className="h-10 w-10">
            {avatarSrc ? (
              <img src={avatarSrc} alt={displayName} />
            ) : (
              <div className="h-10 w-10 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                {conversation.isGroup ? (
                  <Users className="h-5 w-5" />
                ) : (
                  displayName.charAt(0)
                )}
              </div>
            )}
          </Avatar>
          
          {/* Status indicator for direct messages */}
          {!conversation.isGroup && status && (
            <span className={cn(
              "absolute bottom-0 left-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900",
              getStatusColor(status)
            )}></span>
          )}
        </div>
        
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {displayName}
          </h3>
          <p className="text-xs text-slate-500">
            {getStatusText()}
          </p>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex items-center gap-1">
        {!conversation.isGroup && (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                    <Phone className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>تماس صوتی</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                    <Video className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>تماس تصویری</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                <Search className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>جستجو در مکالمه</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl p-1">
            <DropdownMenuItem className="rounded-lg cursor-pointer">
              {conversation.isPinned ? (
                <>
                  <Pin className="h-4 w-4 ml-2" />
                  <span>حذف از پین شده‌ها</span>
                </>
              ) : (
                <>
                  <Pin className="h-4 w-4 ml-2" />
                  <span>پین کردن مکالمه</span>
                </>
              )}
            </DropdownMenuItem>
            
            <DropdownMenuItem className="rounded-lg cursor-pointer">
              <Star className="h-4 w-4 ml-2" />
              <span>علامت‌گذاری</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="rounded-lg cursor-pointer">
              <Archive className="h-4 w-4 ml-2" />
              <span>بایگانی مکالمه</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="rounded-lg cursor-pointer">
              <Settings className="h-4 w-4 ml-2" />
              <span>تنظیمات مکالمه</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

// Main MessageBox component
const MessageBox: React.FC<MessageBoxProps> = ({
  conversations,
  currentUser,
  onSendMessage,
  onMarkAsRead,
  onCreateConversation
}) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [showConversation, setShowConversation] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get sorted conversations
  const getSortedConversations = () => {
    // First sort by pinned status
    const sorted = [...conversations].sort((a, b) => {
      // Pinned conversations first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      
      // Then by last message timestamp
      return b.lastMessageAt.getTime() - a.lastMessageAt.getTime();
    });
    
    // Then filter based on active tab and search query
    return sorted.filter(conv => {
      // Filter by tab
      if (activeTab === 'unread' && conv.unreadCount === 0) return false;
      if (activeTab === 'groups' && !conv.isGroup) return false;
      if (activeTab === 'direct' && conv.isGroup) return false;
      
      // Filter by search query
      if (searchQuery) {
        const participantNames = conv.participants
          .map(p => p.name.toLowerCase())
          .join(' ');
        
        const groupName = conv.groupName?.toLowerCase() || '';
        
        return participantNames.includes(searchQuery.toLowerCase()) || 
               groupName.includes(searchQuery.toLowerCase());
      }
      
      return true;
    });
  };
  
  const sortedConversations = getSortedConversations();
  
  // Get total unread count
  const totalUnreadCount = conversations.reduce(
    (total, conv) => total + conv.unreadCount, 
    0
  );
  
  // Get current conversation
  const currentConversation = conversations.find(c => c.id === activeConversation);
  
  // Handle opening a conversation
  const handleOpenConversation = (conversationId: string) => {
    setActiveConversation(conversationId);
    setShowConversation(true);
    onMarkAsRead(conversationId);
  };
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (!message.trim() || !activeConversation) return;
    
    onSendMessage(activeConversation, message);
    setMessage('');
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages]);
  
  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } }
  };
  
  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 relative"
            >
              <MessageSquare className="h-5 w-5" />
              {totalUnreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-tiffany text-white text-[10px] flex items-center justify-center font-semibold">
                  {totalUnreadCount}
                </span>
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>صندوق پیام‌ها</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/20 dark:bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed left-0 top-0 right-0 bottom-0 md:absolute md:left-auto md:top-auto md:bottom-auto md:right-0 md:mt-2 z-50 w-full md:w-[700px] md:h-[500px] bg-white dark:bg-slate-900 md:rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Two-column layout */}
            <div className="flex h-full">
              {/* Conversation list - hidden on mobile when showing a conversation */}
              <div className={cn(
                "w-full md:w-1/3 border-r border-slate-200 dark:border-slate-800 flex flex-col",
                showConversation ? "hidden md:flex" : "flex"
              )}>
                {/* Header */}
                <div className="p-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-semibold flex items-center">
                      <MessageSquare className="h-4 w-4 ml-2" />
                      پیام‌ها
                    </h2>
                    <div className="flex items-center gap-1">
                      <Button
                        onClick={() => setShowConversation(false)} 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 rounded-full md:hidden"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                              <Filter className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p>فیلتر پیام‌ها</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p>تنظیمات پیام‌ها</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                              <PlusCircle className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p>پیام جدید</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="جستجوی مکالمات..."
                      className="pr-10 border-slate-200 dark:border-slate-700 rounded-xl h-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Tab navigation */}
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="px-3 pt-3">
                  <TabsList className="grid grid-cols-3 h-8">
                    <TabsTrigger value="all" className="text-xs rounded-md">همه</TabsTrigger>
                    <TabsTrigger value="unread" className="text-xs rounded-md">
                      نخوانده
                      {totalUnreadCount > 0 && (
                        <span className="mr-1 bg-tiffany text-white text-[10px] rounded-full px-1.5">
                          {totalUnreadCount}
                        </span>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="groups" className="text-xs rounded-md">گروه‌ها</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                {/* Conversation list */}
                <ScrollArea className="flex-grow px-3 py-2">
                  {sortedConversations.length > 0 ? (
                    <div className="space-y-1">
                      {sortedConversations.map(conversation => (
                        <ConversationItem
                          key={conversation.id}
                          conversation={conversation}
                          currentUser={currentUser}
                          isActive={conversation.id === activeConversation}
                          onClick={() => handleOpenConversation(conversation.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-32 p-4 text-slate-500">
                      <MessageSquare className="h-10 w-10 mb-2 opacity-20" />
                      {searchQuery ? (
                        <p className="text-sm text-center">هیچ مکالمه‌ای با این جستجو یافت نشد</p>
                      ) : (
                        activeTab === 'unread' ? (
                          <p className="text-sm text-center">پیام نخوانده‌ای ندارید</p>
                        ) : (
                          <p className="text-sm text-center">پیامی وجود ندارد</p>
                        )
                      )}
                    </div>
                  )}
                </ScrollArea>
              </div>
              
              {/* Conversation view - shown when a conversation is selected */}
              <div className={cn(
                "flex-grow flex flex-col h-full",
                !showConversation ? "hidden md:flex" : "flex"
              )}>
                {currentConversation ? (
                  <>
                    {/* Conversation header */}
                    <ConversationHeader
                      conversation={currentConversation}
                      currentUser={currentUser}
                      onBack={() => setShowConversation(false)}
                    />
                    
                    {/* Messages */}
                    <ScrollArea className="flex-grow p-4">
                      {currentConversation.messages.length > 0 ? (
                        <div>
                          {currentConversation.messages.map((message, index) => {
                            const isSender = message.senderId === currentUser.id;
                            const showAvatar = index === 0 || 
                              currentConversation.messages[index - 1].senderId !== message.senderId;
                            
                            // Get sender info for group chats
                            const senderInfo = currentConversation.participants.find(
                              p => p.id === message.senderId
                            );
                            
                            return (
                              <MessageBubble
                                key={message.id}
                                message={message}
                                isSender={isSender}
                                showAvatar={showAvatar && !isSender}
                                senderInfo={senderInfo}
                              />
                            );
                          })}
                          <div ref={messagesEndRef} />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-500">
                          <MessageSquare className="h-16 w-16 mb-3 opacity-10" />
                          <p className="text-base">شروع مکالمه</p>
                          <p className="text-sm mt-1">اولین پیام خود را بنویسید</p>
                        </div>
                      )}
                    </ScrollArea>
                    
                    {/* Message input */}
                    <div className="p-3 border-t border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
                        <Input
                          placeholder="پیام خود را بنویسید..."
                          className="flex-grow border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                        
                        <div className="flex items-center gap-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                  <Smile className="h-4 w-4 text-slate-500" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                <p>ایموجی</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                  <Paperclip className="h-4 w-4 text-slate-500" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                <p>پیوست فایل</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <Button 
                            onClick={handleSendMessage}
                            disabled={!message.trim()}
                            className="rounded-full h-8 w-8 p-0 bg-tiffany hover:bg-tiffany/90 text-white"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500">
                    <MessageSquare className="h-20 w-20 mb-4 opacity-10" />
                    <h3 className="text-lg font-medium mb-2">پیام‌های شما</h3>
                    <p className="text-sm mb-4 text-center max-w-xs">
                      برای شروع مکالمه، یکی از گفتگوهای موجود را انتخاب کنید یا مکالمه جدیدی را آغاز کنید
                    </p>
                    <Button 
                      onClick={() => {
                        // Initiate new conversation process
                        // This is a placeholder; you'd typically show a modal for user selection
                        onCreateConversation([]);
                      }}
                      className="rounded-full"
                    >
                      <PlusCircle className="h-4 w-4 ml-2" />
                      شروع مکالمه جدید
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessageBox;