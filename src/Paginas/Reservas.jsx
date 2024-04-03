import { format, parseISO, isBefore, isAfter, startOfDay } from "date-fns"; // Importa las funciones necesarias de date-fns
import { useGlobalContex } from "../Utils/global.context";
import React, { useEffect, useState } from "react";
import s from "./css/reservas.module.css";

const Reservas = () => {
  // Obtiene el estado global del contexto
  const { state } = useGlobalContex();

  // Estado para almacenar las reservas
  const [reservas, setReservas] = useState([]);

  // Efecto para cargar las reservas del estudiante desde la API
  useEffect(() => {
    fetch(
      `https://api.coachconnect.tech/estudiante/${state.session.estudianteId}/reserva`
    )
      .then((response) => response.json())
      .then((res) => setReservas(res.reverse()));
  }, []);

  // Estado para el número de página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Estado para el número de reservas a mostrar por página
  const [PerPage, setPerPage] = useState(window.innerWidth > 800 ? 6 : 3);

  // Calcular los índices de las reservas a mostrar en la página actual
  const indexOfLast = currentPage * PerPage;
  const indexOfFirst = indexOfLast - PerPage;
  const current = reservas.slice(indexOfFirst, indexOfLast);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(reservas.length / PerPage);

  // Efecto para ajustar el número de reservas por página al cambiar el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      const newPerPage = window.innerWidth > 800 ? 6 : 3;
      if (newPerPage !== PerPage) {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reiniciar a la primera página solo si PerPage cambia
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [PerPage]); // Solo se ejecuta cuando PerPage cambia

  // Función para ir a la página siguiente
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para ir a la página anterior
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Función para obtener el estado de la reserva
  const getEstadoReserva = (fechaInicio, fechaFin) => {
    const fechaInicioObj = startOfDay(parseISO(fechaInicio));
    const fechaFinObj = startOfDay(parseISO(fechaFin));
    const hoy = startOfDay(new Date());

    if (isBefore(hoy, fechaInicioObj)) {
      return "futura";
    }
    if (isAfter(hoy, fechaFinObj)) {
      return "pasada";
    }
    return "En curso";
  };

  // Renderizar el componente
  return (
    <main className={s.mainReservas}>
      <div className={s.contenedor}>
        
        <h1 className={s.titleReservas}>Tus reservas</h1>
        <ul className={s.listReservas}>
          <li className={s.li}>
            <p className={s.infoTutoria}>Tutoria</p>
            <p className={s.infoAlumno}>Alumno</p>
            <p className={s.infoTutor}>Tutor</p>
            <p className={s.infoFecha}>Inicio - Fin</p>
            <p className={s.infoState}>Estado</p>
          </li>
          {current.map((r) => (
            <li key={r.id} className={s.mapedLi}>
              <p className={s.rTit}>Tutoria</p>
              <p className={`${s.infoTutoria} ${s.maped}`}>
                {r.tutoria.nombre}
              </p>
              <p className={s.rTit}>Alumno</p>
              <p className={`${s.infoAlumno} ${s.maped}`}>
                {r.estudiante.nombre} {r.estudiante.apellido}
              </p>
              <p className={s.rTit}>Tutor</p>
              <p className={`${s.infoTutor} ${s.maped}`}>
                {r.tutor.nombre} {r.tutor.apellido}
              </p>
              <p className={s.rTit}>Inicio - Fin</p>
              <p className={`${s.infoFecha} ${s.maped}`}>
                {format(parseISO(r.fechaInicio), "dd/MM")} -{" "}
                {format(parseISO(r.fechaFin), "dd/MM")}
              </p>
              <p className={s.rTit}>Estado</p>
              <p className={`${s.infoState} ${s.maped}`}>
                {getEstadoReserva(r.fechaInicio, r.fechaFin)}
              </p>
            </li>
          ))}
          <div className={s.pagination}>
            <button onClick={handlePrevPage}>Anterior</button>
            <span>{currentPage}</span>
            <button onClick={handleNextPage}>Siguiente</button>
          </div>
        </ul>
      </div>
      <p className={s.orden}>Por orden de creación.</p>
    </main>
  );
};

export default Reservas;
