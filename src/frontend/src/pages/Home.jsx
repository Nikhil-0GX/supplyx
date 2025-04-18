import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia 
} from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Ethical Supply Chain Tracker
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Track and verify the ethical sourcing of products through our transparent supply chain system
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image="/images/transparency.jpg"
                alt="Transparency"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Transparency
                </Typography>
                <Typography>
                  Full visibility into product sourcing and manufacturing processes
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image="/images/tracking.jpg"
                alt="Tracking"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Real-time Tracking
                </Typography>
                <Typography>
                  Track products at every stage of the supply chain
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image="/images/verification.jpg"
                alt="Verification"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Verification
                </Typography>
                <Typography>
                  Verify ethical practices and certifications
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 