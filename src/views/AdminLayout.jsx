import AdminNavbar from "../Componentes/admin/AdminNavbar";
import Footer from "../Componentes/Footer";
import { Outlet } from "react-router-dom";
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminNavbar />
      <Outlet />
      <Footer/>
    </>
  );
};

export default AdminLayout;
