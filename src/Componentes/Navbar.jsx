import { useGlobalContex } from "../Utils/global.context";
import { Link as ScrollLink } from "react-scroll";
import s from "./css/Navbar.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import React from "react";

const Navbar = () => {
  const { state, dispatch } = useGlobalContex();
  const navigate = useNavigate()

  function navigat(){
    navigate("/admin/dashboard")
  }
  const handleClose = () => {
    dispatch({ type: "CLOSE_SESSION" });
  };

  function handleC(){
    if(state.session.role == "ADMIN"){
      navigate( "/admin/dashboard");
    }
  }
  return (
    <nav className={s.navbar}>
      <div className={s.navbarlogo}>
        <Link to="/" className={s.logo1}>
          <img src="/Asset3.png" alt="Logo" />
        </Link>
      </div>
      <ul className={s.navbarmenu}>
        <div className={s.item}>
          <ScrollLink
            className={s.link}
            to="home"
            smooth={true}
            duration={500}
            offset={-80}
          >
            Home
          </ScrollLink>
        </div>
        <div className={s.item}>
          <ScrollLink
            className={s.link}
            to="mentores"
            smooth={true}
            duration={500}
            offset={-80}
          >
            Mentores
          </ScrollLink>
        </div>
        <div className={s.item}>
          <Link className={s.link} to="/">
            Contacto
          </Link>
        </div>
      </ul>
      {!state.session ? (
        <div className={s.navbarbuttons}>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      ) : (
        <div className={s.navSessin}>
          <p onClick={handleC}>{state.session.sub}</p>
          <button onClick={handleClose}>cerrar sesion</button>
        </div>
      )}

      {/* <label className={s.hamburger}>
        <input type="checkbox" />
        <svg viewBox="0 0 32 32">
          <path
            className={`${s.line} ${s.linetopbottom}`}
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          ></path>
          <path className={s.line} d="M7 16 27 16"></path>
        </svg>
      </label> */}
    </nav>
  );
};

export default Navbar;
