import React, { useEffect, useState } from "react";
import { useGlobalContex } from "../Utils/global.context";
import BannerFavs from "../Componentes/BannerFavs";
import Pagination from "../Componentes/Pagination";
import Cardcont from "../Componentes/Cardcont";
import s from "./css/favoritos.module.css";

const Favoritos = () => {
  // Obtenemos el estado global
  const { state } = useGlobalContex();

  // Extraemos los favoritos, tutores y niveles del estado global
  const { favs, TUTORES, NIVELES } = state;

  // Estado para los favoritos actuales
  const [fav, setFav] = useState(favs);

  // Estado para la página actual y cantidad de items por página
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth > 1200 ? 10 : 5
  );

  // Efecto para actualizar los favoritos cuando cambia el estado global
  useEffect(() => {
    setFav(favs);
  }, [state]);

  // Índices de los elementos que se muestran en la página actual
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Array de favoritos que se muestran en la página actual
  const currentTutorias = favs.slice(startIndex, endIndex);

  // Cálculo del total de páginas
  const totalPages = Math.ceil(fav.length / itemsPerPage);

  // Función para manejar el cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Efecto para actualizar la cantidad de items por página al cambiar el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth > 1200 ? 10 : 5);
      setCurrentPage((prevPage) => Math.min(prevPage, totalPages - 1));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [totalPages]);

  // Renderizamos el componente
  return (
    <div>
      <BannerFavs />
      <div className={s.mainFavs}>
        <header className={s.header}>
          <h2 id="startList" className={s.title}>
            FAVORITOS
          </h2>
        </header>
        <Cardcont
          tutorias={currentTutorias}
          tutores={TUTORES}
          niveles={NIVELES}
        />
        <Pagination
          tutorias={fav}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default Favoritos;
