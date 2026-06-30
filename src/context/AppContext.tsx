import React, { createContext, useState, useContext, useEffect } from "react";
import { 
  ScreenType, Language, Theme, User, Post, Conversation, SystemNotification,
  TrendTopic, UpcomingEvent, SuggestedContact, Message
} from "../types";

interface AppContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  activeScreen: ScreenType;
  setActiveScreen: (screen: ScreenType) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  notifications: SystemNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<SystemNotification[]>>;
  addPost: (content: string, image?: string) => void;
  likePost: (id: string) => void;
  bookmarkPost: (id: string) => void;
  addComment: (postId: string, commentText: string) => void;
  sendMessageToConversation: (conversationId: string, text: string) => Promise<void>;
  trends: TrendTopic[];
  upcomingEvents: UpcomingEvent[];
  suggestedContacts: SuggestedContact[];
  setSuggestedContacts: React.Dispatch<React.SetStateAction<SuggestedContact[]>>;
  viewingUser: User | null;
  setViewingUser: (user: User | null) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("vi");
  const [theme, setTheme] = useState<Theme>("light");
  const [activeScreen, setActiveScreen] = useState<ScreenType>("login");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [viewingUser, setViewingUser] = useState<User | null>(null);

  // Sync dark class with HTML tag
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [theme]);

  // Current logged in user (Default: Giuse Nguyễn Văn An)
  const [currentUser, setCurrentUser] = useState<User>({
    id: "user_me",
    name: "Giuse Nguyễn Văn An",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqNsi671MhACR5R3DfbeLObqjh-kMu51QgS710p3_kR4FSDJF95oB5kJvPkmsfeW1f6sUud7ONPT20KJUCIclq35fMsERy680aSKLn9demJTzKVcceltLbdXv5tAwNYvGY7aYSmKHq-dSVMOaNQGkWnro4PrZVh1q1QX6h28ide_EnWyvT5FCrxq_okyVC6b3FEsgup2aWlBE0gRhkxMxrxGA0ySHwUX--q3HV4pjUBn60zMaSCy_ZX_u1thOBWMjWFbWpMM6ZBg",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuAl9NZuvl4wdcly-A5Ur5wsnrRX7YuxMdFMXsm_2nnc4aCRcRKT4HbQ65lQeQNEND4bgXEfCzNIJWykkhoPo-8JoimG3GP41DiTHeORS51Gz_CH1I0eR0VBO7iopy28DO_Ca3sqjRrOt1kyF0KB6AAo_z2hzAMHHSEDi3UYX-gM2TGDo165RKE6WkdY6YHM8iRV_bRcfo8VQNj9cELtABkfa34NBCtuI2R_RXAx_zpTRczZXg-d5L3UjdVY1kFhPDFU8Ye6sJdJTQ",
    role: "Biên tập viên cấp cao",
    roleEn: "Senior Editor",
    diocese: "Tổng giáo phận Hà Nội",
    dioceseEn: "Archdiocese of Hanoi",
    bio: "Với hơn 5 năm kinh nghiệm trong lĩnh vực báo chí và truyền thông Công giáo, tôi luôn nỗ lực lan tỏa Lời Chúa và các hoạt động của Giáo hội qua nền tảng kỹ thuật số. Mục tiêu của tôi là xây dựng một cộng đồng đức tin hiện đại, kết nối và đầy sáng tạo.",
    bioEn: "With over 5 years of experience in Catholic journalism and media, I strive to spread the Word of God and the activities of the Church through digital platforms. My goal is to build a modern, connected, and creative community of faith.",
    stats: {
      posts: 156,
      followers: "2.4k",
      likes: "12.8k",
      rating: 42
    }
  });

  // Seed data for newsfeed posts
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "post_1",
      authorName: "Tổng Giáo phận Hà Nội",
      authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcjKAGqf98iDpggYvvGEkLe3tUKh-STKjM7w3Tp3VOYPBHynboVCBQ7q1TPMJPvoVHACSTQv8tJ8bgPTuhUFkTPYsGBzzCrG4ppKMCGJ4d3Omvlk0gm6016zcDfJ188Yz8bpfmAlTeMLhZVjhG7TpySGrW0cch6FFVaUTZ3i2wqFWl9FrbH4b4dqay_bfPAQCrPzKJctA1oSGDZfdBax_NB1mqvL5iaxItPAyFatEddhdhHsVbpQKnBzkSJXtVjwr0yYKSpbIuaQ",
      authorTitle: "Truyền thông Giáo phận",
      authorTitleEn: "Diocesan Media",
      timeAgo: "2 giờ trước",
      timeAgoEn: "2 hours ago",
      content: "Chào mừng Đại hội Giới trẻ Giáo tỉnh Hà Nội lần thứ XX sẽ được diễn ra tại Giáo phận Lạng Sơn - Cao Bằng. Hãy cùng hướng tâm hồn và lời cầu nguyện về các bạn trẻ tham dự đại hội năm nay. #YouthDay2024 #FaithInAction",
      contentEn: "Welcome to the 20th Youth Congress of Hanoi Ecclesiastical Province to be held in Lang Son - Cao Bang Diocese. Let us direct our hearts and prayers to the young people attending this year's congress. #YouthDay2024 #FaithInAction",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCI_oB38s6iSOB4LAzBIMuiIqc95x_sIHcYGRGSTQKtTtmrSQnHHt4V4OuuQhawuRYSu46A-detpmM8vwheG9Afox1NYFSuOs259xGftp8wU-2_ky5adir_yy59mUbbaYjxrHUDpeKBuQFSv8j-IICNV-N_H869GyBGEiewgRtHXNqRqsRP2bg0PM_y_3eUijWEhNqT0o2H8_uUuOkBWYrTQ4TdhlwHIXvPDXEKFU2yVIlztumRPahGNgNdJRPr2CO5RRiLOvJxVw",
      likes: 1200,
      commentsCount: 45,
      hasLiked: false,
      hasBookmarked: false,
      category: "SỰ KIỆN",
      categoryEn: "EVENTS",
      readTime: "5 phút đọc",
      readTimeEn: "5 min read",
      comments: [
        {
          id: "cmt_1",
          userName: "Têrêsa Mai",
          userAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBauhsMdCpeKiaRaps5VbVD89R8aMBrASsM39Aru47m_CoEUUQq98DwyZwtGc_5wekZI-dQufdzdC17_8GyzfR0G_2SEJaFSvHluE7thtjDX62qMAeok-DNWjfS-nNgtt8-tl-Lv2YWij3r3uPtYDSdQrcqo5tHWxqGM7Twfmlgb9g_JTl7m6vMk-FdvdLynk7Qmn8LZnAZvzgRfIw5G8G9GSBnQZS2XjzuqhCoKfaWTTNsGXxD5zpYfH0TrvQTn6Pd56MnZcqMJQ",
          content: "Nguyện chúc Đại hội diễn ra thật thành công và tràn đầy hồng ân Chúa!",
          createdAt: "1 giờ trước"
        }
      ]
    },
    {
      id: "post_2",
      authorName: "Sr. Maria Nguyễn",
      authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBauhsMdCpeKiaRaps5VbVD89R8aMBrASsM39Aru47m_CoEUUQq98DwyZwtGc_5wekZI-dQufdzdC17_8GyzfR0G_2SEJaFSvHluE7thtjDX62qMAeok-DNWjfS-nNgtt8-tl-Lv2YWij3r3uPtYDSdQrcqo5tHWxqGM7Twfmlgb9g_JTl7m6vMk-FdvdLynk7Qmn8LZnAZvzgRfIw5G8G9GSBnQZS2XjzuqhCoKfaWTTNsGXxD5zpYfH0TrvQTn6Pd56MnZcqMJQ",
      authorTitle: "Ban Văn thư Giáo phận",
      authorTitleEn: "Diocesan Archives Department",
      timeAgo: "5 giờ trước",
      timeAgoEn: "5 hours ago",
      content: "Hướng dẫn số hóa văn thư lưu trữ cho các giáo phận năm 2024. Ban Truyền thông giới thiệu bộ tài liệu chuẩn hóa quy trình lưu trữ điện tử, giúp các giáo phận dễ dàng tiếp cận và quản lý văn bản một cách khoa học.",
      contentEn: "Guide to digitizing archival documents for dioceses in 2024. The Communications Department introduces the standardized electronic archiving workflow to help dioceses easily access and manage documents scientifically.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhXIBQpQe6bMBJs7V0PcQ12bkdiCZAHgof-BMWGygl3c8PwHORu4ck_OHZTFog81f8oGAapJ1VNUXGUmT9lFXTnPGhjO7jFrBYhdkCh3ut34p8xh_jvNjGYR-0rcjNWoyZ0eG3SmDLkcuf8wC67yZqhLx8MnF0L-U0FHqybbiJOyBMFkPrFZl4CmR3edNBXLFNpz5yILFsOmxDkPT_TW1_29J94LpWXCklkll6yuqfufqoWvzs7_7P5h8btuBmD-sgTnEDn1Oqbg",
      likes: 850,
      commentsCount: 12,
      hasLiked: false,
      hasBookmarked: false,
      category: "TÀI LIỆU MỚI",
      categoryEn: "NEW DOCUMENT",
      readTime: "10 phút đọc",
      readTimeEn: "10 min read",
      comments: []
    }
  ]);

  // Messages / Chat State
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "conv_thomas",
      participantName: "Fr. Thomas Nguyen",
      participantAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcjKAGqf98iDpggYvvGEkLe3tUKh-STKjM7w3Tp3VOYPBHynboVCBQ7q1TPMJPvoVHACSTQv8tJ8bgPTuhUFkTPYsGBzzCrG4ppKMCGJ4d3Omvlk0gm6016zcDfJ188Yz8bpfmAlTeMLhZVjhG7TpySGrW0cch6FFVaUTZ3i2wqFWl9FrbH4b4dqay_bfPAQCrPzKJctA1oSGDZfdBax_NB1mqvL5iaxItPAyFatEddhdhHsVbpQKnBzkSJXtVjwr0yYKSpbIuaQ",
      participantStatus: "online",
      participantStatusEn: "Active",
      lastMessage: "Về cơ bản là rất tốt. Tuy nhiên phần ngân sách dự kiến cần chi tiết hơn một chút ở khâu vận chuyển.",
      lastMessageTime: "10:24 AM",
      unreadCount: 2,
      messages: [
        {
          id: "m1",
          senderId: "conv_thomas",
          senderName: "Fr. Thomas Nguyen",
          senderAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcjKAGqf98iDpggYvvGEkLe3tUKh-STKjM7w3Tp3VOYPBHynboVCBQ7q1TPMJPvoVHACSTQv8tJ8bgPTuhUFkTPYsGBzzCrG4ppKMCGJ4d3Omvlk0gm6016zcDfJ188Yz8bpfmAlTeMLhZVjhG7TpySGrW0cch6FFVaUTZ3i2wqFWl9FrbH4b4dqay_bfPAQCrPzKJctA1oSGDZfdBax_NB1mqvL5iaxItPAyFatEddhdhHsVbpQKnBzkSJXtVjwr0yYKSpbIuaQ",
          content: "Chào bạn, chúng ta có thể thảo luận về chương trình bác ái sắp tới không? Tôi đã xem qua bản thảo của bạn.",
          createdAt: "10:00 AM"
        },
        {
          id: "m2",
          senderId: "user_me",
          senderName: "Giuse Nguyễn Văn An",
          senderAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqNsi671MhACR5R3DfbeLObqjh-kMu51QgS710p3_kR4FSDJF95oB5kJvPkmsfeW1f6sUud7ONPT20KJUCIclq35fMsERy680aSKLn9demJTzKVcceltLbdXv5tAwNYvGY7aYSmKHq-dSVMOaNQGkWnro4PrZVh1q1QX6h28ide_EnWyvT5FCrxq_okyVC6b3FEsgup2aWlBE0gRhkxMxrxGA0ySHwUX--q3HV4pjUBn60zMaSCy_ZX_u1thOBWMjWFbWpMM6ZBg",
          content: "Vâng thưa Cha, con đã sẵn sàng. Cha thấy bản thảo có cần điều chỉnh gì không ạ?",
          createdAt: "10:15 AM"
        },
        {
          id: "m3",
          senderId: "conv_thomas",
          senderName: "Fr. Thomas Nguyen",
          senderAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcjKAGqf98iDpggYvvGEkLe3tUKh-STKjM7w3Tp3VOYPBHynboVCBQ7q1TPMJPvoVHACSTQv8tJ8bgPTuhUFkTPYsGBzzCrG4ppKMCGJ4d3Omvlk0gm6016zcDfJ188Yz8bpfmAlTeMLhZVjhG7TpySGrW0cch6FFVaUTZ3i2wqFWl9FrbH4b4dqay_bfPAQCrPzKJctA1oSGDZfdBax_NB1mqvL5iaxItPAyFatEddhdhHsVbpQKnBzkSJXtVjwr0yYKSpbIuaQ",
          content: "Về cơ bản là rất tốt. Tuy nhiên phần ngân sách dự kiến cần chi tiết hơn một chút ở khâu vận chuyển.",
          createdAt: "10:24 AM"
        }
      ]
    },
    {
      id: "conv_btt",
      participantName: "Ban Truyền Thông",
      participantAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBauhsMdCpeKiaRaps5VbVD89R8aMBrASsM39Aru47m_CoEUUQq98DwyZwtGc_5wekZI-dQufdzdC17_8GyzfR0G_2SEJaFSvHluE7thtjDX62qMAeok-DNWjfS-nNgtt8-tl-Lv2YWij3r3uPtYDSdQrcqo5tHWxqGM7Twfmlgb9g_JTl7m6vMk-FdvdLynk7Qmn8LZnAZvzgRfIw5G8G9GSBnQZS2XjzuqhCoKfaWTTNsGXxD5zpYfH0TrvQTn6Pd56MnZcqMJQ",
      participantStatus: "offline",
      participantStatusEn: "Offline",
      lastMessage: "Đã gửi file: Kế hoạch mục vụ 2024.pdf",
      lastMessageTime: "Hôm qua",
      unreadCount: 0,
      messages: [
        {
          id: "mbtt_1",
          senderId: "conv_btt",
          senderName: "Ban Truyền Thông",
          senderAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBauhsMdCpeKiaRaps5VbVD89R8aMBrASsM39Aru47m_CoEUUQq98DwyZwtGc_5wekZI-dQufdzdC17_8GyzfR0G_2SEJaFSvHluE7thtjDX62qMAeok-DNWjfS-nNgtt8-tl-Lv2YWij3r3uPtYDSdQrcqo5tHWxqGM7Twfmlgb9g_JTl7m6vMk-FdvdLynk7Qmn8LZnAZvzgRfIw5G8G9GSBnQZS2XjzuqhCoKfaWTTNsGXxD5zpYfH0TrvQTn6Pd56MnZcqMJQ",
          content: "Kính gửi ban biên tập dự thảo kế hoạch truyền thông năm mới. Đã gửi file: Kế hoạch mục vụ 2024.pdf",
          createdAt: "Hôm qua"
        }
      ]
    },
    {
      id: "conv_maria",
      participantName: "Maria Trần",
      participantAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAF57hyBg1nb9VdodBWToMERRe1n9X9oly49_dXIKXruNQVcEUpB7BSs0slyTGerBHkyQF7lgeEnxmE5xnLdDwSHmmb7waU-hTC_1WRGPCewKuuDT9NY7imXDCMpJUPg_8mXi-tst92O_2yP1NNQZEzvvRVedvTlDCf_mn_QBB5bgwKLBl_RRqOjGm2Md0jJ06KUwoWdcZxPtpkHT4WtAxioLQy_8ZPAGPDAPQAlFBqHJHccFtlA26hRI8NJD5PF8GiM4duOZpiMQ",
      participantStatus: "offline",
      participantStatusEn: "Offline",
      lastMessage: "Cảm ơn thông tin của bạn nhé!",
      lastMessageTime: "2 ngày trước",
      unreadCount: 0,
      messages: [
        {
          id: "mm_1",
          senderId: "conv_maria",
          senderName: "Maria Trần",
          senderAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAF57hyBg1nb9VdodBWToMERRe1n9X9oly49_dXIKXruNQVcEUpB7BSs0slyTGerBHkyQF7lgeEnxmE5xnLdDwSHmmb7waU-hTC_1WRGPCewKuuDT9NY7imXDCMpJUPg_8mXi-tst92O_2yP1NNQZEzvvRVedvTlDCf_mn_QBB5bgwKLBl_RRqOjGm2Md0jJ06KUwoWdcZxPtpkHT4WtAxioLQy_8ZPAGPDAPQAlFBqHJHccFtlA26hRI8NJD5PF8GiM4duOZpiMQ",
          content: "Cảm ơn thông tin của bạn nhé!",
          createdAt: "2 ngày trước"
        }
      ]
    }
  ]);

  // System Notifications
  const [notifications, setNotifications] = useState<SystemNotification[]>([
    {
      id: "notif_1",
      type: "system",
      title: "Cập nhật hệ thống",
      titleEn: "System Update",
      description: "Phiên bản 2.4.0 đã sẵn sàng với tính năng bảo mật mới và cải tiến hiệu năng.",
      descriptionEn: "Version 2.4.0 is now ready with new security features and performance enhancements.",
      timeAgo: "5 phút trước",
      timeAgoEn: "5 mins ago",
      icon: "verified_user",
      color: "text-primary bg-primary-fixed"
    },
    {
      id: "notif_2",
      type: "comment",
      title: "Bình luận mới",
      titleEn: "New Comment",
      description: "Anna Pham đã bình luận về bài viết 'Sứ vụ Digital' của bạn.",
      descriptionEn: "Anna Pham commented on your article 'Digital Mission'.",
      timeAgo: "2 giờ trước",
      timeAgoEn: "2 hours ago",
      icon: "comment",
      color: "text-secondary bg-secondary-fixed"
    },
    {
      id: "notif_3",
      type: "event",
      title: "Nhắc nhở sự kiện",
      titleEn: "Event Reminder",
      description: "Cuộc họp Ban thường vụ Truyền thông sẽ diễn ra trong 1 giờ tới.",
      descriptionEn: "The Media Executive Committee meeting will take place in 1 hour.",
      timeAgo: "3 giờ trước",
      timeAgoEn: "3 hours ago",
      icon: "priority_high",
      color: "text-error bg-error-container"
    }
  ]);

  // Sidebar Static Data
  const trends: TrendTopic[] = [
    { id: "tr1", tag: "#MediaDiocese2024", postsCount: "1.2k bài viết", postsCountEn: "1.2k posts" },
    { id: "tr2", tag: "AI trong Phụng vụ", postsCount: "850 thảo luận", postsCountEn: "850 discussions" },
    { id: "tr3", tag: "Thánh lễ Trực tuyến", postsCount: "432 bài viết", postsCountEn: "432 posts" }
  ];

  const upcomingEvents: UpcomingEvent[] = [
    {
      id: "ev1",
      date: "24",
      month: "DEC",
      monthEn: "DEC",
      title: "Thánh lễ Vọng Giáng Sinh",
      titleEn: "Christmas Eve Mass",
      location: "Nhà thờ Lớn Hà Nội",
      locationEn: "Hanoi Cathedral"
    },
    {
      id: "ev2",
      date: "15",
      month: "JAN",
      monthEn: "JAN",
      title: "Tập huấn Truyền thông",
      titleEn: "Media Training Workshop",
      location: "Trực tuyến (Zoom)",
      locationEn: "Online (Zoom)"
    }
  ];

  const [suggestedContacts, setSuggestedContacts] = useState<SuggestedContact[]>([
    {
      id: "sug_1",
      name: "Linh mục Phêrô",
      role: "GP. Bùi Chu",
      roleEn: "Bui Chu Diocese",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcjKAGqf98iDpggYvvGEkLe3tUKh-STKjM7w3Tp3VOYPBHynboVCBQ7q1TPMJPvoVHACSTQv8tJ8bgPTuhUFkTPYsGBzzCrG4ppKMCGJ4d3Omvlk0gm6016zcDfJ188Yz8bpfmAlTeMLhZVjhG7TpySGrW0cch6FFVaUTZ3i2wqFWl9FrbH4b4dqay_bfPAQCrPzKJctA1oSGDZfdBax_NB1mqvL5iaxItPAyFatEddhdhHsVbpQKnBzkSJXtVjwr0yYKSpbIuaQ",
      isFollowing: false
    },
    {
      id: "sug_2",
      name: "Têrêsa Mai",
      role: "Designer • HCM",
      roleEn: "Designer • HCMC",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBauhsMdCpeKiaRaps5VbVD89R8aMBrASsM39Aru47m_CoEUUQq98DwyZwtGc_5wekZI-dQufdzdC17_8GyzfR0G_2SEJaFSvHluE7thtjDX62qMAeok-DNWjfS-nNgtt8-tl-Lv2YWij3r3uPtYDSdQrcqo5tHWxqGM7Twfmlgb9g_JTl7m6vMk-FdvdLynk7Qmn8LZnAZvzgRfIw5G8G9GSBnQZS2XjzuqhCoKfaWTTNsGXxD5zpYfH0TrvQTn6Pd56MnZcqMJQ",
      isFollowing: false
    }
  ]);

  // Handlers
  const addPost = (content: string, image?: string) => {
    const newPost: Post = {
      id: `post_${Date.now()}`,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorTitle: currentUser.role,
      authorTitleEn: currentUser.roleEn,
      timeAgo: "Vừa xong",
      timeAgoEn: "Just now",
      content: content,
      contentEn: content,
      image: image,
      likes: 0,
      commentsCount: 0,
      comments: [],
      hasLiked: false,
      hasBookmarked: false,
      category: "CÁ NHÂN",
      categoryEn: "PERSONAL",
      readTime: "1 phút đọc",
      readTimeEn: "1 min read"
    };

    setPosts([newPost, ...posts]);
    setCurrentUser(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        posts: prev.stats.posts + 1
      }
    }));
  };

  const likePost = (id: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
          hasLiked: !post.hasLiked
        };
      }
      return post;
    }));
  };

  const bookmarkPost = (id: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === id) {
        return {
          ...post,
          hasBookmarked: !post.hasBookmarked
        };
      }
      return post;
    }));
  };

  const addComment = (postId: string, commentText: string) => {
    const newCmt = {
      id: `cmt_${Date.now()}`,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content: commentText,
      createdAt: "Vừa xong"
    };

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          commentsCount: post.commentsCount + 1,
          comments: [...post.comments, newCmt]
        };
      }
      return post;
    }));
  };

  const sendMessageToConversation = async (conversationId: string, text: string) => {
    // 1. Add User Message
    const userMsg: Message = {
      id: `msg_${Date.now()}`,
      senderId: "user_me",
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      content: text,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          lastMessage: text,
          lastMessageTime: "Vừa xong",
          messages: [...conv.messages, userMsg]
        };
      }
      return conv;
    }));

    // 2. Trigger auto response from AI / Fr. Thomas
    setTimeout(async () => {
      let aiResponseText = "Cảm ơn ý kiến của bạn, chúng ta sẽ bàn chi tiết hơn trong buổi làm việc tới nhé.";
      
      try {
        // Let's call our server-side API proxy to get a smart answer from Gemini!
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              { role: "user", content: `Linh mục Thomas Nguyen nhận được tin nhắn từ giáo dân Giuse An: "${text}". Hãy đóng vai Linh mục Thomas Nguyen, trả lời tin nhắn này một cách nhân từ, hiền hậu, đúng chất linh mục Công giáo, ngắn gọn dưới 3 câu.` }
            ]
          })
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data.text) {
            aiResponseText = data.text;
          }
        }
      } catch (e) {
        console.warn("Could not fetch real AI response for thomas chat, using mockup", e);
      }

      const aiMsg: Message = {
        id: `msg_ai_${Date.now()}`,
        senderId: conversationId,
        senderName: conversationId === "conv_thomas" ? "Fr. Thomas Nguyen" : "Ban Truyền Thông",
        senderAvatar: conversationId === "conv_thomas" 
          ? "https://lh3.googleusercontent.com/aida-public/AB6AXuCcjKAGqf98iDpggYvvGEkLe3tUKh-STKjM7w3Tp3VOYPBHynboVCBQ7q1TPMJPvoVHACSTQv8tJ8bgPTuhUFkTPYsGBzzCrG4ppKMCGJ4d3Omvlk0gm6016zcDfJ188Yz8bpfmAlTeMLhZVjhG7TpySGrW0cch6FFVaUTZ3i2wqFWl9FrbH4b4dqay_bfPAQCrPzKJctA1oSGDZfdBax_NB1mqvL5iaxItPAyFatEddhdhHsVbpQKnBzkSJXtVjwr0yYKSpbIuaQ"
          : "https://lh3.googleusercontent.com/aida-public/AB6AXuBauhsMdCpeKiaRaps5VbVD89R8aMBrASsM39Aru47m_CoEUUQq98DwyZwtGc_5wekZI-dQufdzdC17_8GyzfR0G_2SEJaFSvHluE7thtjDX62qMAeok-DNWjfS-nNgtt8-tl-Lv2YWij3r3uPtYDSdQrcqo5tHWxqGM7Twfmlgb9g_JTl7m6vMk-FdvdLynk7Qmn8LZnAZvzgRfIw5G8G9GSBnQZS2XjzuqhCoKfaWTTNsGXxD5zpYfH0TrvQTn6Pd56MnZcqMJQ",
        content: aiResponseText,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConversations(prev => prev.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            lastMessage: aiResponseText,
            lastMessageTime: "Vừa xong",
            unreadCount: conv.unreadCount + 1,
            messages: [...conv.messages, aiMsg]
          };
        }
        return conv;
      }));
    }, 2000);
  };

  return (
    <AppContext.Provider value={{
      language, setLanguage,
      theme, setTheme,
      currentUser, setCurrentUser,
      activeScreen, setActiveScreen,
      isAuthenticated, setIsAuthenticated,
      posts, setPosts,
      conversations, setConversations,
      notifications, setNotifications,
      addPost, likePost, bookmarkPost, addComment,
      sendMessageToConversation,
      trends, upcomingEvents, suggestedContacts,
      setSuggestedContacts,
      viewingUser, setViewingUser
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
