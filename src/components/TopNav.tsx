import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Menu,
  CheckCircle2,
  Trash2,
  MessageSquare
} from "lucide-react";

interface TopNavProps {
  onMenuClick: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onMenuClick }) => {
  const { 
    language, 
    theme, 
    setTheme, 
    currentUser, 
    setActiveScreen, 
    notifications, 
    setNotifications 
  } = useApp();

  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.length;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-100 bg-white/90 px-6 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90">
      
      {/* Left section: mobile hamburger, search bar */}
      <div className="flex flex-1 items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="rounded-xl p-1.5 text-slate-500 hover:bg-slate-50 dark:text-zinc-400 dark:hover:bg-zinc-800 md:hidden"
        >
          <Menu className="w-5.5 h-5.5" />
        </button>

        {/* Custom Search Bar with integrated label */}
        <div className="relative hidden max-w-sm flex-1 sm:block">
          <Search className="absolute top-1/2 left-3.5 h-4.5 w-4.5 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
          <input 
            type="text" 
            placeholder={language === "vi" ? "Tìm kiếm bài viết, chủ đề..." : "Search posts, topics..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-slate-100 bg-slate-50/50 py-2 pl-10 pr-4 text-xs font-medium text-slate-800 outline-none transition-all focus:border-sky-500 focus:bg-white dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-200 dark:focus:border-sky-500 dark:focus:bg-zinc-800"
          />
        </div>
      </div>

      {/* Right section: theme, alerts, user profile info */}
      <div className="flex items-center gap-4">
        
        {/* Toggle Theme */}
        <button 
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-50 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-all"
          title={language === "vi" ? "Chuyển giao diện" : "Switch Theme"}
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5 text-slate-600 dark:text-zinc-400" />
          ) : (
            <Sun className="w-5 h-5 text-amber-500" />
          )}
        </button>

        {/* Notifications Icon and Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-50 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-all"
          >
            <Bell className="w-5 h-5 text-slate-600 dark:text-zinc-400" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white ring-2 ring-white dark:ring-zinc-900">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <>
              {/* Overlay transparent to close dropdown */}
              <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
              
              <div className="absolute right-0 mt-2 z-20 w-80 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {language === "vi" ? "Thông báo mới" : "Notifications"}
                  </h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={handleClearNotifications}
                      className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{language === "vi" ? "Xóa hết" : "Clear all"}</span>
                    </button>
                  )}
                </div>

                <div className="mt-2 max-h-72 overflow-y-auto space-y-2.5">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center text-slate-400">
                      <CheckCircle2 className="w-10 h-10 text-slate-200 mb-2" />
                      <p className="text-xs font-semibold">
                        {language === "vi" ? "Tuyệt vời! Không có thông báo mới" : "Great! No notifications"}
                      </p>
                    </div>
                  ) : (
                    notifications.map((item) => (
                      <div 
                        key={item.id}
                        className="flex gap-3 rounded-xl p-2.5 transition hover:bg-slate-50 dark:hover:bg-zinc-800/50 cursor-pointer"
                        onClick={() => {
                          if (item.type === 'comment') {
                            setActiveScreen('newsfeed');
                          } else if (item.type === 'event') {
                            setActiveScreen('newsfeed');
                          }
                          setNotifOpen(false);
                        }}
                      >
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.color}`}>
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                            {language === "vi" ? item.title : item.titleEn}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                            {language === "vi" ? item.description : item.descriptionEn}
                          </p>
                          <span className="text-[9px] font-medium text-slate-400 dark:text-zinc-500 font-mono block pt-1">
                            {language === "vi" ? item.timeAgo : item.timeAgoEn}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Vertical divider */}
        <div className="h-6 w-px bg-slate-100 dark:bg-zinc-800" />

        {/* User profile capsule info */}
        <div 
          onClick={() => setActiveScreen("profile")}
          className="flex items-center gap-2.5 cursor-pointer pl-1 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 p-1.5 transition"
        >
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name}
            className="h-8.5 w-8.5 rounded-full object-cover ring-2 ring-sky-500/15"
            referrerPolicy="no-referrer"
          />
          <div className="hidden text-left md:block">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-none">
              {currentUser.name}
            </h4>
            <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">
              {language === "vi" ? currentUser.role : currentUser.roleEn}
            </span>
          </div>
        </div>

      </div>
    </header>
  );
};
