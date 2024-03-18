import { useGlobalContex } from "../Utils/global.context";
import React, { useState, useEffect, useMemo } from "react";
import { Link as ScrollLink } from "react-scroll";
import s from "./css/tutores.module.css";
import { Link } from "react-router-dom";
import Card from "../Componentes/Card";

const Tutores = () => {
  const { state } = useGlobalContex();
  const [term, setTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { TUTORIAS, TUTORES, NIVELES } = state;
  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth > 1200 ? 10 : 5
  );

  const filteredTutorias = useMemo(() => {
    return TUTORIAS.filter((tutoria) =>
      tutoria.nombre.toLowerCase().includes(term)
    );
  }, [TUTORIAS, term]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTutorias = filteredTutorias.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredTutorias.length / itemsPerPage);

  const obtenerTutoriasAleatorias = () => {
    const tutoriasAleatorias = [];
    const tutoriasDisponibles = [...TUTORIAS];

    while (tutoriasAleatorias.length < 4 && tutoriasDisponibles.length > 0) {
      const randomIndex = Math.floor(Math.random() * tutoriasDisponibles.length);
      const randomTutoria = tutoriasDisponibles.splice(randomIndex, 1)[0];
      tutoriasAleatorias.push(randomTutoria);
    }

    return tutoriasAleatorias;
  };

  const tutoriasRecomendadas = useMemo(() => obtenerTutoriasAleatorias(), [
    TUTORIAS,
  ]);

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

  const handleInputChange = (event) => {
    setTerm(event.target.value.toLowerCase());
    setCurrentPage(0);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderTutorCards = (tutorias) => {
    return tutorias.map((tutoria, index) => (
      <Link to={`/detalle/${tutoria.id}`} key={index} className={s.link}>
        <Card
          tutoria={tutoria}
          tutor={buscarTutor(tutoria.tutorId)}
          nivel={buscarNivel(tutoria.nivelId)}
        />
      </Link>
    ));
  };

  const buscarTutor = (id) => TUTORES.find((tutor) => tutor.id === id);
  const buscarNivel = (id) => NIVELES.find((nivel) => nivel.id === id);

  return (
    <main id="mentores" className={s.mainTutores}>
      <header className={s.header}>
        <h2 className={s.title}>RECOMENDADOS</h2>
      </header>
      <section className={s.cardContainer}>
        {renderTutorCards(tutoriasRecomendadas)}
      </section>

      <header className={s.header}>
        <h2 id="startList" className={s.title}>
          NUESTRAS TUTORIAS
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
        {currentTutorias.length > 0 ? (
          renderTutorCards(currentTutorias)
        ) : (
          <h2 className={s.noResults}>No hay resultados para "{term}"</h2>
        )}
      </section>

      {filteredTutorias.length > itemsPerPage && (
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
