'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface UserProfile {
  name: string;
  email: string;
  plan: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserProfile | null;
  login: (email?: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAuth = localStorage.getItem('isLoggedIn');
      const storedEmail = localStorage.getItem('userEmail') || 'salim@enterprise.ai';
      if (storedAuth === 'true') {
        setIsLoggedIn(true);
        setUser({
          name: 'Salim Moussaoui',
          email: storedEmail,
          plan: 'Enterprise Workspace',
        });
      }
      setIsLoading(false);
    }
  }, []);

  const login = (email?: string) => {
    const userEmail = email || 'salim@enterprise.ai';
    setIsLoggedIn(true);
    setUser({
      name: 'Salim Moussaoui',
      email: userEmail,
      plan: 'Enterprise Workspace',
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', userEmail);
    }
    router.push('/platform');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
    }
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
