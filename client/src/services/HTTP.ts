import axios from "axios";

const HTTP = axios.create({
  baseURL: process.env["REACT_APP_API_URL"] || "http://localhost:8000/api/v1",
  headers: { 
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export default HTTP;
