import React from "react";
import s from "../css/adminlogin.module.css";

const AdminLogin = () => {
  const isLoggedIn = localStorage.getItem("admin") === "true";
  if(isLoggedIn) {
    window.location.href = "/admin/dashboard"
  }
  const handleAdminLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("admin", "true");
    // Redirigir al usuario a /admin/dashboard después de iniciar sesión
    window.location.href = "/admin/dashboard";
  };

  return (
    <div className={s.login}>
      <form className={s.form}>
        {/* Llama a la función handleAdminLogin cuando se hace clic en el botón */}
        <button onClick={handleAdminLogin}>Iniciar sesión</button>
      </form>
    </div>
  );
};

export default AdminLogin;
