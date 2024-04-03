import React, { useEffect, useMemo, useState } from "react";
import { useGlobalContex } from "../Utils/global.context";
import { format, isBefore, startOfDay } from "date-fns";
import Pagination from "../Componentes/Pagination";
import Cardcont from "../Componentes/Cardcont";
import { DateRangePicker } from "rsuite";
import s from "./css/tutores.module.css";
import "./css/calendar.css";

const Tutores = () => {
  // Estado para el rango de fechas seleccionado
  const [selectedRange, setSelectedRange] = useState(null);

  // Estado para el término de búsqueda
  const [term, setTerm] = useState("");

  // Estado para el número de página actual
  const [currentPage, setCurrentPage] = useState(0);

  // Estado para los datos globales del contexto
  const { state } = useGlobalContex();
  const { TUTORIAS, TUTORES, NIVELES } = state;

  // Estado para las tutorías
  const [tutorias, setTutorias] = useState(TUTORIAS);

  // Estado para el número de elementos por página
  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth > 1200 ? 10 : 5
  );

  // Función para barajar un array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Efecto para barajar las tutorías cuando cambia el estado global
  useEffect(() => {
    setTutorias(shuffleArray(TUTORIAS));
  }, [state]);

  // Función para buscar tutorías según el rango de fechas seleccionado
  const fetchTutoriasDisponibilidad = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTutorias(data);
      });
  };

  // Función para realizar la búsqueda
  const search = () => {
    if (selectedRange) {
      const formattedStartDate = format(selectedRange[0], "yyyy-MM-dd");
      const formattedEndDate = format(selectedRange[1], "yyyy-MM-dd");
      const url = `https://api.coachconnect.tech/tutoria/disponibilidad?fechaInicio=${formattedStartDate}&fechaFin=${formattedEndDate}`;
      fetchTutoriasDisponibilidad(url);
    }
  };

  // Función para cancelar la búsqueda y restablecer los estados
  const handleCancelSearch = () => {
    setTutorias(TUTORIAS);
    setSelectedRange(null);
    setTerm("");
  };

  // Memo para filtrar las tutorías según el término de búsqueda
  const filteredTutorias = useMemo(() => {
    return tutorias.filter((tutoria) =>
      tutoria.nombre.toLowerCase().includes(term)
    );
  }, [TUTORIAS, term, tutorias]);

  // Cálculo del índice inicial y final de las tutorías a mostrar en la página actual
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Obtener las tutorías para la página actual
  const currentTutorias = filteredTutorias.slice(startIndex, endIndex);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredTutorias.length / itemsPerPage);

  // Función para obtener tutorías aleatorias
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

  // Obtener tutorías recomendadas como un memo
  const tutoriasRecomendadas = useMemo(
    () => obtenerTutoriasAleatorias(),
    [TUTORIAS]
  );

  // Manejar cambios en el input de búsqueda
  const handleInputChange = (event) => {
    setTerm(event.target.value.toLowerCase());
    setCurrentPage(0);
  };

  // Manejar cambios de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Efecto para ajustar el número de elementos por página al cambiar el tamaño de la ventana
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

  // Renderizar el componente
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
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
    </main>
  );
};

export default Tutores;
