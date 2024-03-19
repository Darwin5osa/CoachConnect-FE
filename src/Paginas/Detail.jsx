import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import data from "../Utils/DatosTutores.json";
import data2 from "../Utils/TutoriaImg.json";
import r from "../Paginas/css/detail.module.css";
import { useGlobalContex } from "../Utils/global.context";
import ShareButtons from "./ShareButtons";

const Detail = () => {
  const { state } = useGlobalContex();
  const [tutoria, setTutoria] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const tutoriaEncontrada = state.tutorias.find(
      (tutoria) => tutoria.id === parseInt(id)
    );
    setTutoria(tutoriaEncontrada);
  }, [id, state.tutorias]);

  function irAHome() {
    window.location.href = "/";
  }

  const mentor = data.tutores.find((mentor) => mentor.id === parseInt(id));

  const tutoriaUrl = "";

  const randomIndices = [];
  while (randomIndices.length < 6) {
    const randomIndex = Math.floor(Math.random() * data2.imagenes.length);
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
    }
  }

  return (
    <div className={r.contenedor}>
      <div className={r.card}>
        <h1>{tutoria.nombre}</h1>
        <p>{tutoria.descripcion}</p>
        <h3>Políticas de Uso:</h3>
        <p><strong>Políticas:</strong> {tutoria.politicas}</p>
        <div>
          <img
            className={r.imagentutor}
            src={mentor.Foto}
            alt="Foto de perfil - tutor"
          />
        </div>

        <div className={r.informacion}>
          <h3 className={r.infoTutor}>
            {mentor.nombre} {mentor.apellido}
          </h3>
          <h3> {mentor.descripcion}</h3>
        </div>

        <div className={r.contenedorImagenes}>
          <div className={r.ContenedorImgLeft}>
            <img
              className={r.imgLeft}
              src={data2.imagenes[randomIndices[0]].url}
              alt="Imagen Aleatoria 1"
            />
          </div>
          <div className={r.ContenedorImgRight}>
            <img
              className={r.imgRight}
              src={data2.imagenes[randomIndices[1]].url}
              alt="Imagen Aleatoria 1"
            />
            <img
              className={r.imgRight}
              src={data2.imagenes[randomIndices[2]].url}
              alt="Imagen Aleatoria 1"
            />
            <img
              className={r.imgRight}
              src={data2.imagenes[randomIndices[4]].url}
              alt="Imagen Aleatoria 1"
            />
            <img
              className={r.imgRight}
              src={data2.imagenes[randomIndices[5]].url}
              alt="Imagen Aleatoria 1"
            />
          </div>
        </div>
        <div className={r.caracteristicas}>
          <h2>Características Principales</h2>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {tutoria.caracteristicas &&
              tutoria.caracteristicas.map((caracteristicaId) => {
                const caracteristica = state.caracteristicas.find(
                  (c) => c.id === caracteristicaId
                );
                return (
                  <div>
                    <li
                      className={r.icono}
                      key={caracteristicaId}
                      style={{ margin: "2%", marginLeft: "0" }}
                    >
                      <i
                        className={`fas ${caracteristica.icono}`}
                        style={{ fontSize: "24px", margin: "2%" }}
                      />
                      <span style={{ marginTop: "2%" }}>
                        {caracteristica.nombre}
                      </span>
                    </li>
                  </div>
                );
              })}
          </ul>
        </div>
        <div
          onClick={irAHome}
          className={r.backArrow}
          style={{ cursor: "pointer" }}
        >
          <i
            className="fa-solid fa-arrow-rotate-left"
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "25px",
              marginRight: "2%",
            }}
          ></i>
          <p>Inicio</p>
          <ShareButtons tutoriaUrl={tutoriaUrl} />
        </div>
      </div>
    </div>
  );
};

export default Detail;