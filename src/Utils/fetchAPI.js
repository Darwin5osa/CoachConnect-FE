export const getCategorias = (dispatch) => {
  fetch("http://localhost:8080/categoria")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      dispatch({ type: "SET_CATEGORIA", payload: data });
    })
    .catch((error) => {
      console.error("Error al obtener las categorías:", error);
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
      dispatch({ type: "SET_TUTORIAS", payload: data });
    })
    .catch((error) => {
      console.error("Error al obtener las tutorias:", error);
    });
};