import { INITIAL_ACTIVITIES, MOCK_USER } from '@/src/constants/data';
import { getActivityColor, getActivityIcon } from '@/src/constants/theme';
import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'expo-router';
import { Activity, Edit2, LogOut, MapPin } from 'lucide-react-native';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  BRAND_BLUE: '#3B7FFF',
  GRAY_50: '#F9FAFB',
  GRAY_100: '#F3F4F6',
  GRAY_200: '#E5E7EB',
  GRAY_300: '#D1D5DB',
  GRAY_400: '#9CA3AF',
  GRAY_500: '#6B7280',
  GRAY_600: '#4B5563',
  GRAY_700: '#374151',
  GRAY_900: '#111827',
  WHITE: '#FFFFFF',
  RED_500: '#EF4444',
};

export default function ProfileScreen() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    console.log('🚪 Logout button pressed');
    await logout();
    console.log('✅ Logout completed, auth state updated');
    // The RootNav will automatically re-render and show LoginScreen because user is now null
  };
  const router = useRouter();


  const recentActivities = INITIAL_ACTIVITIES.slice(0, 3);

  return (
    <SafeAreaView style={styles.container} >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.headerSection}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: MOCK_USER.avatar }} style={styles.profileImage} />
          <View style={styles.editBadge}>
            <Edit2 size={12} color={COLORS.WHITE} />
          </View>
        </View>

        <Text style={styles.profileName}>
          {MOCK_USER.name}, {MOCK_USER.age}
        </Text>

        <View style={styles.locationRow}>
          <MapPin size={12} color={COLORS.GRAY_500} />
          <Text style={styles.locationText}>{MOCK_USER.location}</Text>
        </View>

        <Text style={styles.bioText}>{MOCK_USER.bio}</Text>

        {/* Interests */}
        <View style={styles.interestsSection}>
          <Text style={styles.interestsLabel}>Interests</Text>
          <View style={styles.interestsTags}>
            {MOCK_USER.interests.map((interest, idx) => (
              <TouchableOpacity key={idx} style={styles.interestTag}>
                <Text style={styles.interestTagText}>{interest}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{MOCK_USER.createdCount}</Text>
          <Text style={styles.statLabel}>Created</Text>
        </View>
        <View style={[styles.statBox, styles.statBoxBorder]}>
          <Text style={styles.statNumber}>{MOCK_USER.joinedCount}</Text>
          <Text style={styles.statLabel}>Joined</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{MOCK_USER.connections}</Text>
          <Text style={styles.statLabel}>Connects</Text>
        </View>
      </View>

      {/* Recent Activities */}
      <View style={styles.recentSection}>
        <View style={styles.recentHeader}>
          <Text style={styles.recentTitle}>Recent Activities</Text>
          <TouchableOpacity onPress={() => router.push('/screens/all-activities')}>
  <Text style={styles.seeAllLink}>See All</Text>
</TouchableOpacity>

        </View>

        <View style={styles.activitiesList}>
          {recentActivities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            const color = getActivityColor(activity.type);

            return (
              <TouchableOpacity
                key={activity.activityId}
                style={styles.activityItem}
              >
                <View style={[styles.activityIcon, { backgroundColor: color }]}>
                  <Activity size={16} color={COLORS.WHITE} />

                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityItemTitle}>{activity.title}</Text>
                  <Text style={styles.activityDate}>{activity.date}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Logout Button */}
      <View style={styles.logoutSection}>
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <LogOut size={18} color={COLORS.RED_500} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_50,
  },
  headerSection: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_200,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: COLORS.WHITE,
    backgroundColor: COLORS.GRAY_200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.BRAND_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.WHITE,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.GRAY_900,
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 12,
    color: COLORS.GRAY_500,
    fontWeight: '500',
  },
  bioText: {
    fontSize: 14,
    color: COLORS.GRAY_600,
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  interestsSection: {
    width: '100%',
  },
  interestsLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.GRAY_400,
    textAlign: 'center',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  interestsTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  interestTag: {
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: COLORS.WHITE,
  },
  interestTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.GRAY_700,
    textTransform: 'uppercase',
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    marginVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.GRAY_200,
  },
  statBox: {
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.GRAY_200,
  },
  statBoxBorder: {
    borderRightWidth: 1,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.BRAND_BLUE,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.GRAY_400,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  recentSection: {
    backgroundColor: COLORS.WHITE,
    marginHorizontal: 12,
    marginVertical: 12,
    borderRadius: 4,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.GRAY_900,
  },
  seeAllLink: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.BRAND_BLUE,
  },
  activitiesList: {
    gap: 0,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_100,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityItemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.GRAY_900,
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 12,
    color: COLORS.GRAY_500,
  },
  logoutSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
    paddingVertical: 14,
    borderRadius: 4,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.RED_500,
  },
});