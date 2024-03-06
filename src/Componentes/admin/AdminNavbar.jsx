
import s from "../css/Navbar.module.css";
import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className={s.navbarA}>
      <Link to="/" className={s.navbarlogo}>
        <img className={s.logo1} src="/Asset3.png" alt="Logo" />
      </Link>
    </nav>
  );
};

export default AdminNavbar;
