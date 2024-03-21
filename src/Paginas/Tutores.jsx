import { isSameDay, format, isBefore, startOfDay } from "date-fns";
import React, { useState, useEffect, useMemo } from "react";
import { useGlobalContex } from "../Utils/global.context";
import { Link as ScrollLink } from "react-scroll";
import s from "./css/tutores.module.css";
import { DateRangePicker } from "rsuite";
import { Link } from "react-router-dom";
import Card from "../Componentes/Card";
import "./css/calendar.css";

const Tutores = () => {
  const [selectedRange, setSelectedRange] = useState(null);
  const [formattedRange, setFormattedRange] = useState(null);
  const disabledDates = [
    new Date("2024-03-25"),
    new Date("2024-03-26"),
    new Date("2024-03-27"),
  ];

  const handleDateRangeChange = () => {
    setSelectedRange(selectedRange);
  };

  const {
    appearance,
    allowedMaxDays,
    allowedDays,
    allowedRange,
    beforeToday,
    afterToday,
    combine,
  } = DateRangePicker;
  const currentDate = new Date().toISOString().split("T")[0]; // Obtiene la fecha actual en formato 'YYYY-MM-DD'

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    const selectedEndDate = event.target.value;

    if (selectedEndDate < startDate) {
      alert("La fecha de fin no puede ser anterior a la fecha de inicio");
      setEndDate("");
    } else {
      setEndDate(selectedEndDate);
    }
  };

  const { state } = useGlobalContex();

  const [term, setTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { TUTORIAS, TUTORES, NIVELES } = state;
  const [tutorias, setTutorias] = useState(TUTORIAS);
  console.log(tutorias);
  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth > 1200 ? 10 : 5
  );

  useEffect(() => {
    setTutorias(TUTORIAS);
  }, [state]);

  const fetchTutoriasDisponibilidad = (url) => {
    console.log(url);
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
        setTutorias(data);
    });

  };

  const search = () => {
    if (selectedRange) {
      const formattedStartDate = format(selectedRange[0], "yyyy-MM-dd");
      const formattedEndDate = format(selectedRange[1], "yyyy-MM-dd");
      const url = `https://api.coachconnect.tech/tutoria/disponibilidad?fechaInicio=${formattedStartDate}&fechaFin=${formattedEndDate}`;
      setFormattedRange(url);
      // Realizar el fetch a la URL
      fetchTutoriasDisponibilidad(url);
    } else {
      setFormattedRange(null);
    }
  };

  const handleCancelSearch = () => {
    setTutorias(TUTORIAS)
    setSelectedRange(null);
    setTerm("");
  };

  const filteredTutorias = useMemo(() => {
    return tutorias.filter((tutoria) =>
      tutoria.nombre.toLowerCase().includes(term)
    );
  }, [TUTORIAS, term, tutorias]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTutorias = filteredTutorias.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredTutorias.length / itemsPerPage);

  const obtenerTutoriasAleatorias = () => {
    const tutoriasAleatorias = [];
    const tutoriasDisponibles = [...TUTORIAS];

    while (tutoriasAleatorias.length < 4 && tutoriasDisponibles.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * tutoriasDisponibles.length
      );
      const randomTutoria = tutoriasDisponibles.splice(randomIndex, 1)[0];
      tutoriasAleatorias.push(randomTutoria);
    }

    return tutoriasAleatorias;
  };

  const tutoriasRecomendadas = useMemo(
    () => obtenerTutoriasAleatorias(),
    [TUTORIAS]
  );

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
      <Link
        to={`/detalle/${tutoria.id}`}
        key={index}
        className={s.link}
        style={{ textDecoration: "none" }}
      >
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
          TUTORIAS
        </h2>
      </header>
      <div className={s.menu}>
        <div className={s.content}>
          <h3 className={s.titleB}>Buscador</h3>
          <div className={s.input}>
            <label>Tutoria</label>
            <input
              className={s.search}
              type="text"
              placeholder="Buscar tutoria"
              value={term}
              onChange={handleInputChange}
            />
          </div>
          <div className={s.picker}>
            <DateRangePicker
              value={selectedRange}
              onChange={(e) => setSelectedRange(e)}
              block
              label="Fechas de inicio y fin"
              editable={false}
              format="dd.MM.yyyy"
              shouldDisableDate={(date) => {
                // Deshabilita las fechas anteriores a hoy, pero no deshabilita la fecha de hoy
                const isBeforeToday = isBefore(date, startOfDay(new Date()));
                // Deshabilita las fechas presentes en disabledDates
                const isDisabled = disabledDates.some((disabledDate) =>
                  isSameDay(date, disabledDate)
                );

                // Retorna true si la fecha está antes de hoy o si está en disabledDates
                return isBeforeToday || isDisabled;
              }}
            />
          </div>
          <div className={s.buscar}>
            <button className={s.res} onClick={handleCancelSearch}>
              Restablecer
            </button>
            <button className={s.bus} onClick={search}>
              Buscar
            </button>
          </div>
        </div>
      </div>
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
              offset={-100}
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
