import React from "react";
import { LineChart, Line, Text, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Paper, Typography } from "@mui/material";

const LineGraph = ({ data }) => {
  return (
    <Paper sx={{ padding: "1rem", marginTop: "2rem", boxShadow: 3, borderRadius: 2}}>
      <Typography variant="h6" fontWeight="bold" color="primary" sx={{ textAlign: "center", marginBottom: "1rem" }}>
        Mortgage Data Trends
      </Typography>
      <ResponsiveContainer height={170}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis tick={{ fontSize: 9 }} />
          <Legend 
          verticalAlign="top" 
          align="right" 
          layout="vertical" 
          wrapperStyle={{ right: 10, top: 10 }}
        />
          <Tooltip />
          <Line type="monotone" dataKey="loan_amount" stroke="#82ca9d" strokeWidth={2} name="Loan Amount (₹)" />
          <Line type="monotone" dataKey="property_value" stroke="#ff7300" strokeWidth={2} name="Property Value (₹)" />
          <Line type="monotone" dataKey="annual_income" stroke="#d81b60" strokeWidth={2} name="Annual Income (₹)" />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default LineGraph;
