import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = 'https://triksha-backend-f5f0cth4f9c0b8g9.southindia-01.azurewebsites.net/api/auth';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    const storedToken = urlToken || localStorage.getItem('triksha_token');

    if (urlToken) {
      localStorage.setItem('triksha_token', urlToken);
      window.history.replaceState({}, document.title, '/userdashboard');
    }

    if (storedToken) {
      try {
        const decoded: any = jwtDecode(storedToken);
        const userData: User = {
          id: decoded.id,
          email: decoded.email,
          name: decoded.username,
        };
        setUser(userData);
        setToken(storedToken);
        localStorage.setItem('triksha_user', JSON.stringify(userData));
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('triksha_user');
        localStorage.removeItem('triksha_token');
        setUser(null);
        setToken(null);
      }
    } else {
      const savedUser = localStorage.getItem('triksha_user');
      const savedToken = localStorage.getItem('triksha_token');
      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await api.post('/login', { email, password });
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
      setToken(token);
    } catch (error) {
      throw new Error((error as any).response?.data?.message || 'Invalid credentials');
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
      setToken(token);
    } catch (error) {
      throw new Error((error as any).response?.data?.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('triksha_user');
    localStorage.removeItem('triksha_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
