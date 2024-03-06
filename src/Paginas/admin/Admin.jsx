import s from "../css/admin.module.css";
import React from "react";
import { useGlobalContex } from "../../Utils/global.context";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useGlobalContex();
  const handleClose = () => {
    dispatch({type: "CLOSE_SESSION"})
    navigate("/")
  };
  return (
    <div className={s.admin}>
      <button onClick={handleClose}>cerrar sesion</button>
    </div>
  );
};

export default Admin;
