
import { ChatLayout } from "@/components/ChatLayout";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // This is a mock authentication state - in a real app, this would come from an auth context
  const isAuthenticated = true;

  return (
    <div className="h-screen flex flex-col">
      <header className="p-3 flex items-center justify-between border-b bg-card">
        <h1 className="text-xl font-semibold">WhispChat</h1>
        {isAuthenticated ? (
          <Button variant="ghost" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        ) : (
          <Link to="/auth">
            <Button size="sm">Sign in</Button>
          </Link>
        )}
      </header>
      <main className="flex-1 overflow-hidden">
        <ChatLayout />
      </main>
    </div>
  );
};

export default Index;
