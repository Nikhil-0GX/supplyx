import React from 'react';
import { motion } from 'framer-motion';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  const { isDarkMode } = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: isDarkMode ? '#121212' : '#f5f5f5',
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: 'spring',
            damping: 5,
            stiffness: 100,
            restDelta: 0.001
          }
        }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: isDarkMode ? '#90caf9' : '#2196f3',
            mb: 2,
          }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Typography
          variant="h6"
          sx={{
            background: isDarkMode ? 
              'linear-gradient(45deg, #90caf9 30%, #69f0ae 90%)' : 
              'linear-gradient(45deg, #2196f3 30%, #00c853 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 600,
          }}
        >
          {message}
        </Typography>
      </motion.div>
    </Box>
  );
};

export default LoadingSpinner; 