import { useGlobalContex } from "../../Utils/global.context";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "../css/admin.module.css";

const Admin = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    dispatch({ type: "CLOSE_SESSION" });
    navigate("/");
  };
  const { state, dispatch, getCategorias, getCaracteristicas, getTutorias } =
    useGlobalContex();
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

  const handleCategoria = () => {
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

  const handleCategoriaCancel = () => {
    setNuevaCategoria({ nombre: "" });
  };

  useEffect(() => {
    setObjetos(state.TUTORIAS);
    setTutores(state.TUTORES);
    setNiveles(state.NIVELES);
    setCaracteristicas(state.CARACTERISTICAS);
    setCategorias(state.CATEGORIAS);
  }, [state]);

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

  const handleCaracteristicaCancel = () => {
    setNuevaCaracteristica({ nombre: "" });
  };

  const handleCaracteristica = () => {
    if (nuevaCaracteristica.id) {
      handleGuardarCaracteristica();
    } else {
      handleAgregarCaracteristica();
    }
  };

  const initialFormData = {
    id: "",
    nombre: "",
    descripcion: "",
    categoriaId: "",
    caracteristicas: [],
    nivelId: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoriaChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value, 10),
    });
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

  const handleNivelChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      nivelId: parseInt(value, 10),
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

  return (
    <div>
      <h2>Lista de Objetos</h2>
      <ul>
        {objetos.map((objeto) => (
          <li key={objeto.id}>
            {objeto.nombre} -{" "}
            <button onClick={() => handleEditar(objeto)}>Editar</button>
            <button onClick={() => handleEliminarObjeto(objeto.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <h2>Formulario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="categoria">Categoría:</label>
          <select
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
        <div>
          <label htmlFor="nivel">Nivel:</label>
          <select
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
        <div>
          <label>Características:</label>
          {caracteristicas.map((caracteristica) => (
            <div key={caracteristica.id}>
              <input
                type="checkbox"
                id={`caracteristica-${caracteristica.id}`}
                name="CaracteristicasIds"
                value={caracteristica.id}
                checked={formData.caracteristicas.includes(caracteristica.id)}
                onChange={handleCaracteristicaChange}
              />
              <label htmlFor={`caracteristica-${caracteristica.id}`}>
                {caracteristica.nombre}
              </label>
            </div>
          ))}
        </div>
        <button type="submit">{formData.id ? "Actualizar" : "Crear"}</button>
        <button onClick={handleCancelar} type="button">
          cancelar
        </button>
      </form>

      <div>
        <h2>Lista de Categorías</h2>
        <ul>
          {categorias.map((categoria) => (
            <li key={categoria.id}>
              {categoria.nombre} -{" "}
              <button onClick={() => handleEliminarCategoria(categoria.id)}>
                Eliminar
              </button>
              <button onClick={() => handleEditarCategoria(categoria)}>
                Editar
              </button>
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            value={nuevaCategoria.nombre}
            onChange={(e) =>
              setNuevaCategoria({ ...nuevaCategoria, nombre: e.target.value })
            }
            placeholder="Nueva Categoría"
          />
          <button onClick={() => handleCategoria()}>
            {nuevaCategoria.id ? "editar" : "agregar"}
          </button>
          <button onClick={() => handleCategoriaCancel()}>cancelar</button>
        </div>
      </div>
      <h2>Lista de Características</h2>
      <ul>
        {caracteristicas.map((caracteristica) => (
          <li key={caracteristica.id}>
            {caracteristica.nombre} -{" "}
            <button
              onClick={() => handleEliminarCaracteristica(caracteristica.id)}
            >
              Eliminar
            </button>
            <button onClick={() => handleEditarCaracteristica(caracteristica)}>
              Editar
            </button>
          </li>
        ))}
      </ul>
      <div>
        <input
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
        <button onClick={() => handleCaracteristica()}>
            {nuevaCaracteristica.id ? "editar" : "agregar"}
          </button>
        <button onClick={() => handleCaracteristicaCancel()}>cancelar</button>
      </div>

      <div className={s.admin}>
        <button onClick={handleClose}>Cerrar sesión</button>
      </div>
      <div className={s.admin}>
        <button onClick={handleClose}>cerrar sesion</button>
      </div>
    </div>
  );
};

export default Admin;
