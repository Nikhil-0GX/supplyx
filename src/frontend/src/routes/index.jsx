import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Loading from '../components/common/Loading';
// Lazy load pages
const Home = lazy(() => import('../pages/Home'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Products = lazy(() => import('../pages/Products'));
const Suppliers = lazy(() => import('../pages/Suppliers'));
const Analytics = lazy(() => import('../pages/Analytics'));
const Settings = lazy(() => import('../pages/Settings'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Layout components
const MainLayout = lazy(() => import('../layouts/MainLayout'));

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

const AnimatedRoute = ({ children }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageTransition}
  >
    {children}
  </motion.div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <AnimatedRoute>
                <Home />
              </AnimatedRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <AnimatedRoute>
                <Dashboard />
              </AnimatedRoute>
            }
          />
          <Route
            path="products"
            element={
              <AnimatedRoute>
                <Products />
              </AnimatedRoute>
            }
          />
          <Route
            path="suppliers"
            element={
              <AnimatedRoute>
                <Suppliers />
              </AnimatedRoute>
            }
          />
          <Route
            path="analytics"
            element={
              <AnimatedRoute>
                <Analytics />
              </AnimatedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <AnimatedRoute>
                <Settings />
              </AnimatedRoute>
            }
          />
          <Route
            path="*"
            element={
              <AnimatedRoute>
                <NotFound />
              </AnimatedRoute>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes; 