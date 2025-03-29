import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HomePage from "./pages/Home/HomePage";
import DetailsPage from './pages/RBMS/DetailsPage'
import "./App.css"; // Import the CSS file
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const theme = createTheme({
  palette: {
    primary: 
    {
      main: '#A35C7A',
    },
    secondary: 
    {
      main: '#F29F58',
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
