import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import PrivateRoute from "./Componentes/admin/PrivateRoute";
import AdminLayout from "./views/AdminLayout";
import Favoritos from "./Paginas/Favoritos";
import UserLayout from "./views/UserLayout";
import Admin from "./Paginas/admin/Admin";
import AdminView from "./views/AdminView";
import Example from "./Paginas/Example";
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
        <Route path="/example" element={<Example />} />
      </Routes>
    </div>
  );
}

export default App;
