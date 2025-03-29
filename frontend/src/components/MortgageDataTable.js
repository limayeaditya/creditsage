import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

/**
 * Capitalize first letter of each word
 */
const toTitleCase = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const MortgageDataTable = ({ mortgageData, onEdit, onDelete }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: "1rem",
        boxShadow: 3,
        borderRadius: 2,
        maxHeight: "50vh", // Fixed height with scroll
        overflow: "auto",
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F29F58" }}>
            {[
              "Credit Score",
              "Loan Amount (₹)",
              "Property Value (₹)",
              "Annual Income (₹)",
              "Debt Amount (₹)",
              "Loan Type",
              "Property Type",
              "Created At",
              "Actions", // New column for icons
            ].map((header) => (
              <TableCell
                key={header}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  backgroundColor: "#F29F58!important",
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {mortgageData.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell align="center">{item.credit_score}</TableCell>
              <TableCell align="center">{item.loan_amount}</TableCell>
              <TableCell align="center">{item.property_value}</TableCell>
              <TableCell align="center">{item.annual_income}</TableCell>
              <TableCell align="center">{item.debt_amount}</TableCell>
              <TableCell align="center">{toTitleCase(item.loan_type)}</TableCell>
              <TableCell align="center">{toTitleCase(item.property_type)}</TableCell>
              <TableCell align="center">
                {new Date(item.created_at).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>

              {/* Edit & Delete Icons */}
              <TableCell align="center">
                <IconButton
                  onClick={() => onEdit(item)}
                  color="primary"
                  size="small"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(item.id)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MortgageDataTable;
