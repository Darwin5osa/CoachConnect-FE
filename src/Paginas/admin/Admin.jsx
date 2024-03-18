import { useGlobalContex } from "../../Utils/global.context";
import { FaUserEdit, FaUserPlus } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { HiOutlineSelector } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaUniversity } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import s from "../css/admin.module.css";
import { GoGear } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
const Admin = () => {
  /* ESTADOS */
  const [menu, setMenu] = useState("Tutorias");
  const {
    state,
    dispatch,
    getCategorias,
    getCaracteristicas,
    getTutorias,
    getNiveles,
  } = useGlobalContex();
  const [categorias, setCategorias] = useState(state.CATEGORIAS);
  const [caracteristicas, setCaracteristicas] = useState(state.CARACTERISTICAS);
  const [niveles, setNiveles] = useState(state.NIVELES);
  const [tutores, setTutores] = useState(state.TUTORES);
  const [objetos, setObjetos] = useState(state.TUTORIAS);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: "",
  });
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState({
    nombre: "",
  });
  const [nuevoNivel, setNuevoNivel] = useState({
    nombre: "",
  });

  /* ESTADO INICIAL DEL FORM DE TUTORIAS */
  const initialFormData = {
    id: "",
    nombre: "",
    descripcion: "",
    categoriaId: null,
    tutorId: null,
    caracteristicas: [],
    nivelId: null,
  };
  const [formData, setFormData] = useState(initialFormData);

  /* EFECTO PARA CARGAR LOS DATOS A SUS ESTADOS */
  useEffect(() => {
    setObjetos(state.TUTORIAS);
    setTutores(state.TUTORES);
    setNiveles(state.NIVELES);
    setCaracteristicas(state.CARACTERISTICAS);
    setCategorias(state.CATEGORIAS);
  }, [state]);

  /* CATEGORIAS */

  const handleCategoriaChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value, 10),
    });
  };
  const handleAgregarCategoria = () => {
    fetch("http://localhost:8080/categoria", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaCategoria),
    })
      .then((response) => response.json())
      .then((res) => {
        getCategorias(dispatch);
        setNuevaCategoria({ nombre: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEliminarCategoria = (id) => {
    fetch(`http://localhost:8080/categoria/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        getCategorias(dispatch);
      })
      .catch((error) => {
        getCategorias(dispatch);
      });
  };

  const handleCategoria = (e) => {
    e.preventDefault();
    if (nuevaCategoria.id) {
      handleGuardarCategoria();
    } else {
      handleAgregarCategoria();
    }
  };

  const handleGuardarCategoria = () => {
    fetch(`http://localhost:8080/categoria/${nuevaCategoria.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaCategoria),
    })
      .then((response) => response.json())
      .then((res) => {
        getCategorias(dispatch);
        setNuevaCategoria({ nombre: "" });
      })
      .catch((error) => {
        getCategorias(dispatch);
      });
  };

  const handleEditarCategoria = (categoria) => {
    console.log(categoria);
    setNuevaCategoria({
      id: categoria.id,
      nombre: categoria.nombre,
    });
  };

  const handleCategoriaCancel = (e) => {
    e.preventDefault();
    setNuevaCategoria({ nombre: "" });
  };

  /* CARACTERISTICAS */
  const handleAgregarCaracteristica = () => {
    fetch("http://localhost:8080/caracteristica", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaCaracteristica),
    })
      .then((response) => response.json())
      .then((res) => {
        getCaracteristicas(dispatch);
        setNuevaCaracteristica({ nombre: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEliminarCaracteristica = (id) => {
    fetch(`http://localhost:8080/caracteristica/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        getCaracteristicas(dispatch);
      })
      .catch((error) => {
        getCaracteristicas(dispatch);
      });
  };
  const handleGuardarCaracteristica = () => {
    fetch(`http://localhost:8080/caracteristica/${nuevaCaracteristica.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaCaracteristica),
    })
      .then((response) => response.json())
      .then((res) => {
        getCaracteristicas(dispatch);
        setNuevaCaracteristica({ nombre: "" });
      })
      .catch((error) => {
        getCaracteristicas(dispatch);
      });
  };
  const handleEditarCaracteristica = (caracteristica) => {
    console.log(caracteristica);
    setNuevaCaracteristica({
      id: caracteristica.id,
      nombre: caracteristica.nombre,
    });
  };
  const handleCaracteristicaCancel = (e) => {
    e.preventDefault();
    setNuevaCaracteristica({ nombre: "" });
  };
  const handleCaracteristica = (e) => {
    e.preventDefault();
    if (nuevaCaracteristica.id) {
      handleGuardarCaracteristica();
    } else {
      handleAgregarCaracteristica();
    }
  };

  const handleCaracteristicaChange = (e) => {
    const { value } = e.target;
    const characteristicId = parseInt(value, 10);

    // Verificar si la característica ya está seleccionada
    const isChecked = formData.caracteristicas.includes(characteristicId);
    let updatedCaracteristicasIds;

    if (isChecked) {
      // Si está seleccionada, filtrar la característica del array
      updatedCaracteristicasIds = formData.caracteristicas.filter(
        (id) => id !== characteristicId
      );
    } else {
      // Si no está seleccionada, agregar la característica al array
      updatedCaracteristicasIds = [
        ...formData.caracteristicas,
        characteristicId,
      ];
    }

    // Actualizar el estado de las características seleccionadas
    setFormData({
      ...formData,
      caracteristicas: updatedCaracteristicasIds,
    });
  };

  /* ESTADO PARA ACTUALIZAR EL FORM PRINCIPAL */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleEditar = (objeto) => {
    setFormData(objeto);
  };

  const handleCrear = () => {
    console.log(formData);
    fetch(`http://localhost:8080/tutoria`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((res) => {
        getTutorias(dispatch);
      })
      .catch((error) => {
        getTutorias(dispatch);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      handleGuardarEdicion(formData);
    } else {
      handleCrear(formData);
    }
    setFormData(initialFormData);
  };

  const handleEliminarObjeto = (id) => {
    fetch(`http://localhost:8080/tutoria/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        getTutorias(dispatch);
      })
      .catch((error) => {
        getTutorias(dispatch);
      });
  };

  const handleCancelar = () => {
    setFormData(initialFormData);
  };

  const handleGuardarEdicion = () => {
    fetch(`http://localhost:8080/tutoria/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((res) => {
        getTutorias(dispatch);
      })
      .catch((error) => {
        getTutorias(dispatch);
      });
  };

  /* NIVEL */

  const handleNivelChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      nivelId: parseInt(value, 10),
    });
  };

  const handleAgregarNivel = () => {
    fetch("http://localhost:8080/nivel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoNivel),
    })
      .then((response) => response.json())
      .then((res) => {
        getNiveles(dispatch);
        setNuevoNivel({ nombre: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEliminarNivel = (id) => {
    fetch(`http://localhost:8080/nivel/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        getNiveles(dispatch);
      })
      .catch((error) => {
        getNiveles(dispatch);
      });
  };

  const handleEditarNivel = (nivel) => {
    console.log(nivel);
    setNuevoNivel({
      id: nivel.id,
      nombre: nivel.nombre,
    });
  };

  const handleNivelCancel = (e) => {
    e.preventDefault();
    setNuevoNivel({ nombre: "" });
  };

  const handleGuardarNivel = () => {
    fetch(`http://localhost:8080/nivel/${nuevoNivel.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoNivel),
    })
      .then((response) => response.json())
      .then((res) => {
        getNiveles(dispatch);
        setNuevoNivel({ nombre: "" });
      })
      .catch((error) => {
        getNiveles(dispatch);
      });
  };

  const handleNivel = (e) => {
    e.preventDefault();
    if (nuevoNivel.id) {
      handleGuardarNivel();
    } else {
      handleAgregarNivel();
    }
  };

  const buscarTutor = (id) => tutores.find((tutor) => tutor.id === id);

  const tutoriasT = () => {
    return (
      <div className={s.selectedCont}>
        <div className={`${s.listCont} ${s.lista}`}>
          <h2 className={s.tit}>Listado de tutorias</h2>
          <ul className={s.tList}>
            <li className={s.head}>
              <p className={s.id}>Id</p>
              <p className={s.tutoriaName}>Nombre</p>
              <p className={s.tutorName}>Tutor</p>
              <p className={s.btns}>Acciones</p>
            </li>
            {objetos.map((objeto) => (
              <li className={s.item} key={objeto.id}>
                <p className={s.id}>{objeto.id}</p>
                <p className={s.tutoriaName}>{objeto.nombre}</p>
                <p className={s.tutorName}>
                  {buscarTutor(objeto.tutorId).nombre}{" "}
                  {buscarTutor(objeto.tutorId).apellido}
                </p>
                <div className={s.btns}>
                  <button
                    className={`${s.btn} ${s.edit}`}
                    onClick={() => handleEditar(objeto)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className={`${s.btn} ${s.el}`}
                    onClick={() => handleEliminarObjeto(objeto.id)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form className={s.listCont} onSubmit={handleSubmit}>
          <h2 className={s.tit}>Agregar - Editar</h2>
          <div className={s.formContainer}>
            <div className={s.formInput}>
              <label htmlFor="nombre">Nombre:</label>
              <input
                placeholder="Nombre"
                className={s.textInput}
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className={s.formInput}>
              <label htmlFor="tutor">Tutor:</label>
              <select
                className={s.selectInput}
                id="tutor"
                name="tutorId"
                value={formData.tutorId || ""}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Seleccione un tutor
                </option>
                {tutores.map((tutor) => (
                  <option key={tutor.id} value={tutor.id}>
                    {tutor.nombre} {tutor.apellido}
                  </option>
                ))}
              </select>
            </div>

            <div className={s.formInput}>
              <label htmlFor="categoria">Categoría:</label>
              <select
                className={s.selectInput}
                id="categoria"
                name="categoriaId"
                value={formData.categoriaId || ""}
                onChange={handleCategoriaChange}
              >
                <option value="" disabled>
                  Seleccione una categoría
                </option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className={s.formInput}>
              <label htmlFor="nivel">Nivel:</label>
              <select
                className={s.selectInput}
                id="nivel"
                name="nivelId"
                value={formData.nivelId || ""}
                onChange={handleNivelChange}
              >
                <option value="" disabled>
                  Seleccione un nivel
                </option>
                {niveles.map((nivel) => (
                  <option key={nivel.id} value={nivel.id}>
                    {nivel.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className={`${s.formInput}`}>
              <label>Características:</label>
              <div className={s.checkbox}>
                {caracteristicas.map((caracteristica) => (
                  <div className={s.checkInput} key={caracteristica.id}>
                    <input
                      className={s.check}
                      type="checkbox"
                      id={`caracteristica-${caracteristica.id}`}
                      name="CaracteristicasIds"
                      value={caracteristica.id}
                      checked={formData.caracteristicas.includes(
                        caracteristica.id
                      )}
                      onChange={handleCaracteristicaChange}
                    />
                    <label htmlFor={`caracteristica-${caracteristica.id}`}>
                      {caracteristica.nombre}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className={s.formInput}>
              <label htmlFor="descripcion">Descripción:</label>
              <textarea
                placeholder="Descripción"
                className={s.textAreaInput}
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                rows="6"
              />
            </div>
            <div className={s.options}>
              <button className={s.plus} type="submit">
                {formData.id ? <FaUserEdit /> : <FaUserPlus />}
                {formData.id ? "Actualizar" : "Crear"}
              </button>
              <button
                className={s.delete}
                onClick={handleCancelar}
                type="button"
              >
                <MdOutlineCancel />
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  const categoriasT = () => {
    return (
      <div className={s.selectedCont}>
        <div className={`${s.listCont} ${s.lista}`}>
          <h2 className={s.tit}>Lista de Categorías</h2>
          <ul className={s.tList}>
            <li className={s.head}>
              <p className={s.id}>id</p>
              <p className={s.nameSimple}>Nombre</p>
              <p className={s.btnsSimple}>Acciones</p>
            </li>
            {categorias.map((categoria) => (
              <li className={s.item} key={categoria.id}>
                <p className={s.id}>{categoria.id}</p>
                <p className={s.nameSimple}>{categoria.nombre}</p>
                <div className={s.btnsSimple}>
                  <button
                    className={`${s.btn} ${s.edit}`}
                    onClick={() => handleEditarCategoria(categoria)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className={`${s.btn} ${s.el}`}
                    onClick={() => handleEliminarCategoria(categoria.id)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className={s.note}>
          Nota: No podras eliminar una categoria que este en uso.
        </p>

        <form className={s.listCont}>
          <h2 className={s.tit}>Agregar - Editar</h2>
          <div className={s.formContainer}>
            <div className={s.formInputSimple}>
              <label htmlFor="descripcion">Nombre:</label>
              <input
                className={s.textInput}
                type="text"
                value={nuevaCategoria.nombre}
                onChange={(e) =>
                  setNuevaCategoria({
                    ...nuevaCategoria,
                    nombre: e.target.value,
                  })
                }
                placeholder="Nueva Categoría"
              />
            </div>
            <div className={s.options}>
              <button className={s.plus} onClick={(e) => handleCategoria(e)}>
                {nuevaCategoria.id ? <FaUserEdit /> : <FaUserPlus />}
                {nuevaCategoria.id ? "Actualizar" : "Crear"}
              </button>
              <button
                className={s.delete}
                onClick={(e) => handleCategoriaCancel(e)}
              >
                <MdOutlineCancel />
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  const caracteristicasT = () => {
    return (
      <div className={s.selectedCont}>
        <div className={`${s.listCont} ${s.lista}`}>
          <h2 className={s.tit}>Lista de Características</h2>
          <ul className={s.tList}>
            <li className={s.head}>
              <p className={s.id}>id</p>
              <p className={s.nameSimple}>Nombre</p>
              <p className={s.btnsSimple}>Acciones</p>
            </li>
            {caracteristicas.map((caracteristica) => (
              <li className={s.item} key={caracteristica.id}>
                <p className={s.id}>{caracteristica.id}</p>
                <p className={s.nameSimple}>{caracteristica.nombre}</p>
                <div className={s.btnsSimple}>
                  <button
                    className={`${s.btn} ${s.edit}`}
                    onClick={() => handleEditarCaracteristica(caracteristica)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className={`${s.btn} ${s.el}`}
                    onClick={() =>
                      handleEliminarCaracteristica(caracteristica.id)
                    }
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className={s.note}>
          Nota: No podras eliminar una caracteristica que este en uso.
        </p>
        <form className={s.listCont}>
          <h2 className={s.tit}>Agregar - Editar</h2>
          <div className={s.formContainer}>
            <div className={s.formInputSimple}>
              <label htmlFor="nombre">Nombre:</label>
              <input
                className={s.textInput}
                type="text"
                value={nuevaCaracteristica.nombre}
                onChange={(e) =>
                  setNuevaCaracteristica({
                    ...nuevaCaracteristica,
                    nombre: e.target.value,
                  })
                }
                placeholder="Nueva Característica"
              />
            </div>
            <div className={s.options}>
              <button
                className={s.plus}
                onClick={(e) => handleCaracteristica(e)}
              >
                {nuevaCaracteristica.id ? <FaUserEdit /> : <FaUserPlus />}
                {nuevaCaracteristica.id ? "Actualizar" : "Crear"}
              </button>
              <button
                className={s.delete}
                onClick={(e) => handleCaracteristicaCancel(e)}
              >
                <MdOutlineCancel />
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  const nivelesT = () => {
    return (
      <div className={s.selectedCont}>
        <div className={`${s.listCont} ${s.lista}`}>
          <h2 className={s.tit}>Lista de Niveles</h2>
          <ul className={s.tList}>
            <li className={s.head}>
              <p className={s.id}>id</p>
              <p className={s.nameSimple}>Nombre</p>
              <p className={s.btnsSimple}>Acciones</p>
            </li>
            {niveles.map((nivel) => (
              <li className={s.item} key={nivel.id}>
                <p className={s.id}>{nivel.id}</p>
                <p className={s.nameSimple}>{nivel.nombre}</p>
                <div className={s.btnsSimple}>
                  <button
                    className={`${s.btn} ${s.edit}`}
                    onClick={() => handleEditarNivel(nivel)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className={`${s.btn} ${s.el}`}
                    onClick={() => handleEliminarNivel(nivel.id)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className={s.note}>
          Nota: No podras eliminar un nivel que este en uso.
        </p>
        <form className={s.listCont}>
          <h2 className={s.tit}>Agregar - Editar</h2>
          <div className={s.formContainer}>
            <div className={s.formInputSimple}>
            <label htmlFor="descripcion">Nombre:</label>
              <input
                className={s.textInput}
                type="text"
                value={nuevoNivel.nombre}
                onChange={(e) =>
                  setNuevoNivel({
                    ...nuevoNivel,
                    nombre: e.target.value,
                  })
                }
                placeholder="Nuevo Nivel"
              />
            </div>
            <div className={s.options}>
              <button className={s.plus} onClick={(e) => handleNivel(e)}>
                {nuevoNivel.id ? <FaUserEdit /> : <FaUserPlus />}
                {nuevoNivel.id ? "Actualizar" : "Crear"}
              </button>
              <button
                className={s.delete}
                onClick={(e) => handleNivelCancel(e)}
              >
                <MdOutlineCancel />
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className={s.admin}>
      <div className={s.cont}>
        <section className={s.menu}>
          <h3>Menú</h3>
          <ul className={s.menuList}>
            <li
              onClick={() => setMenu("Tutorias")}
              className={menu == "Tutorias" ? s.active : ""}
            >
              <FaChalkboardTeacher className={s.ico} />
              <p>Tutorias</p>
            </li>
            <li
              onClick={() => setMenu("Categorias")}
              className={menu == "Categorias" ? s.active : ""}
            >
              <BiCategory className={s.ico} />
              <p>Categorias</p>
            </li>
            <li
              onClick={() => setMenu("Caracteristicas")}
              className={menu == "Caracteristicas" ? s.active : ""}
            >
              <GoGear className={s.ico} />

              <p>Caracteristicas</p>
            </li>
            <li
              onClick={() => setMenu("Niveles")}
              className={menu == "Niveles" ? s.active : ""}
            >
              <FaUniversity className={s.ico} />

              <p>Niveles</p>
            </li>
            <li
              onClick={() => setMenu("Usuarios")}
              className={menu == "Usuarios" ? s.active : ""}
            >
              <FaRegUser className={s.ico} />

              <p>Usuarios</p>
            </li>
          </ul>
        </section>
        <section className={s.selected}>
          {menu === "Tutorias" && tutoriasT()}
          {menu === "Caracteristicas" && caracteristicasT()}
          {menu === "Categorias" && categoriasT()}
          {menu === "Niveles" && nivelesT()}
        </section>
      </div>
    </div>
  );
};

export default Admin;
