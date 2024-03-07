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
  const { state, dispatch } = useGlobalContex();
  const [categorias, setCategorias] = useState(state.categorias);
  console.log(categorias);
  const [caracteristicas, setCaracteristicas] = useState(state.caracteristicas);
  const [niveles, setNiveles] = useState(state.niveles);
  const [tutores, setTutores] = useState(state.data);
  const [objetos, setObjetos] = useState(state.tutorias);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    id: categorias.length + 1,
    nombre: "",
  });

  const [nuevaCaracteristica, setNuevaCaracteristica] = useState({
    id: caracteristicas.length + 1,
    nombre: "",
  });

  console.log(nuevaCategoria);

  const handleAgregarCategoria = () => {
    const nuevasCategorias = [...categorias, nuevaCategoria];
    setCategorias(nuevasCategorias);
    dispatch({ type: "SET_CATEGORIAS", payload: nuevasCategorias });
    setNuevaCategoria({
      id: nuevaCategoria.id + 1,
      nombre: "",
    });
  };

  useEffect(() => {
    setObjetos(state.tutorias);
    setTutores(state.data);
    setNiveles(state.niveles);
    setCaracteristicas(state.caracteristicas);
    setCategorias(state.categorias);
  }, [state]);

  const handleEliminarCategoria = (id) => {
    const nuevasCategorias = categorias.filter(
      (categoria) => categoria.id !== id
    );
    setCategorias(nuevasCategorias);
    dispatch({ type: "SET_CATEGORIAS", payload: nuevasCategorias });
  };

  const handleAgregarCaracteristica = () => {
    const nuevasCaracteristicas = [...caracteristicas, nuevaCaracteristica];
    setCaracteristicas(nuevasCaracteristicas);
    dispatch({ type: "SET_CARACTERISTICAS", payload: nuevasCaracteristicas });
    setNuevaCaracteristica({
      id: nuevaCaracteristica.id + 1,
      nombre: "",
    });
  };

  const handleEliminarCaracteristica = (id) => {
    const nuevasCaracteristicas = caracteristicas.filter(
      (caracteristica) => caracteristica.id !== id
    );
    setCaracteristicas(nuevasCaracteristicas);
    dispatch({ type: "SET_CARACTERISTICAS", payload: nuevasCaracteristicas });
  };

  const initialFormData = {
    id: "",
    nombre: "",
    descripcion: "",
    categoriaId: "",
    caracteristicas: [],
    tutorId: null,
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

  console.log(formData);

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
    console.log(objeto);
    setFormData(objeto);
    console.log(formData);
  };

  const handleCrear = () => {
    // Asignar un ID al nuevo objeto
    const nuevoObjeto = { ...formData, id: objetos.length + 1 };

    // Agregar el nuevo objeto a la lista de objetos
    const nuevosObjetos = [...objetos, nuevoObjeto];

    dispatch({ type: "SET_OBJETOS", payload: [...objetos, nuevoObjeto] });
    // Actualizar el estado de los objetos y despachar la acción
    setObjetos(nuevosObjetos);
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

  const handleTutorChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      tutorId: value,
    });
  };

  const handleEliminarObjeto = (id) => {
    const nuevosObjetos = objetos.filter((objeto) => objeto.id !== id);
    setObjetos(nuevosObjetos);
    dispatch({ type: "SET_OBJETOS", payload: nuevosObjetos });
  };

  const handleCancelar = () => {
    setFormData(initialFormData);
  };

  const handleGuardarEdicion = () => {
    const objetosActualizados = objetos.map((obj) => {
      if (obj.id === formData.id) {
        return formData; // Si es el objeto que se está editando, se reemplaza con el nuevo formData
      }
      return obj; // De lo contrario, se mantiene igual
    });

    setObjetos(objetosActualizados);
    setFormData(initialFormData); // Limpiar el formulario después de guardar la edición
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
          <label htmlFor="tutor">Tutor:</label>
          <select
            id="tutor"
            name="tutorId"
            value={formData.tutorId || ""}
            onChange={handleTutorChange}
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
        <div>
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            name="CategoriaId"
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
          <button onClick={handleAgregarCategoria}>Agregar</button>
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
        <button onClick={handleAgregarCaracteristica}>Agregar</button>
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
