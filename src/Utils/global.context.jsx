import {
  getCaracteristicas,
  getCategorias,
  getEstudiantes,
  getNiveles,
  getTutores,
  getTutorias,
} from "./fetchAPI";
import { createContext, useContext, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

const getSessionToken = () => {
  const token = localStorage.getItem("token");
  try {
    return token ? jwtDecode(token) : false;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return false;
  }
};

export const initialState = {
  CATEGORIAS: [],
  CARACTERISTICAS: [],
  NIVELES: [],
  TUTORIAS: [],
  TUTORES: [],
  ESTUDIANTES: [],
  detail: null,
  session: getSessionToken(),
};

export const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_SESSION":
        return { ...state, session: action.payload };
      case "CLOSE_SESSION":
        localStorage.clear();
        return { ...state, session: false };
      case "GETcategorias":
        return { ...state, CATEGORIAS: action.payload };
      case "GETcaracteristicas":
        return { ...state, CARACTERISTICAS: action.payload };
      case "GETniveles":
        return { ...state, NIVELES: action.payload };
      case "GETtutorias":
        return { ...state, TUTORIAS: action.payload };
      case "GETtutores":
        return { ...state, TUTORES: action.payload };
      case "GETestudiantes":
        return { ...state, ESTUDIANTES: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getCategorias(dispatch);
    getCaracteristicas(dispatch);
    getTutorias(dispatch);
    getNiveles(dispatch);
    getTutores(dispatch);
    getEstudiantes(dispatch);
  }, []);
  return (
    <ContextGlobal.Provider
      value={{
        state,
        dispatch,
        getCategorias,
        getCaracteristicas,
        getTutorias,
        getNiveles,
      }}
    >
      {children}
    </ContextGlobal.Provider>
  );
};

export const useGlobalContex = () => useContext(ContextGlobal);
