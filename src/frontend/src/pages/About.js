import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import {
  Security as SecurityIcon,
  Visibility as VisibilityIcon,
  Eco as EcoIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';

const features = [
  {
    icon: <SecurityIcon sx={{ fontSize: 40, color: '#90caf9' }} />,
    title: 'Secure Blockchain Technology',
    description: 'Utilizing advanced blockchain technology to ensure data integrity and immutability throughout the supply chain.',
  },
  {
    icon: <VisibilityIcon sx={{ fontSize: 40, color: '#81c784' }} />,
    title: 'Complete Transparency',
    description: 'Track every step of your product\'s journey from source to consumer with real-time visibility.',
  },
  {
    icon: <EcoIcon sx={{ fontSize: 40, color: '#4db6ac' }} />,
    title: 'Ethical Sourcing',
    description: 'Ensure compliance with ethical sourcing standards and maintain sustainable practices throughout the supply chain.',
  },
  {
    icon: <TimelineIcon sx={{ fontSize: 40, color: '#ce93d8' }} />,
    title: 'Real-time Analytics',
    description: 'Access comprehensive analytics and reporting tools to optimize your supply chain operations.',
  },
];

const About = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ pt: 4, pb: 8 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #90caf9 30%, #4db6ac 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 6,
          }}
        >
          About SupplyX
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 6,
            backgroundColor: 'rgba(18, 18, 18, 0.95)',
            color: 'white',
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ color: '#90caf9' }}>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            SupplyX is dedicated to revolutionizing supply chain management through blockchain technology
            and ethical practices. We believe in creating a more transparent, sustainable, and
            accountable global supply chain ecosystem.
          </Typography>
          <Typography variant="body1">
            Our platform enables businesses to track their products from source to consumer,
            ensuring ethical practices are maintained at every step while providing consumers
            with complete transparency about the products they purchase.
          </Typography>
        </Paper>

        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, color: 'white' }}>
          Key Features
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgba(18, 18, 18, 0.95)',
                  color: 'white',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 24px rgba(144, 202, 249, 0.15)',
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    align="center"
                    sx={{ color: '#90caf9' }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default About; 