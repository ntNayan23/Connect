import { Activity, User, Chat, Message } from '../types';

export const MOCK_USER: User = {
  userId: 'user1',
  name: 'Alex Johnson',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  bio: 'Adventure seeker, coffee enthusiast, love spontaneous meetups!',
  age: 28,
  interests: ['Coffee', 'Hiking', 'Music', 'Art'],
  connections: 234,
  createdCount: 12,
  joinedCount: 45,
  location: 'San Francisco, CA',
};

export const OTHER_USERS: User[] = [
  {
    userId: 'user2',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    bio: 'Travel lover and foodie',
    age: 26,
    interests: ['Travel', 'Food', 'Photography'],
    connections: 156,
    createdCount: 8,
    joinedCount: 32,
    location: 'San Francisco, CA',
  },
  {
    userId: 'user3',
    name: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    bio: 'Tech enthusiast and coffee addict',
    age: 30,
    interests: ['Tech', 'Coffee', 'Gaming'],
    connections: 189,
    createdCount: 15,
    joinedCount: 67,
    location: 'San Francisco, CA',
  },
  {
    userId: 'user4',
    name: 'Emma Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    bio: 'Yoga instructor and wellness advocate',
    age: 25,
    interests: ['Yoga', 'Wellness', 'Food'],
    connections: 203,
    createdCount: 6,
    joinedCount: 28,
    location: 'San Francisco, CA',
  },
];
export const INITIAL_ACTIVITIES: Activity[] = [
  {
    activityId: 'a1',
    chatId: 'chat_a1', // 👈 added
    title: 'Morning Coffee Meetup',
    type: 'coffee',
    description:
      'Join us for fresh espresso and good conversation. New faces welcome! We meet every Tuesday morning at our favorite local coffee shop.',
    location: {
      name: 'Blue Bottle Coffee',
      address: '123 Market St, San Francisco, CA',
      distance: '0.5 km',
      lat: 37.7749,
      lng: -122.4194,
    },
    date: 'Today',
    time: '9:00 AM',
    capacity: 6,
    currentMembers: 4,
    members: [MOCK_USER, OTHER_USERS[0], OTHER_USERS[1], OTHER_USERS[2]],
    createdBy: OTHER_USERS[1],
    image:
      'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=600&fit=crop',
  },
  {
    activityId: 'a2',
    chatId: 'chat_a2', // 👈 added
    title: 'Weekend Brunch Party',
    type: 'food',
    description:
      'Amazing brunch with bottomless mimosas! Great food, great people, great vibes. Come hungry, leave happy. Outdoor seating available.',
    location: {
      name: "Mama's Kitchen",
      address: '456 Valencia St, San Francisco, CA',
      distance: '1.2 km',
      lat: 37.7599,
      lng: -122.4148,
    },
    date: 'Tomorrow',
    time: '11:00 AM',
    capacity: 8,
    currentMembers: 5,
    members: [OTHER_USERS[0], OTHER_USERS[2], OTHER_USERS[3], MOCK_USER],
    createdBy: OTHER_USERS[0],
    image:
      'https://images.unsplash.com/photo-1504674900967-77e48e3c96c9?w=800&h=600&fit=crop',
  },
  {
    activityId: 'a3',
    chatId: 'chat_a3', // 👈 added
    title: 'Sunset Drinks by the Bay',
    type: 'drinks',
    description:
      'Come enjoy cocktails and sunset views at our favorite rooftop bar. Perfect for unwinding after work and meeting new people.',
    location: {
      name: 'Skyline Lounge',
      address: '789 Market St, San Francisco, CA',
      distance: '0.8 km',
      lat: 37.7913,
      lng: -122.3932,
    },
    date: '2024-01-20',
    time: '6:00 PM',
    capacity: 10,
    currentMembers: 6,
    members: [
      OTHER_USERS[1],
      OTHER_USERS[3],
      MOCK_USER,
      OTHER_USERS[0],
      OTHER_USERS[2],
    ],
    createdBy: OTHER_USERS[3],
    image:
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=600&fit=crop',
  },
  {
    activityId: 'a4',
    chatId: 'chat_a4', // 👈 added
    title: 'Golden Gate Hike Adventure',
    type: 'travel',
    description:
      'Scenic hike with panoramic views of the Golden Gate Bridge. Moderate difficulty, about 5 miles. Bring water and good shoes!',
    location: {
      name: 'Lands End Trail',
      address: 'San Francisco, CA',
      distance: '3.5 km',
      lat: 37.7597,
      lng: -122.5109,
    },
    date: '2024-01-21',
    time: '8:00 AM',
    capacity: 12,
    currentMembers: 7,
    members: [
      MOCK_USER,
      OTHER_USERS[1],
      OTHER_USERS[2],
      OTHER_USERS[3],
      OTHER_USERS[0],
    ],
    createdBy: MOCK_USER,
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  },
  {
    activityId: 'a5',
    chatId: 'chat_a5', // 👈 added
    title: 'Casual Wine Tasting',
    type: 'drinks',
    description:
      'Explore local wines with a small group of enthusiasts. Tasting notes provided. Perfect for wine lovers and curious beginners alike.',
    location: {
      name: 'The Wine Bar',
      address: '321 Castro St, San Francisco, CA',
      distance: '1.5 km',
      lat: 37.7603,
      lng: -122.4347,
    },
    date: '2024-01-22',
    time: '7:00 PM',
    capacity: 8,
    currentMembers: 3,
    members: [OTHER_USERS[0], OTHER_USERS[2]],
    createdBy: OTHER_USERS[2],
    image:
      'https://images.unsplash.com/photo-1510812431401-41d2cab2707d?w=800&h=600&fit=crop',
  },
];

export const INITIAL_CHATS: Chat[] = [
  {
    chatId: 'chat_a1',
    name: 'Sarah Chen',
    type: 'direct',
    lastMessage: 'See you tomorrow at brunch! 🥂',
    lastMessageTime: '2 min',
    unreadCount: 0,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    members: ['user1', 'user2'],
  },
  {
    chatId: 'c2',
    name: 'Morning Coffee Crew',
    type: 'group',
    lastMessage: 'James: Count me in for next week!',
    lastMessageTime: '1 hour',
    unreadCount: 2,
    avatar: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=400&fit=crop',
    members: ['user1', 'user2', 'user3', 'user4'],
  },
  {
    chatId: 'c3',
    name: 'James Wilson',
    type: 'direct',
    lastMessage: 'Thanks for the invite to the hike!',
    lastMessageTime: '3 hours',
    unreadCount: 0,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    members: ['user1', 'user3'],
  },
  {
    chatId: 'c4',
    name: 'Weekend Plans',
    type: 'group',
    lastMessage: 'Emma: Brunch sounds perfect!',
    lastMessageTime: '5 hours',
    unreadCount: 1,
    avatar: 'https://images.unsplash.com/photo-1504674900967-77e48e3c96c9?w=400&h=400&fit=crop',
    members: ['user1', 'user2', 'user3', 'user4'],
  },
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    text: 'Hey! Looking forward to the coffee meetup tomorrow 😊',
    senderId: 'user2',
    timestamp: '9:30 AM',
    isMe: false,
  },
  {
    id: 'm2',
    text: 'Same! I heard their new seasonal blend is amazing',
    senderId: 'user1',
    timestamp: '9:35 AM',
    isMe: true,
  },
  {
    id: 'm3',
    text: 'Count me in! What time are we meeting?',
    senderId: 'user3',
    timestamp: '9:40 AM',
    isMe: false,
  },
  {
    id: 'm4',
    text: '9 AM sharp at Blue Bottle. See you there! ☕',
    senderId: 'user1',
    timestamp: '9:42 AM',
    isMe: true,
  },
  {
    id: 'm5',
    text: 'Perfect! Bringing my friend Emma too',
    senderId: 'user2',
    timestamp: '9:45 AM',
    isMe: false,
  },
  {
    id: 'm6',
    text: 'The more the merrier! Can\'t wait 🎉',
    senderId: 'user1',
    timestamp: '9:47 AM',
    isMe: true,
  },
];