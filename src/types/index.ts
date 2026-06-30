export type ScreenType = 
  | 'dashboard' 
  | 'newsfeed' 
  | 'articles' 
  | 'polls' 
  | 'rankings' 
  | 'statistics' 
  | 'messages' 
  | 'ai-chat' 
  | 'settings' 
  | 'profile' 
  | 'login'
  | 'diocese-editor';

export type Language = 'vi' | 'en';
export type Theme = 'light' | 'dark';

export interface User {
  id: string;
  name: string;
  avatar: string;
  cover?: string;
  role: string;
  roleEn: string;
  diocese: string;
  dioceseEn: string;
  bio: string;
  bioEn: string;
  stats: {
    posts: number;
    followers: string;
    likes: string;
    rating: number;
  };
}

export interface Comment {
  id: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorTitle: string;
  authorTitleEn: string;
  timeAgo: string;
  timeAgoEn: string;
  content: string;
  contentEn: string;
  image?: string;
  likes: number;
  commentsCount: number;
  comments: Comment[];
  hasLiked: boolean;
  hasBookmarked: boolean;
  category?: string;
  categoryEn?: string;
  readTime?: string;
  readTimeEn?: string;
  title?: string;
  videoUrl?: string;
  eventDate?: string;
  eventLocation?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  createdAt: string;
  isAi?: boolean;
}

export interface Conversation {
  id: string;
  participantName: string;
  participantAvatar: string;
  participantStatus: 'online' | 'offline';
  participantStatusEn: 'Active' | 'Offline';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export interface SystemNotification {
  id: string;
  type: 'system' | 'comment' | 'event';
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  timeAgo: string;
  timeAgoEn: string;
  icon: string;
  color: string;
}

export interface TrendTopic {
  id: string;
  tag: string;
  postsCount: string;
  postsCountEn: string;
}

export interface UpcomingEvent {
  id: string;
  date: string;
  month: string;
  monthEn: string;
  title: string;
  titleEn: string;
  location: string;
  locationEn: string;
}

export interface SuggestedContact {
  id: string;
  name: string;
  role: string;
  roleEn: string;
  avatar: string;
  isFollowing: boolean;
}
