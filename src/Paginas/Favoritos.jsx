import { useGlobalContex } from "../Utils/global.context";
import BannerFavs from "../Componentes/BannerFavs";
import Pagination from "../Componentes/Pagination";
import React, { useEffect, useState } from "react";
import Cardcont from "../Componentes/Cardcont";
import s from "./css/favoritos.module.css";

const Favoritos = () => {
  const { state } = useGlobalContex();
  const { favs, TUTORES, NIVELES } = state;
  const [fav, setFav] = useState(favs);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth > 1200 ? 10 : 5
  );
  useEffect(() => {
    setFav(favs);
  }, [state]);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentTutorias = favs.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <BannerFavs />
      <div className={s.mainTutores}>
        <header className={s.header}>
          <h2 id="startList" className={s.title}>FAVORITOS</h2>
        </header>
        <Cardcont
          tutorias={currentTutorias}
          tutores={TUTORES}
          niveles={NIVELES}
        />
        <Pagination tutorias={fav} handlePageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Favoritos;
