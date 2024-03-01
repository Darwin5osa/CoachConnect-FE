import React from 'react'
import { useParams } from 'react-router'
import data from '../Utils/DatosTutores.json';
import r from "../Paginas/detail.module.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

const Detail = ()=> {
  const { id } = useParams();
const mentor = data.tutores.find(mentor => mentor.id === parseInt(id));
const handleClick = () => {
  window.history.back('/mentores');
};

return (
      <div className={r.contenedor}>
      <div className={r.card}>
      <div className={r.contenido}>
      <img src={mentor.Foto} alt="Foto de perfil del mentor" />
      <h1>{mentor.nombre} {mentor.apellido}</h1>
      <h2>{mentor.profesion}</h2>
      <p>Acerca de {mentor.nombre} <br />{mentor.descripcion}</p></div>
      <div className = {r.botones}>
      <button className={r.btnes} onClick={handleClick}><FontAwesomeIcon icon={faArrowLeft}  /></button>
      <button className={r.btnes}>Contactar</button>
      </div>
      </div>
  </div>      
  );
};
export default Detail;