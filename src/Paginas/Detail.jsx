import React from 'react'
import { useParams } from 'react-router'
import data from '../Utils/DatosTutores.json';
import data2 from '../Utils/TutoriaImg.json'
import r from "../Paginas/css/detail.module.css";

const Detail = ()=> {
  const { id } = useParams();
const mentor = data.tutores.find(mentor => mentor.id === parseInt(id));
const randomIndices = [];
while (randomIndices.length < 6) {
  const randomIndex = Math.floor(Math.random() * data2.imagenes.length);
  if (!randomIndices.includes(randomIndex)) {
    randomIndices.push(randomIndex);
  }
}
return (
  <div className={r.contenedor}>
    <div className={r.card}>
      
      <h1>{mentor.tutoria}</h1>
      <p>Las tutorías son lideradas por docentes que sobresalen por sus habilidades versátiles y adaptativas, se distinguen 
        por un profundo conocimiento en la materia que imparten. Estos educadores son hábiles en el manejo de las tecnologías de 
        la información y la comunicación, lo que les permite crear experiencias de aprendizaje inmersivas y efectivas. Además, su 
        capacidad de escucha activa y ofrecer retroalimentación constructiva resulta vital en este entorno, garantizando que los 
        estudiantes se sientan comprendidos y motivados para alcanzar sus metas educativas. </p> 

      <div>
        <img className={r.imagentutor} src={mentor.Foto} alt='Foto de perfil - tutor'/>
      </div> 

      <div className={r.informacion}>
        <h3 className={r.infoTutor}>{mentor.nombre} {mentor.apellido}</h3>
        <h3 > {mentor.descripcion}</h3>
      </div>
        
      <div className={r.contenedorImagenes}>
        <div className={r.ContenedorImgLeft}>
          <img className={r.imgLeft} src={data2.imagenes[randomIndices[0]].url} alt="Imagen Aleatoria 1"/>
        </div>
        <div className={r.ContenedorImgRight}>
          <img className={r.imgRight} src={data2.imagenes[randomIndices[1]].url} alt="Imagen Aleatoria 1"/>
          <img className={r.imgRight} src={data2.imagenes[randomIndices[2]].url} alt="Imagen Aleatoria 1"/>
          <img className={r.imgRight} src={data2.imagenes[randomIndices[4]].url} alt="Imagen Aleatoria 1"/>
          <img className={r.imgRight} src={data2.imagenes[randomIndices[5]].url} alt="Imagen Aleatoria 1"/>
        </div>
      </div>
    <div className={r.caracteristicas}>
      <h2>Características Principales</h2>
      <div className={r.iconosCaracteristicas}>
        <div className={r.icono}>
          <i className="fa-solid fa-language" style={{color: "rgba(255, 255, 255, 0.8)", fontSize: '25px', margin: '2%'}}></i>
          <p style={{margin: '2%'}}>Clase en diferentes idiomas</p>
        </div>
        
        <div className={r.icono}>
          <i className="fa-regular fa-user" style={{color: "rgba(255, 255, 255, 0.8)", fontSize: '25px', margin: '2%' }}></i>
          <p style={{margin: '2%', marginLeft: '5%'}}>Clase Personalizada</p>
        </div>

        <div className={r.icono}>
          <i className="fa-solid fa-globe" style={{color: "rgba(255, 255, 255, 0.8)", fontSize: '25px', margin: '2%'}}></i>
          <p style={{margin: '2%', marginLeft: '5%'}}>Clase Virtual</p>
        </div>

        <div className={r.icono}>
          <i className="fa-solid fa-book" style={{color: "rgba(255, 255, 255, 0.8)", fontSize: '25px', margin: '2%'}}></i>
          <p style={{margin: '2%', marginLeft: '5%'}}>Material de Estudio</p>
        </div>

        <div className={r.icono}>
          <i className="fa-solid fa-brain" style={{color: "rgba(255, 255, 255, 0.8)", fontSize: '25px', margin: '2%'}}></i>
          <p style={{margin: '2%', marginLeft: '5%'}}>Retos y Desafios de Aprendizaje </p>
        </div>

        <div className={r.icono}>
          <i className="fa-solid fa-flask" style={{color: "rgba(255, 255, 255, 0.8)", fontSize: '25px', margin: '2%'}}></i>
          <p style={{margin: '2%', marginLeft: '5%'}}>Experimentos logicos</p>
        </div>
      </div>
    </div>
    </div>
  </div>
     
  );
};
export default Detail;