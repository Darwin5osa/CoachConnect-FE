import {
  getCaracteristicas,
  getCategorias,
  getEstudiantes,
  getNiveles,
  getTutores,
  getTutorias,
} from "./fetchAPI";
import { createContext, useContext, useReducer } from "react";
import data from "../Utils/DatosTutores.json";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

const getSessionToken = () => {
  const token = localStorage.getItem("token");
  try {
    return token ? jwtDecode(token) : false;
  } catch (error) {
    // Manejar errores al decodificar el token JWT
    console.error("Error al decodificar el token:", error);
    return false;
  }
};

export const initialState = {
  data: data.tutores,
  CATEGORIAS: [],
  CARACTERISTICAS: [],
  NIVELES: [],
  TUTORIAS: [],
  TUTORES: [],
  ESTUDIANTES: [],
  tutorias: [
    {
      id: 1,
      nombre: "Tutoría de Matemáticas Básicas",
      descripcion: "Revisa los fundamentos de las matemáticas",
      nivelId: 1,
      categoriaId: 2,
      caracteristicas: [1, 3],
    },
    {
      id: 2,
      nombre: "Tutoría de Literatura Infantil",
      descripcion: "Introducción a la literatura para niños",
      nivelId: 1,
      categoriaId: 2,
      caracteristicas: [1, 2],
    },
    {
      id: 3,
      nombre: "Tutoría de Ciencias Naturales",
      descripcion: "Exploración de la naturaleza y el mundo físico",
      nivelId: 2,
      categoriaId: 2,
      caracteristicas: [2, 3, 4],
    },
    {
      id: 4,
      nombre: "Tutoría de Historia Antigua",
      descripcion: "Estudio de las civilizaciones antiguas",
      nivelId: 2,
      categoriaId: 3,
      caracteristicas: [3, 4],
    },
    {
      id: 4,
      nombre: "Tutoría de Historia Antigua",
      descripcion: "Estudio de las civilizaciones antiguas",
      nivelId: 2,
      categoriaId: 3,
      caracteristicas: [3, 4],
    },
    {
      id: 4,
      nombre: "Tutoría de Historia Antigua",
      descripcion: "Estudio de las civilizaciones antiguas",
      nivelId: 2,
      categoriaId: 3,
      caracteristicas: [3, 4],
    },
  ],
  caracteristicas: [
    {
      id: 1,
      nombre: "Interactivo",
    },
    {
      id: 2,
      nombre: "Multidisciplinario",
    },
    {
      id: 3,
      nombre: "Grupal",
    },
    {
      id: 4,
      nombre: "Innovador",
    },
    {
      id: 5,
      nombre: "Práctico",
    },
    {
      id: 6,
      nombre: "Didáctico",
    },
    {
      id: 7,
      nombre: "Dinámico",
    },
  ],

  categorias: [
    {
      id: 1,
      nombre: "Matemáticas",
    },
    {
      id: 2,
      nombre: "Lengua",
    },
    {
      id: 3,
      nombre: "Ciencias Naturales",
    },
    {
      id: 4,
      nombre: "Historia",
    },
    {
      id: 5,
      nombre: "Educación Física",
    },
  ],
  niveles: [
    {
      id: 1,
      nombre: "primario",
    },
    {
      id: 2,
      nombre: "secundario",
    },
    {
      id: 3,
      nombre: "terceario",
    },
  ],
  detail: null,
  session: getSessionToken(),
};

export const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_TUTORES":
        return { ...state, data: [...action.payload] };
      case "SET_SESSION":
        return { ...state, session: action.payload };
      case "CLOSE_SESSION":
        localStorage.clear();
        return { ...state, session: false };
      case "SET_CATEGORIAS":
        return { ...state, categorias: action.payload };
      case "SET_OBJETOS":
        return { ...state, tutorias: action.payload };
      case "SET_NIVELES":
        return { ...state, niveles: action.payload };
      case "SET_CARACTERISTICAS":
        return { ...state, niveles: action.payload };

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

  console.log(state);
  return (
    <ContextGlobal.Provider
      value={{
        state,
        dispatch,
        getCategorias,
        getCaracteristicas,
        getTutorias,
      }}
    >
      {children}
    </ContextGlobal.Provider>
  );
};

export const useGlobalContex = () => useContext(ContextGlobal);
