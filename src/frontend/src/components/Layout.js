import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  ContactSupport as ContactIcon,
  Security as SecurityIcon,
  Help as HelpIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const location = useLocation();

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'About', icon: <InfoIcon />, path: '/about' },
    { text: 'How It Works', icon: <AssignmentIcon />, path: '/how-it-works' },
    { text: 'Security', icon: <SecurityIcon />, path: '/security' },
    { text: 'Help', icon: <HelpIcon />, path: '/help' },
    { text: 'Contact', icon: <ContactIcon />, path: '/contact' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'rgba(18, 18, 18, 0.95)',
          backdropFilter: 'blur(8px)',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Avatar
              src="/logo.png"
              alt="SupplyX"
              sx={{ width: 40, height: 40, mr: 2 }}
            />
            <Typography variant="h6" noWrap component="div">
              SupplyX
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'rgba(18, 18, 18, 0.95)',
            backdropFilter: 'blur(8px)',
            color: 'white',
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: theme.spacing(2),
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src="/logo.png"
              alt="SupplyX"
              sx={{ width: 40, height: 40, mr: 2 }}
            />
            <Typography variant="h6">SupplyX</Typography>
          </Box>
          <IconButton onClick={() => setOpen(false)} sx={{ color: 'white' }}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={() => setOpen(false)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(144, 202, 249, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(144, 202, 249, 0.12)',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          minHeight: '100vh',
          pt: { xs: 8, sm: 9 },
          backgroundColor: '#121212',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 