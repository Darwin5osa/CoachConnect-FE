export const getCategorias = (dispatch) => {
  fetch("https://api.coachconnect.tech/categoria")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      dispatch({ type: "GETcategorias", payload: data });
    })
    .catch((error) => {
      console.error("Error al obtener las categorías:", error);
    });
};

export const getCaracteristicas = (dispatch) => {
  fetch("https://api.coachconnect.tech/caracteristica")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      dispatch({ type: "GETcaracteristicas", payload: data });
    })
    .catch((error) => {
      console.error("Error al obtener las caracteristica:", error);
    });
};

export const getTutorias = (dispatch) => {
  fetch("https://api.coachconnect.tech/tutoria")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      dispatch({ type: "GETtutorias", payload: data });
    })
    .catch((error) => {
      console.error("Error al obtener las tutorias:", error);
    });
};

export const getTutores = (dispatch) => {
  fetch("https://api.coachconnect.tech/tutor")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      dispatch({ type: "GETtutores", payload: data });
    })
    .catch((error) => {
      console.error("Error al obtener los tutores:", error);
    });
};

export const getNiveles = (dispatch) => {
  fetch("https://api.coachconnect.tech/nivel")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      dispatch({ type: "GETniveles", payload: data });
    })
    .catch((error) => {
      console.error("Error al obtener los niveles:", error);
    });
};

export const getEstudiantes = (dispatch) => {
  fetch("https://api.coachconnect.tech/estudiante")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      dispatch({ type: "GETestudiantes", payload: data });
    })
    .catch((error) => {
      console.error("Error al obtener los estudiantes:", error);
    });
};

export const getFavs = (dispatch, id) => {
  fetch(`https://api.coachconnect.tech/estudiante/${id}/favorito`)
    .then((response) => {
      if (!response.ok) {
        return
      }
      return response.json();
    })
    .then((data) => {
      dispatch({ type: "GETfavs", payload: data });
    })

};



