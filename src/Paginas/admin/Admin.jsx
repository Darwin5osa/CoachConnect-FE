import {
  FaChalkboardTeacher,
  FaRegUser,
  FaUniversity,
  FaUserEdit,
  FaUserPlus,
} from "react-icons/fa";
import { useGlobalContex } from "../../Utils/global.context";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import s from "../css/admin.module.css";
import { FiEdit } from "react-icons/fi";
import { GoGear } from "react-icons/go";
import { toast, Toaster } from "sonner";
const Admin = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 950);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    icono: "",
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
    fetch("https://api.coachconnect.tech/categoria", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaCategoria),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else
          return response.json().then((jsonResponse) => {
            throw new Error(jsonResponse.message || "Error en la solicitud.");
          });
      })
      .then((res) => {
        getCategorias(dispatch);
        setNuevaCategoria({ nombre: "" });
        toast.success("Categoria agregada");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleEliminarCategoria = (id) => {
    fetch(`https://api.coachconnect.tech/categoria/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) return;
        else
          return response.json().then((jsonResponse) => {
            throw new Error(jsonResponse.message || "Error en la solicitud.");
          });
      })
      .then(() => {
        toast.info("Se ha eliminado la categoria");
        getCategorias(dispatch);
      })
      .catch((error) => {
        toast.error(error.message);
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
    fetch(`https://api.coachconnect.tech/categoria/${nuevaCategoria.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaCategoria),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else
          return response.json().then((jsonResponse) => {
            throw new Error(jsonResponse.message || "Error en la solicitud.");
          });
      })
      .then((res) => {
        getCategorias(dispatch);
        setNuevaCategoria({ nombre: "" });
        toast.success("Categoria guardada");
      })
      .catch((error) => {
        toast.error(error.message);
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
    fetch("https://api.coachconnect.tech/caracteristica", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaCaracteristica),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else
          return response.json().then((jsonResponse) => {
            throw new Error(jsonResponse.message || "Error en la solicitud.");
          });
      })
      .then((res) => {
        getCaracteristicas(dispatch);
        setNuevaCaracteristica({ nombre: "" , icono: ""});
        toast.success("Caracteristica agregada");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleEliminarCaracteristica = (id) => {
    fetch(`https://api.coachconnect.tech/caracteristica/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) return;
        else
          return response.json().then((jsonResponse) => {
            throw new Error(jsonResponse.message || "Error en la solicitud.");
          });
      })
      .then(() => {
        toast.info("Se ha eliminado la característica");
        getCaracteristicas(dispatch);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleGuardarCaracteristica = () => {
    fetch(
      `https://api.coachconnect.tech/caracteristica/${nuevaCaracteristica.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaCaracteristica),
      }
    )
      .then((response) => {
        if (response.ok) return response.json();
        else
          return response.json().then((jsonResponse) => {
            throw new Error(jsonResponse.message || "Error en la solicitud.");
          });
      })
      .then((res) => {
        getCaracteristicas(dispatch);
        setNuevaCaracteristica({ nombre: "" , icono: ""});
        toast.success("Caracteristica guardada");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleEditarCaracteristica = (caracteristica) => {
    console.log(caracteristica);
    setNuevaCaracteristica({
      id: caracteristica.id,
      nombre: caracteristica.nombre,
      icono: caracteristica.icono,
    });
  };
  const handleCaracteristicaCancel = (e) => {
    e.preventDefault();
    setNuevaCaracteristica({ nombre: "", icono: "" });
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
    fetch(`https://api.coachconnect.tech/tutoria`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else
          return response.json().then((jsonResponse) => {
            throw new Error(jsonResponse.message || "Error en la solicitud.");
          });
      })
      .then((res) => {
        getTutorias(dispatch);
        toast.success("Tutoria agregada");
      })
      .catch((error) => {
        toast.error(error.message);
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
    fetch(`https://api.coachconnect.tech/tutoria/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) return;
        else
          return response.json().then((jsonResponse) => {
            throw new Error(jsonResponse.message || "Error en la solicitud.");
          });
      })
      .then(() => {
        toast.info("Se ha eliminado la tutoria");
        getTutorias(dispatch);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleCancelar = () => {
    setFormData(initialFormData);
  };

  const handleGuardarEdicion = () => {
    fetch(`https://api.coachconnect.tech/tutoria/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else
          return response.json().then((jsonResponse) => {
            throw new Error(jsonResponse.message || "Error en la solicitud.");
          });
      })
      .then((res) => {
        getTutorias(dispatch);
        toast.success("Tutoria guardada");
      })
      .catch((error) => {
        toast.error(error.message);
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
    fetch("https://api.coachconnect.tech/nivel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoNivel),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else
          return response.json().then((jsonResponse) => {
            throw new Error(jsonResponse.message || "Error en la solicitud.");
          });
      })
      .then((res) => {
        getNiveles(dispatch);
        setNuevoNivel({ nombre: "" });
        toast.success("Nivel agregado");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleEliminarNivel = (id) => {
    fetch(`https://api.coachconnect.tech/nivel/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) return;
        else
          return response.json().then((jsonResponse) => {
            throw new Error(jsonResponse.message || "Error en la solicitud.");
          });
      })
      .then(() => {
        toast.info("Se ha eliminado el nivel");
        getNiveles(dispatch);
      })
      .catch((error) => {
        toast.error(error.message);
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
    fetch(`https://api.coachconnect.tech/nivelø/${nuevoNivel.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoNivel),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else
          return response.json().then((jsonResponse) => {
            throw new Error(jsonResponse.message || "Error en la solicitud.");
          });
      })
      .then((res) => {
        getNiveles(dispatch);
        setNuevoNivel({ nombre: "" });
      })
      .catch((error) => {
        toast.error(error.message);
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

  //PAGINACION TUTORIAS
  const [currentPage, setCurrentPage] = useState(1);
  const tutoriasPerPage = 5;

  const indexOfLastTutoria = currentPage * tutoriasPerPage;
  const indexOfFirstTutoria = indexOfLastTutoria - tutoriasPerPage;
  const currentTutorias = objetos.slice(
    indexOfFirstTutoria,
    indexOfLastTutoria
  );
  const totalPages = Math.ceil(objetos.length / tutoriasPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  //PAGINACION CARACTERISTICAS
  const [currentPageCarac, setCurrentPageCarac] = useState(1);
  const CaracPerPage = 5;

  const indexOfLastCarac = currentPageCarac * CaracPerPage;
  const indexOfFirstCarac = indexOfLastCarac - CaracPerPage;
  const currentCarac = caracteristicas.slice(
    indexOfFirstCarac,
    indexOfLastCarac
  );
  const totalPagesCarac = Math.ceil(caracteristicas.length / CaracPerPage);
  const handleNextPageCarac = () => {
    if (currentPageCarac < totalPagesCarac) {
      setCurrentPageCarac(currentPageCarac + 1);
    }
  };
  const handlePrevPageCarac = () => {
    if (currentPageCarac > 1) {
      setCurrentPageCarac(currentPageCarac - 1);
    }
  };

  //PAGINACION CATEGORIAS
  const [currentPageCat, setCurrentPageCat] = useState(1);
  const CatPerPage = 5;

  const indexOfLastCat = currentPageCat * CatPerPage;
  const indexOfFirstCat = indexOfLastCat - CatPerPage;
  const currentCat = categorias.slice(indexOfFirstCat, indexOfLastCat);
  const totalPagesCat = Math.ceil(categorias.length / CatPerPage);
  const handleNextPageCat = () => {
    if (currentPageCat < totalPagesCat) {
      setCurrentPageCat(currentPageCat + 1);
    }
  };
  const handlePrevPageCat = () => {
    if (currentPageCat > 1) {
      setCurrentPageCat(currentPageCat - 1);
    }
  };

  //PAGINACION NIVELES
  const [currentPageNiv, setCurrentPageNiv] = useState(1);
  const nivPerPage = 5;

  const indexOfLastNiv = currentPageNiv * nivPerPage;
  const indexOfFirstNiv = indexOfLastNiv - nivPerPage;
  const currentNiv = niveles.slice(indexOfFirstNiv, indexOfLastNiv);
  const totalPagesNiv = Math.ceil(niveles.length / nivPerPage);
  const handleNextPageNiv = () => {
    if (currentPageNiv < totalPagesNiv) {
      setCurrentPageNiv(currentPageNiv + 1);
    }
  };
  const handlePrevPageNiv = () => {
    if (currentPageNiv > 1) {
      setCurrentPageNiv(currentPageNiv - 1);
    }
  };

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
            {currentTutorias.map((objeto) => (
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
          <div className={s.pagination}>
            <button onClick={handlePrevPage}>Anterior</button>
            <span>{currentPage}</span>
            <button onClick={handleNextPage}>Siguiente</button>
          </div>
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
            {currentCat.map((categoria) => (
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
          <div className={s.pagination}>
            <button onClick={handlePrevPageCat}>Anterior</button>
            <span>{currentPageCat}</span>
            <button onClick={handleNextPageCat}>Siguiente</button>
          </div>
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
            {currentCarac.map((caracteristica) => (
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
          <div className={s.pagination}>
            <button onClick={handlePrevPageCarac}>Anterior</button>
            <span>{currentPageCarac}</span>
            <button onClick={handleNextPageCarac}>Siguiente</button>
          </div>
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
            <div className={s.formInputSimple}>
              <label htmlFor="nombre">Icono:</label>
              <input
                className={s.textInput}
                type="text"
                value={nuevaCaracteristica.icono}
                onChange={(e) =>
                  setNuevaCaracteristica({
                    ...nuevaCaracteristica,
                    icono: e.target.value,
                  })
                }
                placeholder="Nueva Icono"
              />
              <i className={`fas ${nuevaCaracteristica.icono} ${s.icoC}`} />
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
            {currentNiv.map((nivel) => (
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
          <div className={s.pagination}>
            <button onClick={handlePrevPageNiv}>Anterior</button>
            <span>{currentPageNiv}</span>
            <button onClick={handleNextPageNiv}>Siguiente</button>
          </div>
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
    <div>
      <Toaster richColors />
      {!isMobile ? (
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
      ) : (
        <div className={s.mobile}>
          <p>Ooops, el panel de administracion es solo accesible en desktop</p>
        </div>
      )}
    </div>
  );
};

export default Admin;
