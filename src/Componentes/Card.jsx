import { FaExternalLinkAlt } from "react-icons/fa";
import { MdStar } from "react-icons/md";
import s from "./css/card.module.css";
import React from "react";
const Card = (data) => {
  const info = data.info;
  return (
    <div className={s.cardContainer}>
      <div className={s.img}>
        <img src={info.Foto} alt="foto de perfil" />
      </div>
      <div className={s.info}>
        <div className={s.profession}>{info.profesion}</div>
        <h2 className={s.name}>
          {info.nombre} {info.apellido}
        </h2>
        <p className={s.descrip}>{info.descripcion}</p>
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
