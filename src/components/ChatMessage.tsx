
import { Message } from "@/data/chats";
import { cn } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";

interface ChatMessageProps {
  message: Message;
  isFromMe: boolean;
}

export function ChatMessage({ message, isFromMe }: ChatMessageProps) {
  const statusIcon = () => {
    if (message.status === 'sent') {
      return <Check className="h-3.5 w-3.5 ml-1 inline text-muted-foreground/70" />;
    } else if (message.status === 'delivered') {
      return <CheckCheck className="h-3.5 w-3.5 ml-1 inline text-muted-foreground/70" />;
    } else if (message.status === 'read') {
      return <CheckCheck className="h-3.5 w-3.5 ml-1 inline text-primary" />;
    }
    return null;
  };

  return (
    <div
      className={cn(
        "chat-message px-3 py-2 rounded-lg",
        isFromMe ? "message-out" : "message-in"
      )}
    >
      <div className="mb-1">{message.text}</div>
      <div className="flex justify-end items-center">
        <span className="text-xs opacity-70">{message.timestamp}</span>
        {isFromMe && statusIcon()}
      </div>
    </div>
  );
}
