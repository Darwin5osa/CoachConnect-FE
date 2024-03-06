import React, { useState } from "react";

const Example = () => {
  const categorias = [
    { id: 1, nombre: "Categoría 1" },
    { id: 2, nombre: "Categoría 2" },
    { id: 3, nombre: "Categoría 3" },
  ];

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
      [name]: value
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
    </div>
  );
};

export default Example;
