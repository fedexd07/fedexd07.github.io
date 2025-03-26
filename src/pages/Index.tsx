
import { ChatLayout } from "@/components/ChatLayout";

const Index = () => {
  return (
    <div className="h-screen flex flex-col">
      <header className="p-3 flex items-center justify-center border-b bg-card">
        <h1 className="text-xl font-semibold">WhispChat</h1>
      </header>
      <main className="flex-1 overflow-hidden">
        <ChatLayout />
      </main>
    </div>
  );
};

export default Index;
