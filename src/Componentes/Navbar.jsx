import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import s from "./Navbar.module.css";
import React from "react";

const Navbar = () => {
  return (
    <nav className={s.navbar}>
      <div className={s.navbarlogo}>
        <Link to="/">
          <img src="/Asset3.png" alt="Logo" />
        </Link>
      </div>

      <ul className={s.navbarmenu}>
        <div className={s.item}>
          <Link className={s.link} to="/acerca-de">Acerca de</Link>
        </div>
        <div className={s.item}>
          <ScrollLink className={s.link} to="mentores" smooth={true} duration={500}>Mentores</ScrollLink>
        </div>
        <div className={s.item}>
          <Link className={s.link} to="/contacto">Contacto</Link>
        </div>
      </ul>

      <div className={s.navbarbuttons}>
        <Link to="/login">Login</Link>
        <Link to="/registrarse">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
