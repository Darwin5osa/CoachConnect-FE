import Footer from "../Componentes/Footer";
import Navbar from "../Componentes/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet/>
      <Footer />
    </div>
  );
};

export default UserLayout;
