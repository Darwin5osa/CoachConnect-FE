import { useGlobalContex } from "../Utils/global.context";

import { format, parseISO, isBefore, isAfter, isToday, startOfDay } from "date-fns"; // Importa las funciones necesarias de date-fns

import React, { useEffect, useState } from "react";
import s from "./css/reservas.module.css";

const Reservas = () => {
  const { state } = useGlobalContex();
  const [reservas, setReservas] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.coachconnect.tech/estudiante/${state.session.estudianteId}/reserva`
    )
      .then((response) => response.json())
      .then((res) => setReservas(res));
  }, []);
  console.log(reservas);

  const [currentPage, setCurrentPage] = useState(1);
  const PerPage = 6;

  const indexOfLast = currentPage * PerPage;
  const indexOfFirst = indexOfLast - PerPage;
  const current = reservas.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(reservas.length / PerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getEstadoReserva = (fechaInicio) => {
    const fechaInicioObj = startOfDay(parseISO(fechaInicio));
    console.log(fechaInicioObj);
    console.log(new Date());
    console.log(isAfter(new Date(), fechaInicioObj));
    console.log("---------");
    if (isAfter(startOfDay(new Date()), fechaInicioObj)) {
      return "pasada";
    }
    if (isToday(fechaInicioObj)) {
      return "En curso";
    }
    if (isBefore(startOfDay(new Date()), fechaInicioObj)) {
      return "futura";
    }
  };

  if (!state.session) return;
  else
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
                <p className={`${s.infoTutoria} ${s.maped}`}>
                  {r.tutoria.nombre}
                </p>
                <p className={`${s.infoAlumno} ${s.maped}`}>
                  {r.estudiante.nombre} {r.estudiante.apellido}
                </p>
                <p className={`${s.infoTutor} ${s.maped}`}>
                  {r.tutor.nombre} {r.tutor.apellido}
                </p>
                <p className={`${s.infoFecha} ${s.maped}`}>
                  {format(parseISO(r.fechaInicio), "dd/MM")} -{" "}
                  {format(parseISO(r.fechaFin), "dd/MM")}
                </p>
                <p className={`${s.infoState} ${s.maped}`}>
                  {getEstadoReserva(r.fechaInicio)}
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
      </main>
    );
};

export default Reservas;
