
import { Avatar } from "@/components/ui/avatar";
import { Chat, currentUser, User } from "@/data/chats";
import { cn } from "@/lib/utils";

interface ChatPreviewProps {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
}

export function ChatPreview({ chat, isSelected, onClick }: ChatPreviewProps) {
  const otherParticipant = chat.participants.find(
    (p) => p.id !== currentUser.id
  ) as User;

  const isLastMessageFromMe = chat.lastMessage?.senderId === currentUser.id;
  
  const statusIndicator = () => {
    if (otherParticipant.status === 'online') {
      return <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary border-2 border-card"></span>;
    } else if (otherParticipant.status === 'away') {
      return <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-yellow-400 border-2 border-card"></span>;
    }
    return null;
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-3 cursor-pointer hover:bg-muted/50 transition-colors",
        isSelected && "bg-muted"
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <img
            src={otherParticipant.avatar}
            alt={otherParticipant.name}
            className="object-cover"
          />
        </Avatar>
        {statusIndicator()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <span className="font-medium truncate">{otherParticipant.name}</span>
          <span className="text-xs text-muted-foreground">
            {chat.lastMessage?.timestamp}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground truncate max-w-[85%]">
            {isLastMessageFromMe && "You: "}{chat.lastMessage?.text}
          </p>
          
          {chat.unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1">
              {chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
