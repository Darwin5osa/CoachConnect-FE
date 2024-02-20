import { BrowserRouter, Route, Routes } from "react-router-dom";
import Servicios from "./Paginas/Servicios.jsx";
import Contacto from "./Paginas/Contacto.jsx";
import Register from "./Paginas/Register.jsx";
import Acerca from "./Paginas/Acerca.jsx";
import Login from "./Paginas/Login.jsx";
import ReactDOM from "react-dom/client";
import Home from "./Paginas/Home";
import App from "./App.jsx";
import React from "react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Acerca />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
