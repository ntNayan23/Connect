import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const COLORS = {
  BRAND_BLUE: '#3B7FFF',
  BRAND_PURPLE: '#D946EF',
  BRAND_ORANGE: '#FFA947',
  GRAY_100: '#F3F4F6',
  GRAY_200: '#E5E7EB',
  WHITE: '#FFFFFF',
  TEXT_DARK: '#1F2937',
  TEXT_LIGHT: '#6B7280',
};

type LoginScreenProps = {
  onGoToSignup: () => void;
};


export default function LoginScreen({ onGoToSignup }: LoginScreenProps) {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          {/* Logo */}
          <View style={styles.logoBox}>
            <Heart size={40} color={COLORS.BRAND_BLUE} fill={COLORS.BRAND_BLUE} />
          </View>

          <Text style={styles.appName}>Connectly</Text>
          <Text style={styles.appTagline}>Spontaneous meetups made simple.</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Email Input */}
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              placeholderTextColor={COLORS.WHITE}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />
          </View>

          {/* Password Input */}
          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={COLORS.WHITE}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />
          </View>

          {/* Error Message */}
          {error && <Text style={styles.errorText}>{error}</Text>}

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'Logging in...' : 'LOGIN'}
            </Text>
          </TouchableOpacity>

          {/* Signup Link */}
          <View style={styles.signupSection}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity  onPress={onGoToSignup} disabled={loading}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Demo Credentials */}
          <View style={styles.demoSection}>
            <Text style={styles.demoText}>Demo Credentials:</Text>
            <Text style={styles.demoCredential}>Email: demo@connectly.com</Text>
            <Text style={styles.demoCredential}>Password: demo123</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BRAND_BLUE,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 60,
  },
  logoBox: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  appName: {
    fontSize: 48,
    fontWeight: '700',
    color: COLORS.WHITE,
    marginBottom: 8,
    letterSpacing: -1,
  },
  appTagline: {
    fontSize: 16,
    color: '#93C5FD',
    opacity: 0.9,
    textAlign: 'center',
  },
  formSection: {
    gap: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DBEAFE',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: COLORS.WHITE,
    fontSize: 14,
    fontWeight: '500',
  },
  errorText: {
    color: '#FCA5A5',
    fontSize: 13,
    fontWeight: '600',
    marginTop: -12,
  },
  loginButton: {
    backgroundColor: COLORS.BRAND_ORANGE,
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  signupSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  signupText: {
    fontSize: 13,
    color: '#E0E7FF',
  },
  signupLink: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: '#DBEAFE',
  },
  demoSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    padding: 12,
    marginTop: 24,
  },
  demoText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DBEAFE',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  demoCredential: {
    fontSize: 12,
    color: '#E0E7FF',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
});