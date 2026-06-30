import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Conversation, Message } from "../../types";
import { getProfileForUser } from "../../utils/profiles";
import { 
  Send, 
  Phone, 
  Video, 
  MoreHorizontal, 
  Image, 
  Smile, 
  Paperclip,
  Check,
  CheckCheck,
  Bell,
  Trash2,
  Inbox
} from "lucide-react";

export const MessagesScreen: React.FC = () => {
  const { 
    language, 
    conversations, 
    setConversations, 
    sendMessageToConversation,
    notifications,
    setNotifications,
    setViewingUser
  } = useApp();

  const [activeTab, setActiveTab] = useState<'chat' | 'alerts'>('chat');
  const [selectedConvId, setSelectedConvId] = useState<string>("conv_thomas");
  const [inputMessage, setInputMessage] = useState("");

  const activeConversation = conversations.find(c => c.id === selectedConvId) || conversations[0];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeConversation) return;

    const textToSend = inputMessage;
    setInputMessage("");

    // Trigger state changes inside provider
    await sendMessageToConversation(activeConversation.id, textToSend);
  };

  // Clear single notification
  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Mark all notifications as read (simulated)
  const handleMarkAllRead = () => {
    setNotifications([]);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] w-full max-w-7xl overflow-hidden p-6 gap-6">
      
      {/* Sidebar Panel: Tab controls & Lists */}
      <div className="flex w-80 shrink-0 flex-col rounded-2xl border border-slate-100 bg-white overflow-hidden dark:border-zinc-800 dark:bg-zinc-900">
        
        {/* Tab switcher header */}
        <div className="flex border-b border-slate-100 p-2.5 dark:border-zinc-800">
          <button 
            onClick={() => setActiveTab('chat')}
            className={`flex flex-1 items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'chat' ? "bg-slate-50 text-sky-600 dark:bg-zinc-800 dark:text-sky-400" : "text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
          >
            <Inbox className="w-4 h-4" />
            <span>{language === "vi" ? "Hộp thư" : "Inbox"}</span>
          </button>
          <button 
            onClick={() => setActiveTab('alerts')}
            className={`flex flex-1 items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'alerts' ? "bg-slate-50 text-sky-600 dark:bg-zinc-800 dark:text-sky-400" : "text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
          >
            <Bell className="w-4 h-4" />
            <span>{language === "vi" ? "Thông báo" : "Alerts"}</span>
            {notifications.length > 0 && (
              <span className="h-2 w-2 rounded-full bg-rose-500" />
            )}
          </button>
        </div>

        {/* Tab content area */}
        <div className="flex-1 overflow-y-auto p-3">
          
          {/* Chat conversations list tab */}
          {activeTab === 'chat' && (
            <div className="space-y-1">
              {conversations.map((conv) => {
                const isSelected = conv.id === selectedConvId;
                
                return (
                  <div 
                    key={conv.id}
                    onClick={() => {
                      setSelectedConvId(conv.id);
                      // Clear unread count on selection
                      setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unreadCount: 0 } : c));
                    }}
                    className={`
                      flex items-center gap-3 rounded-xl p-3 cursor-pointer transition
                      ${isSelected 
                        ? "bg-slate-50/80 dark:bg-zinc-800/60 border border-slate-100/10" 
                        : "hover:bg-slate-50/40 dark:hover:bg-zinc-800/25"
                      }
                    `}
                  >
                    {/* User avatar indicator */}
                    <div className="relative">
                      <img 
                        src={conv.participantAvatar} 
                        alt={conv.participantName}
                        className="h-10 w-10 rounded-full object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      {conv.participantStatus === "online" && (
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {conv.participantName}
                        </h4>
                        <span className="text-[9px] text-slate-400 dark:text-zinc-500 font-mono">
                          {conv.lastMessageTime}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-zinc-400 truncate leading-relaxed">
                        {conv.lastMessage}
                      </p>
                    </div>

                    {/* Unread badge */}
                    {conv.unreadCount > 0 && (
                      <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[8px] font-bold text-white">
                        {conv.unreadCount}
                      </span>
                    )}

                  </div>
                );
              })}
            </div>
          )}

          {/* Detailed alerts notification tab */}
          {activeTab === 'alerts' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-50 dark:border-zinc-800/40 px-1.5">
                <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                  {notifications.length} {language === "vi" ? "thông báo chưa xem" : "alerts pending"}
                </span>
                {notifications.length > 0 && (
                  <button 
                    onClick={handleMarkAllRead}
                    className="text-[9px] font-bold text-rose-500 hover:underline"
                  >
                    {language === "vi" ? "Dọn dẹp hết" : "Clear all"}
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400 dark:text-zinc-500">
                  <Bell className="w-8 h-8 opacity-25 mb-2" />
                  <p className="text-[11px] font-semibold">
                    {language === "vi" ? "Hộp thông báo trống" : "Empty alerts mailbox"}
                  </p>
                </div>
              ) : (
                notifications.map((item) => (
                  <div 
                    key={item.id}
                    className="group flex gap-2.5 rounded-xl border border-slate-50 bg-slate-50/20 p-2.5 hover:bg-slate-50/50 dark:border-zinc-800/40 dark:hover:bg-zinc-800/10"
                  >
                    <div className="space-y-1 flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        {language === "vi" ? item.title : item.titleEn}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-zinc-400 leading-normal">
                        {language === "vi" ? item.description : item.descriptionEn}
                      </p>
                      <span className="text-[8px] font-medium text-slate-400 dark:text-zinc-500 font-mono block">
                        {language === "vi" ? item.timeAgo : item.timeAgoEn}
                      </span>
                    </div>

                    <button 
                      onClick={() => handleDeleteNotification(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-500 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

      </div>

      {/* Main Chat Content Panel */}
      <div className="flex-1 flex flex-col rounded-2xl border border-slate-100 bg-white overflow-hidden dark:border-zinc-800 dark:bg-zinc-900">
        
        {activeTab === 'alerts' ? (
          /* Placeholder display when viewing alerts tab */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400 dark:text-zinc-500">
            <Bell className="w-14 h-14 opacity-20 mb-4 animate-bounce" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {language === "vi" ? "Đang xem hộp thông báo" : "Viewing Alerts Dashboard"}
            </h3>
            <p className="text-xs text-slate-400 dark:text-zinc-500 max-w-sm mt-1 leading-relaxed">
              {language === "vi" 
                ? "Bấm chuyển đổi sang Hộp thư ở thanh bên để kết nối chat và tiếp tục thảo luận mục vụ." 
                : "Switch back to the Inbox tab on the sidebar to communicate and discuss ecclesiastical duties."
              }
            </p>
          </div>
        ) : !activeConversation ? (
          /* Empty selection chat fallback */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400">
            <Inbox className="w-12 h-12 opacity-35 mb-2" />
            <p className="text-xs font-semibold">
              {language === "vi" ? "Chọn một cuộc thảo luận để bắt đầu chat" : "Select a thread to start messaging"}
            </p>
          </div>
        ) : (
          /* Active Chat Screen */
          <>
            {/* Header window info */}
            <div className="flex h-16 items-center justify-between border-b border-slate-50 px-5 dark:border-zinc-800/55 shrink-0 bg-slate-50/30">
              <div className="flex items-center gap-3">
                <img 
                  src={activeConversation.participantAvatar} 
                  alt={activeConversation.participantName}
                  onClick={() => setViewingUser(getProfileForUser(activeConversation.participantName, activeConversation.participantAvatar))}
                  className="h-10 w-10 rounded-full object-cover cursor-pointer hover:opacity-85 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 
                    onClick={() => setViewingUser(getProfileForUser(activeConversation.participantName, activeConversation.participantAvatar))}
                    className="text-xs font-bold text-slate-900 dark:text-white leading-tight cursor-pointer hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {activeConversation.participantName}
                  </h3>
                  <span className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-zinc-500 font-medium">
                    <span className={`h-1.5 w-1.5 rounded-full ${activeConversation.participantStatus === "online" ? "bg-emerald-500" : "bg-slate-300"}`} />
                    <span>
                      {language === "vi" 
                        ? (activeConversation.participantStatus === "online" ? "Đang hoạt động" : "Ngoại tuyến")
                        : activeConversation.participantStatusEn
                      }
                    </span>
                  </span>
                </div>
              </div>

              {/* Accessories utilities buttons */}
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400">
                <button 
                  onClick={() => alert(language === "vi" ? "Đang thực hiện cuộc gọi thoại giả lập..." : "Initiating simulated voice call...")}
                  className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
                >
                  <Phone className="w-4 h-4 text-slate-600 dark:text-zinc-400" />
                </button>
                <button 
                  onClick={() => alert(language === "vi" ? "Đang thực hiện cuộc gọi video giả lập..." : "Initiating simulated video call...")}
                  className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
                >
                  <Video className="w-4 h-4 text-slate-600 dark:text-zinc-400" />
                </button>
                <button className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 transition">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages History panel */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {activeConversation.messages.map((msg) => {
                const isMe = msg.senderId === "user_me";
                
                return (
                  <div 
                    key={msg.id}
                    className={`flex gap-3 max-w-[80%] ${isMe ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                  >
                    {!isMe && (
                      <img 
                        src={msg.senderAvatar} 
                        alt={msg.senderName}
                        onClick={() => setViewingUser(getProfileForUser(msg.senderName, msg.senderAvatar))}
                        className="h-8 w-8 rounded-full object-cover self-end shrink-0 cursor-pointer hover:opacity-85 transition-opacity"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className="space-y-1">
                      {/* Bubble box */}
                      <div className={`
                        p-3 rounded-2xl text-xs leading-relaxed font-medium shadow-xs
                        ${isMe 
                          ? "bg-sky-600 text-white rounded-br-none" 
                          : "bg-slate-50 dark:bg-zinc-800 dark:text-zinc-200 text-slate-800 rounded-bl-none"
                        }
                      `}>
                        {msg.content}
                      </div>

                      {/* Msg bottom ticks & timestamp */}
                      <div className={`flex items-center gap-1 text-[9px] text-slate-400 dark:text-zinc-500 font-mono ${isMe ? "justify-end" : ""}`}>
                        <span>{msg.createdAt}</span>
                        {isMe && <CheckCheck className="w-3.5 h-3.5 text-sky-500 shrink-0" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Typing bar area */}
            <form 
              onSubmit={handleSendMessage}
              className="h-16 border-t border-slate-50 px-5 flex items-center gap-3 shrink-0 bg-slate-50/10 dark:border-zinc-800/40"
            >
              <div className="flex items-center gap-1 text-slate-400">
                <button type="button" className="rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-800">
                  <Paperclip className="w-4 h-4" />
                </button>
                <button type="button" className="rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-800">
                  <Smile className="w-4 h-4" />
                </button>
              </div>

              <input 
                type="text" 
                placeholder={language === "vi" ? "Nhập tin nhắn..." : "Type your message..."}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-transparent border-0 outline-none text-xs font-semibold text-slate-800 placeholder-slate-400 dark:text-zinc-200"
              />

              <button 
                type="submit"
                disabled={!inputMessage.trim()}
                className="rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 p-2 text-white shadow-md hover:from-sky-700 hover:to-indigo-700 disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        )}

      </div>

    </div>
  );
};
