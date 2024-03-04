
import Tutores from "./Tutores";
import Home from "./Home";
import React, { useEffect } from "react";

const UserView = () => {
      
      const handleClick = () => {
       //URL del endpoint
      const endPointBE = "https://api.chucknorris.io/jokes/random";
      
      const opciones = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }

      fetch(endPointBE, opciones)
      .then(response => {
        if(!response.ok){
          alert("NO HAY CONEXION")
          throw new Error('Error en la solicitud: ' + response.status);
          
        }else {
          return response.json();
        }
      }) 
      .then(data => {
        alert("SE ESTABLECE CONEXION")
        console.log("Datos recibidos: ", data);
      })
      .catch(error => {
        console.error("error: ", error);
      })
      }
      
      

  return (
    <>
      <Home />
      <Tutores />
      <div style={{ textAlign: 'center' }}>
        <button onClick={handleClick} 
        style={{backgroundColor: '#ff6347',
        border: 'none',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease',
        margin: '10px'
        }} >
         ConexionBE
        </button>
      </div>
      
    </>
  );
};

export default UserView;
