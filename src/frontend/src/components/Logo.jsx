import React from 'react';
import { Box, Typography } from '@mui/material';

const Logo = ({ size = 'medium', showText = true }) => {
  const dimensions = {
    small: 32,
    medium: 40,
    large: 48,
  };

  const logoSize = dimensions[size] || dimensions.medium;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        component="img"
        src={process.env.PUBLIC_URL + '/logo.png'}
        alt="SupplyX Logo"
        sx={{
          width: logoSize,
          height: logoSize,
          borderRadius: '50%',
          mr: showText ? 2 : 0,
        }}
      />
      {showText && (
        <Typography
          variant={size === 'small' ? 'h6' : 'h5'}
          sx={{
            fontWeight: 600,
            background: 'linear-gradient(45deg, #90caf9 30%, #4db6ac 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          SupplyX
        </Typography>
      )}
    </Box>
  );
};

export default Logo; 