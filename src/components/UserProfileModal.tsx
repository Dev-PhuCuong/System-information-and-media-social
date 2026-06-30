import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { User, Post } from "../types";
import { 
  X, 
  MapPin, 
  Briefcase, 
  Users, 
  Heart, 
  Award, 
  MessageSquare, 
  UserPlus, 
  UserMinus, 
  Share2,
  BookOpen
} from "lucide-react";

export const UserProfileModal: React.FC = () => {
  const { 
    viewingUser, 
    setViewingUser, 
    language, 
    posts, 
    currentUser,
    setConversations,
    setActiveScreen
  } = useApp();

  const [isFollowing, setIsFollowing] = useState(false);

  if (!viewingUser) return null;

  const isMe = viewingUser.id === currentUser.id;

  // Find posts belonging to this author or simulate beautiful posts for them
  const authorPosts = posts.filter(
    (p) => p.authorName.toLowerCase() === viewingUser.name.toLowerCase()
  );

  // If no posts found, generate 2 realistic posts for them so their profile is rich and beautiful
  const displayPosts = authorPosts.length > 0 ? authorPosts : [
    {
      id: `sim_p_1`,
      authorName: viewingUser.name,
      authorAvatar: viewingUser.avatar,
      authorTitle: viewingUser.role,
      authorTitleEn: viewingUser.roleEn,
      timeAgo: "3 ngày trước",
      timeAgoEn: "3 days ago",
      content: `Kính chúc cộng đoàn dân Chúa luôn tràn đầy ân sủng và bình an của Chúa Kitô. Chúng ta hãy cùng nhau hiệp thông, tham gia vào sứ vụ loan báo Tin Mừng trên môi trường kỹ thuật số đầy thử thách nhưng cũng nhiều cơ hội này.`,
      contentEn: `May the community of God's people always be filled with the grace and peace of Christ. Let us commune and participate in the mission of proclaiming the Gospel in this challenging yet opportunity-filled digital environment.`,
      likes: 145,
      commentsCount: 8,
      category: "SỨ ĐIỆP",
      categoryEn: "MESSAGE",
      readTime: "3 phút đọc",
      readTimeEn: "3 min read"
    },
    {
      id: `sim_p_2`,
      authorName: viewingUser.name,
      authorAvatar: viewingUser.avatar,
      authorTitle: viewingUser.role,
      authorTitleEn: viewingUser.roleEn,
      timeAgo: "1 tuần trước",
      timeAgoEn: "1 week ago",
      content: `Chương trình tập huấn truyền thông giáo hạt sắp tới sẽ tập trung vào kỹ năng viết bài, chụp ảnh phụng vụ và quản lý trang tin xứ đạo. Rất mong đại diện ban truyền thông các giáo xứ tham gia đông đủ.`,
      contentEn: `The upcoming deanery media training workshop will focus on writing skills, liturgical photography, and parish news management. Looking forward to full participation from parish media representatives.`,
      likes: 98,
      commentsCount: 3,
      category: "MỤC VỤ",
      categoryEn: "PASTORAL",
      readTime: "4 phút đọc",
      readTimeEn: "4 min read"
    }
  ];

  const handleMessageUser = () => {
    // Navigate to messages
    setActiveScreen("messages");
    setViewingUser(null);
  };

  const handleToggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs transition-all duration-300">
      <div 
        className="relative w-full max-w-2xl rounded-2xl border border-slate-100 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={() => setViewingUser(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex-1 overflow-y-auto">
          {/* Cover Photo */}
          <div className="relative h-44 w-full bg-slate-100 dark:bg-zinc-800">
            {viewingUser.cover ? (
              <img 
                src={viewingUser.cover} 
                alt="Profile Cover" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-sky-600 to-indigo-600" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* User Details Section */}
          <div className="relative px-6 pb-6">
            {/* Overlapping Avatar */}
            <div className="absolute -top-16 left-6">
              <div className="p-1 rounded-2xl bg-white dark:bg-zinc-950 shadow-md">
                <img 
                  src={viewingUser.avatar} 
                  alt={viewingUser.name} 
                  className="w-24 h-24 rounded-xl object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Action Buttons (Follow / Message) */}
            <div className="flex justify-end gap-2 pt-4">
              {!isMe ? (
                <>
                  <button 
                    onClick={handleToggleFollow}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold border transition-all ${
                      isFollowing 
                        ? "bg-slate-100 text-slate-700 border-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700" 
                        : "bg-sky-550 hover:bg-sky-600 text-white border-transparent bg-sky-600"
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <UserMinus className="w-3.5 h-3.5" />
                        <span>{language === "vi" ? "Đang theo dõi" : "Following"}</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>{language === "vi" ? "Theo dõi" : "Follow"}</span>
                      </>
                    )}
                  </button>
                  <button 
                    onClick={handleMessageUser}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-zinc-800 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{language === "vi" ? "Nhắn tin" : "Message"}</span>
                  </button>
                </>
              ) : (
                <div className="h-10 flex items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/20 px-3 py-1.5 rounded-lg">
                    {language === "vi" ? "Tài khoản của bạn" : "Your Account"}
                  </span>
                </div>
              )}
            </div>

            {/* Bio Info */}
            <div className="mt-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {viewingUser.name}
                <Award className="w-4 h-4 text-amber-500 fill-amber-500" />
              </h2>
              
              <div className="mt-2 space-y-1.5">
                <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{language === "vi" ? viewingUser.role : viewingUser.roleEn}</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{language === "vi" ? viewingUser.diocese : viewingUser.dioceseEn}</span>
                </p>
              </div>

              {/* Bio description */}
              <div className="mt-4 p-4 rounded-xl bg-slate-50/70 dark:bg-zinc-900/40 border border-slate-100/50 dark:border-zinc-900/80">
                <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed italic">
                  "{language === "vi" ? viewingUser.bio : viewingUser.bioEn}"
                </p>
              </div>

              {/* Quick stats grid */}
              <div className="grid grid-cols-3 gap-4 mt-6 text-center border-y border-slate-100 dark:border-zinc-800/80 py-4">
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {viewingUser.stats?.posts || displayPosts.length}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                    {language === "vi" ? "Bài viết" : "Posts"}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {viewingUser.stats?.followers || "1.2k"}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider flex items-center justify-center gap-1">
                    <Users className="w-3 h-3 text-slate-400" />
                    {language === "vi" ? "Người theo dõi" : "Followers"}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {viewingUser.stats?.likes || "4.5k"}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider flex items-center justify-center gap-1">
                    <Heart className="w-3 h-3 text-rose-400 fill-rose-400/20" />
                    {language === "vi" ? "Lượt thích" : "Likes"}
                  </div>
                </div>
              </div>

              {/* Recent posts header */}
              <div className="mt-6 space-y-4">
                <h3 className="text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-sky-600" />
                  {language === "vi" ? "Bài viết gần đây" : "Recent Publications"}
                </h3>

                <div className="space-y-3.5">
                  {displayPosts.map((post) => (
                    <div 
                      key={post.id} 
                      className="p-4 rounded-xl border border-slate-100 bg-slate-50/20 dark:border-zinc-900 dark:bg-zinc-900/10 space-y-2.5 hover:border-slate-200 dark:hover:border-zinc-800 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/25">
                          {language === "vi" ? post.category : post.categoryEn}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono">
                          {language === "vi" ? post.timeAgo : post.timeAgoEn}
                        </span>
                      </div>
                      
                      <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed font-medium">
                        {language === "vi" ? post.content : post.contentEn}
                      </p>

                      <div className="flex gap-4 items-center text-[11px] text-slate-400 dark:text-zinc-500 font-semibold pt-1">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-rose-500" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5 text-sky-500" />
                          {post.commentsCount}
                        </span>
                        <span className="ml-auto font-normal text-[10px]">
                          {language === "vi" ? post.readTime : post.readTimeEn}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
