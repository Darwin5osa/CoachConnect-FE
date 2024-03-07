import { createContext, useContext, useReducer } from "react";
import { getCategorias, getTutorias } from "./fetchAPI";
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
  tutorias: [
    {
      id: 1,
      nombre: "Tutoría de Matemáticas Básicas",
      descripcion: "Revisa los fundamentos de las matemáticas",
      nivelId: 1,
      categoriaId: 2,
      caracteristicas: [1, 3],
      tutorId: 0,
    },
    {
      id: 2,
      nombre: "Tutoría de Literatura Infantil",
      descripcion: "Introducción a la literatura para niños",
      nivelId: 1,
      categoriaId: 2,
      caracteristicas: [1, 2],
      tutorId: 1,
    },
    {
      id: 3,
      nombre: "Tutoría de Ciencias Naturales",
      descripcion: "Exploración de la naturaleza y el mundo físico",
      nivelId: 2,
      categoriaId: 2,
      caracteristicas: [2, 3, 4],
      tutorId: 2,
    },
    {
      id: 4,
      nombre: "Tutoría de Historia Antigua",
      descripcion: "Estudio de las civilizaciones antiguas",
      nivelId: 2,
      categoriaId: 3,
      caracteristicas: [3, 4],
      tutorId: 3,
    },
    {
      id: 5,
      nombre: "Tutoría de Química General",
      descripcion: "Introducción a los conceptos básicos de química",
      nivelId: 3,
      categoriaId: 3,
      caracteristicas: [1, 2, 3],
      tutorId: 4,
    },
    {
      id: 6,
      nombre: "Tutoría de Educación Física",
      descripcion: "Desarrolla habilidades físicas y deportivas",
      nivelId: 1,
      categoriaId: 1,
      caracteristicas: [2, 5],
      tutorId: 5,
    },
    {
      id: 7,
      nombre: "Tutoría de Lengua y Gramática",
      descripcion: "Refuerza los conocimientos lingüísticos y gramaticales",
      nivelId: 2,
      categoriaId: 2,
      caracteristicas: [1, 3, 4],
      tutorId: 6,
    },
    {
      id: 8,
      nombre: "Tutoría de Geografía Mundial",
      descripcion: "Estudio de la geografía global",
      nivelId: 2,
      categoriaId: 3,
      caracteristicas: [2, 4, 5],
      tutorId: 7,
    },
    {
      id: 9,
      nombre: "Tutoría de Álgebra Avanzada",
      descripcion: "Estudio de álgebra a un nivel avanzado",
      nivelId: 3,
      categoriaId: 2,
      caracteristicas: [4, 5],
      tutorId: 8,
    },
    {
      id: 10,
      nombre: "Tutoría de Educación Cívica",
      descripcion: "Aprende sobre la sociedad y la ciudadanía",
      nivelId: 2,
      categoriaId: 3,
      caracteristicas: [1, 3, 5],
      tutorId: 9,
    },
    {
      id: 11,
      nombre: "Tutoría de Arte Visual",
      descripcion: "Explora el mundo del arte visual",
      nivelId: 2,
      categoriaId: 2,
      caracteristicas: [2, 3, 4],
      tutorId: 10,
    },
    {
      id: 12,
      nombre: "Tutoría de Música Instrumental",
      descripcion: "Aprende a tocar un instrumento musical",
      nivelId: 3,
      categoriaId: 2,
      caracteristicas: [1, 4, 5],
      tutorId: 11,
    },
    {
      id: 13,
      nombre: "Tutoría de Biología Celular",
      descripcion: "Estudio de la estructura y función de las células",
      nivelId: 3,
      categoriaId: 3,
      caracteristicas: [3, 4],
      tutorId: 12,
    },
    {
      id: 14,
      nombre: "Tutoría de Historia Moderna",
      descripcion: "Estudio de la historia reciente",
      nivelId: 2,
      categoriaId: 3,
      caracteristicas: [2, 5],
      tutorId: 13,
    },
    {
      id: 15,
      nombre: "Tutoría de Geometría Euclidiana",
      descripcion: "Estudio de la geometría euclidiana clásica",
      nivelId: 3,
      categoriaId: 2,
      caracteristicas: [1, 3, 4],
      tutorId: 14,
    },
    {
      id: 16,
      nombre: "Tutoría de Educación Ambiental",
      descripcion: "Concienciación sobre el medio ambiente",
      nivelId: 2,
      categoriaId: 3,
      caracteristicas: [2, 4],
      tutorId: 15,
    },
    {
      id: 17,
      nombre: "Tutoría de Educación Física y Salud",
      descripcion: "Promoción de la salud a través de la actividad física",
      nivelId: 2,
      categoriaId: 1,
      caracteristicas: [3, 5],
      tutorId: 16,
    },
    {
      id: 18,
      nombre: "Tutoría de Astronomía Básica",
      descripcion: "Introducción a la astronomía",
      nivelId: 1,
      categoriaId: 3,
      caracteristicas: [1, 2, 3],
      tutorId: 17,
    },
    {
      id: 19,
      nombre: "Tutoría de Inglés como Segundo Idioma",
      descripcion: "Aprende inglés como segundo idioma",
      nivelId: 1,
      categoriaId: 2,
      caracteristicas: [2, 4, 5],
      tutorId: 18,
    },
    {
      id: 20,
      nombre: "Tutoría de Arte Dramático",
      descripcion: "Explora el arte del teatro y la actuación",
      nivelId: 3,
      categoriaId: 2,
      caracteristicas: [1, 3, 5],
      tutorId: 19,
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
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  return (
    <ContextGlobal.Provider value={{ state, dispatch, getCategorias }}>
      {children}
    </ContextGlobal.Provider>
  );
};

export const useGlobalContex = () => useContext(ContextGlobal);
