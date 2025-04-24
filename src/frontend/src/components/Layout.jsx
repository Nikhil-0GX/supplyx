import React from 'react';
import { Box, Container } from '@mui/material';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

const MotionContainer = motion(Container);

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <MotionContainer
        maxWidth="lg"
        sx={{ 
          flex: 1, 
          py: 3,
          display: 'flex',
          flexDirection: 'column'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </MotionContainer>
    </Box>
  );
};

export default Layout; 