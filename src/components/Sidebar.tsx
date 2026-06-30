import React from "react";
import { useApp } from "../context/AppContext";
import { ScreenType } from "../types";
import { 
  Home, 
  BarChart3, 
  MessageSquare, 
  Bot, 
  User, 
  Settings, 
  LogOut, 
  X,
  Cross,
  FileText
} from "lucide-react";

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { activeScreen, setActiveScreen, language, setLanguage, setIsAuthenticated } = useApp();

  const menuItems = [
    {
      id: "newsfeed" as ScreenType,
      labelVi: "Trang chủ",
      labelEn: "Newsfeed",
      icon: Home
    },
    {
      id: "diocese-editor" as ScreenType,
      labelVi: "Soạn bài viết GP",
      labelEn: "Draft Diocese Post",
      icon: FileText
    },
    {
      id: "statistics" as ScreenType,
      labelVi: "Thống kê",
      labelEn: "Statistics",
      icon: BarChart3
    },
    {
      id: "messages" as ScreenType,
      labelVi: "Tin nhắn & TB",
      labelEn: "Chat & Alerts",
      icon: MessageSquare
    },
    {
      id: "ai-chat" as ScreenType,
      labelVi: "Theology AI",
      labelEn: "Theology AI",
      icon: Bot,
      highlight: true
    }
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveScreen("login");
    setMobileOpen(false);
  };

  const handleNavigate = (screenId: ScreenType) => {
    setActiveScreen(screenId);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/55 md:hidden transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 border-r border-slate-100 bg-white px-5 py-6 transition-transform duration-300 dark:border-zinc-800 dark:bg-zinc-900
        md:sticky md:top-0 md:translate-x-0
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Mobile close button */}
        <button 
          className="absolute top-5 right-5 p-1 rounded-full text-slate-500 hover:bg-slate-50 dark:text-zinc-400 dark:hover:bg-zinc-800 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo Branding */}
        <div className="flex items-center gap-3 mb-8 px-2 cursor-pointer" onClick={() => handleNavigate("newsfeed")}>
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none">
            {/* Elegant simplified cross representing modern Catholicism */}
            <span className="font-serif text-xl font-bold">†</span>
          </div>
          <div>
            <h1 className="font-sans text-base font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              Theology AI
            </h1>
            <p className="text-[10px] font-mono tracking-wider text-sky-600 dark:text-sky-400 uppercase font-bold">
              CONNECT PLATFORM
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`
                  w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? item.highlight
                      ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none"
                      : "bg-slate-50 text-sky-600 dark:bg-zinc-800 dark:text-sky-400" 
                    : item.highlight
                      ? "text-sky-600 hover:bg-sky-50/50 dark:text-sky-400 dark:hover:bg-sky-950/20"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-white"
                  }
                `}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive && !item.highlight ? 'text-sky-600 dark:text-sky-400' : ''}`} />
                <span>{language === "vi" ? item.labelVi : item.labelEn}</span>
                {item.highlight && !isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Area with user and logout */}
        <div className="pt-6 border-t border-slate-100 dark:border-zinc-800 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <span className="text-xs text-slate-400 dark:text-zinc-500 font-medium">
              {language === "vi" ? "NGÔN NGỮ:" : "LANGUAGE:"}
            </span>
            <div className="flex bg-slate-50 dark:bg-zinc-800 rounded-lg p-0.5 ml-auto text-xs font-semibold">
              <button 
                onClick={() => setLanguage("vi")}
                className={`px-2 py-1 rounded-md transition-all ${language === "vi" ? "bg-white text-slate-900 shadow-sm dark:bg-zinc-700 dark:text-white" : "text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300"}`}
              >
                VI
              </button>
              <button 
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 rounded-md transition-all ${language === "en" ? "bg-white text-slate-900 shadow-sm dark:bg-zinc-700 dark:text-white" : "text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300"}`}
              >
                EN
              </button>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-400 dark:hover:bg-rose-950/20 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>{language === "vi" ? "Đăng xuất" : "Log out"}</span>
          </button>
        </div>
      </aside>
    </>
  );
};
