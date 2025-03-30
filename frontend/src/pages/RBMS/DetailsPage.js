import { Alert, Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LineGraph from "../../components/LineGraph";
import MortgageDataTable from "../../components/MortgageDataTable";
import MortgageFormModal from "../../components/MortgageModal";
import PieChartWithNeedle from "../../components/PieChartWithNeedle";
import { apiCall } from "../../service/apiContext";

const DetailsPage = () => {
  const [mortgageData, setMortgageData] = useState([]);
  const [creditRating, setCreditRating] = useState(null);
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
      await apiCall(`mortgages/${rowId}`, "DELETE");
      setAlertMessage("Data deleted successfully!");
      setAlertType("success");
      fetchRMBSData();
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage("Failed to delete data.");
      setAlertType("error");
    }
  };

  const handleSave = async (formData) => {
    try {
      if (formData.id) {
        await apiCall(`mortgages/${formData.id}`, "PUT", formData);
        setAlertMessage("Data updated successfully!");
      } else {
        await apiCall("mortgages/", "POST", formData);
        setAlertMessage("Data added successfully!");
      }
      setAlertType("success");
      setOpenModal(false);
      setEditingData(null);
      fetchRMBSData();
    } catch (err) {
      console.error("Error:", err);
      setAlertMessage("Failed to save data.");
      setAlertType("error");
    }
  };

  const fetchRMBSData = async () => {
    try {
      const mortgageResponse = await apiCall("mortgages/");
      const creditRatingResponse = await apiCall("credit-rating/");
      setMortgageData(mortgageResponse);
      setCreditRating(
        creditRatingResponse?.["Updated Credit Rating"] > 0
          ? creditRatingResponse?.["Updated Credit Rating"]
          : null
      );
      setError(null);
    } catch (error) {
      console.error("Error fetching RMBS data:", error);
      setError("Failed to fetch data");
      setMortgageData([]);
      setCreditRating(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRMBSData();
  }, []);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const getCreditRating = () => {
    if (creditRating === null) return "---";
    if (creditRating <= 2) return "AAA";
    if (creditRating >= 3 && creditRating <= 5) return "BBB";
    return "C";
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" fontWeight="bold" color="primary">
        RMBS Alpha
      </Typography>
      <Typography color="secondary" variant="body1" sx={{ mt: 2 }}>
        A high-quality mortgage-backed security with low-risk loans and stable
        returns.
      </Typography>

      {!error && creditRating !== null && (
        <>
          <PieChartWithNeedle credit_score={creditRating} />
          <Typography color="secondary" variant="body1" sx={{ ml: 2, mt: 1 }}>
            Credit Rating: {getCreditRating()}
          </Typography>
        </>
      )}

      <Box
        sx={{
          position: "fixed",
          top: 10,
          right: 20,
          zIndex: 1000,
          minWidth: "250px",
        }}
      >
        {alertMessage && (
          <Alert severity={alertType} onClose={() => setAlertMessage("")}>
            {alertMessage}
          </Alert>
        )}
      </Box>

      {error ? (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      ) : (
        <>
          <Button
            onClick={() => setOpenModal(true)}
            variant="outlined"
            color="primary"
            sx={{ mt: 2, fontSize: 12, fontWeight: 700 }}
          >
            Insert Mortgage Data
          </Button>

          {mortgageData.length > 0 ? (
            <>
              <LineGraph data={mortgageData} />
              <MortgageDataTable
                mortgageData={mortgageData}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </>
          ) : (
            <Typography sx={{ mt: 2 }} color="error">
              No mortgage data available.
            </Typography>
          )}

          <MortgageFormModal
            open={openModal}
            handleClose={() => {
              setEditingData(null);
              setOpenModal(false);
            }}
            onSave={handleSave}
            existingData={editingData}
          />
        </>
      )}
    </Box>
  );
};

export default DetailsPage;
