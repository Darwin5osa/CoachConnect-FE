import { BrowserRouter, Route, Routes } from "react-router-dom";
import Servicios from "./Paginas/Servicios.jsx";
import Contacto from "./Paginas/Contacto.jsx";
import Register from "./Paginas/Register.jsx";
import Acerca from "./Paginas/Acerca.jsx";
import Login from "./Paginas/Login.jsx";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import React from "react";
import "./index.css";
import Initial from "./Paginas/Initial.jsx";
import 'semantic-ui-css/semantic.min.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   {/*  <App/> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Initial />} />
          <Route path="/acerca-de" element={<Acerca />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/mentores" element={<Servicios />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrarse" element={<Register />} />
          <Route path="/detalle/:id" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
