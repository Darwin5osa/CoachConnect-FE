import { useGlobalContex } from "../../Utils/global.context";
import s from "../css/Navbar.module.css";
import { Link } from "react-router-dom";
import React from "react";

const AdminNavbar = () => {
  const { state, dispatch } = useGlobalContex();
  const handleClose = () => {
    dispatch({ type: "CLOSE_SESSION" });
  };

  function handleC() {
    if (state.session.role == "ADMIN") {
      navigate("/admin/dashboard");
    }
  }
  return (
    <nav className={s.navbarA}>
      <Link to="/" className={s.navbarlogo}>
        <img className={s.logo1} src="/Asset3.png" alt="Logo" />
      </Link>
      <ul className={s.navbarmenu}>
        <div className={s.item}>
          <Link to="/">Home</Link>
        </div>
      </ul>
      <div className={s.navSession}>
        <p onClick={handleC}>{state.session.sub}</p>
        <button onClick={handleClose}>salir</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
