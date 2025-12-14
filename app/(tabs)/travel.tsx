import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Clock, Plus } from 'lucide-react-native';
import { INITIAL_ACTIVITIES } from '@/src/constants/data';
import { getActivityIcon, getActivityColor } from '@/src/constants/theme';
import { Activity } from '@/src/types';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  BRAND_BLUE: '#3B7FFF',
  BRAND_PURPLE: '#D946EF',
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

const TravelCard = ({ activity, onPress }: { activity: Activity; onPress: () => void }) => {
  const Icon = getActivityIcon(activity.type);
  const color = getActivityColor(activity.type);

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {activity.image && (
        <Image source={{ uri: activity.image }} style={styles.cardImage} />
      )}

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconBox, { backgroundColor: `${color}20` }]}>
            <Icon size={18} color={color} />
          </View>
          <Text style={styles.cardTitle}>{activity.title}</Text>
        </View>

        <View style={styles.cardDetails}>
          <View style={styles.detailRow}>
            <MapPin size={14} color={COLORS.GRAY_400} />
            <Text style={styles.detailText}>{activity.location.name}</Text>
          </View>

          <View style={styles.detailRow}>
            <Clock size={14} color={COLORS.GRAY_400} />
            <Text style={styles.detailText}>{activity.time}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.memberCount}>
            <Text style={styles.memberCountText}>{activity.currentMembers} going</Text>
          </View>
          <TouchableOpacity style={styles.joinBtn}>
            <Text style={styles.joinBtnText}>Join</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function TravelScreen() {
  const router = useRouter();

  // Filter only travel activities
  const travelActivities = INITIAL_ACTIVITIES.filter((a) => a.type === 'travel');

  const handleActivityPress = (activityId: string) => {
    router.push(`../screens/activity/${activityId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Travel Adventures</Text>
          <Text style={styles.headerSubtitle}>Explore new places together</Text>
        </View>
      </View>

      {/* Travel Activities List */}
      {travelActivities.length > 0 ? (
        <FlatList
          data={travelActivities}
          keyExtractor={(item) => item.activityId}
          renderItem={({ item }) => (
            <TravelCard activity={item} onPress={() => handleActivityPress(item.activityId)} />
          )}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No travel activities yet</Text>
          <Text style={styles.emptyStateSubtext}>Be the first to create one!</Text>
        </View>
      )}

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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_100,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.GRAY_900,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.GRAY_500,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 160,
    backgroundColor: COLORS.GRAY_200,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.GRAY_900,
    flex: 1,
  },
  cardDetails: {
    gap: 8,
    marginBottom: 12,
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
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.GRAY_100,
  },
  memberCount: {
    flex: 1,
  },
  memberCountText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.GRAY_600,
  },
  joinBtn: {
    backgroundColor: COLORS.BRAND_BLUE,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  joinBtnText: {
    color: COLORS.WHITE,
    fontSize: 12,
    fontWeight: '700',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.GRAY_900,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: COLORS.GRAY_500,
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