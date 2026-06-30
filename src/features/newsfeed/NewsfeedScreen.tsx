import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Post, Comment } from "../../types";
import { getProfileForUser } from "../../utils/profiles";
import { parseDraftContentToHTML } from "../../utils/editorParser";
import { 
  ThumbsUp, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  Send, 
  Image, 
  Plus, 
  MapPin, 
  Calendar,
  ChevronRight,
  UserCheck,
  UserPlus,
  Video,
  Play
} from "lucide-react";

export const NewsfeedScreen: React.FC = () => {
  const { 
    language, 
    currentUser, 
    posts, 
    addPost, 
    likePost, 
    bookmarkPost, 
    addComment,
    trends, 
    upcomingEvents, 
    suggestedContacts, 
    setSuggestedContacts,
    setViewingUser
  } = useApp();

  // Create Post state
  const [newPostText, setNewPostText] = useState("");
  const [selectedPresetImage, setSelectedPresetImage] = useState<string | null>(null);
  const [imageDropdownOpen, setImageDropdownOpen] = useState(false);

  // Active commenting state
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const imagePresets = [
    {
      label: "Đại hội thanh niên / Youth Festival",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiQzc2hKLyIT-3_CeVuJUJnwx2ovxJHcl90QCdpzsx1O0t-jBbGBKtkhMlrw6cgLm38QBAwu4snIabq2yI6H_T1c74_pQDWc1tMoHPq2KJh4pRwTY7w7zk5v4LES-8N2WG_hKhb_wkcFjoqkI_Q9C54zeSvwcWp2S5lNbe8msEykGdzGnOwJylEqcvU1CAYbaD0ApZkMy1_ed6L5cP5EugpERQeSvhGBcd3i4XDv_1l1N1oMzMt79TWBEq0IQfSFvLxDc7SAxH_w"
    },
    {
      label: "Chuỗi hạt cầu nguyện / Holy Rosary",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuADOM67hyIRbJ7DWzOUH8eSGHHI0wYQHSM-wwJcEwi8ml735m3Lfik2sDM1p_h-R0Pk46ZehwPDG1NEEbuGr-zRjOZaI-t2NK9LN9YV6fb93koT4cSbUsW9vA30N02-5bzENdESoeCRnP6xVBnvDK8yDY-Xyu7FkdnFpVbt0jv7RqV7MniYNV5MmJI0BJG-BS3p7SCoG16dMRBPFeLD9eYz2zcG6j7n9skHcBZQe95LyW9yID_OFNi8VlbQUeT1rNRAf52dZLoyMg"
    },
    {
      label: "Nhà thờ bình minh / Cathedral Sunrise",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7SmrXFub8i3a_Spigkcgy5Mac0lh5H1SHJRqG-l926ugwZvOPJMGTK4VhqPnvRuWjj0hmtbfTjO0eWTseQXb2j-q0Kc2PYE97rP2yIezIn7m8CW0h8WkFYwox-k1DXMF0GNm3wfI30n1Rl6pzgXMaAeiAbvZdxKajh-5JuD_4Y0CH0Dz-_RKqHj_u5e-JnGcwtH9_W8TcsHFu3RojKZtrm_AV8HWcIA6Hrf0tBbuJanQTRwlTXKCgIOYj_0zgkbmwH0uq3yMRfw"
    }
  ];

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim() && !selectedPresetImage) return;

    addPost(newPostText, selectedPresetImage || undefined);
    setNewPostText("");
    setSelectedPresetImage(null);
  };

  const handleToggleFollow = (id: string) => {
    setSuggestedContacts(prev => prev.map(contact => {
      if (contact.id === id) {
        return { ...contact, isFollowing: !contact.isFollowing };
      }
      return contact;
    }));
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    addComment(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: "" }));
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl items-start gap-6 p-6">
      
      {/* Center column: Form & Feed */}
      <div className="flex-1 space-y-6">
        
        {/* Create Post Form */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex gap-4">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              className="h-10 w-10 rounded-full object-cover shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 space-y-3">
              <textarea 
                rows={2}
                placeholder={language === "vi" ? "Giuse Nguyễn Văn An ơi, hôm nay ban truyền thông có tin tức gì mới?" : "What's new in diocesan media today?"}
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                className="w-full resize-none border-0 bg-transparent text-xs font-medium text-slate-800 placeholder-slate-400 outline-none dark:text-zinc-200 dark:placeholder-zinc-500"
              />

              {/* Selected Image Preview */}
              {selectedPresetImage && (
                <div className="relative mt-2 rounded-xl overflow-hidden max-h-48">
                  <img 
                    src={selectedPresetImage} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <button 
                    onClick={() => setSelectedPresetImage(null)}
                    className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white text-xs hover:bg-black/80"
                  >
                    ×
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-slate-50 dark:border-zinc-800/40">
                {/* File/Image simulation upload buttons */}
                <div className="relative">
                  <button 
                    onClick={() => setImageDropdownOpen(!imageDropdownOpen)}
                    type="button"
                    className="flex items-center gap-1.5 rounded-full bg-slate-50 hover:bg-slate-100 px-3 py-1.5 text-[11px] font-bold text-slate-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700/60"
                  >
                    <Image className="w-4 h-4 text-emerald-500" />
                    <span>{language === "vi" ? "Đính kèm ảnh" : "Add Image"}</span>
                  </button>

                  {/* Preset Selector Dropdown */}
                  {imageDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setImageDropdownOpen(false)} />
                      <div className="absolute left-0 mt-2 z-20 w-64 rounded-xl border border-slate-100 bg-white p-2 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
                        <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase px-2 py-1 tracking-wider">
                          {language === "vi" ? "Chọn ảnh có sẵn:" : "Choose preset photo:"}
                        </p>
                        {imagePresets.map((preset, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSelectedPresetImage(preset.url);
                              setImageDropdownOpen(false);
                            }}
                            className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:text-zinc-300 dark:hover:bg-zinc-800 truncate"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Submit button */}
                <button 
                  onClick={handleCreatePost}
                  disabled={!newPostText.trim() && !selectedPresetImage}
                  className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-4 py-1.5 text-[11px] font-bold text-white shadow-md disabled:opacity-40 disabled:pointer-events-none hover:from-sky-700 hover:to-indigo-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>{language === "vi" ? "Đăng bài" : "Publish"}</span>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <article 
              key={post.id}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900"
            >
              {/* Header block info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={post.authorAvatar} 
                    alt={post.authorName}
                    onClick={() => setViewingUser(getProfileForUser(post.authorName, post.authorAvatar, post.authorTitle, post.authorTitleEn))}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-zinc-800 cursor-pointer hover:opacity-85 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 
                      onClick={() => setViewingUser(getProfileForUser(post.authorName, post.authorAvatar, post.authorTitle, post.authorTitleEn))}
                      className="text-xs font-bold text-slate-900 dark:text-white leading-tight cursor-pointer hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      {post.authorName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-zinc-500 font-medium">
                      <span>{language === "vi" ? post.authorTitle : post.authorTitleEn}</span>
                      <span>•</span>
                      <span className="font-mono">{language === "vi" ? post.timeAgo : post.timeAgoEn}</span>
                    </div>
                  </div>
                </div>

                {/* Label Category Tag */}
                {post.category && (
                  <span className="inline-block rounded-md bg-sky-50 px-2 py-1 text-[9px] font-bold tracking-wider text-sky-600 dark:bg-sky-950/20 dark:text-sky-400 uppercase">
                    {language === "vi" ? post.category : post.categoryEn}
                  </span>
                )}
              </div>

              {/* Content body */}
              <div className="space-y-4">
                {/* Optional Title for Diocese Articles */}
                {post.title && (
                  <h2 className="text-sm md:text-base font-serif font-bold text-slate-900 dark:text-white leading-snug tracking-tight hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                    {post.title}
                  </h2>
                )}

                <div 
                  className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed font-medium space-y-1.5 prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ 
                    __html: parseDraftContentToHTML(language === "vi" ? post.content : (post.contentEn || post.content), language) 
                  }}
                />

                {/* Article photo */}
                {post.image && (
                  <div className="rounded-xl overflow-hidden border border-slate-50 dark:border-zinc-800">
                    <img 
                      src={post.image} 
                      alt="Post visual" 
                      className="w-full max-h-[380px] object-cover hover:scale-101 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {/* Optional Attached Video */}
                {post.videoUrl && (
                  <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-zinc-800 bg-black aspect-video flex items-center justify-center">
                    {(post.videoUrl.includes("youtube.com") || post.videoUrl.includes("youtu.be")) ? (
                      <iframe 
                        className="w-full h-full"
                        src={post.videoUrl.replace("watch?v=", "embed/")}
                        title="Video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="w-full h-full relative flex flex-col justify-center items-center text-white bg-slate-950 p-6 text-center">
                        <div className="z-10 bg-black/60 p-4 rounded-full hover:scale-110 transition cursor-pointer">
                          <Play className="w-6 h-6 text-white fill-current" />
                        </div>
                        <span className="z-10 mt-2 text-xs font-mono font-bold tracking-wider bg-black/50 px-3 py-1 rounded-full text-slate-300">
                          {language === "vi" ? "VIDEO MỤC VỤ GIÁO PHẬN" : "DIOCESAN VIDEO"}
                        </span>
                        <p className="z-10 text-[10px] text-slate-400 mt-1 max-w-xs truncate">{post.videoUrl}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Optional Attached Event Details */}
                {post.eventDate && (
                  <div className="flex gap-4 items-center p-4 rounded-xl bg-amber-50/55 dark:bg-amber-950/10 border border-amber-100/40 dark:border-amber-950/20">
                    <div className="flex flex-col items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-650 text-white shrink-0 text-center shadow-xs">
                      <span className="text-base font-bold font-mono leading-none">{post.eventDate.split(" ")[0]}</span>
                      <span className="text-[8px] font-extrabold uppercase tracking-widest mt-0.5 leading-none">
                        {post.eventDate.split(" ")[1] || (language === "vi" ? "THÁNG" : "MON")}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wider">
                        {language === "vi" ? "Sự kiện giáo phận đính kèm" : "Attached Diocesan Event"}
                      </h4>
                      <p className="text-[11px] text-slate-600 dark:text-zinc-400">
                        <span className="font-semibold text-slate-800 dark:text-zinc-200">📍 {language === "vi" ? "Địa điểm:" : "Location:"}</span> {post.eventLocation || "Nhà Thờ Giáo Phận"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Feed metrics */}
              <div className="flex items-center justify-between py-3.5 border-y border-slate-50 dark:border-zinc-800/40 mt-4 text-[10px] text-slate-400 dark:text-zinc-500 font-bold tracking-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-800 dark:text-zinc-200">{post.likes.toLocaleString()}</span>
                  <span>{language === "vi" ? "lượt thích" : "likes"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-800 dark:text-zinc-200">{post.commentsCount}</span>
                  <span>{language === "vi" ? "bình luận" : "comments"}</span>
                </div>
              </div>

              {/* Actions row button */}
              <div className="flex items-center justify-between pt-3 text-xs font-bold text-slate-600 dark:text-zinc-400">
                
                {/* Like Button */}
                <button 
                  onClick={() => likePost(post.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800 transition ${post.hasLiked ? "text-rose-600 hover:text-rose-700" : ""}`}
                >
                  <ThumbsUp className={`w-4 h-4 ${post.hasLiked ? "fill-current text-rose-600" : ""}`} />
                  <span>{language === "vi" ? "Thích" : "Like"}</span>
                </button>

                {/* Comment Toggle Button */}
                <button 
                  onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{language === "vi" ? "Bình luận" : "Comment"}</span>
                </button>

                {/* Bookmark Button */}
                <button 
                  onClick={() => bookmarkPost(post.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800 transition ${post.hasBookmarked ? "text-amber-500" : ""}`}
                >
                  <Bookmark className={`w-4 h-4 ${post.hasBookmarked ? "fill-current text-amber-500" : ""}`} />
                  <span>{language === "vi" ? "Lưu" : "Save"}</span>
                </button>

                {/* Share Button (Mock text copy trigger) */}
                <button 
                  onClick={() => alert(language === "vi" ? "Đã sao chép liên kết chia sẻ!" : "Shared link copied to clipboard!")}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800 transition"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{language === "vi" ? "Chia sẻ" : "Share"}</span>
                </button>
              </div>

              {/* Interactive Comments Drawer */}
              {activeCommentPostId === post.id && (
                <div className="mt-4 pt-4 border-t border-slate-50 dark:border-zinc-800/40 space-y-4">
                  
                  {/* List of comments */}
                  {post.comments.length > 0 && (
                    <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                      {post.comments.map((cmt) => (
                        <div key={cmt.id} className="flex gap-2.5 bg-slate-50 dark:bg-zinc-800/40 p-2.5 rounded-xl">
                          <img 
                            src={cmt.userAvatar} 
                            alt={cmt.userName}
                            onClick={() => setViewingUser(getProfileForUser(cmt.userName, cmt.userAvatar))}
                            className="h-7 w-7 rounded-full object-cover shrink-0 cursor-pointer hover:opacity-85"
                            referrerPolicy="no-referrer"
                          />
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span 
                                onClick={() => setViewingUser(getProfileForUser(cmt.userName, cmt.userAvatar))}
                                className="text-[11px] font-bold text-slate-900 dark:text-white cursor-pointer hover:underline"
                              >
                                {cmt.userName}
                              </span>
                              <span className="text-[9px] font-mono text-slate-400 dark:text-zinc-500">{cmt.createdAt}</span>
                            </div>
                            <p className="text-[11px] text-slate-700 dark:text-zinc-300 leading-relaxed font-medium">
                              {cmt.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Input form comment */}
                  <div className="flex gap-2.5 items-center">
                    <img 
                      src={currentUser.avatar} 
                      alt="Me" 
                      className="h-8 w-8 rounded-full object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="relative flex-1">
                      <input 
                        type="text" 
                        placeholder={language === "vi" ? "Nhập bình luận của bạn..." : "Write a comment..."}
                        value={commentInputs[post.id] || ""}
                        onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                        onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit(post.id)}
                        className="w-full rounded-full border border-slate-100 bg-slate-50 py-2 pl-4 pr-10 text-[11px] font-medium text-slate-800 outline-none focus:border-sky-500 focus:bg-white dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                      />
                      <button 
                        onClick={() => handleCommentSubmit(post.id)}
                        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-sky-600 hover:text-sky-700"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              )}

            </article>
          ))}
        </div>

      </div>

      {/* Right column: Trends, calendar events, Suggested followers */}
      <aside className="hidden w-80 space-y-6 lg:block shrink-0">
        
        {/* Trending Section */}
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-50 dark:border-zinc-800/40 pb-2">
            {language === "vi" ? "Chủ đề thảo luận chính" : "Theological Trends"}
          </h3>
          <ul className="space-y-4">
            {trends.map((trend) => (
              <li key={trend.id} className="group cursor-pointer">
                <span className="text-[11px] font-bold text-sky-600 group-hover:underline dark:text-sky-400 block">
                  {trend.tag}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium font-mono">
                  {language === "vi" ? trend.postsCount : trend.postsCountEn}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Calendar Events Section */}
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-50 dark:border-zinc-800/40 pb-2">
            {language === "vi" ? "Sự kiện sắp tới" : "Upcoming Events"}
          </h3>
          <div className="space-y-4">
            {upcomingEvents.map((ev) => (
              <div key={ev.id} className="flex gap-3.5 items-center">
                {/* Visual Calendar Block representation */}
                <div className="flex flex-col items-center justify-center h-12 w-12 rounded-xl bg-sky-50 dark:bg-sky-950/20 shrink-0 text-center border border-sky-100/30">
                  <span className="text-sm font-bold text-sky-600 dark:text-sky-400 font-mono leading-none">{ev.date}</span>
                  <span className="text-[8px] font-bold text-sky-500 uppercase tracking-widest mt-0.5 leading-none">
                    {language === "vi" ? ev.month : ev.monthEn}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {language === "vi" ? ev.title : ev.titleEn}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-zinc-500 font-medium">
                    <MapPin className="w-3 h-3 text-slate-300" />
                    <span>{language === "vi" ? ev.location : ev.locationEn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Suggested follows connect */}
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-50 dark:border-zinc-800/40 pb-2">
            {language === "vi" ? "Gợi ý kết nối" : "Who to Follow"}
          </h3>
          <div className="space-y-4">
            {suggestedContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between">
                <div className="flex gap-2.5 items-center">
                  <img 
                    src={contact.avatar} 
                    alt={contact.name}
                    onClick={() => setViewingUser(getProfileForUser(contact.name, contact.avatar, contact.role, contact.roleEn))}
                    className="h-9 w-9 rounded-full object-cover cursor-pointer hover:opacity-85 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 
                      onClick={() => setViewingUser(getProfileForUser(contact.name, contact.avatar, contact.role, contact.roleEn))}
                      className="text-xs font-bold text-slate-900 dark:text-white leading-tight cursor-pointer hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      {contact.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium leading-none block">
                      {language === "vi" ? contact.role : contact.roleEn}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => handleToggleFollow(contact.id)}
                  className={`
                    flex items-center gap-1 rounded-full px-3 py-1 text-[9px] font-bold tracking-tight transition
                    ${contact.isFollowing 
                      ? "bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-300"
                      : "bg-sky-50 text-sky-600 dark:bg-sky-950/20 dark:text-sky-400"
                    }
                  `}
                >
                  {contact.isFollowing ? (
                    <>
                      <UserCheck className="w-3 h-3" />
                      <span>{language === "vi" ? "Đã theo dõi" : "Following"}</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3 h-3" />
                      <span>{language === "vi" ? "Theo dõi" : "Follow"}</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

      </aside>

    </div>
  );
};
