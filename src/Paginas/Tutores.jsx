import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { RiSearch2Line } from "react-icons/ri";
import data from "../Utils/DatosTutores.json";
import { Link } from "react-router-dom";
import Card from "../Componentes/Card";
import s from "./tutores.module.css";
import { useMemo } from "react";

const Tutores = () => {
  const [tutores, setTutores] = useState(data.tutores);
  const [term, setTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth > 1450 ? 10 : 5
  );

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth > 1429 ? 10 : 5);
    };

    window.addEventListener("resize", handleResize);

    // Limpieza del event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Se ejecuta solo una vez al montar el componente

  const pages = Math.ceil(tutores.length / itemsPerPage) - 1;
  console.log(pages);

  const handleInputChange = (event) => {
    setTerm(event.target.value.toLowerCase());
    setCurrentPage(0);
  };

  const filteredTutores = tutores.filter((tutor) => {
    const fullName = `${tutor.nombre} ${tutor.apellido}`.toLowerCase();
    return fullName.includes(term);
  });

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTutores = filteredTutores.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredTutores.length / itemsPerPage);
  console.log(totalPages);

  const renderPageButtons = useMemo(() => {
    const buttons = [];
    for (let i = 0; i < totalPages; i++) {
      buttons.push(
        <ScrollLink
          key={i}
          className={s.link}
          to="mentores"
          offset={-80}
          smooth={true}
          duration={100}
        >
          <button
            onClick={() => setCurrentPage(i)}
            className={`${currentPage === i ? s.active : ""} ${s.btn_pagina}`}
          >
            {i + 1}
          </button>
        </ScrollLink>
      );
    }
    return buttons;
  }, [currentPage, totalPages]);

  return (
    <main id="mentores" className={s.mainTutores}>
      <header className={s.header}>
        <h2 className={s.title}>NUESTROS MENTORES</h2>
        <div className={s.searchCont}>
          <RiSearch2Line className={s.ico} />
          <input
            className={s.search}
            type="text"
            placeholder="Buscar tutor"
            value={term}
            onChange={handleInputChange}
          />
        </div>
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
      {filteredTutores.length > itemsPerPage && (
        <div className={s.pagination}>{renderPageButtons}</div>
      )}
    </main>
  );
};

export default Tutores;
