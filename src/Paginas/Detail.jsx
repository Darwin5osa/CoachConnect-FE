import { isSameDay, format, isBefore, startOfDay } from "date-fns";
import { useGlobalContex } from "../Utils/global.context";
import { useNavigate, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import r from "../Paginas/css/detail.module.css";
import { DateRangePicker } from "rsuite";
const Detail = () => {
  const [datesArray, setDatesArray] = useState(null)
  const [selectedRange, setSelectedRange] = useState(null);
  const navigate = useNavigate();
  const { state } = useGlobalContex();
  const [tutoria, setTutoria] = useState("");
  const [tutor, setTutor] = useState("");
  const [caracteristicas, setCaracteristicas] = useState([]);
  const { id } = useParams();

console.log(tutoria.dias);


useEffect(() => {
  fetch(`https://api.coachconnect.tech/tutoria/${id}`)
    .then((res) => res.json())
    .then((data) => setTutoria(data));
}, []);

useEffect(() => {
  if (tutoria && tutoria.dias) {
    setDatesArray(Object.keys(tutoria.dias)
      .filter(day => tutoria.dias[day]) // Filtrar solo los días con valor true
      .map(day => new Date(2024, 2, parseInt(day)))) // Crear un objeto Date para cada día (el mes es 0-indexado)
    console.log(datesArray);
  }
}, [tutoria]);

  useEffect(() => {
    const tutorEncontrado = state.TUTORES.find(
      (tutor) => tutor.id === parseInt(id)
    );
    setTutor(tutorEncontrado);
  }, [id, state.TUTORES]);

  useEffect(() => {
    if (tutoria) {
      const caracteristicasTutoria = tutoria.caracteristicas.map(
        (idCaracteristica) =>
          state.CARACTERISTICAS.find(
            (caracteristica) => caracteristica.id === idCaracteristica
          )
      );
      setCaracteristicas(caracteristicasTutoria);
    }
  }, [tutoria, state.CARACTERISTICAS]);

  if (!tutoria || !tutor) {
    return <div style={{ color: "white" }}>Tutoría no encontrada</div>;
  }

  function irAHome() {
    navigate(-1);
  }

  return (
    <div className={r.contenedor}>
      <div className={r.calendario}>
        <h2>Disponibilidad</h2>
        <DateRangePicker
          value={selectedRange}
          block
          label="Fechas de inicio y fin"
          editable={false}
          format="dd.MM.yyyy"
          shouldDisableDate={(date) => {
            // Deshabilita las fechas anteriores a hoy, pero no deshabilita la fecha de hoy
            const isBeforeToday = isBefore(date, startOfDay(new Date()));
            // Deshabilita las fechas presentes en disabledDates
            const isDisabled = datesArray.some((disabledDate) =>
              isSameDay(date, disabledDate)
            );

            // Retorna true si la fecha está antes de hoy o si está en disabledDates
            return isBeforeToday || isDisabled;
          }}
        />
      </div>
      <div className={r.card}>
        <h1>{tutoria.nombre}</h1>
        <p>
          Las tutorías son lideradas por docentes que sobresalen por sus
          habilidades versátiles y adaptativas, se distinguen por un profundo
          conocimiento en la materia que imparten. Estos educadores son hábiles
          en el manejo de las tecnologías de la información y la comunicación,
          lo que les permite crear experiencias de aprendizaje inmersivas y
          efectivas. Además, su capacidad de escucha activa y ofrecer
          retroalimentación constructiva resulta vital en este entorno,
          garantizando que los estudiantes se sientan comprendidos y motivados
          para alcanzar sus metas educativas.{" "}
        </p>
        <div>
          <img
            className={r.imagentutor}
            src={tutor.foto}
            alt="Foto de perfil - tutor"
          />
        </div>

        <div className={r.informacion}>
          <h3 className={r.infoTutor}>
            {tutor.nombre} {tutor.apellido}
          </h3>
          <h3 className={r.tutorDes}> {tutor.descripcion}</h3>
        </div>

        <div className={r.contenedorImagenes}>
          <div className={r.ContenedorImgLeft}>
            <img
              className={r.imgLeft}
              src={tutoria.fotos[0]}
              alt="Imagen Principal"
            />
          </div>
          <div className={r.ContenedorImgRight}>
            <img
              className={r.imgRight}
              src={tutoria.fotos[1]}
              alt="Imagen Secundaria 1"
            />
            <img
              className={r.imgRight}
              src={tutoria.fotos[2]}
              alt="Imagen Secundaria 2"
            />
            <img
              className={r.imgRight}
              src={tutoria.fotos[3]}
              alt="Imagen Secundaria 3"
            />
            <img
              className={r.imgRight}
              src={tutoria.fotos[4]}
              alt="Imagen Secundaria 4"
            />
          </div>
        </div>

        <div className={r.caracteristicas}>
          <h2>Características Principales</h2>
          <ul className={r.carac}>
            {caracteristicas.map((caracteristica, index) => (
              <li
                className={r.icono}
                key={index}
                style={{ margin: "2%", marginLeft: "0" }}
              >
                <i
                  className={`fas ${caracteristica.icono}`}
                  style={{ fontSize: "24px", margin: "2%" }}
                />
                <span style={{ marginTop: "2%" }}>{caracteristica.nombre}</span>
              </li>
            ))}
          </ul>
        </div>

        <div onClick={irAHome} className={r.backArrow}>
          <i
            className="fa-solid fa-house"
          ></i>
        </div>
      </div>
    </div>
  );
};
export default Detail;
