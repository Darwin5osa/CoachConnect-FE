import React, { useState } from "react";
import { useGlobalContex } from "../Utils/global.context";
import { useParams } from "react-router";
import { useEffect } from "react";
import data from "../Utils/DatosTutores.json";
import r from "../Paginas/css/detail.module.css";
const Detail = () => {
  const { state } = useGlobalContex();
  const [tutoria, setTutoria] = useState("");
  const [tutor, setTutor] = useState("");
  const [caracteristicas, setCaracteristicas] = useState([]);
  const { id } = useParams();
  const [politicas, setPoliticas] = useState("");

  useEffect(() => {
    const tutoriaEncontrada = state.TUTORIAS.find(
      (tutoria) => tutoria.id === parseInt(id)
    );
    setTutoria(tutoriaEncontrada);
  }, [id, state.TUTORIAS]);

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

  function compartirEnFacebook() {
    const url = window.location.href; 
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  }

  
  function compartirEnTwitter() {
    const url = window.location.href; 
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank');
  }

  useEffect(() => {
    obtenerPoliticas()
      .then((data) => {
        setPoliticas(data.politicas);
      })
      .catch((error) => {
        console.error("Error al obtener las políticas:", error);
      });
  }, []);

  console.log("------caracteristicas------");
  console.log(caracteristicas);
  console.log("------caracteristicas------");
  if (!tutoria || !tutor) {
    return <div style={{ color: "white" }}>Tutoría no encontrada</div>;
  }

  function irAHome() {
    window.location.href = "/";
  }

  return (
    <div div className={r.contenedor}>
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

        <div className={r.politicas}>
          <h2>Políticas</h2>
          <p>{politicas}</p>
        </div>

        <div className={r.informacion}>
          <h3 className={r.infoTutor}>
            {tutor.nombre} {tutor.apellido}
          </h3>
          <h3> {tutor.descripcion}</h3>
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
          <ul>
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

        <div
          onClick={irAHome}
          className={r.backArrow}
        >
          <i
            className="fa-solid fa-house"
            style={{
              fontSize: "25px",
              marginRight: "10px",
            }}
          ></i>
          <p style={{ margin: "0" }}>Volver a Home</p>

          <div className={r.botonesCompartir}>
          <button onClick={compartirEnFacebook}>
            <FontAwesomeIcon icon={faFacebook} />
          </button>
          <button onClick={compartirEnTwitter}>
            <FontAwesomeIcon icon={faTwitter} />
          </button>
        </div>

        </div>
      </div>
    </div>
  );
};
export default Detail;
