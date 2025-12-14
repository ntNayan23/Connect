import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Calendar, Clock, Users, Camera } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  BRAND_BLUE: '#3B7FFF',
  GRAY_50: '#F9FAFB',
  GRAY_100: '#F3F4F6',
  GRAY_200: '#E5E7EB',
  GRAY_300: '#D1D5DB',
  GRAY_400: '#9CA3AF',
  GRAY_500: '#6B7280',
  GRAY_700: '#374151',
  GRAY_900: '#111827',
  WHITE: '#FFFFFF',
};

const ACTIVITY_TYPES = [
  { label: 'Coffee', icon: '☕', value: 'coffee' },
  { label: 'Food', icon: '🍴', value: 'food' },
  { label: 'Drinks', icon: '🍷', value: 'drinks' },
  { label: 'Travel', icon: '✈️', value: 'travel' },
  { label: 'Other', icon: '🎉', value: 'other' },
];

export default function CreateActivityScreen() {
  const router = useRouter();
  const [type, setType] = useState('coffee');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('Today');
  const [time, setTime] = useState('Now');
  const [capacity, setCapacity] = useState(4);
  const [description, setDescription] = useState('');

  const capacityOptions = [1, 2, 3, 4, 5];

  return (
    <SafeAreaView style={styles.safeContainer} edges={['top','left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.header}>
    <TouchableOpacity style={styles.headerBack} onPress={() => router.back()}>
      <ArrowLeft size={20} color={COLORS.GRAY_900} />
      <Text style={styles.headerBackText}>Back</Text>
    </TouchableOpacity>

    <View style={styles.headerCenter}>
      <Text style={styles.headerTitle}>Create Activity</Text>
    </View>

    <View style={{ width: 24 }} />
  </View>

        {/* Activity Type */}
        <View style={styles.section}>
          <Text style={styles.label}>Activity Type</Text>
          <View style={styles.typeGrid}>
            {ACTIVITY_TYPES.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.typeButton,
                  type === item.value && styles.typeButtonActive,
                ]}
                onPress={() => setType(item.value)}
              >
                <Text style={styles.typeIcon}>{item.icon}</Text>
                <Text style={[
                  styles.typeLabel,
                  type === item.value && styles.typeLabelActive,
                ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.label}>Location</Text>
          <TouchableOpacity style={styles.locationInput}>
            <MapPin size={18} color={COLORS.GRAY_400} />
            <Text style={styles.locationText}>
              {location || 'Where is the activity?'}
            </Text>
            <Camera size={20} color={COLORS.GRAY_400} />
          </TouchableOpacity>
        </View>

        {/* Date & Time */}
        <View style={styles.section}>
          <Text style={styles.label}>Date & Time</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.dateTimeButton}>
              <Calendar size={16} color={COLORS.GRAY_900} />
              <Text style={styles.dateTimeText}>{date}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dateTimeButton}>
              <Clock size={16} color={COLORS.GRAY_900} />
              <Text style={styles.dateTimeText}>{time}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Capacity */}
        <View style={styles.section}>
          <View style={styles.capacityHeader}>
            <Text style={styles.label}>Capacity</Text>
            <Text style={styles.capacityCount}>{capacity} people</Text>
          </View>
          <View style={styles.capacityButtons}>
            <TouchableOpacity
              style={styles.capacityBtn}
              onPress={() => setCapacity(Math.max(1, capacity - 1))}
            >
              <Text style={styles.capacityText}>-</Text>
            </TouchableOpacity>

            {capacityOptions.map((num) => (
              <TouchableOpacity
                key={num}
                style={[
                  styles.capacityNumber,
                  capacity === num && styles.capacityNumberActive,
                ]}
                onPress={() => setCapacity(num)}
              >
                <Text style={[
                  styles.capacityNumberText,
                  capacity === num && styles.capacityNumberTextActive,
                ]}>
                  {num}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.capacityBtn}
              onPress={() => setCapacity(Math.min(10, capacity + 1))}
            >
              <Text style={styles.capacityText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="What should people know about this activity?"
            placeholderTextColor={COLORS.GRAY_400}
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </ScrollView>

      {/* Fixed Create Button */}
      <View style={styles.bottomButton}>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create Activity</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.GRAY_50,
    paddingTop: Platform.OS === 'android' ? 24 : 0,
  },
header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 16,
  paddingVertical: 12,
  backgroundColor: COLORS.WHITE,
},
headerBack: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
},
headerBackText: {
  fontSize: 16,
  color: COLORS.GRAY_900,
  fontWeight: '500',
},
headerCenter: {
  flex: 1,
  alignItems: 'center',
},
headerTitle: {
  fontSize: 20,
  fontWeight: '700',
  color: COLORS.GRAY_900,
},

  section: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.GRAY_900,
    marginBottom: 12,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeButton: {
    backgroundColor: COLORS.GRAY_100,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typeButtonActive: {
    backgroundColor: COLORS.BRAND_BLUE,
  },
  typeIcon: {
    fontSize: 18,
  },
  typeLabel: {
    fontSize: 14,
    color: COLORS.GRAY_700,
  },
  typeLabelActive: {
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY_50,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 12,
  },
  locationText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.GRAY_500,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  dateTimeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY_50,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 10,
  },
  dateTimeText: {
    fontSize: 16,
    color: COLORS.GRAY_900,
  },
  capacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  capacityCount: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.BRAND_BLUE,
  },
    capacityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  capacityBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.GRAY_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capacityText: {
    fontSize: 20,
    color: COLORS.GRAY_700,
  },
  capacityNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.GRAY_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capacityNumberActive: {
    backgroundColor: COLORS.BRAND_BLUE,
  },
  capacityNumberText: {
    fontSize: 16,
    color: COLORS.GRAY_700,
  },
  capacityNumberTextActive: {
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  descriptionInput: {
    backgroundColor: COLORS.GRAY_50,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderTopColor: COLORS.GRAY_200,
  },
  createButton: {
    backgroundColor: COLORS.BRAND_BLUE,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  createButtonText: {
    color: COLORS.WHITE,
    fontSize: 17,
    fontWeight: '600',
  },
});
