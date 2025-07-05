import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name: string; // display name
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

// ✅ Backend API URL (adjust if needed):
const API_URL = 'https://triksha-backend-f5f0cth4f9c0b8g9.southindia-01.azurewebsites.net/api/auth';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

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
      const res = await api.post('/login', { email, password });
      const backendUser = res.data.user; // returned from backend
      const token = res.data.token;

      const transformedUser: User = {
        id: backendUser.id,
        email: backendUser.email,
        name: backendUser.username,
      };

      localStorage.setItem('triksha_user', JSON.stringify(transformedUser));
      localStorage.setItem('triksha_token', token);

      setUser(transformedUser);

      // Optionally: api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      throw new Error(
        (error as any).response?.data?.message || 'Invalid credentials'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
  setIsLoading(true);

  try {
    const res = await api.post('/register', {
      username: name,
      email,
      password,
    });
    const backendUser = res.data.user;
    const token = res.data.token;

    const transformedUser: User = {
      id: backendUser.id,
      email: backendUser.email,
      name: backendUser.username,
    };

    localStorage.setItem('triksha_user', JSON.stringify(transformedUser));
    localStorage.setItem('triksha_token', token);

    setUser(transformedUser);
  } catch (error) {
    const errorMessage =
      (error as any).response?.data?.message || 'Failed to create an account';
    throw new Error(errorMessage); // ✅ Send exact server message back to SignUpPage
  } finally {
    setIsLoading(false);
  }
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem('triksha_user');
    localStorage.removeItem('triksha_token');
    // Optionally clear Authorization header
    // delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout }}
    >
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
