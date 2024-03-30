import React, { useEffect, useMemo, useState } from "react";
import { useGlobalContex } from "../Utils/global.context";
import { format, isBefore, startOfDay } from "date-fns";
import Pagination from "../Componentes/Pagination";
import Cardcont from "../Componentes/Cardcont";
import s from "./css/tutores.module.css";
import { DateRangePicker } from "rsuite";
import Card from "../Componentes/Card";
import "./css/calendar.css";

const Tutores = () => {
  const [selectedRange, setSelectedRange] = useState(null);

  const { state } = useGlobalContex();

  const [term, setTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { TUTORIAS, TUTORES, NIVELES } = state;
  const [tutorias, setTutorias] = useState(TUTORIAS);
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
      fetchTutoriasDisponibilidad(url);
    }
  };

  const handleCancelSearch = () => {
    setTutorias(TUTORIAS);
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

  const handleInputChange = (event) => {
    setTerm(event.target.value.toLowerCase());
    setCurrentPage(0);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <main id="mentores" className={s.mainTutores}>
      <header className={s.header}>
        <h2 className={s.title}>RECOMENDADOS</h2>
      </header>
      <Cardcont
        tutorias={tutoriasRecomendadas}
        tutores={TUTORES}
        niveles={NIVELES}
      />
      <header className={s.header}>
        <h2 className={s.title}>TUTORIAS</h2>
      </header>
      <div className={s.menu}>
        <div className={s.content}>
          <h3 className={s.titleB}>Buscador</h3>
          <div className={s.input}>
            <label className={s.label}>Tutoria</label>
            <input
              className={s.search}
              type="text"
              placeholder="Buscar tutoria"
              value={term}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className={s.label}>Fecha</label>
            <DateRangePicker
              className={s.picker}
              value={selectedRange}
              onChange={(e) => setSelectedRange(e)}
              block
              showOneCalendar
              editable={false}
              format="dd.MM.yyyy"
              shouldDisableDate={(date) => {
                const isBeforeToday = isBefore(date, startOfDay(new Date()));

                return isBeforeToday;
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
      <div id="startList"></div>

      {currentTutorias.length > 0 ? (
        <Cardcont
          tutorias={currentTutorias}
          tutores={TUTORES}
          niveles={NIVELES}
        />
      ) : (
        <p className={s.noResults}>
          No hay resultados para "{term}", o no hay disponibilidad en las fechas
          seleccionadas
        </p>
      )}

      <Pagination
        tutorias={filteredTutorias}
        handlePageChange={handlePageChange}
      />
    </main>
  );
};

export default Tutores;
