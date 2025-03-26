
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { contacts, chats, User, Chat, currentUser } from "@/data/chats";
import { Search, Menu } from "lucide-react";
import { ChatPreview } from "./ChatPreview";

interface ChatSidebarProps {
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat) => void;
}

export function ChatSidebar({ selectedChat, setSelectedChat }: ChatSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChats = chats.filter((chat) => {
    const otherParticipant = chat.participants.find(
      (p) => p.id !== currentUser.id
    ) as User;
    return (
      otherParticipant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.messages.some((message) =>
        message.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  return (
    <div className="w-full h-full flex flex-col border-r">
      <div className="p-3 flex justify-between items-center bg-card border-b">
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="object-cover"
            />
          </Avatar>
          <span className="font-medium">{currentUser.name}</span>
        </div>
        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Menu size={20} />
        </button>
      </div>
      <div className="px-3 py-2 bg-card">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <Input
            placeholder="Search chats"
            className="pl-9 bg-secondary h-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="pt-2">
          {filteredChats.map((chat) => (
            <ChatPreview
              key={chat.id}
              chat={chat}
              isSelected={selectedChat?.id === chat.id}
              onClick={() => setSelectedChat(chat)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
