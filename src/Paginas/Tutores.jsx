import { useGlobalContex } from "../Utils/global.context";
import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import s from "./css/tutores.module.css";
import { Link } from "react-router-dom";
import Card from "../Componentes/Card";

const Tutores = () => {
  // Estados
  const { state } = useGlobalContex();
  const [tutores, setTutores] = useState(state.data);
  const [term, setTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth > 1200 ? 10 : 5
  );
  const [tutoresRecomendados, setTutoresRecomendados] = useState([]);
  
  // Variables calculadas
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredTutores = tutores.filter((tutor) => {
    const fullName = `${tutor.nombre} ${tutor.apellido}`.toLowerCase();
    return fullName.includes(term);
  });
  const currentTutores = filteredTutores.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredTutores.length / itemsPerPage);

  // Función para obtener tutores aleatorios
  const randomTutors = () => {
    let recomendados = [];
    let rep = [];
    for (let i = 0; i < 4; i++) {
      let numRandom = Math.floor(Math.random() * tutores.length);
      if (!rep.includes(numRandom)) {
        rep.push(numRandom);
        recomendados.push(tutores[numRandom]);
      } else {
        i--;
      }
    }
    return recomendados;
  };

  // Efectos secundarios
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

  useEffect(() => {
    setTutoresRecomendados(randomTutors());
  }, [tutores]);

  // Manejador para cambios en la búsqueda
  const handleInputChange = (event) => {
    setTerm(event.target.value.toLowerCase());
    setCurrentPage(0);
  };

  // Manejador para cambios de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <main id="mentores" className={s.mainTutores}>
      {/* Sección de tutores recomendados */}
      <header className={s.header}>
        <h2 className={s.title}>RECOMENDADOS</h2>
      </header>
      <section className={s.cardContainer}>
        {tutoresRecomendados.map((tutor, index) => (
          <Link to={`/detalle/${tutor.id}`} key={index} className={s.link}>
            <Card info={tutor} />
          </Link>
        ))}
      </section>

      {/* Sección de búsqueda y lista de tutores */}
      <header className={s.header}>
        <h2 id="startList" className={s.title}>
          NUESTROS MENTORES
        </h2>
        <input
          className={s.search}
          type="text"
          placeholder="Buscar mentor"
          value={term}
          onChange={handleInputChange}
        />
      </header>
      <section className={s.cardContainer}>
        {currentTutores.length > 0 ? (
          currentTutores.map((tutor, index) => (
            <Link to={`/detalle/${tutor.id}`} key={index} className={s.link}>
              <Card info={tutor} />
            </Link>
          ))
        ) : (
          <h2 className={s.noResults}>No hay resultados para "{term}"</h2>
        )}
      </section>

      {/* Paginación */}
      {filteredTutores.length > itemsPerPage && (
        <div className={s.pagination}>
          {[...Array(totalPages).keys()].map((page) => (
            <ScrollLink
              key={page}
              className={s.link}
              to="startList"
              offset={-80}
              smooth={true}
              duration={100}
            >
              <button
                onClick={() => handlePageChange(page)}
                className={`${currentPage === page ? s.active : ""} ${
                  s.btn_pagina
                }`}
              >
                {page + 1}
              </button>
            </ScrollLink>
          ))}
        </div>
      )}
    </main>
  );
};

export default Tutores;
