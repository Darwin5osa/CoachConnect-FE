import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContextProvider } from "./Utils/global.context.jsx";
import { PrimeReactProvider } from "primereact/api";
import "semantic-ui-css/semantic.min.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import React from "react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <PrimeReactProvider>
          <App />
        </PrimeReactProvider>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
