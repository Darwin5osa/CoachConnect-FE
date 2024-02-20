import Footer from "./Componentes/Footer";
import Navbar from "./Componentes/Navbar";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
