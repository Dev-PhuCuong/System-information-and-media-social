import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { EditProfileModal } from "../../components/EditProfileModal";
import { 
  MapPin, 
  Briefcase, 
  Calendar, 
  Settings, 
  Award, 
  BookOpen, 
  ThumbsUp, 
  MessageCircle,
  Hash,
  Sparkles
} from "lucide-react";

export const ProfileScreen: React.FC = () => {
  const { language, currentUser, posts, likePost, bookmarkPost } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  // Filter posts created by current user
  const myPosts = posts.filter(post => post.authorName === currentUser.name);

  // Badges lists
  const badges = [
    { id: "b1", labelVi: "Cây bút vàng", labelEn: "Golden Pen", icon: Award, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/20" },
    { id: "b2", labelVi: "Thành viên tích cực", labelEn: "Active Member", icon: Sparkles, color: "text-sky-500 bg-sky-50 dark:bg-sky-950/20" }
  ];

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-6">
      
      {/* Cover and Avatar Header */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-100 bg-white dark:border-zinc-800 dark:bg-zinc-900 pb-6">
        
        {/* Cover visual photo */}
        <div className="h-44 w-full bg-cover bg-center" style={{
          backgroundImage: `url('${currentUser.cover}')`
        }} />

        {/* Profile absolute container layout */}
        <div className="px-6 flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-16 gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              className="h-28 w-28 rounded-2xl object-cover ring-4 ring-white dark:ring-zinc-900 shadow-md"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1 pb-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                {currentUser.name}
              </h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-slate-500 dark:text-zinc-400">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{language === "vi" ? currentUser.role : currentUser.roleEn}</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{language === "vi" ? currentUser.diocese : currentUser.dioceseEn}</span>
                </span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setModalOpen(true)}
            className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 flex items-center gap-1.5 transition"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>{language === "vi" ? "Chỉnh sửa Hồ sơ" : "Edit Profile"}</span>
          </button>
        </div>

        {/* Detailed Bio block */}
        <div className="px-6 mt-6 pt-6 border-t border-slate-50 dark:border-zinc-800/40">
          <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
            {language === "vi" ? currentUser.bio : currentUser.bioEn}
          </p>
        </div>

      </div>

      {/* Activity Stats & Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left column: stats counters & mission hashtags */}
        <div className="md:col-span-1 space-y-6">
          
          {/* Numbers grid */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-4 border-b border-slate-50 dark:border-zinc-800/40 pb-2">
              {language === "vi" ? "Chỉ số hoạt động" : "Activity Stats"}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-0.5">
                <span className="text-xs text-slate-500 dark:text-zinc-400 font-semibold">
                  {language === "vi" ? "Bài viết" : "Publications"}
                </span>
                <span className="text-base font-bold text-slate-900 dark:text-white font-mono block leading-none">
                  {currentUser.stats.posts}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-xs text-slate-500 dark:text-zinc-400 font-semibold">
                  {language === "vi" ? "Người theo dõi" : "Followers"}
                </span>
                <span className="text-base font-bold text-slate-900 dark:text-white font-mono block leading-none">
                  {currentUser.stats.followers}
                </span>
              </div>
              <div className="space-y-0.5 pt-2">
                <span className="text-xs text-slate-500 dark:text-zinc-400 font-semibold">
                  {language === "vi" ? "Lượt thích" : "Likes Recv."}
                </span>
                <span className="text-base font-bold text-slate-900 dark:text-white font-mono block leading-none">
                  {currentUser.stats.likes}
                </span>
              </div>
              <div className="space-y-0.5 pt-2">
                <span className="text-xs text-slate-500 dark:text-zinc-400 font-semibold">
                  {language === "vi" ? "Huy chương số" : "Digital Index"}
                </span>
                <span className="text-base font-bold text-slate-900 dark:text-white font-mono block leading-none">
                  {currentUser.stats.rating} pts
                </span>
              </div>
            </div>
          </div>

          {/* Badges system showcase */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-4 border-b border-slate-50 dark:border-zinc-800/40 pb-2">
              {language === "vi" ? "Danh hiệu & Huy chương" : "Digital Ambassadorship"}
            </h3>
            <div className="space-y-3">
              {badges.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.id} className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${b.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-300">
                      {language === "vi" ? b.labelVi : b.labelEn}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right column: user's personal articles history portfolio */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-4 border-b border-slate-50 dark:border-zinc-800/40 pb-2">
              {language === "vi" ? "Tác phẩm đã đăng tải của tôi" : "My Publications Portfolio"}
            </h3>

            {myPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center text-slate-400">
                <BookOpen className="w-10 h-10 opacity-25 mb-2" />
                <p className="text-xs font-semibold">
                  {language === "vi" ? "Bạn chưa đăng bài viết nào" : "You haven't published any articles yet"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {myPosts.map((post) => (
                  <div key={post.id} className="rounded-xl border border-slate-50 bg-slate-50/10 p-4 dark:border-zinc-800/40 dark:bg-zinc-950/25">
                    <div className="flex justify-between items-start gap-3">
                      <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-relaxed">
                        {language === "vi" ? post.content : post.contentEn}
                      </p>
                      {post.image && (
                        <img 
                          src={post.image} 
                          alt="Thumbnail" 
                          className="h-12 w-16 object-cover rounded-lg border border-slate-100"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-[9px] font-bold font-mono text-slate-400 dark:text-zinc-500 pt-3 border-t border-slate-50 dark:border-zinc-800/30 mt-3">
                      <span>{language === "vi" ? post.timeAgo : post.timeAgoEn}</span>
                      <div className="flex gap-4">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{post.likes}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{post.commentsCount}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

    </div>
  );
};
