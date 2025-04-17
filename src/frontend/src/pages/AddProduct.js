import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Alert,
} from '@mui/material';

const steps = ['Product Details', 'Initial Stage', 'Confirmation'];

const AddProduct = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    initialStage: {
      location: '',
      description: '',
      handler: '',
      certifications: '',
    },
  });

  const handleProductDataChange = (field) => (event) => {
    setProductData({
      ...productData,
      [field]: event.target.value,
    });
  };

  const handleInitialStageChange = (field) => (event) => {
    setProductData({
      ...productData,
      initialStage: {
        ...productData.initialStage,
        [field]: event.target.value,
      },
    });
  };

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      try {
        // Here we'll add the actual integration with the backend
        // const result = await addProduct(productData);
        // navigate(`/product/${result.product_id}`);
        console.log('Product data:', productData);
        navigate('/');
      } catch (err) {
        setError(err.message);
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return productData.name.length > 0 && productData.description.length > 0;
      case 1:
        return (
          productData.initialStage.location.length > 0 &&
          productData.initialStage.description.length > 0 &&
          productData.initialStage.handler.length > 0
        );
      case 2:
        return true;
      default:
        return false;
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Product Name"
              value={productData.name}
              onChange={handleProductDataChange('name')}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Product Description"
              value={productData.description}
              onChange={handleProductDataChange('description')}
              margin="normal"
              required
              multiline
              rows={4}
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Location"
              value={productData.initialStage.location}
              onChange={handleInitialStageChange('location')}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Stage Description"
              value={productData.initialStage.description}
              onChange={handleInitialStageChange('description')}
              margin="normal"
              required
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              label="Handler Name"
              value={productData.initialStage.handler}
              onChange={handleInitialStageChange('handler')}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Certifications (comma-separated)"
              value={productData.initialStage.certifications}
              onChange={handleInitialStageChange('certifications')}
              margin="normal"
              helperText="e.g., Fair Trade, Organic, ISO 9001"
            />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Review Your Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Product Details:</Typography>
                <Typography color="text.secondary">
                  Name: {productData.name}
                </Typography>
                <Typography color="text.secondary">
                  Description: {productData.description}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Initial Stage:</Typography>
                <Typography color="text.secondary">
                  Location: {productData.initialStage.location}
                </Typography>
                <Typography color="text.secondary">
                  Handler: {productData.initialStage.handler}
                </Typography>
                <Typography color="text.secondary">
                  Description: {productData.initialStage.description}
                </Typography>
                {productData.initialStage.certifications && (
                  <Typography color="text.secondary">
                    Certifications: {productData.initialStage.certifications}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Product
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {getStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!isStepValid()}
          >
            {activeStep === steps.length - 1 ? 'Add Product' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddProduct; 