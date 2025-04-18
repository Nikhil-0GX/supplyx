import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

const ScanProduct = () => {
  const navigate = useNavigate();
  const [productId, setProductId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productId.trim()) {
      setError('Please enter a product ID');
      return;
    }
    // Navigate to product details page
    navigate(`/product/${productId}`);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Scan Product
        </Typography>
        
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              
              <TextField
                label="Product ID"
                variant="outlined"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                fullWidth
                placeholder="Enter product ID or scan QR code"
              />
              
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<QrCodeScannerIcon />}
                fullWidth
              >
                Look Up Product
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          Scan a product's QR code or enter its ID to view its ethical supply chain information
        </Typography>
      </Box>
    </Container>
  );
};

export default ScanProduct; 