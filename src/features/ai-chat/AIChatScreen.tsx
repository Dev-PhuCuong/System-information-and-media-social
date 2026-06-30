import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../../context/AppContext";
import { 
  Sparkles, 
  Send, 
  BookOpen, 
  FileText, 
  PenTool, 
  MessageSquare,
  Bot,
  User,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Library
} from "lucide-react";

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface Suggestion {
  id: string;
  category: 'dogma' | 'media' | 'magisterium';
  titleVi: string;
  titleEn: string;
  prompt: string;
  icon: any;
  color: string;
}

export const AIChatScreen: React.FC = () => {
  const { language } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ id: string; title: string }[]>([
    { id: "h1", title: language === "vi" ? "Ý nghĩa Bí tích Thánh Thể" : "Eucharist Sacrament Meaning" },
    { id: "h2", title: language === "vi" ? "Soạn văn thư Mùa Chay" : "Lent Pastoral Drafting" }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const suggestions: Suggestion[] = [
    {
      id: "sug1",
      category: "dogma",
      titleVi: "Tra cứu Giáo lý về Bí tích",
      titleEn: "Dogmatic Eucharist Sacraments",
      prompt: "Hãy giải thích ngắn gọn ý nghĩa tâm linh và nền tảng Kinh Thánh của Bí tích Thánh Thể theo Giáo lý Hội thánh Công giáo số 1322-1327.",
      icon: BookOpen,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20 dark:text-blue-400"
    },
    {
      id: "sug2",
      category: "media",
      titleVi: "Soạn thảo Truyền thông Giáng Sinh",
      titleEn: "Draft Christmas Media Message",
      prompt: "Viết một bài đăng truyền thông xã hội (khoảng 150 từ) truyền cảm hứng và mời gọi cộng đoàn tham dự Thánh lễ Đêm Giáng Sinh tại giáo xứ.",
      icon: PenTool,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400"
    },
    {
      id: "sug3",
      category: "magisterium",
      titleVi: "Tóm tắt Thông điệp Laudato Si'",
      titleEn: "Laudato Si' Encyclical Summary",
      prompt: "Tóm tắt 3 thông điệp mục vụ cốt lõi nhất của Đức Giáo hoàng Phanxicô trong Thông điệp Laudato Si' về việc bảo vệ ngôi nhà chung Trái Đất.",
      icon: FileText,
      color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20 dark:text-indigo-400"
    }
  ];

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: "model", content: data.text }]);
      } else {
        throw new Error("API call failed");
      }
    } catch (error) {
      console.error("AI chat error:", error);
      // Fallback offline response
      setMessages(prev => [...prev, { 
        role: "model", 
        content: language === "vi" 
          ? "Hệ thống đang chạy ngoại tuyến. Để kích hoạt Theology AI thật, xin vui lòng cấu hình `GEMINI_API_KEY` trong mục **Settings > Secrets**.\n\nDưới đây là thông tin tham khảo hữu ích dành cho bạn về chủ đề này:\n- Sách Giáo Lý Hội Thánh Công Giáo (CCC) chứa đựng toàn bộ kho tàng giáo lý.\n- Bạn có thể liên hệ Ban Truyền Thông để được giải đáp giáo luật sâu hơn."
          : "System is running offline. To enable real Theology AI, please configure `GEMINI_API_KEY` under the **Settings > Secrets** panel.\n\nHere is a quick reference on this topic:\n- The Catechism of the Catholic Church (CCC) holds the full deposits of faith.\n- Contact your local Diocesan Chancellor for deep canonical inquiries."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Basic custom renderer for markdown-like bold and bullet lists in UI
  const renderMessageContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      let formattedLine = line;
      
      // Render simple bolding **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="font-bold text-slate-900 dark:text-white">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const finalContent = parts.length > 0 ? parts : formattedLine;

      // Check if bullet point
      if (line.trim().startsWith("-") || line.trim().startsWith("*")) {
        return (
          <li key={i} className="ml-4 list-disc text-xs leading-relaxed text-slate-700 dark:text-zinc-300 py-0.5">
            {line.trim().substring(1).trim()}
          </li>
        );
      }
      
      return (
        <p key={i} className="text-xs leading-relaxed text-slate-700 dark:text-zinc-300 py-0.5 font-medium">
          {finalContent}
        </p>
      );
    });
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] w-full max-w-7xl overflow-hidden p-6 gap-6">
      
      {/* Sidebar: Chat History List */}
      <div className="hidden w-64 shrink-0 flex-col rounded-2xl border border-slate-100 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 md:flex">
        <div className="flex items-center justify-between pb-3 border-b border-slate-50 dark:border-zinc-800/40">
          <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
            {language === "vi" ? "Lịch sử tra cứu" : "Query History"}
          </span>
          <button 
            onClick={() => setMessages([])}
            className="text-[10px] font-bold text-sky-600 hover:underline dark:text-sky-400"
          >
            {language === "vi" ? "Đoạn chat mới" : "New Chat"}
          </button>
        </div>

        <div className="mt-3 flex-1 overflow-y-auto space-y-1.5">
          {chatHistory.map((h) => (
            <div 
              key={h.id}
              className="flex items-center gap-2.5 rounded-xl p-2.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800/40 text-xs font-semibold text-slate-600 dark:text-zinc-400"
              onClick={() => handleSend(h.title)}
            >
              <MessageSquare className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{h.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Center Panel: Active Chat Window */}
      <div className="flex-1 flex flex-col rounded-2xl border border-slate-100 bg-white overflow-hidden dark:border-zinc-800 dark:bg-zinc-900">
        
        {/* Welcome Dashboard layout (When messages is empty) */}
        {messages.length === 0 ? (
          <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col items-center justify-center">
            <div className="max-w-2xl text-center space-y-8">
              
              {/* Grand logo sparkles */}
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white shadow-xl shadow-indigo-100 dark:shadow-none animate-pulse">
                <Sparkles className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                  {language === "vi" ? "Trí tuệ Nhân tạo Theology AI" : "Theology AI Collaborator"}
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-md mx-auto font-medium leading-relaxed">
                  {language === "vi" 
                    ? "Đồng hành cùng bạn tra cứu giáo lý đức tin Công giáo, soạn bài mục vụ truyền thông và tóm tắt văn kiện huấn quyền."
                    : "Assisting you in searching Catholic dogma, drafting pastoral newsletters, and summarizing papal teachings."
                  }
                </p>
              </div>

              {/* Bento suggestion boxes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-left">
                {suggestions.map((sug) => {
                  const Icon = sug.icon;
                  return (
                    <div 
                      key={sug.id}
                      onClick={() => handleSend(sug.prompt)}
                      className="group border border-slate-100 hover:border-sky-500 rounded-2xl bg-white p-4 cursor-pointer transition shadow-xs hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-sky-500"
                    >
                      <div className={`flex h-8 w-8 items-center justify-center rounded-xl mb-3 ${sug.color}`}>
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 flex items-center justify-between">
                        <span>{language === "vi" ? sug.titleVi : sug.titleEn}</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-1.5 line-clamp-3 leading-normal font-medium">
                        {sug.prompt}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        ) : (
          /* Active Chat Conversation History */
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {messages.map((msg, index) => {
              const isUser = msg.role === "user";
              return (
                <div 
                  key={index}
                  className={`flex gap-4 ${isUser ? "justify-end" : ""}`}
                >
                  {/* Avatar left/right */}
                  {!isUser && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white font-serif font-bold text-sm">
                      †
                    </div>
                  )}

                  <div className={`
                    p-4 rounded-2xl text-xs max-w-[80%] shadow-xs
                    ${isUser 
                      ? "bg-slate-50 text-slate-800 rounded-tr-none dark:bg-zinc-800 dark:text-zinc-200 font-semibold" 
                      : "bg-indigo-50/45 text-slate-800 rounded-tl-none border border-indigo-100/30 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100"
                    }
                  `}>
                    <div className="space-y-1">
                      {isUser ? (
                        <p className="leading-relaxed font-medium">{msg.content}</p>
                      ) : (
                        renderMessageContent(msg.content)
                      )}
                    </div>
                  </div>

                  {isUser && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
                      <User className="w-4.5 h-4.5" />
                    </div>
                  )}

                </div>
              );
            })}

            {/* AI Response Loading Indicator */}
            {isLoading && (
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white animate-spin">
                  †
                </div>
                <div className="bg-indigo-50/20 text-slate-400 px-4 py-3.5 rounded-2xl rounded-tl-none border border-indigo-100/10 text-xs font-bold flex items-center gap-2">
                  <span className="animate-pulse">Thinking and consulting Church dogma sources...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input sending bar bar */}
        <div className="p-4 border-t border-slate-50 dark:border-zinc-800/40 shrink-0 bg-slate-50/10">
          <div className="relative rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-950 px-4 py-2.5 flex items-center gap-3">
            <input 
              type="text" 
              placeholder={language === "vi" ? "Hỏi Theology AI về giáo lý đức tin..." : "Ask theology AI dogmas..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              className="flex-1 bg-transparent border-0 outline-none text-xs font-semibold text-slate-800 placeholder-slate-400 dark:text-zinc-200"
            />
            <button 
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isLoading}
              className="rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 p-2 text-white shadow-md disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Right panel: Reference Books Quick board */}
      <aside className="hidden w-72 shrink-0 flex-col rounded-2xl border border-slate-100 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 lg:flex">
        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-50 dark:border-zinc-800/40 pb-2 flex items-center gap-2">
          <Library className="w-4 h-4 text-indigo-500" />
          <span>{language === "vi" ? "Tài nguyên Giáo lý" : "Reference Library"}</span>
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
              {language === "vi" ? "Sách tra cứu nhanh" : "Quick Canonical References"}
            </h4>
            <div className="space-y-2">
              <div className="rounded-xl bg-slate-50 dark:bg-zinc-950 p-3 space-y-1 border border-slate-100/10 cursor-pointer hover:border-sky-500 transition">
                <span className="text-[9px] font-bold text-sky-600 dark:text-sky-400 block">CATECHISM (CCC)</span>
                <span className="text-[11px] font-bold text-slate-800 dark:text-zinc-300 block">Sách Giáo Lý Hội Thánh</span>
                <span className="text-[9px] text-slate-400 dark:text-zinc-500 block leading-tight">Gồm 4 phần lớn đúc kết chân lý đức tin Công giáo toàn cầu.</span>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-zinc-950 p-3 space-y-1 border border-slate-100/10 cursor-pointer hover:border-sky-500 transition">
                <span className="text-[9px] font-bold text-sky-600 dark:text-sky-400 block">ENCYCLICALS</span>
                <span className="text-[11px] font-bold text-slate-800 dark:text-zinc-300 block">Thông Điệp Giáo Hoàng</span>
                <span className="text-[9px] text-slate-400 dark:text-zinc-500 block leading-tight">Các văn kiện quan trọng do Đức Giáo Hoàng ban hành rộng rãi.</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-50 dark:border-zinc-800/40 pt-4 space-y-2">
            <h4 className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
              {language === "vi" ? "Mẹo gợi ý viết" : "Drafting helper tips"}
            </h4>
            <div className="rounded-xl border border-dashed border-slate-200 dark:border-zinc-800 p-3 text-[10px] text-slate-500 dark:text-zinc-400 leading-relaxed font-semibold">
              {language === "vi"
                ? "Sử dụng từ ngữ hiền hòa, đầy tin yêu và kính trọng. Hãy trích dẫn cụ thể số Giáo Lý hoặc đoạn Phúc Âm để tăng tính thuyết phục của tác phẩm."
                : "Utilize gentle, faithful, and respectful terminology. Cite specific CCC numbers or Gospel passages to enhance the theological validity."
              }
            </div>
          </div>
        </div>
      </aside>

    </div>
  );
};
