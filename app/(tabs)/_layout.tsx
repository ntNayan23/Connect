import { Tabs } from 'expo-router';
import { MapPin, MessageCircle, Plane, User } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const COLORS = {
  BRAND_BLUE: '#3B7FFF',
  BRAND_PURPLE: '#D946EF',
  GRAY_400: '#9CA3AF',
  WHITE: '#FFFFFF',
};

export default function TabLayout() { 
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.BRAND_BLUE,
        tabBarInactiveTintColor: COLORS.GRAY_400,
        tabBarStyle: styles.tabBar,
        headerShown: false,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <MapPin size={24} color={color} strokeWidth={2.5} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="travel"
        options={{
          title: 'Travel',
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <Plane size={24} color={color} strokeWidth={2.5} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <MessageCircle size={24} color={color} strokeWidth={2.5} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <User size={24} color={color} strokeWidth={2.5} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingBottom: 8,
    paddingTop: 8,
    height: 70,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    width: 32,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
  },
});