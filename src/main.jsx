import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import React from "react";
import "./index.css";
import 'semantic-ui-css/semantic.min.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
  </React.StrictMode>
);
