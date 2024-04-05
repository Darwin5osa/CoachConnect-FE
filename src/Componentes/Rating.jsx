import { useGlobalContex } from "../Utils/global.context";
import { Rating as RatingStar } from "primereact/rating";
import { useEffect, useState } from "react";
import s from "./css/rating.module.css";
import { toast, Toaster } from "sonner";
import CardRating from "./CardRating";
import React from "react";
const Rating = ({ send, id }) => {
  const { state } = useGlobalContex();
  const [mensaje, setMensaje] = useState("");
  const [ratingNumber, setRatingNumer] = useState(null);
  const [resena, setResena] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);

  const postResena = () => {
    fetch(`https://api.coachconnect.tech/tutoria/${id}/resena`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        calificacion: ratingNumber,
        contenido: mensaje,
        estudianteId: state.session.estudianteId,
      }),
    })
      .then(() => {
        setMensaje("");
        send()
        setRatingNumer(null);
        getResena();
        toast.success("¡Tu reseña ha sido enviada exitosamente!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrió un error al enviar tu reseña.");
      });
  };

  const getResena = () => {
    fetch(`https://api.coachconnect.tech/tutoria/${id}/resena`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setResena(data.reverse());
      });
  };
  const getEstudiantes = () => {
    fetch("https://api.coachconnect.tech/estudiante", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setEstudiantes(data);
      });
  };
  useEffect(() => {
    getResena();
  }, []);

  useEffect(() => {
    getEstudiantes();
  }, [resena]);

  const handleSend = () => {
    if (state.session) {
      if (state.session.role === "ADMIN") {
        toast.warning(
          "Los administradores no tienen permiso para enviar reseñas."
        );
        return;
      } else {
        if (mensaje.length > 5 && ratingNumber > 0) {
          postResena()
        } else {
          toast.warning(
            "El mensaje debe contener minimo 5 caracteres y el rating mayor a 0"
          );
        }
      }
    } else {
      toast.warning("debes iniciar sesión para realizar esta acción");
      return;
    }
  };

  return (
    <div className={s.mainRating}>
      <div className={s.addResena}>
        <textarea
          onChange={(e) => setMensaje(e.target.value)}
          type="text"
          placeholder="Tu mensaje aqui..."
        />
        <RatingStar
          className={s.ratingInput}
          value={ratingNumber}
          onChange={(e) => setRatingNumer(e.value)}
          cancel={false}
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
      {resena.length > 0 &&
        resena.map((item, i) => {
          let est = estudiantes.find((e) => e.id === item.estudianteId);
          if (est) {
            return (
              <CardRating
                key={i}
                username={est.username}
                rating={item.calificacion}
                contenido={item.contenido}
              />
            );
          } else {
            // Aquí puedes decidir qué hacer en caso de que el estudiante no se encuentre
            return null; // O un indicador de carga o un mensaje de error
          }
        })}
    </div>
  );
};

export default Rating;
