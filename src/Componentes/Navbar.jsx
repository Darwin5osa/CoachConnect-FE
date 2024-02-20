import { Link } from "react-router-dom";
import s from "./Navbar.module.css";
import React from "react";

const Navbar = () => {
  return (
    <nav className={s.navbar}>
      <div className={s.navbarlogo}>
        <Link to="/">
          <img src="/logoPlaceholder.png" alt="Logo" />
        </Link>
      </div>
      <div className={s.navbarmenu}>
        <ul>
          <li className={s.item}>
            <Link to="/about">Acerca de</Link>
          </li>
          <li className={s.item}>
            <Link to="/servicios">Servicios</Link>
          </li>
          <li className={s.item}>
            <Link to="/contacto">Contacto</Link>
          </li>
        </ul>
      </div>
      <div className={s.navbarbuttons}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
