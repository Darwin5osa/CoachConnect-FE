import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { useGlobalContex } from "../Utils/global.context";
import React, { useEffect, useState } from "react";
import { IoLogIn } from "react-icons/io5";
import { MdLogin } from "react-icons/md";
import s from "./css/Navbar.module.css";
import { FaHome } from "react-icons/fa";
const Navbar = () => {
  const { state, dispatch } = useGlobalContex();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
    dispatch({ type: "CLOSE_SESSION" });
    setMenuOpen(false);
  };

  useEffect(() => {
    if (menuOpen) {
      // Deshabilitar el scroll
      document.body.style.overflow = "hidden";
    } else {
      // Habilitar el scroll
      document.body.style.overflow = "visible";
    }

    // Cleanup del efecto
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [menuOpen]);

  function handleOpen() {
    if (menuOpen === false) {
      setMenuOpen(true);
    }
    if (menuOpen === true) {
      setMenuOpen(false);
    }
  }

  const handleOpenM = () => {
    setMenuOpen(true);
  };

  const handleCloseM = () => {
    setMenuOpen(false);
  };

  const handleHome = () => {
    setMenuOpen(false);
    return navigate("/");
  };

  const handleSignin = () => {
    setMenuOpen(false);
    return navigate("/login");
  };
  const handleRegister = () => {
    setMenuOpen(false);
    return navigate("/register");
  };
  const handleFav = () => {
    setMenuOpen(false);
    return navigate("/favoritos");
  };
  const handleAdm = () => {
    setMenuOpen(false);
    return navigate("/admin/dashboard");
  };

  return (
    <>
      <div onClick={()=> setMenuOpen(false)} className={`${s.menu} ${menuOpen ? s.active : ""}`}>
        {state.session ? (
          <div className={s.navMenuName}>Hola, {state.session.nombre}!</div>
        ) : (
          ""
        )}
        <div className={s.navMenu} onClick={handleHome}>
          Home
        </div>
        {state.session.role === "ESTUDIANTE" ? (
          <Link
            style={{ textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
            to={"/reservas"}
            className={s.a}
          >
            <div className={s.navMenu}>Mis Reservas</div>
          </Link>
        ) : (
          ""
        )}
        {!state.session ? (
          <div className={s.navMenu} onClick={handleSignin}>
            Sign In
          </div>
        ) : (
          ""
        )}
        {!state.session ? (
          <div className={s.navMenu} onClick={handleRegister}>
            Register
          </div>
        ) : (
          ""
        )}

        {state.session.role == "ESTUDIANTE" ? (
          <div className={s.navMenu} onClick={handleFav}>
            Favoritos
          </div>
        ) : (
          ""
        )}
        {state.session.role == "ADMIN" ? (
          <div className={s.navMenu} onClick={handleAdm}>
            Administrar
          </div>
        ) : (
          ""
        )}
        {state.session ? (
          <div className={s.navMenu} onClick={handleClose}>
            Salir
          </div>
        ) : (
          ""
        )}
      </div>
      <nav className={s.navbar}>
        <div className={s.navbarlogo}>
          <Link onClick={handleCloseM} to="/" className={s.logo1}>
            <img src="/Asset3.png" alt="Logo" />
          </Link>
        </div>

        <div className={s.hamburger} onClick={handleOpen}>
          <svg viewBox="0 0 32 32">
            <path
              className={`${s.line} ${s.linetopbottom}`}
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            ></path>
            <path className={s.line} d="M7 16 27 16"></path>
          </svg>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
