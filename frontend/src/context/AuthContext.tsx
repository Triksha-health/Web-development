import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name: string; // 👈 Keeping your existing 'name' key (from email.split('@')[0])
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = 'http://localhost:5000/api/auth'; // ✅ Update when deploying

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('triksha_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      const backendUser = res.data.user;  // backend sends: { id, username, email }
      const token = res.data.token;

      const transformedUser: User = {
        id: backendUser.id,
        email: backendUser.email,
        name: backendUser.username, // ✅ Keeping your code structure (name used in UI)
      };

      localStorage.setItem('triksha_user', JSON.stringify(transformedUser));
      localStorage.setItem('triksha_token', token);

      setUser(transformedUser);
    } catch (error) {
      throw new Error((error as any).response?.data?.msg || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);

    try {
      await axios.post(`${API_URL}/register`, {
        username: name,  // ✅ Your backend expects "username"
        email,
        password,
      });
      await login(email, password); // Auto-login after signup (as in mock)
    } catch (error) {
      throw new Error((error as any).response?.data?.msg || 'Failed to create an account');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('triksha_user');
    localStorage.removeItem('triksha_token');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
