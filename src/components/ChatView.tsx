
import { useRef, useState, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Chat, currentUser, Message, User } from "@/data/chats";
import { Phone, Video, MoreVertical, Smile, Paperclip, Send, ArrowLeft } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface ChatViewProps {
  chat: Chat;
  onBack: () => void;
}

export function ChatView({ chat, onBack }: ChatViewProps) {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(chat.messages);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const otherParticipant = chat.participants.find(
    (p) => p.id !== currentUser.id
  ) as User;

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };
    
    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const statusText = () => {
    if (otherParticipant.status === 'online') {
      return 'online';
    } else if (otherParticipant.status === 'away') {
      return 'away';
    } else {
      return `last seen ${otherParticipant.lastSeen}`;
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="bg-card p-3 border-b flex items-center gap-3">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-1">
            <ArrowLeft size={20} />
          </Button>
        )}
        
        <Avatar className="h-10 w-10">
          <img
            src={otherParticipant.avatar}
            alt={otherParticipant.name}
            className="object-cover"
          />
        </Avatar>
        
        <div className="flex-1">
          <div className="font-medium">{otherParticipant.name}</div>
          <div className="text-xs text-muted-foreground">{statusText()}</div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="flex flex-col gap-3">
          {messages.map((message, index) => (
            <div 
              key={message.id}
              className={cn(
                "animate-slide-in opacity-0",
                { "self-end": message.senderId === currentUser.id, "self-start": message.senderId !== currentUser.id }
              )}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ChatMessage 
                message={message} 
                isFromMe={message.senderId === currentUser.id} 
              />
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-3 bg-card border-t">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Smile className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full pr-12"
            />
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 -translate-y-1/2 text-primary"
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ""}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
