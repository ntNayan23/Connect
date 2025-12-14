import { getActivityColor, getActivityIcon } from '@/src/constants/theme';
import { useRouter } from 'expo-router';
import { Bell, Clock, List as ListIcon, Map, MapPin, Plus, Search } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { INITIAL_ACTIVITIES, MOCK_USER } from '../../src/constants/data';
import { Activity } from '../../src/types';

const COLORS = {
  BRAND_BLUE: '#3B7FFF',
  BRAND_PURPLE: '#D946EF',
  BRAND_ORANGE: '#FFA947',
  GRAY_50: '#F9FAFB',
  GRAY_100: '#F3F4F6',
  GRAY_200: '#E5E7EB',
  GRAY_400: '#9CA3AF',
  GRAY_500: '#6B7280',
  GRAY_600: '#4B5563',
  GRAY_700: '#374151',
  GRAY_900: '#111827',
  WHITE: '#FFFFFF',
};

const ActivityCard = ({ activity, onPress, onJoin }:{ activity: Activity; onPress: () => void; onJoin: () => void; }) => {
  const Icon = getActivityIcon(activity.type);
  const color = getActivityColor(activity.type);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.activityCard, { borderLeftColor: color, borderLeftWidth: 4 }]}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.iconBox, { backgroundColor: `${color}20` }]}>
          <Icon size={20} color={color} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.activityTitle}>{activity.title}</Text>
        </View>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <MapPin size={16} color={COLORS.GRAY_400} />
          <Text style={styles.detailText}>
            <Text style={styles.detailBold}>{activity.location.name}</Text>
            <Text style={styles.detailSeparator}> • </Text>
            <Text style={styles.distanceText}>{activity.location.distance}</Text>
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Clock size={16} color={COLORS.GRAY_400} />
          <Text style={styles.detailText}>{activity.time}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.membersList}>
          {activity.members?.slice(0, 3).map((member, idx) =>
  member?.avatar ? (
    <Image
      key={idx}
      source={{ uri: member.avatar }}
      style={[styles.memberAvatar, { marginLeft: idx > 0 ? -8 : 0 }]}
    />
  ) : null
)}

          {activity.currentMembers > 3 && (
            <View style={[styles.memberAvatarPlus, { marginLeft: -8 }]}>
              <Text style={styles.plusText}>+{activity.currentMembers - 3}</Text>
            </View>
          )}
          <Text style={styles.memberCount}>{activity.currentMembers} people</Text>
        </View>

        <TouchableOpacity style={styles.joinButton} onPress={onJoin}>
    <Text style={styles.joinButtonText}>Join</Text>
  </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchText, setSearchText] = useState('');

  const filteredActivities = INITIAL_ACTIVITIES.filter((activity) =>
    activity.title.toLowerCase().includes(searchText.toLowerCase()) ||
    activity.location.name.toLowerCase().includes(searchText.toLowerCase())
  );

 const handleActivityPress = (activityId: string) => {
  // Navigate to /activity.tsx with the activity id
  router.push(`/screens/activityDetail?id=${activityId}`);
};
const handleJoinPress = (chatId: string) => {
  router.push(`../screens/chat/${chatId}`);
};

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logo}>
            <View style={styles.logoBox}>
              <MapPin size={18} color={COLORS.WHITE} fill={COLORS.WHITE} />
            </View>
            <Text style={styles.logoText}>Connectly</Text>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => router.push('../screens/NotificationScreen')}>
  <View style={styles.bellIcon}>
    <Bell size={24} color={COLORS.GRAY_900} />
    <View style={styles.notificationDot} />
  </View>
</TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/profile')}>
              <Image
                source={{ uri: MOCK_USER.avatar }}
                style={styles.profilePic}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={18} color={COLORS.GRAY_400} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search activities..."
            placeholderTextColor={COLORS.GRAY_400}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* View Mode Toggle */}
        <View style={styles.viewModeContainer}>
          <TouchableOpacity
            style={[styles.viewModeBtn, viewMode === 'list' && styles.viewModeActive]}
            onPress={() => setViewMode('list')}
          >
            <ListIcon size={14} color={viewMode === 'list' ? COLORS.BRAND_BLUE : COLORS.GRAY_500} />
            <Text style={[styles.viewModeText, viewMode === 'list' && styles.viewModeTextActive]}>
              List
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewModeBtn, viewMode === 'map' && styles.viewModeActive]}
            onPress={() => setViewMode('map')}
          >
            <Map size={14} color={viewMode === 'map' ? COLORS.BRAND_BLUE : COLORS.GRAY_500} />
            <Text style={[styles.viewModeText, viewMode === 'map' && styles.viewModeTextActive]}>
              Map
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
      {viewMode === 'list' ? (
        <FlatList
          data={filteredActivities}
          keyExtractor={(item) => item.activityId}
          renderItem={({ item }) => (
 <ActivityCard 
      activity={item} 
      onPress={() => handleActivityPress(item.activityId)} 
      onJoin={() => handleJoinPress(item.chatId)} 
    />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      ) : (
        <View style={styles.mapPlaceholder}>
          <View style={styles.mapPlaceholderContent}>
            <MapPin size={48} color={COLORS.BRAND_BLUE} />
            <Text style={styles.mapPlaceholderText}>Map View Coming Soon</Text>
            <Text style={styles.mapPlaceholderSubtext}>Switch to List view to browse activities</Text>
          </View>
        </View>
      )}
      </View>
      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('../screens/create-activity')}
      >
        <Plus size={32} color={COLORS.WHITE} strokeWidth={3} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_50,
  },
  header: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_100,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBox: {
    width: 32,
    height: 32,
    backgroundColor: COLORS.BRAND_BLUE,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.BRAND_BLUE,
    letterSpacing: -0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bellIcon: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    backgroundColor: '#EF4444',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.WHITE,
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY_50,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
    borderRadius: 4,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.GRAY_900,
  },
  viewModeContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.GRAY_100,
    padding: 4,
    borderRadius: 4,
    gap: 4,
  },
  viewModeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 3,
    gap: 6,
  },
  viewModeActive: {
    backgroundColor: COLORS.WHITE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  viewModeText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.GRAY_500,
    textTransform: 'uppercase',
  },
  viewModeTextActive: {
    color: COLORS.BRAND_BLUE,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
    flexGrow: 1,
  },
  activityCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.GRAY_900,
  },
  cardDetails: {
    gap: 8,
    marginBottom: 12,
    paddingTop: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    color: COLORS.GRAY_600,
  },
  detailBold: {
    fontWeight: '600',
    color: COLORS.GRAY_900,
  },
  detailSeparator: {
    color: COLORS.GRAY_400,
  },
  distanceText: {
    fontWeight: '600',
    color: COLORS.BRAND_BLUE,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.GRAY_100,
  },
  membersList: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  memberAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.WHITE,
    backgroundColor: COLORS.GRAY_200,
  },
  memberAvatarPlus: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.WHITE,
    backgroundColor: COLORS.GRAY_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.GRAY_600,
  },
  memberCount: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.GRAY_500,
    marginLeft: 4,
  },
  joinButton: {
    backgroundColor: COLORS.BRAND_BLUE,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  joinButtonText: {
    color: COLORS.WHITE,
    fontSize: 12,
    fontWeight: '700',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY_50,
  },
  mapPlaceholderContent: {
    alignItems: 'center',
    gap: 12,
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.GRAY_900,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: COLORS.GRAY_500,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 16,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.BRAND_PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});