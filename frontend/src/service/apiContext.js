import axios from "axios";

export const apiCall = async (endpoint, method = "GET", body = null) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";
  const url = `${baseUrl}/${endpoint}`;

  try {
    const response = await axios({
      method,
      url,
      data: method !== "GET" ? body : undefined, // Send body only for non-GET requests
    });

    return response.data;
  } catch (error) {
    console.error("API call error:", error);
    throw error.response ? error.response.data : error.message;
  }
};
