import { useGlobalContex } from "../Utils/global.context";
import s from "./css/cardCont.module.css";
import { Link } from "react-router-dom";
import Card from "./Card";
import React from "react";

const Cardcont = ({ tutorias, tutores, niveles }) => {
  const { state } = useGlobalContex();
  const buscarTutor = (id) => tutores.find((tutor) => tutor.id === id);
  const buscarNivel = (id) => niveles.find((nivel) => nivel.id === id);
  const renderTutorCards = (tutorias) => {
    return tutorias.map((tutoria, index) => (
      <Card
        key={index}
        tutoria={tutoria}
        tutor={buscarTutor(tutoria.tutorId)}
        nivel={buscarNivel(tutoria.nivelId)}
      />
    ));
  };

  return <div className={s.cardContainer}>{renderTutorCards(tutorias)}</div>;
};

export default Cardcont;
