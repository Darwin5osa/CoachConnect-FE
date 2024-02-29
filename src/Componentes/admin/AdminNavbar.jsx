
import s from "../css/Navbar.module.css";
import React from "react";

const AdminNavbar = () => {
  return (
    <nav className={s.navbar}>
      <div className={s.navbarlogo}>
        <img className={s.logo1} src="/Asset3.png" alt="Logo" />
      </div>
    </nav>
  );
};

export default AdminNavbar;
