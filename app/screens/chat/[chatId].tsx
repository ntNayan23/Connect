// app/screens/chat/[chatId].tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Send, ArrowLeft } from 'lucide-react-native';
import { SafeAreaView as SAView } from 'react-native-safe-area-context';

import {
  INITIAL_CHATS,
  MOCK_MESSAGES,
  MOCK_USER,
  OTHER_USERS,
} from '@/src/constants/data';
import { Message, Chat, User } from '@/src/types';

const COLORS = {
  BRAND_BLUE: '#3B7FFF',
  GRAY_50: '#F9FAFB',
  GRAY_100: '#F3F4F6',
  GRAY_200: '#E5E7EB',
  GRAY_400: '#9CA3AF',
  GRAY_500: '#6B7280',
  GRAY_700: '#374151',
  GRAY_900: '#111827',
  WHITE: '#FFFFFF',
};

const allUsers = [MOCK_USER, ...OTHER_USERS];

const getUserById = (userId: string): User | undefined =>
  allUsers.find((u) => u.userId === userId);

const MessageBubble = ({ 
  message, 
  isGroup 
}: { 
  message: Message; 
  isGroup: boolean 
}) => {
  const isMe = message.senderId === MOCK_USER.userId;
  const sender = getUserById(message.senderId);

  return (
    <View style={[styles.messageContainer, isMe ? styles.myMessage : styles.otherMessage]}>
      {!isMe && (
        <Image source={{ uri: sender?.avatar }} style={styles.messageAvatar} />
      )}
      <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
        {!isMe && isGroup && sender && (
          <Text style={styles.senderName}>{sender.name}</Text>
        )}
        <Text style={[styles.messageText, isMe ? styles.myText : styles.otherText]}>
          {message.text}
        </Text>
        <Text style={styles.timestamp}>{message.timestamp}</Text>
      </View>
    </View>
  );
};
export default function ChatDetailScreen() {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  const router = useRouter();

  const chat: Chat | undefined = INITIAL_CHATS.find((c) => c.chatId === chatId);

  if (!chat) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Chat not found</Text>
      </SafeAreaView>
    );
  }

  // Mock messages for this chat — in real app you'd fetch per chatId
  // For demo, we'll use MOCK_MESSAGES for all chats
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const isGroup = chat.type === 'group';
  const chatTitle = chat.name;
  const chatAvatar = chat.avatar;

  // Enrich messages with isMe flag (already in MOCK_MESSAGES, but safe)
  const enrichedMessages = messages.map((m) => ({
    ...m,
    isMe: m.senderId === MOCK_USER.userId,
    type: isGroup ? 'group' : 'direct',
  }));


// Add new message at the END
const sendMessage = () => {
  if (inputText.trim() === '') return;

  const newMessage: Message = {
    id: `m${Date.now()}`,
    text: inputText.trim(),
    senderId: MOCK_USER.userId,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isMe: true,
  };

  setMessages(prev => [...prev, newMessage]); // ← Append to end
  setInputText('');
};


  useEffect(() => {
  // Scroll to bottom after messages update
  setTimeout(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, 100);
}, [messages]);

// Also scroll on mount
useEffect(() => {
  setTimeout(() => {
    flatListRef.current?.scrollToEnd({ animated: false });
  }, 300);
}, []);

  return (
    <SAView  style={styles.container} edges={['left', 'right']}>
      {/* Header */}
      <View style={{ flex: 1 }}>
      {/* Header */}
<View style={styles.header}>
  {/* Back Button + "Chats" Text */}
  <TouchableOpacity 
    onPress={() => router.back()} 
    style={styles.leftHeader}
  >
    <ArrowLeft size={24} color={COLORS.GRAY_900} />
    <Text style={styles.backText}>Chats</Text>
  </TouchableOpacity>

  {/* Center: Avatar + Name */}
  <View style={styles.centerHeader}>
    <Image 
      source={{ uri: chatAvatar }} 
      style={styles.headerAvatar} 
    />
    <View>
      <Text style={styles.headerTitle}>{chatTitle}</Text>
      {isGroup && (
        <Text style={styles.memberCount}>
          {chat.members.length} members
        </Text>
      )}
    </View>
  </View>

  {/* Right spacer (keeps center truly centered) */}
  <View style={{ width: 60 }} />
</View>
      {/* Messages */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
  ref={flatListRef}
  data={messages} // ← No .reverse()
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <MessageBubble message={item} isGroup={isGroup} />}
  contentContainerStyle={styles.messagesList}
  showsVerticalScrollIndicator={false}
/>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor={COLORS.GRAY_400}
            value={inputText}
            onChangeText={setInputText}
            multiline
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            onPress={sendMessage}
            disabled={inputText.trim() === ''}
            style={[
              styles.sendButton,
              inputText.trim() === '' && styles.sendButtonDisabled,
            ]}
          >
            <Send
              size={20}
              color={inputText.trim() ? COLORS.WHITE : COLORS.GRAY_400}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      </View>
    </SAView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 12,
  paddingTop: Platform.OS === 'ios' ? 56 : 16,   // ← safe area fix
  paddingBottom: 16,
  backgroundColor: COLORS.WHITE,
  borderBottomWidth: 1,
  borderBottomColor: COLORS.GRAY_200,
},

leftHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
},

backText: {
  fontSize: 17,
  fontWeight: '600',
  color: COLORS.BRAND_BLUE,
},

centerHeader: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
},

headerAvatar: {
  width: 40,
  height: 40,
  borderRadius: 20,
},

headerTitle: {
  fontSize: 17,
  fontWeight: '600',
  color: COLORS.GRAY_900,
},

memberCount: {
  fontSize: 13,
  color: COLORS.GRAY_500,
  marginTop: 2,
},
  backButton: {
    padding: 4,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupHeaderAvatar: {
    marginBottom: 4,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 20,
    flexGrow: 1,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 6,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  otherMessage: {
    alignSelf: 'flex-start',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    marginTop: 4,
  },
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    maxWidth: '100%',
  },
  myBubble: {
    backgroundColor: COLORS.BRAND_BLUE,
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: COLORS.GRAY_100,
    borderBottomLeftRadius: 4,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.BRAND_BLUE,
    marginBottom: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  myText: {
    color: COLORS.WHITE,
  },
  otherText: {
    color: COLORS.GRAY_900,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
    color: COLORS.WHITE,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderTopColor: COLORS.GRAY_200,
  },
  textInput: {
  flex: 1,
  backgroundColor: COLORS.GRAY_50,
  borderRadius: 24,
  paddingHorizontal: 16,
  paddingVertical: 12,
  paddingTop: Platform.OS === 'ios' ? 12 : 14,   // tiny tweak for Android
  minHeight: 48,                                 // ← forces proper height
  maxHeight: 100,
  fontSize: 16,
  color: COLORS.GRAY_900,
  textAlignVertical: 'center',                   // ← CRITICAL for Android
  includeFontPadding: false,                     // ← removes Android's hidden padding
},
  sendButton: {
    marginLeft: 8,
    backgroundColor: COLORS.BRAND_BLUE,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.GRAY_200,
  },
});