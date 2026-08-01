import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthModalOpen: boolean;
  authMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register', onSuccess?: () => void) => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = 'store-app-user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [onAuthSuccess, setOnAuthSuccess] = useState<(() => void) | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const openAuthModal = (mode: 'login' | 'register' = 'login', onSuccess?: () => void) => {
    setAuthMode(mode);
    setOnAuthSuccess(() => onSuccess ?? null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setOnAuthSuccess(null);
  };

  const finishAuthSuccess = () => {
    setIsAuthModalOpen(false);
    if (onAuthSuccess) {
      onAuthSuccess();
      setOnAuthSuccess(null);
    }
  };

  // تسجيل دخول/تسجيل وهمي بدون باك اند حقيقي
  const login = (email: string) => {
    setUser({ name: email.split('@')[0], email });
    finishAuthSuccess();
  };

  const register = (name: string, email: string) => {
    setUser({ name, email });
    finishAuthSuccess();
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ user, isAuthModalOpen, authMode, openAuthModal, closeAuthModal, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}