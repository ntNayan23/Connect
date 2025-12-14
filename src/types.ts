export type ActivityType = 'coffee' | 'food' | 'drinks' | 'travel' | 'other';

export interface User {
  userId: string;
  name: string;
  avatar: string;
  bio: string;
  age: number;
  interests: string[];
  connections: number;
  createdCount: number;
  joinedCount: number;
  location?: string;
}

// At the bottom of src/types.ts
export type AuthUser = {
  uid: string;
  email: string;
  name?: string;
} | null;

export interface Activity {
  activityId: string;
  chatId: string;
  title: string;
  type: ActivityType;
  description: string;
  location: {
    name: string;
    address: string;
    distance: string;
    lat: number;
    lng: number;
  };
  date: string;
  time: string;
  capacity: number;
  currentMembers: number;
  members: User[];
  createdBy: User;
  image?: string;
  discount?: {
    code: string;
    percentage: number;
  };
}

export interface Chat {
  chatId: string;
  name: string;
  type: 'group' | 'direct';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  avatar: string;
  members: string[]; // User IDs
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
  isMe?: boolean; // optional since we add it client-side
  chatType?: 'group' | 'direct'; // add this
}