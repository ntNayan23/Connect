import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { INITIAL_ACTIVITIES } from '@/src/constants/data';
import { MapPin, Clock } from 'lucide-react-native';

const COLORS = {
  BRAND_BLUE: '#3B7FFF',
  GRAY_50: '#F9FAFB',
  GRAY_400: '#9CA3AF',
  GRAY_900: '#111827',
  WHITE: '#FFFFFF',
};

export default function ActivityDetailsScreen() {
  const { activityId } = useLocalSearchParams<{ activityId: string }>();
  const router = useRouter();

  // Find the activity by ID
  const activity = INITIAL_ACTIVITIES.find((a) => a.activityId === activityId);

  if (!activity) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Activity not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{activity.title}</Text>

      <View style={styles.row}>
        <MapPin size={18} color={COLORS.GRAY_400} />
        <Text style={styles.text}>{activity.location.name}</Text>
      </View>

      <View style={styles.row}>
        <Clock size={18} color={COLORS.GRAY_400} />
        <Text style={styles.text}>{activity.time}</Text>
      </View>

      <Text style={styles.text}>{activity.currentMembers} people joined</Text>

      {/* Join button goes to chat */}
      <TouchableOpacity
        style={styles.joinButton}
        onPress={() => router.push(`../chat/${activity.chatId}`)}
      >
        <Text style={styles.joinText}>Join Chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_50,
    padding: 20,
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.GRAY_900,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: COLORS.GRAY_900,
  },
  joinButton: {
    marginTop: 24,
    backgroundColor: COLORS.BRAND_BLUE,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});
