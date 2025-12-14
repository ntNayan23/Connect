// app/_layout.tsx
import { AuthProvider, useAuth } from '@/src/context/AuthContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import 'react-native-reanimated';
import LoginScreen from './auth/login';
import SignupScreen from './auth/signup';

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNav />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}


function RootNav() {
  const { user, isLoading } = useAuth();
  const [authScreen, setAuthScreen] = useState<'login' | 'signup'>('login');

  console.log('RootNav - user:', user, 'isLoading:', isLoading);

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#3B7FFF', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={{ color: '#FFFFFF', marginTop: 16 }}>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    console.log(`User null → showing ${authScreen}`);

    if (authScreen === 'login') {
      return <LoginScreen onGoToSignup={() => setAuthScreen('signup')} />;
    }

    if (authScreen === 'signup') {
      return <SignupScreen onGoToLogin={() => setAuthScreen('login')} />;
    }
  }

  return <AppNavigator />;
}

function AppNavigator() {
  console.log('AppNavigator rendering');
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="screens/chat/[chatId]" />
      <Stack.Screen name="screens/create-activity" />
      <Stack.Screen name="screens/activityDetail" />
    </Stack>
  );
}
