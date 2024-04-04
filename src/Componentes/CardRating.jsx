import { Rating } from "primereact/rating";
import s from "./css/rating.module.css";
import React from "react";

const CardRating = ({ username, rating, contenido }) => {
  return (
    <div className={s.mainCard}>
      <header>
        <h1>@{username}</h1>
        <Rating value={rating} readOnly cancel={false} />
      </header>
      <p>{contenido}</p>
    </div>
  );
};

export default CardRating;
