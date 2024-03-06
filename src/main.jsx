import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContextProvider } from "./Utils/global.context.jsx";
import "semantic-ui-css/semantic.min.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import React from "react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
