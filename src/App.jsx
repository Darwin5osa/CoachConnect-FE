import PrivateRouteEstudiante from "./Componentes/PrivateRouteEstudiante";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import PrivateRoute from "./Componentes/admin/PrivateRoute";
import Favoritos from "./Paginas/Favoritos";
import UserLayout from "./views/UserLayout";
import Admin from "./Paginas/admin/Admin";
import Reservas from "./Paginas/Reservas";
import UserView from "./views/UserView";
import Detail from "./Paginas/Detail";
import Login from "./Paginas/Login";
import { useEffect } from "react";
import { Toaster } from "sonner";
function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="animate-fade animate-duration-500 animate-ease-linear">
      <Toaster />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index path="/" element={<UserView />} />
          <Route path="detalle/:id" element={<Detail />} />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            path="/favoritos"
            element={
              <PrivateRouteEstudiante>
                <Favoritos />
              </PrivateRouteEstudiante>
            }
          />
          <Route
            path="/reservas"
            element={
              <PrivateRouteEstudiante>
                <Reservas />
              </PrivateRouteEstudiante>
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
