import React, { useMemo } from 'react';
import { Grid, Box, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import Chart from '../components/common/Chart';
import DataTable from '../components/common/DataTable';
import { fetchDashboardData } from '../services/api';

const MotionGrid = motion(Grid);
const MotionPaper = motion(Paper);

const Dashboard = () => {
  const { data, isLoading, error } = useQuery('dashboardData', fetchDashboardData, {
    retry: 3, // Retry failed requests 3 times
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  const chartData = useMemo(() => {
    if (!data) return null;
    return {
      labels: data.monthlyStats.map((stat) => stat.month),
      datasets: [
        {
          label: 'Products Tracked',
          data: data.monthlyStats.map((stat) => stat.products),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: 'Ethical Violations',
          data: data.monthlyStats.map((stat) => stat.violations),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
  }, [data]);

  const tableColumns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'name', headerName: 'Product', width: 200 },
      { field: 'supplier', headerName: 'Supplier', width: 200 },
      { field: 'status', headerName: 'Status', width: 130 },
      {
        field: 'lastUpdated',
        headerName: 'Last Updated',
        width: 180,
        renderCell: (params) => new Date(params.value).toLocaleDateString(),
      },
    ],
    []
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.message || 'Error loading dashboard data'}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <MotionGrid
          item
          xs={12}
          md={4}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <MotionPaper
            sx={{ p: 2, textAlign: 'center' }}
            whileHover={{ scale: 1.02 }}
          >
            <Typography variant="h6" color="text.secondary">
              Total Products
            </Typography>
            <Typography variant="h4">{data?.summary?.totalProducts || 0}</Typography>
          </MotionPaper>
        </MotionGrid>
        <MotionGrid
          item
          xs={12}
          md={4}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <MotionPaper
            sx={{ p: 2, textAlign: 'center' }}
            whileHover={{ scale: 1.02 }}
          >
            <Typography variant="h6" color="text.secondary">
              Active Suppliers
            </Typography>
            <Typography variant="h4">{data?.summary?.activeSuppliers || 0}</Typography>
          </MotionPaper>
        </MotionGrid>
        <MotionGrid
          item
          xs={12}
          md={4}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <MotionPaper
            sx={{ p: 2, textAlign: 'center' }}
            whileHover={{ scale: 1.02 }}
          >
            <Typography variant="h6" color="text.secondary">
              Compliance Rate
            </Typography>
            <Typography variant="h4">
              {data?.summary?.complianceRate || 0}%
            </Typography>
          </MotionPaper>
        </MotionGrid>

        {/* Charts */}
        <MotionGrid
          item
          xs={12}
          md={6}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Chart
            type="line"
            data={chartData}
            title="Monthly Statistics"
            height={400}
          />
        </MotionGrid>
        <MotionGrid
          item
          xs={12}
          md={6}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Chart
            type="bar"
            data={chartData}
            title="Monthly Comparison"
            height={400}
          />
        </MotionGrid>

        {/* Data Table */}
        <MotionGrid
          item
          xs={12}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <DataTable
            columns={tableColumns}
            data={data?.recentProducts || []}
            loading={isLoading}
            error={error}
            page={0}
            rowsPerPage={10}
            totalCount={data?.recentProducts?.length || 0}
            onPageChange={() => {}}
            onRowsPerPageChange={() => {}}
            onRowClick={(row) => console.log('Row clicked:', row)}
          />
        </MotionGrid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 