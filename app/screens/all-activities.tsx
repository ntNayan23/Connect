import { INITIAL_ACTIVITIES } from '@/src/constants/data';
import { getActivityColor, getActivityIcon } from '@/src/constants/theme';
import { useRouter } from 'expo-router';
import { MapPin } from 'lucide-react-native';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  WHITE: '#FFFFFF',
  GRAY_50: '#F9FAFB',
  GRAY_100: '#F3F4F6',
  GRAY_200: '#E5E7EB',
  GRAY_400: '#9CA3AF',
  GRAY_900: '#111827',
  BRAND_BLUE: '#3B7FFF',
};

export default function AllActivitiesScreen() {
  const router = useRouter();

  const renderItem = (activity: any) => {
    const Icon = getActivityIcon(activity.type);
    const color = getActivityColor(activity.type);

    return (
      <TouchableOpacity
        key={activity.activityId}
        style={[styles.activityCard, { borderLeftColor: color }]}
      >
        <View style={styles.activityRow}>
          <View style={[styles.iconBox, { backgroundColor: `${color}20` }]}>
            <Icon size={20} color={color} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.activityTitle}>{activity.title}</Text>
            <View style={styles.detailRow}>
              <MapPin size={12} color={COLORS.GRAY_400} />
              <Text style={styles.activityLocation}>{activity.location.name}</Text>
            </View>
            <Text style={styles.activityTime}>{activity.time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>{'<- Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Activities</Text>
      </View>

      <FlatList
        data={INITIAL_ACTIVITIES}
        keyExtractor={(item) => item.activityId}
        renderItem={({ item }) => renderItem(item)}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.GRAY_50 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_100,
    gap: 12,
  },
  backText: {
    fontSize: 14,
    color: COLORS.BRAND_BLUE,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.GRAY_900,
  },
  activityCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 4,
    marginBottom: 12,
    padding: 12,
    borderLeftWidth: 4,
  },
  activityRow: {
    flexDirection: 'row',
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.GRAY_900,
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  activityLocation: {
    fontSize: 12,
    color: COLORS.GRAY_400,
  },
  activityTime: {
    fontSize: 12,
    color: COLORS.GRAY_400,
  },
});
