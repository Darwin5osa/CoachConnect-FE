import { useGlobalContex } from "../Utils/global.context";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdStar } from "react-icons/md";
import s from "./css/card.module.css";
import { useEffect } from "react";
import { useState } from "react";
import React from "react";
const Card = (data) => {
  const { state } = useGlobalContex();
  console.log("-----data card-------");
  console.log(data);
  console.log("-----data card-------");
  return (
    <div className={s.cardContainer}>
      <div className={s.img}>
        <img src={data.tutor.foto} alt="foto de perfil" />
      </div>
      <div className={s.info}>
        <div className={s.profession}>nivel: {data.nivel.nombre}</div>
        <h2 className={s.name}>{data.tutoria.nombre}</h2>
        <p className={s.descrip}>{data.tutoria.descripcion}</p>
        <div className={s.rating}>
          <MdStar />
          <MdStar />
          <MdStar />
          <MdStar />
          <MdStar />
        </div>
      </div>
      <div className={s.infoCont}>
        <FaExternalLinkAlt className={s.link} />
      </div>
    </div>
  );
};

export default Card;
