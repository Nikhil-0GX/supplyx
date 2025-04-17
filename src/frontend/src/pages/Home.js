import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Button, Card, Container, Grid } from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import TimelineIcon from '@mui/icons-material/Timeline';
import { useTheme } from '../contexts/ThemeContext';

const FeatureCard = ({ icon, title, description, delay }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <Card
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          background: isDarkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: isDarkMode ? '0 8px 16px rgba(0,0,0,0.4)' : '0 8px 16px rgba(0,0,0,0.1)',
          }
        }}
      >
        <Box
          sx={{
            mb: 2,
            p: 2,
            borderRadius: '50%',
            background: isDarkMode ? 
              'linear-gradient(45deg, #90caf9 30%, #69f0ae 90%)' : 
              'linear-gradient(45deg, #2196f3 30%, #00c853 90%)',
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Card>
    </motion.div>
  );
};

const Home = () => {
  const { isDarkMode } = useTheme();

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 4,
            background: isDarkMode ? 
              'linear-gradient(45deg, #90caf9 30%, #69f0ae 90%)' : 
              'linear-gradient(45deg, #2196f3 30%, #00c853 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Ethical Supply Chain Tracker
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 6 }}
        >
          Ensuring transparency and ethical practices in global supply chains
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 8 }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
              background: isDarkMode ? 
                'linear-gradient(45deg, #90caf9 30%, #69f0ae 90%)' : 
                'linear-gradient(45deg, #2196f3 30%, #00c853 90%)',
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease-in-out',
              }
            }}
          >
            Add New Product
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
              borderColor: isDarkMode ? '#90caf9' : '#2196f3',
              color: isDarkMode ? '#90caf9' : '#2196f3',
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease-in-out',
                borderColor: isDarkMode ? '#69f0ae' : '#00c853',
              }
            }}
          >
            Scan Product
          </Button>
        </Box>
      </motion.div>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <FeatureCard
            icon={<QrCodeIcon sx={{ fontSize: 40, color: 'white' }} />}
            title="QR Code Tracking"
            description="Scan QR codes to instantly access product history and verify authenticity."
            delay={0.4}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FeatureCard
            icon={<VerifiedUserIcon sx={{ fontSize: 40, color: 'white' }} />}
            title="Ethical Verification"
            description="Ensure products meet fair trade and ethical sourcing standards."
            delay={0.6}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FeatureCard
            icon={<TimelineIcon sx={{ fontSize: 40, color: 'white' }} />}
            title="Supply Chain Visibility"
            description="Track products from source to consumer with complete transparency."
            delay={0.8}
          />
        </Grid>
      </Grid>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <Card
          sx={{
            mt: 8,
            p: 4,
            background: isDarkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Why Choose Our Platform?
          </Typography>
          <Typography variant="body1" paragraph>
            Our blockchain-based supply chain tracking system ensures complete transparency and accountability in your product&apos;s journey. From raw material sourcing to final delivery, every step is recorded immutably on the Internet Computer Protocol, making it impossible to tamper with the data.
          </Typography>
          <Typography variant="body1">
            Perfect for businesses committed to ethical sourcing and consumers who care about the origin and impact of their purchases.
          </Typography>
        </Card>
      </motion.div>
    </Container>
  );
};

export default Home;