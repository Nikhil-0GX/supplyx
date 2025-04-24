import React, { useMemo, memo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Box, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { createPopper } from '@popperjs/core';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const MotionPaper = motion(Paper);

const Chart = memo(({
  type = 'line',
  data,
  title,
  options = {},
  height = 300,
  width = '100%',
}) => {
  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    ...options,
  }), [options]);

  const chartData = useMemo(() => ({
    labels: data.labels,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      borderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    })),
  }), [data]);

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line data={chartData} options={chartOptions} />;
      case 'bar':
        return <Bar data={chartData} options={chartOptions} />;
      case 'pie':
        return <Pie data={chartData} options={chartOptions} />;
      default:
        return <Line data={chartData} options={chartOptions} />;
    }
  };

  return (
    <MotionPaper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      sx={{
        p: 2,
        height,
        width,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      <Box sx={{ flex: 1, position: 'relative' }}>
        {renderChart()}
      </Box>
    </MotionPaper>
  );
});

Chart.displayName = 'Chart';

export default Chart; 