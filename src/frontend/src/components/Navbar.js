import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Box
            component="img"
            sx={{ height: 40, mr: 2 }}
            alt="Logo"
            src="/logo.png"
          />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              flexGrow: 1,
            }}
          >
            Ethical Supply Chain
          </Typography>
          
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            startIcon={<HomeIcon />}
          >
            Home
          </Button>
          
          <Button
            color="inherit"
            component={RouterLink}
            to="/add-product"
            startIcon={<AddCircleOutlineIcon />}
          >
            Add Product
          </Button>
          
          <Button
            color="inherit"
            component={RouterLink}
            to="/scan"
            startIcon={<QrCodeScannerIcon />}
          >
            Scan
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 