import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  View as RNView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import { Chat } from '@/src/types';
import { INITIAL_CHATS, OTHER_USERS, MOCK_USER } from '@/src/constants/data';
import { SafeAreaView } from 'react-native-safe-area-context';

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

const ChatItem = ({ chat, onPress }: { chat: Chat; onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.chatItem}>
      {chat.type === 'group' ? (
        <View style={styles.groupAvatarGrid}>
          {chat.members.slice(0, 4).map((memberId, idx) => {
            const member = [MOCK_USER, ...OTHER_USERS].find((u) => u.userId === memberId);
            return (
              <Image
                key={idx}
                source={{ uri: member?.avatar }}
                style={styles.groupAvatarPart}
              />
            );
          })}
        </View>
      ) : (
        <Image source={{ uri: chat.avatar }} style={styles.avatar} />
      )}

      {chat.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{chat.unreadCount}</Text>
        </View>
      )}

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={[styles.chatName, chat.unreadCount > 0 && styles.unreadName]}>
            {chat.name}
          </Text>
          <Text
            style={[
              styles.chatTime,
              chat.unreadCount > 0 && styles.unreadTime,
            ]}
          >
            {chat.lastMessageTime}
          </Text>
        </View>
        <Text
          style={[styles.chatMessage, chat.unreadCount > 0 && styles.unreadMessage]}
          numberOfLines={1}
        >
          {chat.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function ChatsScreen() {
  const router = useRouter();

  const handleChatPress = (chatId: string) => {
  router.push({
  pathname: '../screens/chat/[chatId]',
  params: { chatId },
});
};

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity>
          <Search size={20} color={COLORS.GRAY_400} />
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      <FlatList
        data={INITIAL_CHATS}
        keyExtractor={(item) => item.chatId}
        renderItem={({ item }) => (
          <ChatItem chat={item} onPress={() => handleChatPress(item.chatId)} />
        )}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_200,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.GRAY_900,
  },
  chatItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_100,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
    backgroundColor: COLORS.GRAY_200,
  },
  groupAvatarGrid: {
    width: 56,
    height: 56,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 12,
    backgroundColor: COLORS.GRAY_100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  groupAvatarPart: {
    width: '50%',
    height: '50%',
    backgroundColor: COLORS.GRAY_200,
  },
  unreadBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.WHITE,
  },
  unreadText: {
    color: COLORS.WHITE,
    fontSize: 10,
    fontWeight: '700',
  },
  chatContent: {
    flex: 1,
    minWidth: 0,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.GRAY_700,
    flex: 1,
  },
  unreadName: {
    fontWeight: '700',
    color: COLORS.GRAY_900,
  },
  chatTime: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.GRAY_400,
    marginLeft: 8,
  },
  unreadTime: {
    color: COLORS.BRAND_BLUE,
  },
  chatMessage: {
    fontSize: 13,
    color: COLORS.GRAY_500,
  },
  unreadMessage: {
    fontWeight: '600',
    color: COLORS.GRAY_900,
  },
});