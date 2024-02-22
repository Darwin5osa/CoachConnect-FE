import Footer from "./Componentes/Footer";
import Navbar from "./Componentes/Navbar";
import { Outlet } from "react-router-dom";
import Home from "./Paginas/Home";
import Tutores from "./Paginas/Tutores";
function App() {
  return (
    <div>
{/*       <Navbar/>
      <Home/>
      <Tutores/> */}
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
