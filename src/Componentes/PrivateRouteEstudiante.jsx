import { useGlobalContex } from "../Utils/global.context";
import { Navigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const PrivateRouteEstudiante = ({ children }) => {
  const { state } = useGlobalContex();
  const session = state.session?.role === "ESTUDIANTE";
  const prevSessionRef = useRef(null);

  useEffect(() => {
    if (prevSessionRef.current !== session && !session) {
      toast.warning("No tienes permiso para acceder a esta página");
    }
    prevSessionRef.current = session;
  }, [session]);

  return session ? children : <Navigate to="/login" />;
};

export default PrivateRouteEstudiante;


