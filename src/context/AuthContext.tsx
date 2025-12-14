// src/context/AuthContext.tsx
import { AuthUser } from '@/src/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface AuthContextType {
  user: AuthUser;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load user from storage when app starts
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('auth_user');
        console.log('Saved user from storage:', savedUser);
        
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log('Failed to load user, setting to null:', error);
        // Set user to null even if there's an error
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    // Demo credentials
    if (email === 'demo@connectly.com' && password === 'demo123') {
      const demoUser: AuthUser = {
        uid: 'demo123',
        email: 'demo@connectly.com',
        name: 'Demo User',
      };
      try {
        await AsyncStorage.setItem('auth_user', JSON.stringify(demoUser));
      } catch (error) {
        console.log('Error saving user:', error);
      }
      setUser(demoUser);
      return;
    }

    throw new Error('Invalid email or password');
  };

  const signup = async (email: string, password: string, name?: string) => {
    const newUser: AuthUser = {
      uid: Date.now().toString(),
      email,
      name: name || email.split('@')[0],
    };

    try {
      await AsyncStorage.setItem('auth_user', JSON.stringify(newUser));
    } catch (error) {
      console.log('Error saving user:', error);
    }
    setUser(newUser);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('auth_user');
    } catch (error) {
      console.log('Error removing user:', error);
    }
    setUser(null);
  };

  console.log('Auth Context State:', { user, isLoading });

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};