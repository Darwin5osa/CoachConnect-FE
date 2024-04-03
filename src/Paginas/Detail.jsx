import { isSameDay, isBefore, startOfDay, format, parseISO } from "date-fns";
import ShareOnWhatsAppButton from "../Componentes/ShareOnWhatsAppButton";
import ShareOnFacebookButton from "../Componentes/ShareOnFacebookButton";
import React, { useEffect, useState, useCallback, useRef } from "react";
import ShareOnTwittweButton from "../Componentes/ShareOnTwittweButton";
import { useGlobalContex } from "../Utils/global.context";
import { useNavigate, useParams } from "react-router";
import r from "../Paginas/css/detail.module.css";
import { DateRangePicker } from "rsuite";
import { toast, Toaster } from "sonner";
import emailjs from "@emailjs/browser";

const Detail = () => {
  const nav = useNavigate();
  const form = useRef();
  const [expanded, setExpanded] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  const navigate = useNavigate();
  const { state } = useGlobalContex();
  const [tutoria, setTutoria] = useState("");
  const [tutor, setTutor] = useState("");
  const [caracteristicas, setCaracteristicas] = useState([]);
  const { id } = useParams();
  const [reserva, setReserva] = useState({
    fechaInicio: "",
    fechaFin: "",
    horasReservadas: 2,
    estudianteId: state.session.estudianteId,
    tutoriaId: parseInt(id),
  });
  const [disabledDates, setDisabledDates] = useState([]);

  const [fechasJavaScript, setFechasJavaScript] = useState([]); // Nuevo estado para almacenar las fechas convertidas

  const convertirAFechas = (fechas) => {
    return disabledDates.map(({ nroDia, nroMes }) => {
      return new Date(new Date().getFullYear(), nroMes - 1, nroDia);
    });
  };

  const send = () => {
    emailjs
      .sendForm("service_a0s1j68", "template_8z9l7zq", form.current, {
        publicKey: "gvdqKfnfWHEw5iG6d",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  useEffect(() => {
    setFechasJavaScript(convertirAFechas(disabledDates));
  }, [disabledDates]);
  const sendReserva = () => {
    fetch("https://api.coachconnect.tech/reserva", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reserva),
    })
      .then((response) => response.json())
      .catch(() => alert("Error al enviar la reserva"))
      .then((data) => {
        if (!data.error) {
          toast.success(
            "Reservado con exito! te llegara un mail de confirmacion"
          );
          setExpanded(false);
          setSelectedRange(null);
          handleCancelSelection();
          send();
        }
      });
  };
  const handleClick = () => {
    if (!state.session) {
      toast.info(
        "El inicio de sesion es obligatorio para realizar esta accion"
      );
      nav("/login");
      return;
    }
    if (state.session.role == "ADMIN") {
      toast.info(
        "Los administradores no tienen permiso para realizar reservas"
      );
      return;
    }
    if (reserva.fechaInicio && reserva.fechaFin) {
      setExpanded(true);
      if (expanded) {
        sendReserva();
      }
    } else {
      toast.info("Selecciona un rango de fechas");
      return;
    }
  };
  const handleCancelSelection = () => {
    setExpanded(false);
    setSelectedRange(null);
    setReserva({
      ...reserva,
      fechaInicio: "",
      fechaFin: "",
    });
  };
  const handleDateRangeChange = (value) => {
    // Actualizar el estado 'reserva' con las fechas seleccionadas
    if (value && value[0] && value[1]) {
      setReserva({
        ...reserva,
        fechaInicio: format(value[0], "yyyy-MM-dd"),
        fechaFin: format(value[1], "yyyy-MM-dd"),
      });
    }
    setSelectedRange(value);
  };

  useEffect(() => {
    const fetchTutoria = async () => {
      try {
        const response = await fetch(
          `https://api.coachconnect.tech/tutoria/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tutoria");
        }
        const data = await response.json();
        setTutoria(data);
        setDisabledDates(data.dias);
      } catch (error) {
        console.error("Error fetching tutoria:", error);
      }
    };
    const tutorEncontrado = state.TUTORES.find(
      (tutor) => tutor.id === parseInt(id)
    );
    setTutor(tutorEncontrado);
    fetchTutoria();
  }, [id, state.TUTORES]);

  useEffect(() => {
    // Verificar si se ha cargado la información de la tutoría y el estado global de CARACTERISTICAS
    if (tutoria && state.CARACTERISTICAS.length) {
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

  return (
    <div className={r.contenedor}>
      <form
        ref={form}
        style={{ display: "none", pointerEvents: "none" }}
        action=""
      >
        <input defaultValue={tutoria.nombre} name="tutoria" type="text" />
        <input defaultValue={state.session.email} name="email" type="text" />
        <input defaultValue={state.session.nombre} name="nombre" type="text" />
      </form>
      <div className={`${r.calendario} ${expanded ? r.expanded : ""}`}>
        <h2>Disponibilidad</h2>
        <DateRangePicker
          showOneCalendar
          value={selectedRange}
          onChange={handleDateRangeChange}
          block
          onClean={handleCancelSelection}
          editable={false}
          format="dd.MM.yyyy"
          shouldDisableDate={(date) => {
            // Deshabilita las fechas anteriores a hoy, pero no deshabilita la fecha de hoy
            const isBeforeToday = isBefore(date, startOfDay(new Date()));
            // Deshabilita las fechas presentes en disabledDates
            const isDisabled = fechasJavaScript.some((disabledDate) =>
              isSameDay(date, disabledDate)
            );

            // Retorna true si la fecha está antes de hoy o si está en disabledDates
            return isBeforeToday || isDisabled;
          }}
        />
        <div className={`${r.checkout} ${!expanded ? r.none : ""}`}>
          <h2>Checkout</h2>
          <div className={r.checkInfo}>
            <h4>Tutoria:</h4>
            <p>{tutoria.nombre}</p>
          </div>
          <div className={r.checkInfo}>
            <h4>Tutor:</h4>
            <p>
              {tutor.nombre} {tutor.apellido}
            </p>
          </div>
          <div className={r.checkInfo}>
            <h4>Tutor email:</h4>
            <p>{tutor.email}</p>
          </div>
          <div className={r.checkInfo}>
            <h4>Estudiante:</h4>
            <p>
              {state.session.nombre} {state.session.apellido}
            </p>
          </div>
          <div className={r.checkInfo}>
            <h4> Estudiante email:</h4>
            <p>{state.session.email}</p>
          </div>
          <div className={r.checkInfo}>
            <h4>Fechas:</h4>
            <p>
              inicio: {reserva.fechaInicio}, fin: {reserva.fechaFin}
            </p>
          </div>
        </div>
        <div className={r.actions}>
          <button onClick={handleCancelSelection}>Cancelar</button>
          <button onClick={handleClick}>Reservar</button>
        </div>
      </div>
      <h1 className={r.title}>{tutoria.nombre.toUpperCase()}</h1>
      <div className={r.share}>
        <ShareOnTwittweButton
          text="mira esta tutoria"
          url={window.location.href}
        />
        <ShareOnWhatsAppButton
          text="mira esta tutoria"
          url={window.location.href}
        />
        <ShareOnFacebookButton
          text="mira esta tutoria"
          url={window.location.href}
        />
      </div>
      <div className={`${r.card} ${r.cardF}`}>
        <div className={r.contenedorImagenes}>
          <div className={r.ContenedorImgLeft}>
            <img
              className={r.imgLeft}
              src={tutoria.fotos[0]}
              alt="Imagen Principal"
            />
          </div>
          <div className={r.ContenedorImgRight}>
            {tutoria.fotos.slice(1).map((foto, index) => (
              <img
                key={index}
                className={r.imgRight}
                src={foto}
                alt={`Imagen Secundaria ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={r.card1}>
        <h2>Descripción</h2>
        <p>
          Sumérgete en el fascinante mundo subatómico y descubre los misterios
          de la realidad a escala más pequeña. En esta sesión, exploraremos los
          conceptos fundamentales de la física cuántica, desde la dualidad
          onda-partícula hasta los principios de incertidumbre y superposición.
          A través de ejemplos concretos y experimentos mentales, desafiarás tus
          percepciones y expandirás tu comprensión de la naturaleza del
          universo. Nuestro enfoque interdisciplinario te permitirá relacionar
          la física cuántica con otras áreas del conocimiento, desde la
          computación cuántica hasta la biología molecular. Con el apoyo de
          nuestro experimentado tutor, resolverás problemas y abordarás
          conceptos avanzados con confianza. ¡No te pierdas esta oportunidad
          única de adentrarte en el mundo fascinante y sorprendente de la física
          cuántica! Únete a nosotros y déjate llevar por el viaje hacia lo
          infinitamente pequeño y lo extraordinariamente poderoso.
        </p>
        <div className={r.sep}></div>
        <h2>Caracteristicas</h2>
        <div className={r.caracteristicas}>
          {caracteristicas.map((caracteristica, index) => (
            <div className={r.icono} key={index}>
              <i className={`fas ${caracteristica.icono}`} />
              <span>{caracteristica.nombre}</span>
            </div>
          ))}
        </div>
        <div className={r.sep}></div>
        <h2>Tutor</h2>
        <div className={r.tutorInfo}>
          <img
            className={r.imagentutor}
            src={tutor.foto}
            alt="Foto de perfil - tutor"
          />
          <div className={r.info}>
            <h3>
              {tutor.nombre} {tutor.apellido}
            </h3>
            <p>{tutor.descripcion}</p>
            <a
              style={{ textDecoration: "none" }}
              href={`mailto:${tutor.email}`}
            >
              {tutor.email}
            </a>
            <a
              style={{ textDecoration: "none" }}
              href={`tel:${tutor.contactoCelular}`}
            >
              {tutor.contactoCelular}
            </a>
          </div>
        </div>
        <div className={r.sep}></div>
        <footer className={r.footer}>
          <h5 className={r.pol}>politicas: {tutoria.politicas}</h5>
          <a
            style={{ textDecoration: "none" }}
            href="https://walink.co/6285b4"
            target={"_blank"}
            className={r.sop}
          >
            soporte
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Detail;
