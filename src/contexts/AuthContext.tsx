
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'ANALYST' | 'VIEWER';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session token
    const timer = setTimeout(() => {
      const storedUser = localStorage.getItem('wk_user_session');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const login = () => {
    setIsLoading(true);
    // Simulate SSO Redirect & Callback
    setTimeout(() => {
      const mockUser: User = {
        id: 'WK-8821',
        name: 'Alex Rivera',
        email: 'alex.rivera@wolterskluwer.com',
        role: 'ADMIN', // In prod, this comes from AD Groups
      };
      setUser(mockUser);
      localStorage.setItem('wk_user_session', JSON.stringify(mockUser));
      setIsLoading(false);
    }, 1500);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wk_user_session');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
