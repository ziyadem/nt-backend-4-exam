import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App";
import axios from "axios";

// style
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";


//axios
// axios.defaults.baseURL = "http://localhost:7890";
axios.defaults.headers.common["Content-Type"] = "application/json";
let token= localStorage.getItem("token");
if (token) axios.defaults.headers.common["authorization"] = token;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
    <ToastContainer theme="colored" />
  </Router>
);

