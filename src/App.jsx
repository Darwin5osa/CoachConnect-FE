import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import PrivateRoute from "./Componentes/admin/PrivateRoute";
import Favoritos from "./Paginas/Favoritos";
import UserLayout from "./views/UserLayout";
import Admin from "./Paginas/admin/Admin";
import UserView from "./views/UserView";
import Detail from "./Paginas/Detail";
import Login from "./Paginas/Login";
import { useEffect } from "react";
function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index path="/" element={<UserView />} />
          <Route path="detalle/:id" element={<Detail />} />
          <Route path="favoritos" element={<Favoritos />} />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route path="/admin" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
