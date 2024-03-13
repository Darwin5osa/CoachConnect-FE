export const getCategorias = (dispatch) => {
  fetch("http://localhost:8080/categoria")
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
  fetch("http://localhost:8080/caracteristica")
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
  fetch("http://localhost:8080/tutoria")
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
  fetch("http://localhost:8080/tutor")
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
      console.error("Error al obtener las tutorias:", error);
    });
};

export const getNiveles = (dispatch) => {
  fetch("http://localhost:8080/nivel")
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
      console.error("Error al obtener las tutorias:", error);
    });
};

export const getEstudiantes = (dispatch) => {
  fetch("http://localhost:8080/estudiante")
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
      console.error("Error al obtener las tutorias:", error);
    });
};