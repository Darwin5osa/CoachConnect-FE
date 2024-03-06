import PrivateRoute from "./Componentes/admin/PrivateRoute";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./Paginas/admin/AdminLayout";
import UserLayout from "./Paginas/UserLayout";
import Admin from "./Paginas/admin/Admin";
import UserView from "./Paginas/UserView";
import AdminLogin from "./Paginas/Login";
import Detail from "./Paginas/Detail";
import Example from "./Paginas/Example";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index path="/" element={<UserView />} />
          <Route path="detalle/:id" element={<Detail />} />
        </Route>
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/admin" element={<Navigate to="/login" />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/register" element={<AdminLogin />} />

        <Route path="/example" element={<Example />} />
      </Routes>
    </div>
  );
}

export default App;
