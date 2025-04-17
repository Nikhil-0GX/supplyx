import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import SearchIcon from '@mui/icons-material/Search';

const ScanProduct = () => {
  const navigate = useNavigate();
  const [productId, setProductId] = useState('');
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!productId.trim()) {
      setError('Please enter a product ID');
      return;
    }
    navigate(`/product/${productId.trim()}`);
  };

  const handleScannerClick = () => {
    // In a real application, this would open the device camera
    // For now, we'll just show an alert
    alert('Camera functionality will be implemented here');
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Scan Product
        </Typography>

        <Box sx={{ mt: 4, mb: 6 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<QrCodeScannerIcon />}
            onClick={handleScannerClick}
            fullWidth
            sx={{ height: 100 }}
          >
            Scan QR Code
          </Button>
        </Box>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Or Enter Product ID Manually
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            label="Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            error={!!error}
            placeholder="Enter the product ID"
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 4 }}
          align="center"
        >
          Scan a product's QR code or enter its ID to view its complete supply
          chain history and verify its authenticity.
        </Typography>
      </Paper>
    </Container>
  );
};

export default ScanProduct; 