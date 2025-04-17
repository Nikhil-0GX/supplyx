import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Alert,
  CircularProgress,
  TextField,
  Divider,
  Tabs,
  Tab,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import KeyIcon from '@mui/icons-material/Key';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useAuth } from '../contexts/AuthContext';
import authService from '../services/auth';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading } = useAuth();
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [anchor, setAnchor] = useState('');
  const [isPasskeySupported, setIsPasskeySupported] = useState(false);

  useEffect(() => {
    const checkPasskeySupport = async () => {
      const supported = await authService.isPasskeySupported();
      setIsPasskeySupported(supported);
    };
    checkPasskeySupport();
  }, []);

  const handleLogin = async (useExisting = false) => {
    try {
      setIsLoggingIn(true);
      setError('');
      
      if (useExisting && anchor) {
        await authService.loginWithAnchor(anchor);
      } else {
        await login();
      }
      
      navigate('/');
    } catch (err) {
      setError('Failed to login. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Welcome to Ethical Supply Chain
        </Typography>
        
        <Typography variant="body1" paragraph align="center" color="text.secondary">
          Sign in with Internet Identity to access the supply chain management system.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          centered
          sx={{ mb: 3 }}
        >
          <Tab 
            icon={<AddCircleOutlineIcon />} 
            label="New User" 
          />
          <Tab 
            icon={<KeyIcon />} 
            label="Existing User" 
          />
        </Tabs>

        {activeTab === 0 ? (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => handleLogin(false)}
              disabled={isLoggingIn}
              startIcon={isLoggingIn ? <CircularProgress size={20} /> : <LoginIcon />}
            >
              {isLoggingIn ? 'Creating Identity...' : 'Create New Internet Identity'}
            </Button>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Enter your Anchor ID"
              value={anchor}
              onChange={(e) => setAnchor(e.target.value)}
              type="number"
              placeholder="e.g., 123456"
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => handleLogin(true)}
                disabled={isLoggingIn || !anchor}
                startIcon={isLoggingIn ? <CircularProgress size={20} /> : <KeyIcon />}
              >
                {isLoggingIn ? 'Signing In...' : 'Sign In with Existing Identity'}
              </Button>
            </Box>
          </Box>
        )}

        {isPasskeySupported && (
          <Alert severity="info" sx={{ mt: 3 }}>
            Passkey authentication is supported on your device. You can use your device's security features (fingerprint/Face ID) to authenticate.
          </Alert>
        )}

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            What is Internet Identity?
          </Typography>
          <Typography variant="body2" paragraph>
            Internet Identity is a blockchain authentication system that allows you to
            create a secure digital identity without usernames or passwords. It uses
            your device's security features (like fingerprint or Face ID) to protect
            your account.
          </Typography>

          {activeTab === 0 ? (
            <>
              <Typography variant="h6" gutterBottom>
                First Time User?
              </Typography>
              <Typography variant="body2">
                1. Click "Create New Internet Identity"
                <br />
                2. Follow the setup instructions
                <br />
                3. Add your device's security features (fingerprint/Face ID)
                <br />
                4. Save your anchor number securely
                <br />
                5. You're ready to use the application!
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h6" gutterBottom>
                Returning User?
              </Typography>
              <Typography variant="body2">
                1. Enter your anchor number
                <br />
                2. Click "Sign In with Existing Identity"
                <br />
                3. Approve the authentication request on your registered device
                <br />
                4. Use your device's security features to confirm
              </Typography>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Login; 