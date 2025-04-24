import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Particles } from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { useCallback } from 'react';

const MotionBox = motion(Box);

const Section = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </MotionBox>
  );
};

const Landing = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesOptions = {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: theme.palette.primary.main,
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: 3,
      },
      move: {
        enable: true,
        speed: 1,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse',
        },
      },
    },
  };

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <Section>
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              py: 8,
            }}
          >
            <Typography
              variant="h1"
              component={motion.h1}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              sx={{
                fontSize: isMobile ? '2.5rem' : '4rem',
                fontWeight: 700,
                mb: 2,
              }}
            >
              Ethical Supply Chain Tracker
            </Typography>
            <Typography
              variant="h5"
              component={motion.h5}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={{ mb: 4, color: 'text.secondary' }}
            >
              Track, Verify, and Ensure Ethical Practices in Your Supply Chain
            </Typography>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/dashboard"
                sx={{ mb: 4 }}
              >
                Get Started
              </Button>
            </motion.div>
          </Box>
        </Section>

        {/* Features Section */}
        <Section delay={0.2}>
          <Grid container spacing={4} sx={{ py: 8 }}>
            {[
              {
                title: 'Real-time Tracking',
                description: 'Monitor your supply chain in real-time with our advanced tracking system.',
              },
              {
                title: 'Ethical Verification',
                description: 'Verify ethical practices and compliance across your supply chain.',
              },
              {
                title: 'Analytics Dashboard',
                description: 'Get insights and analytics to make informed decisions.',
              },
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    boxShadow: 1,
                    height: '100%',
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* CTA Section */}
        <Section delay={0.4}>
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              borderRadius: 2,
              px: 4,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Ready to Transform Your Supply Chain?
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Join us in creating a more ethical and transparent supply chain ecosystem.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              to="/dashboard"
            >
              Start Now
            </Button>
          </Box>
        </Section>
      </Container>
    </Box>
  );
};

export default Landing; 