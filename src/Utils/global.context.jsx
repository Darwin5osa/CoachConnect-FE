import { createContext, useContext, useReducer } from "react";
import data from "../Utils/DatosTutores.json";
import { jwtDecode } from "jwt-decode";

const previousSession = localStorage.getItem("token");

export const initialState = {
  data: data.tutores,
  detail: null,
  session: previousSession
    ? { ...jwtDecode(previousSession), token: previousSession }
    : false,
};

export const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_DATA":
        return { ...state, data: [...action.payload] };
      case "SET_DETAIL":
        return { ...state, detail: action.payload };
      case "SET_SESSION":
        return { ...state, session: action.payload };
      case "CLOSE_SESSION":
        localStorage.clear();
        return { ...state, session: null };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ContextGlobal.Provider value={{ state, dispatch }}>
      {children}
    </ContextGlobal.Provider>
  );
};

export const useGlobalContex = () => useContext(ContextGlobal);
