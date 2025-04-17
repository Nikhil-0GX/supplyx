import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [identity, setIdentity] = useState(null);
  const [actor, setActor] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const authenticated = await authService.initialize();
        setIsAuthenticated(authenticated);
        if (authenticated) {
          setIdentity(authService.getIdentity());
          setActor(authService.getActor());
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (anchor) => {
    try {
      const success = await authService.loginWithAnchor(anchor);
      if (success) {
        setIsAuthenticated(true);
        setIdentity(authService.getIdentity());
        setActor(authService.getActor());
      }
      return success;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setIdentity(null);
      setActor(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const checkPasskeySupport = async () => {
    return await authService.isPasskeySupported();
  };

  const value = {
    isAuthenticated,
    isLoading,
    identity,
    actor,
    login,
    logout,
    checkPasskeySupport
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 