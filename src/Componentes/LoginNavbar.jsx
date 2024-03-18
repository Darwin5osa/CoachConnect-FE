
import s from "./css/Navbar.module.css";
import React from "react";
import { Link } from "react-router-dom";

const LoginNavbar = () => {
  return (
    <nav className={s.navbarL}>
      <Link to="/" className={s.navbarlogo}>
        <img className={s.logo1} src="/Asset3.png" alt="Logo" />
      </Link>
    </nav>
  );
};

export default LoginNavbar;
