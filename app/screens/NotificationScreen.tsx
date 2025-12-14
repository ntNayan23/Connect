import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  WHITE: '#FFFFFF',
  GRAY_100: '#F3F4F6',
  GRAY_200: '#E5E7EB',
  GRAY_400: '#9CA3AF',
  GRAY_600: '#4B5563',
  GRAY_900: '#111827',
  BLUE: '#3B7FFF',
  LIGHT_BLUE: '#E6F0FF',
};

type Notification = {
  id: string;
  avatar: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
};

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    title: 'You have received a payment of $300.00',
    description: 'Payment has been successfully completed.',
    time: '2 mins ago',
    read: false,
  },
  {
    id: '2',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    title: 'Your order placed a payment of $120.00',
    description: 'Payment successful.',
    time: '5 mins ago',
    read: true,
  },
  {
    id: '3',
    avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
    title: 'You have received a payment of $1000.00',
    description: 'Payment completed.',
    time: '1 hour ago',
    read: true,
  },
  {
    id: '4',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    title: 'You have credited a payment of $400 from John Doe.',
    description: 'Successfully received.',
    time: '3 hours ago',
    read: true,
  },
];

export default function NotificationScreen() {
  const router = useRouter();

  const handleBackPress = () => {
    // Navigate to Home screen (adjust route path if needed)
    router.replace('/');
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <View style={[styles.notificationItem, item.read ? {} : styles.unread]}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <ChevronLeft size={24} color={COLORS.BLUE} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* Notifications List */}
      <FlatList
        data={MOCK_NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_200,
  },
  backButton: {
    paddingRight: 16,
    paddingVertical: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.BLUE,
  },
  listContent: {
    paddingVertical: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 12,
    borderRadius: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  unread: {
    backgroundColor: COLORS.LIGHT_BLUE,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.GRAY_900,
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: COLORS.GRAY_600,
    marginBottom: 4,
  },
  time: {
    fontSize: 11,
    color: COLORS.GRAY_400,
  },
});
