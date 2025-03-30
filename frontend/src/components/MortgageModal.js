import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const MortgageFormModal = ({ open, handleClose, onSave, existingData }) => {
  const initialState = {
    credit_score: "",
    loan_amount: "",
    property_value: "",
    annual_income: "",
    debt_amount: "",
    loan_type: "fixed",
    property_type: "single_family",
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  useEffect(() => {
    if (existingData) {
      setFormData(existingData);
    } else {
      setFormData(initialState);
    }
    setError("");
  }, [existingData, open]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const credit_score = Number(formData.credit_score);
    const loan_amount = Number(formData.loan_amount);
    const property_value = Number(formData.property_value);
    const annual_income = Number(formData.annual_income);
    const debt_amount = Number(formData.debt_amount);

    if (credit_score < 300 || credit_score > 850) {
      setError("Credit score must be between 300 and 850.");
      return;
    }
    if (
      loan_amount <= 0 ||
      property_value <= 0 ||
      annual_income <= 0 ||
      debt_amount < 0
    ) {
      setError(
        "Loan Amount, Property Value, and Annual Income must be positive numbers."
      );
      return;
    }

    setError("");
    onSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      {/* Title + Error Message (Flexbox) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
        }}
      >
        <DialogTitle sx={{ margin: 1, padding: 0 }}>
          {existingData ? "Edit Mortgage Data" : "Add Mortgage Data"}
        </DialogTitle>
        {error && <Alert severity="error">{error}</Alert>}
      </div>

      <DialogContent>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <TextField
              label="Credit Score"
              name="credit_score"
              type="number"
              value={formData.credit_score}
              onChange={handleChange}
              fullWidth
              margin="normal"
              inputProps={{ min: 300, max: 850 }}
            />
            <TextField
              label="Loan Amount (₹)"
              name="loan_amount"
              type="number"
              value={formData.loan_amount}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Property Value (₹)"
              name="property_value"
              type="number"
              value={formData.property_value}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Loan Type"
              name="loan_type"
              value={formData.loan_type}
              onChange={handleChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value="fixed">Fixed</MenuItem>
              <MenuItem value="adjustable">Adjustable</MenuItem>
            </TextField>
          </div>

          <div style={{ flex: 1, minWidth: "250px" }}>
            <TextField
              label="Annual Income (₹)"
              name="annual_income"
              type="number"
              value={formData.annual_income}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Debt Amount (₹)"
              name="debt_amount"
              type="number"
              value={formData.debt_amount}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Property Type"
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value="single_family">Single Family</MenuItem>
              <MenuItem value="condo">Condo</MenuItem>
            </TextField>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          {existingData ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MortgageFormModal;
