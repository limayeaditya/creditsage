import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; // Import CSS
const HomePage = () => {
  const rmbsData = [
    {
      id: 1,
      name: "RMBS Alpha",
      description:
        "A high-quality mortgage-backed security with low-risk loans and stable returns.",
      imageUrl:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=900&auto=format&fit=crop&q=60",
    },
    {
      id: 2,
      name: "RMBS Beta",
      description:
        "A moderate-risk RMBS with a mix of fixed and adjustable-rate mortgages.",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1681469490209-c2f9f8f5c0a2?q=80&w=2966&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "RMBS Gamma",
      description:
        "An RMBS focused on subprime mortgages, offering high returns with higher risk.",
      imageUrl:
        "https://images.unsplash.com/photo-1534951009808-766178b47a4f?q=80&w=2940&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "RMBS Alpha",
      description:
        "A high-quality mortgage-backed security with low-risk loans and stable returns.",
      imageUrl:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=900&auto=format&fit=crop&q=60",
    },
    {
      id: 5,
      name: "RMBS Alpha",
      description:
        "A high-quality mortgage-backed security with low-risk loans and stable returns.",
      imageUrl:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=900&auto=format&fit=crop&q=60",
    },
    {
      id: 6,
      name: "RMBS Beta",
      description:
        "A moderate-risk RMBS with a mix of fixed and adjustable-rate mortgages.",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1681469490209-c2f9f8f5c0a2?q=80&w=2966&auto=format&fit=crop",
    },
    {
      id: 7,
      name: "RMBS Gamma",
      description:
        "An RMBS focused on subprime mortgages, offering high returns with higher risk.",
      imageUrl:
        "https://images.unsplash.com/photo-1534951009808-766178b47a4f?q=80&w=2940&auto=format&fit=crop",
    },
    {
      id: 8,
      name: "RMBS Alpha",
      description:
        "A high-quality mortgage-backed security with low-risk loans and stable returns.",
      imageUrl:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=900&auto=format&fit=crop&q=60",
    },
    {
      id: 9,
      name: "RMBS Gamma",
      description:
        "An RMBS focused on subprime mortgages, offering high returns with higher risk.",
      imageUrl:
        "https://images.unsplash.com/photo-1534951009808-766178b47a4f?q=80&w=2940&auto=format&fit=crop",
    },
    {
      id: 10,
      name: "RMBS Alpha",
      description:
        "A high-quality mortgage-backed security with low-risk loans and stable returns.",
      imageUrl:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=900&auto=format&fit=crop&q=60",
    },
  ];

  const navigate = useNavigate(); // React Router navigation

  return (
    <Box className="home-container">
      {/* Title and Description */}
      <Box className="title-container">
        <Typography variant="h4" fontWeight="bold" color="primary">
          CreditSage
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We are a credit rating agency that assesses the creditworthiness of
          financial products, specifically residential mortgage-backed
          securities (RMBS). Our ratings help investors and institutions
          determine the quality and risk associated with mortgage-backed
          securities.
        </Typography>
      </Box>

      {/* RMBS List using Flexbox */}
      <Box className="rmbs-list">
        {rmbsData.map((rmbs) => (
          <Card
            key={rmbs.id}
            className="rmbs-card"
            onClick={() => navigate("/details")} // Navigate to one page
            sx={{
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": { transform: "scale(1.02)", boxShadow: 7 },
            }}
          >
            <CardMedia component="img" image={rmbs.imageUrl} alt={rmbs.name} />
            <CardContent className="card-content">
              <Typography variant="h6" fontWeight="bold" color="primary">
                {rmbs.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {rmbs.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default HomePage;
