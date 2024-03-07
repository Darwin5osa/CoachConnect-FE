import { useGlobalContex } from "../Utils/global.context";
import React, { useEffect, useState } from "react";

const Example = () => {
  const { state, getCategorias, dispatch } = useGlobalContex();
  const [categorias, setCategorias] = useState(state.categorias);
  console.log(categorias);


  //preguntar por validacion del token segun admin en el back

  function hacerLlamadaALaAPI() {
    // Obtener el token JWT del localStorage justo antes de realizar la llamada
    const jwtToken = localStorage.getItem("jwtToken");

    // Verificar si el token está presente y no está vacío
    if (jwtToken) {
      // Configurar la solicitud HTTP con el token en el encabezado de autorización
      const requestOptions = {
        method: "GET", // Método de la solicitud (puede ser GET, POST, PUT, DELETE, etc.)
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Establecer el token JWT en el encabezado de autorización
        },
      };

      // Realizar la solicitud al servidor utilizando fetch API o cualquier otra biblioteca para manejar solicitudes HTTP
      fetch("https://ejemplo.com/api/recurso", requestOptions)
        .then((response) => {
          // Manejar la respuesta del servidor
          if (response.ok) {
            return response.json(); // Convertir la respuesta a JSON si es necesario
          }
          throw new Error("Error al realizar la solicitud");
        })
        .then((data) => {
          // Manejar los datos recibidos del servidor
          console.log(data);
        })
        .catch((error) => {
          // Manejar errores de la solicitud
          console.error("Error:", error);
        });
    } else {
      // El token no está presente en el localStorage, se debe manejar la autenticación del usuario
      console.log("Token JWT no encontrado en el localStorage");
    }
  }

  //fetch a api
 /*  useEffect(() => {
    setCategorias(state.categoria);
  }, [state.categoria]); */

  const [nuevaCategoria, setNuevaCategoria] = useState({
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
      .then((res) => res.json())
      .then((data) => {
        // Después de que la categoría se haya agregado con éxito, actualiza las categorías
        getCategorias(dispatch);
        // También puedes limpiar el estado de nuevaCategoria aquí si es necesario
        setNuevaCategoria({ nombre: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const caracteristicas = [
    { id: 101, nombre: "Característica 1" },
    { id: 102, nombre: "Característica 2" },
    { id: 103, nombre: "Característica 3" },
  ];

  const objetos = [
    {
      id: 1,
      nombre: "Objeto 1",
      descripcion: "Descripción de Objeto 1",
      CategoriaId: 2,
      CaracteristicasIds: [101],
    },
    {
      id: 2,
      nombre: "Objeto 2",
      descripcion: "Descripción de Objeto 2",
      CategoriaId: 3,
      CaracteristicasIds: [102, 103],
    },
    {
      id: 3,
      nombre: "Objeto 3",
      descripcion: "Descripción de Objeto 3",
      CategoriaId: 1,
      CaracteristicasIds: [101, 102],
    },
  ];

  const initialFormData = {
    id: "",
    nombre: "",
    descripcion: "",
    CategoriaId: "",
    CaracteristicasIds: [],
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

    const isChecked = formData.CaracteristicasIds.includes(characteristicId);
    let updatedCaracteristicasIds;

    if (isChecked) {
      updatedCaracteristicasIds = formData.CaracteristicasIds.filter(
        (id) => id !== characteristicId
      );
    } else {
      updatedCaracteristicasIds = [
        ...formData.CaracteristicasIds,
        characteristicId,
      ];
    }

    setFormData({
      ...formData,
      CaracteristicasIds: updatedCaracteristicasIds,
    });
  };

  const handleEditar = (objeto) => {
    setFormData(objeto);
  };

  const handleCrear = () => {};
  const handleActualizar = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      handleActualizar(formData);
    } else {
      handleCrear(formData);
    }
    setFormData(initialFormData);
  };

  return (
    <div>
      <h2>Lista de Objetos</h2>
      <ul>
        {objetos.map((objeto) => (
          <li key={objeto.id}>
            {objeto.nombre} -{" "}
            <button onClick={() => handleEditar(objeto)}>Editar</button>
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
            name="CategoriaId"
            value={formData.CategoriaId || ""}
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
          <label>Características:</label>
          {caracteristicas.map((caracteristica) => (
            <div key={caracteristica.id}>
              <input
                type="checkbox"
                id={`caracteristica-${caracteristica.id}`}
                name="CaracteristicasIds"
                value={caracteristica.id}
                checked={formData.CaracteristicasIds.includes(
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
        <button type="submit">{formData.id ? "Actualizar" : "Crear"}</button>
      </form>

      <div>
        <h2>Lista de Categorías</h2>
        <ul>
          {categorias.map((categoria) => (
            <li key={categoria.id}>{categoria.nombre}</li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            value={nuevaCategoria.nombre}
            onChange={(e) => setNuevaCategoria({ nombre: e.target.value })}
            placeholder="Nueva Categoría"
          />
          <button onClick={handleAgregarCategoria}>Agregar</button>
        </div>
      </div>
    </div>
  );
};

export default Example;
