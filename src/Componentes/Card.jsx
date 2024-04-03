import { MdOutlineFavorite, MdStar } from "react-icons/md";
import { useGlobalContex } from "../Utils/global.context";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import s from "./css/card.module.css";
import { toast } from "sonner";
const Card = (data) => {
  const { state, getFavs, dispatch } = useGlobalContex();
  const { session } = state;

  const handleDeleteFav = () => {
    const id = state.session.estudianteId;
    fetch(
      `https://api.coachconnect.tech/estudiante/${id}/favorito/${data.tutoria.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .catch((err) => console.log(err))
      .finally(() => {
        getFavs(dispatch, id);
      });
  };
  const handleAddFav = () => {
    const id = state.session.estudianteId;
    fetch(`https://api.coachconnect.tech/estudiante/${id}/favorito`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tutoriaId: data.tutoria.id,
      }),
    })
      .catch((err) => console.log(err))
      .finally(() => {
        getFavs(dispatch, id);
      });
  };

  const handleFav = () => {
    if (session?.role === "ESTUDIANTE") {
      if (data.fav) {
        console.log("eliminado");
        handleDeleteFav();
      } else {
        console.log("agregado");
        handleAddFav();
      }
    } else {
      toast.info("Debes iniciar sesion");
    }
  };

  function renderCards() {
    return (
      <div className={s.g}>
        <div className={s.favCont}>
          <MdOutlineFavorite
            onClick={handleFav}
            className={`${s.fav} ${
              session?.role === "ESTUDIANTE" && data.fav ? s.favActive : ""
            }`}
          />
        </div>
        <Link
          to={`/detalle/${data.tutoria.id}`}
          style={{ textDecoration: "none" }}
        >
          <div className={s.cardContainer}>
            <div className={s.img}>
              <img src={data.tutor.foto} alt="foto de perfil" />
            </div>
            <div className={s.info}>
              <div className={s.profession}>{data.nivel.nombre}</div>
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
        </Link>
      </div>
    );
  }

  if (!data.tutor && state.favs) return;
  else return renderCards();
};

export default Card;
