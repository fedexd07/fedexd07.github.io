
import { useState } from "react";
import { chats } from "@/data/chats";
import { ChatSidebar } from "./ChatSidebar";
import { ChatView } from "./ChatView";
import { useIsMobile } from "@/hooks/use-mobile";

export function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [showChatList, setShowChatList] = useState(true);
  const isMobile = useIsMobile();

  const handleSelectChat = (chat: typeof selectedChat) => {
    setSelectedChat(chat);
    if (isMobile) {
      setShowChatList(false);
    }
  };

  const handleBack = () => {
    setShowChatList(true);
  };

  if (isMobile) {
    return (
      <div className="h-full">
        {showChatList ? (
          <ChatSidebar
            selectedChat={selectedChat}
            setSelectedChat={handleSelectChat}
          />
        ) : (
          <ChatView chat={selectedChat} onBack={handleBack} />
        )}
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <div className="w-1/3 max-w-sm">
        <ChatSidebar
          selectedChat={selectedChat}
          setSelectedChat={handleSelectChat}
        />
      </div>
      <div className="flex-1">
        <ChatView chat={selectedChat} onBack={handleBack} />
      </div>
    </div>
  );
}
