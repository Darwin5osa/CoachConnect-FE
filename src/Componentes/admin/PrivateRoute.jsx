import { useGlobalContex } from "../../Utils/global.context";
import { Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { state } = useGlobalContex();
  
  const session = state.session.role !== "ADMIN"

  return session ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
