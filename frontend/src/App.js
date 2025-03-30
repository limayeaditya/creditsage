import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css"; // Import the CSS file
import HomePage from "./pages/Home/HomePage";
import DetailsPage from "./pages/RBMS/DetailsPage";
const theme = createTheme({
  palette: {
    primary: {
      main: "#A35C7A",
    },
    secondary: {
      main: "#1A2130",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details" element={<DetailsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
