import PrivateRoute from "./Componentes/admin/PrivateRoute";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./Paginas/admin/AdminLayout";
import AdminLogin from "./Paginas/admin/AdminLogin";
import UserLayout from "./Paginas/UserLayout";
import Admin from "./Paginas/admin/Admin";
import Register from "./Paginas/Register";
import UserView from "./Paginas/UserView";
import Detail from "./Paginas/Detail";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<UserView />} />
          <Route path="registrarse" element={<Register />} />
          <Route path="detalle/:id" element={<Detail />} />
        </Route>
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="login" element={<AdminLogin />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="/admin" element={<Navigate to="/admin/login" />} />
      </Routes>
    </div>
  );
}

export default App;
