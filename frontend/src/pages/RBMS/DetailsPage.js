import React, { useEffect, useState } from "react";
import LineGraph from "../../components/LineGraph";
import { apiCall } from "../../service/apiContext";
import { Box, Typography, CircularProgress, Button, Alert } from "@mui/material";
import MortgageDataTable from "../../components/MortgageDataTable";
import MortgageFormModal from "../../components/MortgageModal";

const DetailsPage = () => {
  const [mortgageData, setMortgageData] = useState([]);
  const [creditRating, setCreditRating] = useState("---");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const handleEdit = (data) => {
    setEditingData(data);
    setOpenModal(true);
  };

  const handleDelete = async (rowId) => {
    try {
    const mortgageResponse = await apiCall(`mortgages/${rowId}`, "DELETE");
    setAlertMessage("Data deleted successfully!");
    setAlertType("success");
    fetchRMBSData()
    setCreditRating(mortgageResponse["Updated Credit Rating"])
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage("Failed to save data.");
      setAlertType("error");
    }

  };

  const handleSave = async (formData) => {
    try {
      if (editingData) {
        console.log("Updated Data:", formData);
        // API call to update existing entry
        setAlertMessage("Data updated successfully!");
        setCreditRating(creditRating["Updated Credit Rating"])

      } else {
        console.log("New Data:", formData);
        const mortgageResponse = await apiCall("mortgages/", "POST", formData);
        console.log(mortgageResponse, "CREDIT RATING");
        setAlertMessage("Data added successfully!");
        setCreditRating(creditRating["Updated Credit Rating"])

      }
      setAlertType("success");
      setOpenModal(false);
      fetchRMBSData(); // Refresh data after adding/editing
    } catch (err) {
      console.error("Error:", err);
      setAlertMessage("Failed to save data.");
      setAlertType("error");
    }
  };

  const fetchRMBSData = async () => {
    try {
      const mortgageResponse = await apiCall("mortgages/");
      const creditRating = await apiCall("credit-rating/");
      setMortgageData(mortgageResponse);
      setCreditRating(creditRating["Updated Credit Rating"])
      setLoading(false);
    } catch (error) {
      console.error("Error fetching RMBS data:", error);
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRMBSData();
  }, []);

  // Auto-close alert after 3 seconds
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: "2rem" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          RMBS Alpha
        </Typography>
        <Box sx={{ position: "fixed", top: 10, right: 20, zIndex: 1000, minWidth: "250px" }}>
  {alertMessage && <Alert severity={alertType} onClose={() => setAlertMessage("")}>{alertMessage}</Alert>}
</Box>
      </Box>

      <Typography variant="body1" sx={{ mt: 2 }}>
      A high-quality mortgage-backed security with low-risk loans and stable returns.
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Credit Rating: {creditRating}
      </Typography>

      <Button onClick={() => setOpenModal(true)} variant="outlined" color="primary" sx={{ mt: 2, fontSize: 12, fontWeight: 700 }}>
        Insert Mortgage Data
      </Button>

      {/* Show Mortgage Data Table */}
      {mortgageData.length > 0 ? (
        <>
          <LineGraph data={mortgageData} />
          <MortgageDataTable mortgageData={mortgageData} onDelete={handleDelete} onEdit={handleEdit} />
        </>
      ) : (
        <Typography sx={{ mt: 2 }}>No mortgage data available.</Typography>
      )}

      <MortgageFormModal open={openModal} handleClose={() => setOpenModal(false)} onSave={handleSave} existingData={editingData} />
    </Box>
  );
};

export default DetailsPage;
