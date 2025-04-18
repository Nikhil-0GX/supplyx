import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FactoryIcon from '@mui/icons-material/Factory';
import AgricultureIcon from '@mui/icons-material/Agriculture';

const ProductDetails = () => {
  const { id } = useParams();

  // This would normally come from an API call using the id
  const product = {
    name: "Organic Cotton T-Shirt",
    id: "PROD123",
    certifications: ["Fair Trade", "GOTS Certified", "Carbon Neutral"],
    supplyChain: [
      {
        stage: "Raw Material",
        location: "Gujarat, India",
        date: "2023-01-15",
        details: "Organic cotton harvested from certified farms"
      },
      {
        stage: "Manufacturing",
        location: "Tamil Nadu, India",
        date: "2023-02-01",
        details: "Processed in GOTS certified facility"
      },
      {
        stage: "Distribution",
        location: "Mumbai, India",
        date: "2023-02-15",
        details: "Shipped via carbon-neutral logistics"
      }
    ]
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Product Details
        </Typography>
        
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {product.name}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              Product ID: {product.id}
            </Typography>
            <Box sx={{ mt: 2 }}>
              {product.certifications.map((cert) => (
                <Chip
                  key={cert}
                  icon={<VerifiedIcon />}
                  label={cert}
                  color="success"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Supply Chain Timeline
        </Typography>
        
        <Timeline>
          {product.supplyChain.map((stage, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  {stage.stage === "Raw Material" && <AgricultureIcon />}
                  {stage.stage === "Manufacturing" && <FactoryIcon />}
                  {stage.stage === "Distribution" && <LocalShippingIcon />}
                </TimelineDot>
                {index < product.supplyChain.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h6" component="h3">
                  {stage.stage}
                </Typography>
                <Typography color="text.secondary">
                  {stage.location} - {stage.date}
                </Typography>
                <Typography>{stage.details}</Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
    </Container>
  );
};

export default ProductDetails; 