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
  const nav = useNavigate(); // Hook de react-router-dom para la navegación
  const form = useRef(); // Referencia para el formulario
  const [expanded, setExpanded] = useState(false); // Estado para controlar la expansión de alguna sección
  const [selectedRange, setSelectedRange] = useState(null); // Estado para almacenar el rango de fechas seleccionado
  const navigate = useNavigate(); // Hook de react-router-dom para la navegación
  const { state } = useGlobalContex(); // Hook personalizado para acceder al contexto global
  const { id } = useParams(); // Hook de react-router-dom para obtener parámetros de la URL
  const [tutoria, setTutoria] = useState(""); // Estado para almacenar información sobre la tutoría
  const [tutor, setTutor] = useState(""); // Estado para almacenar información sobre el tutor
  const [caracteristicas, setCaracteristicas] = useState([]); // Estado para almacenar las características de la tutoría
  const [reserva, setReserva] = useState({ // Estado para almacenar la información de la reserva
    fechaInicio: "",
    fechaFin: "",
    horasReservadas: 2,
    estudianteId: state.session.estudianteId,
    tutoriaId: parseInt(id),
  });
  const [disabledDates, setDisabledDates] = useState([]); // Estado para almacenar las fechas deshabilitadas
  const [fechasJavaScript, setFechasJavaScript] = useState([]); // Nuevo estado para almacenar las fechas convertidas

  const convertirAFechas = (fechas) => {
    return disabledDates.map(({ nroDia, nroMes }) => {
      return new Date(new Date().getFullYear(), nroMes - 1, nroDia);
    });
  };

  // Función para enviar el formulario
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

  // Efecto para actualizar fechas JavaScript cuando cambian las fechas deshabilitadas
  useEffect(() => {
    setFechasJavaScript(convertirAFechas(disabledDates));
  }, [disabledDates]);

  // Función para enviar la reserva
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
            "Reservado con éxito! Te llegará un correo electrónico de confirmación"
          );
          setExpanded(false);
          setSelectedRange(null);
          handleCancelSelection();
          send();
        }
      });
  };

  // Función para manejar el clic en el botón
  const handleClick = () => {
    if (!state.session) {
      toast.info(
        "El inicio de sesión es obligatorio para realizar esta acción"
      );
      nav("/login");
      return;
    }
    if (state.session.role === "ADMIN") {
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

  // Función para cancelar la selección de fechas
  const handleCancelSelection = () => {
    setExpanded(false);
    setSelectedRange(null);
    setReserva({
      ...reserva,
      fechaInicio: "",
      fechaFin: "",
    });
  };

  // Función para manejar el cambio en el rango de fechas
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

  // Efecto para obtener la información de la tutoría y las características
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

  // Efecto para actualizar las características de la tutoría
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

  // Si no se encuentra la tutoría o el tutor, se muestra un mensaje
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
