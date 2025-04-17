import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Grid,
  Chip,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import QRCode from 'react-qr-code';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedIcon from '@mui/icons-material/Verified';

const ProductDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Here we'll add the actual integration with the backend
        // const result = await getProduct(id);
        // For now, using mock data
        const mockProduct = {
          product_id: id,
          name: 'Organic Coffee Beans',
          description: 'Premium Arabica coffee beans sourced from ethical farms',
          qr_code: `https://app-domain.icp/product/${id}`,
          created_at: Date.now() - 1000000,
          updated_at: Date.now(),
          stages: [
            {
              stage_id: '1',
              timestamp: Date.now() - 1000000,
              location: 'Coffee Farm, Colombia',
              description: 'Harvested using sustainable practices',
              certifications: ['Organic', 'Fair Trade'],
              handler: 'Juan Rodriguez',
            },
            {
              stage_id: '2',
              timestamp: Date.now() - 500000,
              location: 'Processing Facility, Colombia',
              description: 'Processed and packaged for export',
              certifications: ['ISO 9001'],
              handler: 'Maria Garcia',
            },
          ],
        };
        setProduct(mockProduct);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="md">
        <Alert severity="info" sx={{ mt: 4 }}>
          Product not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography color="text.secondary" paragraph>
              {product.description}
            </Typography>
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom>
              Supply Chain History
            </Typography>
            <Stepper orientation="vertical">
              {product.stages.map((stage) => (
                <Step key={stage.stage_id} active={true}>
                  <StepLabel>
                    <Typography variant="subtitle1">
                      {new Date(stage.timestamp).toLocaleDateString()}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body1" paragraph>
                        {stage.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography>{stage.location}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography>{stage.handler}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {stage.certifications.map((cert, index) => (
                          <Chip
                            key={index}
                            icon={<VerifiedIcon />}
                            label={cert}
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Product QR Code
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                bgcolor: 'white',
                p: 2,
                borderRadius: 1,
              }}
            >
              <QRCode value={product.qr_code} size={200} />
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Product ID
              </Typography>
              <Typography color="text.secondary" sx={{ wordBreak: 'break-all' }}>
                {product.product_id}
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Created
              </Typography>
              <Typography color="text.secondary">
                {new Date(product.created_at).toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Last Updated
              </Typography>
              <Typography color="text.secondary">
                {new Date(product.updated_at).toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails; 