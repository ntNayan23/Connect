import { INITIAL_ACTIVITIES } from '@/src/constants/data';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MapPin } from 'lucide-react-native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = { WHITE:'#fff', GRAY_50:'#F9FAFB', GRAY_100:'#F3F4F6', GRAY_400:'#9CA3AF', GRAY_900:'#111827', BRAND_BLUE:'#3B7FFF' };

export default function ActivityDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const activityId = params.id as string;

  const activity = INITIAL_ACTIVITIES.find(a => a.activityId === activityId);

  if (!activity) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>Activity not found!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.GRAY_50 }} edges={['top','left', 'right']}>
    <ScrollView >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.leftHeader}onPress={() => router.back()}>
             <ArrowLeft size={24} color={COLORS.GRAY_900} />
            <Text style={styles.backText}>Chats</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{activity.title}</Text>
      </View>

      {/* Activity Image */}
      <Image source={{ uri: activity.image }} style={styles.image} />

      {/* Activity Details */}
      <View style={styles.detailsCard}>
        <Text style={styles.title}>{activity.title}</Text>
        <View style={styles.infoRow}>
          <MapPin size={14} color={COLORS.GRAY_400} />
          <Text style={styles.location}>{activity.location.name}, {activity.location.address}</Text>
        </View>
        <Text style={styles.description}>{activity.description}</Text>

        <View style={styles.statsRow}>
          <Text style={styles.stat}>Date: {activity.date}</Text>
          <Text style={styles.stat}>Time: {activity.time}</Text>
          <Text style={styles.stat}>Capacity: {activity.currentMembers}/{activity.capacity}</Text>
        </View>

        <Text style={styles.membersTitle}>Members:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop:8}}>
          {activity.members.map((member, idx) => (
            <Image key={idx} source={{ uri: member.avatar }} style={styles.memberAvatar} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header:{flexDirection:'row',alignItems:'center',padding:16,borderBottomWidth:1,borderBottomColor:COLORS.GRAY_100,gap:12},
  backText:{fontSize:17,fontWeight:'600',color:COLORS.BRAND_BLUE},
  headerTitle:{fontSize:17,fontWeight:'600',color:COLORS.GRAY_900, flex:1},
  image:{width:'100%',height:200},
  leftHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
},
  detailsCard:{padding:16, backgroundColor:COLORS.WHITE, margin:12, borderRadius:8, shadowColor:'#000', shadowOffset:{width:0,height:1}, shadowOpacity:0.1, shadowRadius:3, elevation:3},
  title:{fontSize:20,fontWeight:'700',marginBottom:8,color:COLORS.GRAY_900},
  infoRow:{flexDirection:'row',alignItems:'center',gap:6,marginBottom:12},
  location:{fontSize:12,color:COLORS.GRAY_400},
  description:{fontSize:14,color:COLORS.GRAY_900,marginBottom:12},
  statsRow:{flexDirection:'row',justifyContent:'space-between',marginBottom:12},
  stat:{fontSize:12,color:COLORS.WHITE},
  membersTitle:{fontSize:12,fontWeight:'700',color:COLORS.GRAY_900},
  memberAvatar:{width:40,height:40,borderRadius:20,marginRight:8}
});
