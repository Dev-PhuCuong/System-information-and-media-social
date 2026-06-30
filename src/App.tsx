import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Sidebar } from "./components/Sidebar";
import { TopNav } from "./components/TopNav";
import { AuthScreen } from "./features/auth/AuthScreen";
import { NewsfeedScreen } from "./features/newsfeed/NewsfeedScreen";
import { StatisticsScreen } from "./features/statistics/StatisticsScreen";
import { MessagesScreen } from "./features/messages/MessagesScreen";
import { AIChatScreen } from "./features/ai-chat/AIChatScreen";
import { ProfileScreen } from "./features/profile/ProfileScreen";
import { DioceseEditorScreen } from "./features/diocese-editor/DioceseEditorScreen";
import { UserProfileModal } from "./components/UserProfileModal";

const MainAppContent: React.FC = () => {
  const { isAuthenticated, activeScreen } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If user is not authenticated, strictly show the AuthScreen (Login/Signup)
  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  // Render correct features based on routing state
  const renderActiveScreen = () => {
    switch (activeScreen) {
      case "newsfeed":
        return <NewsfeedScreen />;
      case "statistics":
        return <StatisticsScreen />;
      case "messages":
        return <MessagesScreen />;
      case "ai-chat":
        return <AIChatScreen />;
      case "profile":
        return <ProfileScreen />;
      case "diocese-editor":
        return <DioceseEditorScreen />;
      default:
        return <NewsfeedScreen />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50/50 dark:bg-zinc-950">
      {/* Sidebar navigation rail */}
      <Sidebar 
        mobileOpen={mobileSidebarOpen} 
        setMobileOpen={setMobileSidebarOpen} 
      />

      {/* Main app space area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar header navigation */}
        <TopNav onMenuClick={() => setMobileSidebarOpen(true)} />

        {/* Content canvas container */}
        <main className="flex-1 overflow-y-auto bg-slate-50/35 dark:bg-zinc-950/30">
          <div className="animate-fade-in transition-all duration-300">
            {renderActiveScreen()}
          </div>
        </main>
      </div>
      
      {/* Centralized modal for viewing other member profiles */}
      <UserProfileModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
