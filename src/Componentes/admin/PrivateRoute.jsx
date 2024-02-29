import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("admin") === "true";

  return isLoggedIn ? children : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
