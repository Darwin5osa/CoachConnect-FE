import React from 'react'
import { useParams } from 'react-router'
import data from '../Utils/DatosTutores.json';
import r from "../Paginas/css/detail.module.css";
const Detail = ()=> {
  const { id } = useParams();
const mentor = data.tutores.find(mentor => mentor.id === parseInt(id));
return (
      <div className={r.contenedor}>
      <div className={r.card}>
        <div className={r.contenido}>
        <img src={mentor.Foto} className={r.img1} alt="" />
      <h2>{mentor.nombre} {mentor.apellido}</h2>
      <p>Edad: {mentor.edad}</p>
      <p>Email: {mentor.email}</p>
      <p>Celular: {mentor.celular}</p>
      <p>Profesion: {mentor.profesion}</p>
      <p>Descripcion: {mentor.descripcion}</p>
      </div>
      </div>
  </div>      
  );
};
export default Detail;