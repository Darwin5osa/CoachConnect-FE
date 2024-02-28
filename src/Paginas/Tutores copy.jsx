import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";
import React, { useRef, useState } from "react";
import data from "../Utils/DatosTutores.json";
import { RiSearch2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Card from "../Componentes/Card";
import s from "./tutores.module.css";


const Tutores = () => {
  const [tutores, setTutores] = useState(data.tutores);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [loader, setLoader] = useState(false);
  const formRef = useRef(null);
  const [info, setInfo] = useState({
    nombre: "",
    apellido: "",
    descripcion: "",
    profesion: "",
    Foto: "",
  });
  console.log(info);
  console.log(tutores);
  const [term, setTerm] = useState("");
  console.log(term);
  const handleInputChange = (event) => {
    setTerm(event.target.value.toLowerCase());
  };
  const filteredNombres = tutores.filter((tutor) => {
    const fullName = `${tutor.nombre} ${tutor.apellido}`.toLowerCase();
    return fullName.includes(term);
  });
  
  const handleMostrarForm = () => {
    setMostrarForm(!mostrarForm);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoader(true);
    setTimeout(() => {
      setTutores([info, ...tutores]);
      setLoader(false);
      formRef.current.reset();
    }, 2000);
    /* setMostrarForm(false); */
  };

  return (
    <main id="mentores" className={s.mainTutores}>
      <header className={s.header}>
        <h2 className={s.title}>NUESTROS MENTORES</h2>
        <div className={s.edit}>
          <button className={s.add} onClick={handleMostrarForm}>
            Agregar
          </button>
          <button className={s.del}>Eliminar</button>
        </div>
        <div className={s.searchCont}>
          <RiSearch2Line className={s.ico} />
          <input
            className={s.search}
            type="text"
            placeholder="Buscar tutor"
            onChange={handleInputChange}
          />
        </div>
      </header>
      {mostrarForm && (
        <section className={s.formCont}>
          <form ref={formRef} onSubmit={handleSubmit} className={s.form}>
            <div className={s.inpCont}>
              <input
                type="text"
                id="profesion"
                name="profesion"
                className={s.input}
                required
                placeholder="Nombre de la profesion"
                onBlur={(event) =>
                  setInfo((prevInfo) => ({
                    ...prevInfo,
                    profesion: event.target.value,
                  }))
                }
              />
            </div>

            <div className={s.inpCont}>
              <input
                /* pattern="[A-Za-zÁÉÍÓÚáéíóú]{3,}" */
                title="El nombre debe contener al menos 3 letras y solo letras."
                type="text"
                id="nombre"
                name="nombre"
                className={s.input}
                required
                placeholder="Nombre del profesor"
                onBlur={(event) =>
                  setInfo((prevInfo) => ({
                    ...prevInfo,
                    nombre: event.target.value,
                  }))
                }
              />
            </div>

            <div className={s.inpCont}>
              <input
                /* pattern="[A-Za-zÁÉÍÓÚáéíóú]{2,}" */
                title="El apellido debe contener al menos 2 letras y solo letras."
                type="text"
                id="apellido"
                name="apellido"
                className={s.input}
                required
                placeholder="Apellido del profesor"
                onBlur={(event) =>
                  setInfo((prevInfo) => ({
                    ...prevInfo,
                    apellido: event.target.value,
                  }))
                }
              />
            </div>

            <div className={s.inpCont}>
              <textarea
                id="descripcion"
                name="descripcion"
                rows="1"
                className={s.input}
                minLength="15"
                placeholder="Descripción"
                onBlur={(event) =>
                  setInfo((prevInfo) => ({
                    ...prevInfo,
                    descripcion: event.target.value,
                  }))
                }
              ></textarea>
            </div>

            <div className={s.inpCont}>
              <input
                type="url"
                id="imagen"
                name="imagen"
                className={s.input}
                required
                placeholder="URL de la imagen"
                onBlur={(event) =>
                  setInfo((prevInfo) => ({
                    ...prevInfo,
                    Foto: event.target.value,
                  }))
                }
              />
            </div>

            <button className={s.submit} type="submit">
              {loader ? (
                <div className={s.loader}>
                  <Loader active inline="centered" />
                </div>
              ) : (
                "Agregar mentor"
              )}
            </button>
          </form>
        </section>
      )}
      <section className={s.cardContainer}>
        {filteredNombres.length > 0 ? (
          filteredNombres.map((el, index) => (
            <Link to={`/detalle/${el.id}`} key={index} className={s.link}>
              <Card info={el} />
            </Link>
          ))
        ) : (
          <h2 className={s.noResults}>No hay resultados para "{term}"</h2>
        )}
      </section>
    </main>
  );
};

export default Tutores;
