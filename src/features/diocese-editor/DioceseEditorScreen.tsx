import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Post } from "../../types";
import { parseDraftContentToHTML } from "../../utils/editorParser";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  List, 
  ListOrdered,
  Quote, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Calendar as CalendarIcon, 
  Eye, 
  FileText, 
  Send, 
  Trash2, 
  Heading1, 
  Heading2,
  FileCheck,
  Sparkles,
  Link,
  ChevronDown,
  Highlighter,
  Palette,
  Type,
  Table,
  Eraser,
  Subscript,
  Superscript,
  Minus,
  CheckCircle,
  X,
  FileDown
} from "lucide-react";

export const DioceseEditorScreen: React.FC = () => {
  const { language, posts, setPosts, currentUser, setCurrentUser, setActiveScreen } = useApp();

  // Primary post states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("TIN GIÁO PHẬN");
  const [content, setContent] = useState("");
  
  // Ecclesiastical metadata (events/primary photo)
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [attachedVideo, setAttachedVideo] = useState<string | null>(null);
  const [hasEvent, setHasEvent] = useState(false);
  const [eventDate, setEventDate] = useState("25 DEC");
  const [eventLocation, setEventLocation] = useState("");

  // Ribbon Navigation state
  const [currentTab, setCurrentTab] = useState<"home" | "insert" | "ai">("home");
  const [activeEmbed, setActiveEmbed] = useState<"image" | "video" | "file" | "link" | "event" | "table" | null>(null);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  // Font properties simulation states
  const [activeFont, setActiveFont] = useState("font-sans");
  const [activeSize, setActiveSize] = useState("text-xs");
  const [activeColor, setActiveColor] = useState("");
  const [activeHighlight, setActiveHighlight] = useState("");

  // Dropdown states for toolbar menus
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [showSizeMenu, setShowSizeMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showHighlightMenu, setShowHighlightMenu] = useState(false);

  // Embed form fields state
  const [embedImgUrl, setEmbedImgUrl] = useState("");
  const [embedImgCaption, setEmbedImgCaption] = useState("");
  const [embedVideoUrl, setEmbedVideoUrl] = useState("");
  const [embedFileUrl, setEmbedFileUrl] = useState("");
  const [embedFileName, setEmbedFileName] = useState("");
  const [embedLinkUrl, setEmbedLinkUrl] = useState("");
  const [embedLinkText, setEmbedLinkText] = useState("");

  const categories = [
    "TIN GIÁO PHẬN",
    "PHỤNG VỤ",
    "MỤC VỤ",
    "SUY NIỆM",
    "GIÁO LÝ",
    "THÔNG ĐIỆP",
    "THÔNG BÁO"
  ];

  const fontsList = [
    { label: "Inter (Sans-serif)", value: "font-sans" },
    { label: "Times New Roman (Serif)", value: "font-serif" },
    { label: "JetBrains Mono (Technical)", value: "font-mono" }
  ];

  const sizesList = [
    { label: "10px - Chữ nhỏ", value: "text-[10px]" },
    { label: "12px - Chữ thường", value: "text-xs" },
    { label: "14px - Chữ vừa", value: "text-sm" },
    { label: "16px - Chữ lớn", value: "text-base" },
    { label: "18px - Chữ tiêu đề phụ", value: "text-lg" },
    { label: "24px - Chữ tiêu đề chính", value: "text-2xl font-bold" }
  ];

  const colorsList = [
    { label: "Mặc định", value: "" },
    { label: "Đỏ hồng mục vụ", value: "text-red-600" },
    { label: "Xanh thiên thanh", value: "text-sky-600" },
    { label: "Xanh ngọc phượng", value: "text-emerald-600" },
    { label: "Vàng kim phụng vụ", value: "text-amber-500" },
    { label: "Tím Mùa Chay", value: "text-purple-600" }
  ];

  const highlightsList = [
    { label: "Không màu", value: "" },
    { label: "Bút vàng", value: "bg-yellow-100 dark:bg-yellow-950/40 px-1 rounded" },
    { label: "Bút xanh lá", value: "bg-emerald-100 dark:bg-emerald-950/40 px-1 rounded" },
    { label: "Bút xanh dương", value: "bg-sky-100 dark:bg-sky-950/40 px-1 rounded" },
    { label: "Bút đỏ hồng", value: "bg-rose-100 dark:bg-rose-950/40 px-1 rounded" }
  ];

  const imagePresets = [
    {
      label: "Thánh Đường Lớn / Cathedral",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7SmrXFub8i3a_Spigkcgy5Mac0lh5H1SHJRqG-l926ugwZvOPJMGTK4VhqPnvRuWjj0hmtbfTjO0eWTseQXb2j-q0Kc2PYE97rP2yIezIn7m8CW0h8WkFYwox-k1DXMF0GNm3wfI30n1Rl6pzgXMaAeiAbvZdxKajh-5JuD_4Y0CH0Dz-_RKqHj_u5e-JnGcwtH9_W8TcsHFu3RojKZtrm_AV8HWcIA6Hrf0tBbuJanQTRwlTXKCgIOYj_0zgkbmwH0uq3yMRfw"
    },
    {
      label: "Đại Hội Giới Trẻ / Youth Gathering",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiQzc2hKLyIT-3_CeVuJUJnwx2ovxJHcl90QCdpzsx1O0t-jBbGBKtkhMlrw6cgLm38QBAwu4snIabq2yI6H_T1c74_pQDWc1tMoHPq2KJh4pRwTY7w7zk5v4LES-8N2WG_hKhb_wkcFjoqkI_Q9C54zeSvwcWp2S5lNbe8msEykGdzGnOwJylEqcvU1CAYbaD0ApZkMy1_ed6L5cP5EugpERQeSvhGBcd3i4XDv_1l1N1oMzMt79TWBEq0IQfSFvLxDc7SAxH_w"
    },
    {
      label: "Kinh Thánh & Cầu nguyện / Holy Bible",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhXIBQpQe6bMBJs7V0PcQ12bkdiCZAHgof-BMWGygl3c8PwHORu4ck_OHZTFog81f8oGAapJ1VNUXGUmT9lFXTnPGhjO7jFrBYhdkCh3ut34p8xh_jvNjGYR-0rcjNWoyZ0eG3SmDLkcuf8wC67yZqhLx8MnF0L-U0FHqybbiJOyBMFkPrFZl4CmR3edNBXLFNpz5yILFsOmxDkPT_TW1_29J94LpWXCklkll6yuqfufqoWvzs7_7P5h8btuBmD-sgTnEDn1Oqbg"
    }
  ];

  const filePresets = [
    { label: "Thông điệp Người Trẻ Năm Thánh 2026.pdf", url: "https://images.unsplash.com/doc/appoint_2026.pdf" },
    { label: "Nghi thức Chầu Thánh Thể Giáo Phận.docx", url: "https://images.unsplash.com/doc/giao_ly_du_tong.docx" },
    { label: "Sách Hướng Dẫn Sinh Hoạt Giới Trẻ TGP.pdf", url: "https://images.unsplash.com/doc/ban_do_giao_hat.pdf" }
  ];

  // MS Word style text block insertion
  const insertTextAtCursor = (textBefore: string, textAfter: string = "") => {
    const textarea = document.getElementById("editor-textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    
    const selected = text.substring(start, end);
    const replacement = textBefore + selected + textAfter;
    
    setContent(text.substring(0, start) + replacement + text.substring(end));
    
    // Maintain focus and set proper range selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + textBefore.length, start + textBefore.length + selected.length);
    }, 50);
  };

  // Quick formatting buttons action triggers
  const handleBold = () => insertTextAtCursor("<b>", "</b>");
  const handleItalic = () => insertTextAtCursor("<i>", "</i>");
  const handleUnderline = () => insertTextAtCursor("<u>", "</u>");
  const handleStrikethrough = () => insertTextAtCursor("<s>", "</s>");
  const handleSubscript = () => insertTextAtCursor("<sub>", "</sub>");
  const handleSuperscript = () => insertTextAtCursor("<sup>", "</sup>");
  const handleHeader1 = () => insertTextAtCursor("\n# ", "\n");
  const handleHeader2 = () => insertTextAtCursor("\n## ", "\n");
  const handleBulletList = () => insertTextAtCursor("\n- ", "\n");
  const handleNumberedList = () => insertTextAtCursor("\n1. ", "\n");
  const handleQuote = () => insertTextAtCursor("\n> ", "\n");
  const handleHorizontalRule = () => insertTextAtCursor("\n---\n", "");

  const handleApplyFont = (fontClass: string) => {
    insertTextAtCursor(`<span class="${fontClass}">`, "</span>");
    setActiveFont(fontClass);
    setShowFontMenu(false);
  };

  const handleApplySize = (sizeClass: string) => {
    insertTextAtCursor(`<span class="${sizeClass}">`, "</span>");
    setActiveSize(sizeClass);
    setShowSizeMenu(false);
  };

  const handleApplyColor = (colorClass: string) => {
    if (colorClass === "") {
      insertTextAtCursor("", "");
    } else {
      insertTextAtCursor(`<span class="${colorClass}">`, "</span>");
    }
    setActiveColor(colorClass);
    setShowColorMenu(false);
  };

  const handleApplyHighlight = (highlightClass: string) => {
    if (highlightClass === "") {
      insertTextAtCursor("", "");
    } else {
      insertTextAtCursor(`<span class="${highlightClass}">`, "</span>");
    }
    setActiveHighlight(highlightClass);
    setShowHighlightMenu(false);
  };

  // Insertion trigger forms
  const handleInsertImage = () => {
    if (!embedImgUrl.trim()) {
      alert(language === "vi" ? "Vui lòng chọn ảnh hoặc nhập URL ảnh!" : "Please choose or enter an image URL!");
      return;
    }
    const captionText = embedImgCaption.trim() ? `|${embedImgCaption.trim()}` : "";
    insertTextAtCursor(`\n[img: ${embedImgUrl.trim()}${captionText}]\n`, "");
    
    // Set as main post cover too for newsfeed layout
    if (!attachedImage) {
      setAttachedImage(embedImgUrl.trim());
    }
    
    setEmbedImgUrl("");
    setEmbedImgCaption("");
    setActiveEmbed(null);
  };

  const handleInsertVideo = () => {
    if (!embedVideoUrl.trim()) {
      alert(language === "vi" ? "Vui lòng nhập link video YouTube!" : "Please enter a YouTube video URL!");
      return;
    }
    insertTextAtCursor(`\n[video: ${embedVideoUrl.trim()}]\n`, "");
    
    // Set as main post video too
    if (!attachedVideo) {
      setAttachedVideo(embedVideoUrl.trim());
    }

    setEmbedVideoUrl("");
    setActiveEmbed(null);
  };

  const handleInsertFile = () => {
    if (!embedFileUrl.trim()) {
      alert(language === "vi" ? "Vui lòng nhập URL tài liệu đính kèm!" : "Please enter a file URL!");
      return;
    }
    const filename = embedFileName.trim() || (language === "vi" ? "Tai-lieu-Muc-vu.pdf" : "Document.pdf");
    insertTextAtCursor(`\n[file: ${embedFileUrl.trim()}|${filename}]\n`, "");
    setEmbedFileUrl("");
    setEmbedFileName("");
    setActiveEmbed(null);
  };

  const handleInsertLink = () => {
    if (!embedLinkUrl.trim()) {
      alert(language === "vi" ? "Vui lòng nhập URL liên kết!" : "Please enter the link URL!");
      return;
    }
    const display = embedLinkText.trim() || embedLinkUrl.trim();
    insertTextAtCursor(`[${display}](${embedLinkUrl.trim()})`, "");
    setEmbedLinkUrl("");
    setEmbedLinkText("");
    setActiveEmbed(null);
  };

  const handleInsertTable = () => {
    const tableTemplate = 
      `\n| Chức Danh | Ban Đại Diện | Điện Thoại | \n` +
      `| --- | --- | --- | \n` +
      `| Cha Xứ | Cha Giuse Nguyễn Văn A | 090xxxxxxx | \n` +
      `| Hội Đồng | Ông Trưởng Ban Giuse | 091xxxxxxx | \n`;
    insertTextAtCursor(tableTemplate, "");
    setActiveEmbed(null);
  };

  const handleApplyEvent = () => {
    setHasEvent(true);
    alert(language === "vi" ? "Đã liên kết thông tin sự kiện vào metadata bài viết thành công!" : "Event linked to article metadata successfully!");
    setActiveEmbed(null);
  };

  const handleClear = () => {
    if (confirm(language === "vi" ? "Bạn có chắc chắn muốn xóa toàn bộ nội dung đã soạn thảo?" : "Are you sure you want to clear the entire draft?")) {
      setTitle("");
      setContent("");
      setAttachedImage(null);
      setAttachedVideo(null);
      setHasEvent(false);
      setEventLocation("");
    }
  };

  const handlePublish = () => {
    if (!title.trim()) {
      alert(language === "vi" ? "Vui lòng nhập tiêu đề bài viết giáo phận!" : "Please enter the diocese article title!");
      return;
    }
    if (!content.trim()) {
      alert(language === "vi" ? "Vui lòng nhập nội dung bài viết!" : "Please enter the article content!");
      return;
    }

    const newPost: Post = {
      id: `post_diocese_${Date.now()}`,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorTitle: "Ban Biên Tập • TGP Phú Cường",
      authorTitleEn: "Editorial Board • Phu Cuong Diocese",
      timeAgo: "Vừa xong",
      timeAgoEn: "Just now",
      title: title,
      content: content,
      contentEn: content,
      image: attachedImage || undefined,
      videoUrl: attachedVideo || undefined,
      eventDate: hasEvent ? eventDate : undefined,
      eventLocation: hasEvent ? eventLocation : undefined,
      likes: 0,
      commentsCount: 0,
      comments: [],
      hasLiked: false,
      hasBookmarked: false,
      category: category,
      categoryEn: category,
      readTime: `${Math.max(1, Math.round(content.split(" ").length / 150))} phút đọc`,
      readTimeEn: `${Math.max(1, Math.round(content.split(" ").length / 150))} min read`
    };

    setPosts([newPost, ...posts]);

    setCurrentUser(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        posts: prev.stats.posts + 1
      }
    }));

    alert(language === "vi" ? "Chúc mừng! Bài viết chính thức của Giáo phận đã được xuất bản và đồng bộ vào Trang Chủ thành công!" : "Congratulations! The official diocesan article has been published and successfully synced with the newsfeed!");
    setActiveScreen("newsfeed");
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col p-6 space-y-6">
      
      {/* Top action header info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-zinc-800 pb-5">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5.5 h-5.5 text-sky-600" />
            <span>{language === "vi" ? "Soạn thảo bài viết Giáo phận" : "Draft Diocese Article"}</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
            {language === "vi" 
              ? "Soạn tin tức, văn kiện mục vụ, văn kiện truyền thông giáo lý đạt chuẩn MS Word." 
              : "Draft diocesan documents, parish regulations and announcements like MS Word."}
          </p>
        </div>

        {/* Tab switcher: Edit vs Real-time Preview */}
        <div className="flex bg-slate-100 dark:bg-zinc-800 rounded-xl p-0.5 self-start md:self-auto text-xs font-semibold">
          <button 
            onClick={() => setActiveTab("edit")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${activeTab === "edit" ? "bg-white text-slate-900 shadow-xs dark:bg-zinc-700 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:text-zinc-400"}`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{language === "vi" ? "Chế độ viết" : "Editor mode"}</span>
          </button>
          <button 
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${activeTab === "preview" ? "bg-white text-slate-900 shadow-xs dark:bg-zinc-700 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:text-zinc-400"}`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{language === "vi" ? "Xem trước" : "Live Preview"}</span>
          </button>
        </div>
      </div>

      {activeTab === "edit" ? (
        /* EDITING MODE PANEL */
        <div className="space-y-4">
          
          {/* Title & Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-zinc-400">
                {language === "vi" ? "Tiêu đề bài viết" : "Article Title"}
              </label>
              <input 
                type="text"
                placeholder={language === "vi" ? "Nhập tiêu đề truyền thông chính thức của giáo xứ / giáo hạt..." : "Enter formal publication title..."}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 font-bold outline-none transition-all focus:border-sky-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-zinc-400">
                {language === "vi" ? "Chuyên mục" : "Category"}
              </label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 font-bold outline-none transition-all focus:border-sky-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* RE-ARCHITECTED MS WORD-STYLE TOOLBAR RIBBON */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
            
            {/* Ribbon Top Tabs (Word style) */}
            <div className="flex items-center gap-1 bg-slate-50 dark:bg-zinc-950 px-4 pt-2 border-b border-slate-200 dark:border-zinc-800/60">
              <button 
                type="button"
                onClick={() => {
                  setCurrentTab("home");
                  setActiveEmbed(null);
                }}
                className={`px-4 py-2 text-xs font-bold rounded-t-xl border-b-2 transition-all ${currentTab === "home" ? "border-sky-600 text-sky-600 bg-white dark:bg-zinc-900 dark:text-sky-400" : "border-transparent text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200"}`}
              >
                {language === "vi" ? "Trang chủ (Home)" : "Home Tab"}
              </button>
              <button 
                type="button"
                onClick={() => {
                  setCurrentTab("insert");
                  setActiveEmbed(null);
                }}
                className={`px-4 py-2 text-xs font-bold rounded-t-xl border-b-2 transition-all ${currentTab === "insert" ? "border-sky-600 text-sky-600 bg-white dark:bg-zinc-900 dark:text-sky-400" : "border-transparent text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200"}`}
              >
                {language === "vi" ? "Chèn (Insert)" : "Insert Tab"}
              </button>
              <button 
                type="button"
                onClick={() => {
                  setCurrentTab("ai");
                  setActiveEmbed(null);
                }}
                className={`px-4 py-2 text-xs font-bold rounded-t-xl border-b-2 transition-all ${currentTab === "ai" ? "border-sky-600 text-sky-600 bg-white dark:bg-zinc-900 dark:text-sky-400" : "border-transparent text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200"}`}
              >
                {language === "vi" ? "Trợ lý AI (Theology AI)" : "AI Assistant"}
              </button>
            </div>

            {/* Ribbon Sub-Toolbar Content */}
            <div className="p-2 bg-white dark:bg-zinc-900 flex flex-wrap items-center gap-1.5 border-b border-slate-100 dark:border-zinc-800/40">
              
              {currentTab === "home" && (
                <>
                  {/* Font Dropdown (Simulating Font Family) */}
                  <div className="relative">
                    <button 
                      type="button"
                      onClick={() => {
                        setShowFontMenu(!showFontMenu);
                        setShowSizeMenu(false);
                        setShowColorMenu(false);
                        setShowHighlightMenu(false);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 text-[11px] font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 transition"
                    >
                      <Type className="w-3.5 h-3.5 text-sky-600" />
                      <span className="truncate max-w-[80px]">{fontsList.find(f => f.value === activeFont)?.label.split(" ")[0]}</span>
                      <ChevronDown className="w-3 h-3 text-slate-400" />
                    </button>
                    {showFontMenu && (
                      <div className="absolute top-full left-0 mt-1 z-30 bg-white dark:bg-zinc-850 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-lg p-1 min-w-[170px] space-y-0.5">
                        {fontsList.map((f, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleApplyFont(f.value)}
                            className={`w-full text-left px-3 py-1.5 rounded-lg text-[10px] font-medium transition ${activeFont === f.value ? 'bg-sky-50 text-sky-600 dark:bg-sky-950/20' : 'hover:bg-slate-50 dark:hover:bg-zinc-800'}`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Font Size Dropdown */}
                  <div className="relative">
                    <button 
                      type="button"
                      onClick={() => {
                        setShowSizeMenu(!showSizeMenu);
                        setShowFontMenu(false);
                        setShowColorMenu(false);
                        setShowHighlightMenu(false);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 text-[11px] font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 transition"
                    >
                      <span className="text-[11px] font-extrabold text-sky-600">A</span>
                      <span>{sizesList.find(s => s.value === activeSize)?.label.split(" ")[0]}</span>
                      <ChevronDown className="w-3 h-3 text-slate-400" />
                    </button>
                    {showSizeMenu && (
                      <div className="absolute top-full left-0 mt-1 z-30 bg-white dark:bg-zinc-850 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-lg p-1 min-w-[150px] space-y-0.5">
                        {sizesList.map((s, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleApplySize(s.value)}
                            className={`w-full text-left px-3 py-1.5 rounded-lg text-[10px] font-medium transition ${activeSize === s.value ? 'bg-sky-50 text-sky-600 dark:bg-sky-950/20' : 'hover:bg-slate-50 dark:hover:bg-zinc-800'}`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="w-px h-5 bg-slate-200 dark:bg-zinc-800 mx-0.5" />

                  {/* Classic Formatting Buttons */}
                  <button 
                    type="button"
                    onClick={handleBold} 
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 dark:text-zinc-400 dark:hover:bg-zinc-800 transition"
                    title="In đậm (Bold)"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button 
                    type="button"
                    onClick={handleItalic} 
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 dark:text-zinc-400 dark:hover:bg-zinc-800 transition"
                    title="In nghiêng (Italic)"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button 
                    type="button"
                    onClick={handleUnderline} 
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 dark:text-zinc-400 dark:hover:bg-zinc-800 transition"
                    title="Gạch chân (Underline)"
                  >
                    <Underline className="w-4 h-4" />
                  </button>
                  <button 
                    type="button"
                    onClick={handleStrikethrough} 
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 dark:text-zinc-400 dark:hover:bg-zinc-800 transition font-serif font-bold text-xs"
                    title="Gạch ngang (Strikethrough)"
                  >
                    <s>ab</s>
                  </button>

                  <div className="w-px h-5 bg-slate-200 dark:bg-zinc-800 mx-0.5" />

                  {/* Subscript / Superscript */}
                  <button 
                    type="button"
                    onClick={handleSubscript} 
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 dark:text-zinc-400 dark:hover:bg-zinc-800 transition"
                    title="Chỉ số dưới (Subscript)"
                  >
                    <Subscript className="w-4 h-4" />
                  </button>
                  <button 
                    type="button"
                    onClick={handleSuperscript} 
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 dark:text-zinc-400 dark:hover:bg-zinc-800 transition"
                    title="Chỉ số trên (Superscript)"
                  >
                    <Superscript className="w-4 h-4" />
                  </button>

                  <div className="w-px h-5 bg-slate-200 dark:bg-zinc-800 mx-0.5" />

                  {/* Text Color Dropdown Picker */}
                  <div className="relative">
                    <button 
                      type="button"
                      onClick={() => {
                        setShowColorMenu(!showColorMenu);
                        setShowFontMenu(false);
                        setShowSizeMenu(false);
                        setShowHighlightMenu(false);
                      }}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 dark:text-zinc-400 dark:hover:bg-zinc-800 transition flex items-center gap-1"
                      title="Màu chữ (Font Color)"
                    >
                      <Palette className="w-4 h-4 text-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-red-600 border border-white" />
                    </button>
                    {showColorMenu && (
                      <div className="absolute top-full left-0 mt-1 z-30 bg-white dark:bg-zinc-850 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-lg p-1 min-w-[150px] space-y-0.5">
                        {colorsList.map((c, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleApplyColor(c.value)}
                            className="w-full text-left px-3 py-1.5 rounded-lg text-[10px] font-medium transition hover:bg-slate-50 dark:hover:bg-zinc-800 flex items-center gap-2"
                          >
                            <span className={`inline-block w-3 h-3 rounded-full ${c.value ? c.value.replace('text-', 'bg-') : 'bg-slate-400'}`} />
                            <span>{c.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Highlighter Dropdown Picker */}
                  <div className="relative">
                    <button 
                      type="button"
                      onClick={() => {
                        setShowHighlightMenu(!showHighlightMenu);
                        setShowFontMenu(false);
                        setShowSizeMenu(false);
                        setShowColorMenu(false);
                      }}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 dark:text-zinc-400 dark:hover:bg-zinc-800 transition flex items-center gap-1"
                      title="Bút dạ quang (Highlight Color)"
                    >
                      <Highlighter className="w-4 h-4 text-yellow-500" />
                      <div className="w-2.5 h-2.5 bg-yellow-300 border border-white rounded-sm" />
                    </button>
                    {showHighlightMenu && (
                      <div className="absolute top-full left-0 mt-1 z-30 bg-white dark:bg-zinc-850 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-lg p-1 min-w-[150px] space-y-0.5">
                        {highlightsList.map((hl, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleApplyHighlight(hl.value)}
                            className="w-full text-left px-3 py-1.5 rounded-lg text-[10px] font-medium transition hover:bg-slate-50 dark:hover:bg-zinc-800 flex items-center gap-2"
                          >
                            <span className={`inline-block w-4 h-2.5 rounded ${hl.value ? hl.value.replace('px-1 rounded', '') : 'bg-transparent border border-dashed border-slate-300'}`} />
                            <span>{hl.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="w-px h-5 bg-slate-200 dark:bg-zinc-800 mx-0.5" />

                  {/* Alignment buttons */}
                  <button 
                    type="button"
                    onClick={() => insertTextAtCursor('<div class="text-left">', "</div>")} 
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 dark:text-zinc-400 dark:hover:bg-zinc-800 transition"
                    title="Căn lề trái"
                  >
                    <AlignLeft className="w-4 h-4" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => insertTextAtCursor('<div class="text-center">', "</div>")} 
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 dark:text-zinc-400 dark:hover:bg-zinc-800 transition"
                    title="Căn giữa"
                  >
                    <AlignCenter className="w-4 h-4" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => insertTextAtCursor('<div class="text-right">', "</div>")} 
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 dark:text-zinc-400 dark:hover:bg-zinc-800 transition"
                    title="Căn lề phải"
                  >
                    <AlignRight className="w-4 h-4" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => insertTextAtCursor('<div class="text-justify">', "</div>")} 
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 dark:text-zinc-400 dark:hover:bg-zinc-800 transition"
                    title="Căn đều hai bên"
                  >
                    <AlignJustify className="w-4 h-4" />
                  </button>

                  <div className="w-px h-5 bg-slate-200 dark:bg-zinc-800 mx-0.5" />

                  {/* Headers */}
                  <button 
                    type="button"
                    onClick={handleHeader1} 
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 dark:text-zinc-400 dark:hover:bg-zinc-800 transition"
                    title="Tiêu đề chính lớn (H1)"
                  >
                    <Heading1 className="w-4 h-4" />
                  </button>
                  <button 
                    type="button"
                    onClick={handleHeader2} 
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 dark:text-zinc-400 dark:hover:bg-zinc-800 transition"
                    title="Tiêu đề phụ vừa (H2)"
                  >
                    <Heading2 className="w-4 h-4" />
                  </button>

                  {/* Bullet / Numbered lists */}
                  <button 
                    type="button"
                    onClick={handleBulletList} 
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 dark:text-zinc-400 dark:hover:bg-zinc-800 transition"
                    title="Danh sách dấu chấm"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button 
                    type="button"
                    onClick={handleNumberedList} 
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 dark:text-zinc-400 dark:hover:bg-zinc-800 transition"
                    title="Danh sách số"
                  >
                    <ListOrdered className="w-4 h-4" />
                  </button>
                </>
              )}

              {currentTab === "insert" && (
                <>
                  {/* Inline Image Insertion trigger */}
                  <button 
                    type="button"
                    onClick={() => setActiveEmbed(activeEmbed === "image" ? null : "image")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition ${activeEmbed === "image" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20" : "border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300"}`}
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{language === "vi" ? "Nhúng hình ảnh" : "Inline Image"}</span>
                  </button>

                  {/* Embedded File attachments trigger */}
                  <button 
                    type="button"
                    onClick={() => setActiveEmbed(activeEmbed === "file" ? null : "file")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition ${activeEmbed === "file" ? "bg-amber-50 text-amber-600 dark:bg-amber-950/20" : "border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300"}`}
                  >
                    <FileDown className="w-3.5 h-3.5 text-amber-500" />
                    <span>{language === "vi" ? "Đính kèm tài liệu" : "Attach File"}</span>
                  </button>

                  {/* Embedded Video trigger */}
                  <button 
                    type="button"
                    onClick={() => setActiveEmbed(activeEmbed === "video" ? null : "video")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition ${activeEmbed === "video" ? "bg-sky-50 text-sky-600 dark:bg-sky-950/20" : "border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300"}`}
                  >
                    <VideoIcon className="w-3.5 h-3.5 text-sky-500" />
                    <span>{language === "vi" ? "Nhúng Video YouTube" : "Embed YouTube"}</span>
                  </button>

                  {/* Links trigger */}
                  <button 
                    type="button"
                    onClick={() => setActiveEmbed(activeEmbed === "link" ? null : "link")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition ${activeEmbed === "link" ? "bg-blue-50 text-blue-600 dark:bg-blue-950/20" : "border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300"}`}
                  >
                    <Link className="w-3.5 h-3.5 text-blue-500" />
                    <span>{language === "vi" ? "Chèn Liên kết" : "Insert Link"}</span>
                  </button>

                  {/* Table Template trigger */}
                  <button 
                    type="button"
                    onClick={() => setActiveEmbed(activeEmbed === "table" ? null : "table")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition ${activeEmbed === "table" ? "bg-teal-50 text-teal-600 dark:bg-teal-950/20" : "border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300"}`}
                  >
                    <Table className="w-3.5 h-3.5 text-teal-500" />
                    <span>{language === "vi" ? "Chèn Bảng mẫu" : "Insert Table"}</span>
                  </button>

                  {/* Event details metadata trigger */}
                  <button 
                    type="button"
                    onClick={() => setActiveEmbed(activeEmbed === "event" ? null : "event")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition ${activeEmbed === "event" ? "bg-purple-50 text-purple-600 dark:bg-purple-950/20" : "border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300"}`}
                  >
                    <CalendarIcon className="w-3.5 h-3.5 text-purple-500" />
                    <span>{language === "vi" ? "Thiết lập Sự kiện" : "Set Event"}</span>
                  </button>

                  <div className="w-px h-5 bg-slate-200 dark:bg-zinc-800 mx-0.5" />

                  {/* Extra layout inserts */}
                  <button 
                    type="button"
                    onClick={handleQuote} 
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 dark:text-zinc-400 dark:hover:bg-zinc-800 transition"
                    title="Khối trích dẫn (Blockquote)"
                  >
                    <Quote className="w-4 h-4" />
                  </button>
                  <button 
                    type="button"
                    onClick={handleHorizontalRule} 
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 dark:text-zinc-400 dark:hover:bg-zinc-800 transition"
                    title="Đường kẻ ngang tách dòng (Horizontal Rule)"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </>
              )}

              {currentTab === "ai" && (
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400">
                    <Sparkles className="w-4 h-4 text-sky-500 animate-pulse" />
                    <span>{language === "vi" ? "Theology AI sẽ phân tích tiêu đề và tự động soạn thảo đoạn văn mục vụ chất lượng cao:" : "Theology AI drafts high-quality Catholic content based on title:"}</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      if (!title.trim()) {
                        alert(language === "vi" ? "Vui lòng nhập tiêu đề để Theology AI có thể gợi ý ý tưởng tốt nhất!" : "Please enter a title for Theology AI suggestions!");
                        return;
                      }
                      setContent(prev => prev + `\n\n--- Ý tưởng truyền thông gợi ý bởi Theology AI ---\nTổng Giáo phận kêu gọi mọi thành phần dân Chúa tích cực chuẩn bị tâm hồn hiền hậu, sống sốt mến hướng tới ngày hồng phúc Năm Thánh. Các ban ngành đoàn thể, giáo khu, các hội đoàn cần phối hợp chặt chẽ cùng ban truyền thông mục vụ giáo xứ để tổ chức tốt các giờ chầu Thánh Thể cầu nguyện cho đại hội giới trẻ năm nay diễn ra tốt đẹp.`);
                    }}
                    className="flex items-center gap-1 bg-sky-600 hover:bg-sky-700 text-white px-3.5 py-1.5 rounded-xl text-[10px] font-bold transition-all shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{language === "vi" ? "Soạn thảo bài bằng AI" : "Draft with AI Now"}</span>
                  </button>
                </div>
              )}

            </div>

            {/* DYNAMIC COLLAPSIBLE EMBED / FORMATTING PANEL */}
            {activeEmbed && (
              <div className="p-4 bg-slate-50 dark:bg-zinc-950/80 border-b border-slate-200 dark:border-zinc-800/80 animate-fadeIn text-xs space-y-3">
                
                {/* 1. Image Embed panel */}
                {activeEmbed === "image" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-emerald-500" />
                        <span>{language === "vi" ? "Chèn hình ảnh trực tiếp vào văn bản" : "Embed Inline Image"}</span>
                      </h4>
                      <button onClick={() => setActiveEmbed(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Pre-existing Library Selection */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider block">
                        {language === "vi" ? "Chọn từ thư viện hình ảnh có sẵn:" : "Choose from ready library:"}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {imagePresets.map((img, idx) => (
                          <div 
                            key={idx}
                            onClick={() => {
                              setEmbedImgUrl(img.url);
                              if (!embedImgCaption) setEmbedImgCaption(img.label.split(" / ")[0]);
                            }}
                            className={`flex items-center gap-2 p-1.5 rounded-xl bg-white dark:bg-zinc-900 border cursor-pointer hover:border-sky-500 transition-all ${embedImgUrl === img.url ? 'border-sky-500 ring-2 ring-sky-100 dark:ring-sky-950/20' : 'border-slate-200 dark:border-zinc-800'}`}
                          >
                            <img src={img.url} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                            <span className="text-[10px] font-semibold text-slate-700 dark:text-zinc-300 truncate">{img.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Custom Image URL Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 block">{language === "vi" ? "Nhập link ảnh (URL):" : "Custom Image URL:"}</span>
                        <input 
                          type="text" 
                          placeholder="https://..."
                          value={embedImgUrl}
                          onChange={(e) => setEmbedImgUrl(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 bg-white p-2 text-[10px] outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 block">{language === "vi" ? "Chú thích ảnh dưới văn bản:" : "Image Caption (Optional):"}</span>
                        <input 
                          type="text" 
                          placeholder={language === "vi" ? "Ví dụ: Thánh Lễ Truyền Tin tối thứ 6..." : "e.g. Cathedral Mass"}
                          value={embedImgCaption}
                          onChange={(e) => setEmbedImgCaption(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 bg-white p-2 text-[10px] outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <button 
                      type="button"
                      onClick={handleInsertImage}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-4 rounded-xl text-[10px] transition shadow-xs flex items-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{language === "vi" ? "Nhúng vào con trỏ" : "Insert at Cursor"}</span>
                    </button>
                  </div>
                )}

                {/* 2. File Download Attachment panel */}
                {activeEmbed === "file" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                        <FileDown className="w-4 h-4 text-amber-500" />
                        <span>{language === "vi" ? "Đính kèm tệp/văn bản tải về vào văn bản" : "Attach Downloadable File"}</span>
                      </h4>
                      <button onClick={() => setActiveEmbed(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Pre-existing library selection */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider block">
                        {language === "vi" ? "Chọn tài liệu chuẩn mực giáo hạt sẵn có:" : "Choose from default diocesan files:"}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {filePresets.map((file, idx) => (
                          <div 
                            key={idx}
                            onClick={() => {
                              setEmbedFileUrl(file.url);
                              setEmbedFileName(file.label);
                            }}
                            className={`p-2 rounded-xl bg-white dark:bg-zinc-900 border cursor-pointer hover:border-sky-500 transition-all ${embedFileUrl === file.url ? 'border-sky-500 ring-2 ring-sky-100 dark:ring-sky-950/20' : 'border-slate-200 dark:border-zinc-800'}`}
                          >
                            <span className="text-[10px] font-semibold text-slate-700 dark:text-zinc-300 block truncate">{file.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 block">{language === "vi" ? "Nhập link tệp (URL):" : "Custom File URL:"}</span>
                        <input 
                          type="text" 
                          placeholder="https://..."
                          value={embedFileUrl}
                          onChange={(e) => setEmbedFileUrl(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 bg-white p-2 text-[10px] outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 block">{language === "vi" ? "Tên hiển thị của tệp đính kèm:" : "Attachment Title:"}</span>
                        <input 
                          type="text" 
                          placeholder={language === "vi" ? "Ví dụ: Bản tin Mục Vụ Giáo Phận.pdf" : "e.g. Parish Newsletter.pdf"}
                          value={embedFileName}
                          onChange={(e) => setEmbedFileName(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 bg-white p-2 text-[10px] outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <button 
                      type="button"
                      onClick={handleInsertFile}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-1.5 px-4 rounded-xl text-[10px] transition shadow-xs flex items-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{language === "vi" ? "Chèn vào văn bản" : "Attach File to Text"}</span>
                    </button>
                  </div>
                )}

                {/* 3. YouTube Video Embed Panel */}
                {activeEmbed === "video" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                        <VideoIcon className="w-4 h-4 text-sky-500" />
                        <span>{language === "vi" ? "Nhúng khung phát Video trực tiếp" : "Embed YouTube Video"}</span>
                      </h4>
                      <button onClick={() => setActiveEmbed(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 block">{language === "vi" ? "Nhập link YouTube phát chính thức:" : "YouTube Video URL:"}</span>
                      <input 
                        type="text" 
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={embedVideoUrl}
                        onChange={(e) => setEmbedVideoUrl(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white p-2 text-[10px] outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                      />
                    </div>

                    <button 
                      type="button"
                      onClick={handleInsertVideo}
                      className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-1.5 px-4 rounded-xl text-[10px] transition shadow-xs flex items-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{language === "vi" ? "Nhúng Video vào bài" : "Embed Video"}</span>
                    </button>
                  </div>
                )}

                {/* 4. Link Insertion Panel */}
                {activeEmbed === "link" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                        <Link className="w-4 h-4 text-blue-500" />
                        <span>{language === "vi" ? "Chèn siêu liên kết (Hyperlink)" : "Insert Hyperlink"}</span>
                      </h4>
                      <button onClick={() => setActiveEmbed(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 block">{language === "vi" ? "Chữ hiển thị liên kết:" : "Link Display Text:"}</span>
                        <input 
                          type="text" 
                          placeholder={language === "vi" ? "Ví dụ: Đọc văn kiện gốc ở đây..." : "e.g. Read full document here..."}
                          value={embedLinkText}
                          onChange={(e) => setEmbedLinkText(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 bg-white p-2 text-[10px] outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 block">{language === "vi" ? "Địa chỉ trang web (URL):" : "Destination URL:"}</span>
                        <input 
                          type="text" 
                          placeholder="https://..."
                          value={embedLinkUrl}
                          onChange={(e) => setEmbedLinkUrl(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 bg-white p-2 text-[10px] outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <button 
                      type="button"
                      onClick={handleInsertLink}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded-xl text-[10px] transition shadow-xs flex items-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{language === "vi" ? "Chèn liên kết" : "Insert Link"}</span>
                    </button>
                  </div>
                )}

                {/* 5. Table insertion description */}
                {activeEmbed === "table" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                        <Table className="w-4 h-4 text-teal-500" />
                        <span>{language === "vi" ? "Chèn bảng biểu đạt chuẩn" : "Insert Structured Table"}</span>
                      </h4>
                      <button onClick={() => setActiveEmbed(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed">
                      {language === "vi" 
                        ? "Bấm nút dưới để tự động chèn một khung bảng biểu truyền thống (Ban mục vụ, chức vụ, liên hệ) vào văn bản. Bạn có thể sửa trực tiếp các thông số văn bản trong bảng sau khi chèn." 
                        : "Click below to insert a beautiful Markdown-compatible grid table. You can edit the text easily afterward."}
                    </p>
                    <button 
                      type="button"
                      onClick={handleInsertTable}
                      className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-1.5 px-4 rounded-xl text-[10px] transition shadow-xs flex items-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{language === "vi" ? "Chèn khung bảng ngay" : "Insert Table Template"}</span>
                    </button>
                  </div>
                )}

                {/* 6. Pastoral Event Metadata Panel */}
                {activeEmbed === "event" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                        <CalendarIcon className="w-4 h-4 text-purple-500" />
                        <span>{language === "vi" ? "Thiết lập sự kiện Phụng vụ & Mục vụ" : "Configure Pastoral Event Info"}</span>
                      </h4>
                      <button onClick={() => setActiveEmbed(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 block">{language === "vi" ? "Thời gian diễn ra lễ (e.g. '25 DEC'):" : "Event Date (e.g. '25 DEC'):"}</span>
                        <input 
                          type="text" 
                          placeholder="e.g. 25 DEC"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 bg-white p-2 text-[10px] outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 block">{language === "vi" ? "Địa điểm diễn ra Thánh Lễ / Hội nghị:" : "Event Location:"}</span>
                        <input 
                          type="text" 
                          placeholder={language === "vi" ? "e.g. Nhà thờ chính tòa Phú Cường" : "e.g. Phu Cuong Cathedral"}
                          value={eventLocation}
                          onChange={(e) => setEventLocation(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 bg-white p-2 text-[10px] outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        type="button"
                        onClick={handleApplyEvent}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1.5 px-4 rounded-xl text-[10px] transition shadow-xs flex items-center gap-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{language === "vi" ? "Liên kết Sự kiện" : "Link Event Metadata"}</span>
                      </button>
                      
                      {hasEvent && (
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                          ✓ {language === "vi" ? "Đã liên kết" : "Linked"}
                        </span>
                      )}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* Content writing textarea in full-width workspace */}
            <div className="p-4 bg-white dark:bg-zinc-900 space-y-1">
              <textarea 
                id="editor-textarea"
                rows={16}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={language === "vi" 
                  ? "Bắt đầu soạn thảo nội dung văn bản giáo lý hoặc truyền giáo phận ở đây. Bạn có thể chèn ảnh, tệp tin, video, bảng biểu bằng các thẻ chèn trên thanh công cụ hỗ trợ văn bản phía trên..." 
                  : "Start writing the diocesan article content here. Format paragraphs with the rich Home tab or insert tables, files, images directly with the Insert tab."}
                className="w-full rounded-xl border border-slate-100 bg-slate-50/20 p-5 text-xs text-slate-800 outline-none leading-relaxed transition-all focus:border-sky-500 font-medium dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-white"
              />
              
              <div className="flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center text-[10px] text-slate-400 font-mono font-medium px-1 pt-1.5">
                <div className="flex items-center gap-3">
                  <span>{language === "vi" ? `Tổng số: ${content.split(/\s+/).filter(Boolean).length} từ` : `Total: ${content.split(/\s+/).filter(Boolean).length} words`}</span>
                  <span>{language === "vi" ? "Chuẩn tài liệu: Microsoft Word XML / Markdown" : "Standard: MS Word XML / Markdown"}</span>
                </div>
                <div className="text-sky-600 dark:text-sky-400 font-bold">
                  {language === "vi" ? "✓ Bạn có thể nhúng trực tiếp hình ảnh & tệp tại vị trí con trỏ" : "✓ You can embed inline images & files anywhere at the cursor"}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom actions bar */}
          <div className="pt-4 flex justify-end gap-3.5">
            <button 
              type="button"
              onClick={handleClear}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 px-5 py-3 text-xs font-bold text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800/40 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>{language === "vi" ? "Xóa bản nháp" : "Clear Draft"}</span>
            </button>
            
            <button 
              type="button"
              onClick={handlePublish}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:from-sky-700 hover:to-indigo-700 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{language === "vi" ? "Xuất bản và Đồng bộ" : "Publish & Sync Now"}</span>
            </button>
          </div>

        </div>
      ) : (
        /* REAL-TIME EDITORIAL DOCUMENT PREVIEW PANEL */
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-100 bg-white p-6 md:p-10 shadow-md dark:border-zinc-900 dark:bg-zinc-950 space-y-6">
          
          <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-sky-600 dark:text-sky-400 font-bold uppercase pb-4 border-b border-slate-100 dark:border-zinc-900">
            <span>{category} • {language === "vi" ? "TÀI LIỆU CHUẨN GP" : "DIOCESAN OFFICIAL DOCUMENT"}</span>
            <span>{new Date().toLocaleDateString(language === "vi" ? "vi-VN" : "en-US")}</span>
          </div>

          <div className="space-y-4">
            {/* Elegant Header Title */}
            <h1 className="text-lg md:text-2xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
              {title || (language === "vi" ? "[Chưa nhập tiêu đề bài viết]" : "[Untitled Article Draft]")}
            </h1>

            {/* Author info preview */}
            <div className="flex items-center gap-3 py-1">
              <img 
                src={currentUser.avatar} 
                alt="Me" 
                className="h-9 w-9 rounded-full object-cover border border-slate-100 dark:border-zinc-800"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-white block leading-tight">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {currentUser.role} • {currentUser.diocese}
                </span>
              </div>
            </div>
          </div>

          {/* Styled Document Body rendering using the new Parser */}
          <div className="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-zinc-300 text-xs md:text-sm leading-relaxed space-y-4 pt-4 border-t border-slate-100 dark:border-zinc-900/60">
            {content ? (
              <div 
                className="whitespace-pre-line font-medium" 
                dangerouslySetInnerHTML={{ 
                  __html: parseDraftContentToHTML(content, language) 
                }} 
              />
            ) : (
              <p className="italic text-slate-400 text-xs text-center py-6">
                {language === "vi" ? "Chưa có nội dung soạn thảo. Hãy chuyển sang Chế độ viết để soạn bài." : "No content written yet. Switch to Editor mode to write."}
              </p>
            )}
          </div>

          {/* Attached metadata visual event render */}
          {hasEvent && (
            <div className="pt-5 border-t border-slate-100 dark:border-zinc-900">
              <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-3">
                {language === "vi" ? "Sự kiện Phụng vụ đính kèm" : "Ecclesiastical Event"}
              </h4>

              <div className="flex gap-4 items-center p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100/40 dark:border-amber-950/20">
                <div className="flex flex-col items-center justify-center h-12 w-12 rounded-xl bg-amber-500 text-white shrink-0 text-center shadow-xs">
                  <span className="text-base font-bold font-mono leading-none">{eventDate.split(" ")[0] || "25"}</span>
                  <span className="text-[8px] font-extrabold uppercase tracking-widest mt-0.5 leading-none">{eventDate.split(" ")[1] || "DEC"}</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-amber-950 dark:text-amber-400 uppercase tracking-wider">
                    {language === "vi" ? "Sự kiện mục vụ truyền thông" : "Diocesan Media Event"}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-zinc-400">
                    <span className="font-semibold text-slate-800 dark:text-zinc-200">📍 {language === "vi" ? "Địa điểm:" : "Location:"}</span> {eventLocation || (language === "vi" ? "Nhà Thờ Giáo Phận" : "Diocesan Church")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action CTAs in preview screen */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-zinc-900/60">
            <button 
              onClick={() => setActiveTab("edit")}
              className="rounded-xl border border-slate-200 dark:border-zinc-800 px-5 py-2.5 text-xs font-bold text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors"
            >
              {language === "vi" ? "Quay lại soạn thảo" : "Back to Editor"}
            </button>
            <button 
              onClick={handlePublish}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:from-sky-700 hover:to-indigo-700 transition-all"
            >
              <FileCheck className="w-4 h-4" />
              <span>{language === "vi" ? "Đăng bài ngay" : "Publish Document"}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
