import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import PrivateRoute from "./Componentes/admin/PrivateRoute";
import Detail from "./Paginas/Detail";
import Favoritos from "./Paginas/Favoritos";
import Login from "./Paginas/Login";
import AdminLayout from "./views/AdminLayout";
import AdminView from "./views/AdminView";
import UserLayout from "./views/UserLayout";
import UserView from "./views/UserView";
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
        </Route>
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <AdminView />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="/admin" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
