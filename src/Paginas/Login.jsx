import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalContex } from "../Utils/global.context";
import Navbar from "../Componentes/Navbar";
import { Loader } from "semantic-ui-react";
import s from "./css/login.module.css";
import emailjs from "@emailjs/browser";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

const Login = () => {
  // Referencia al formulario
  const forms = useRef();

  // Estado para el indicador de carga
  const [loading, setLoading] = useState(false);

  // Estado para los datos del inicio de sesión
  const [signin, setSignin] = useState({
    email: "",
    password: "",
  });

  // Estado para los datos del registro
  const [register, setRegister] = useState({
    username: "",
    edad: 0,
    contactoCelular: 0,
    foto: "foto",
    nivelEducativo: "nivel",
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  // Obtiene el contexto global y el navegador
  const { state, dispatch, getFavs, getEstudiantes } = useGlobalContex();
  const navigate = useNavigate();

  // Obtiene la ubicación actual
  const location = useLocation().pathname;

  // Estado para alternar entre el formulario de inicio de sesión y registro
  const [form, setForm] = useState(location === "/register" ? true : false);

  // Efecto para redireccionar al usuario después del inicio de sesión
  useEffect(() => {
    if (state.session && state.session.role === "ADMIN") {
      navigate("/admin/dashboard");
    }
    if (state.session && state.session.role === "ESTUDIANTE") {
      navigate("/");
    }
  }, [state]);

  // Función para manejar el inicio de sesión
  const handleSignin = (e) => {
    e.preventDefault();
    fetch("https://api.coachconnect.tech/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signin),
    })
      .then((res) => res.json())
      .then((data) => {
        const info = { ...jwtDecode(data.token) };
        dispatch({ type: "SET_SESSION", payload: info });
        window.localStorage.setItem("token", data.token);
        getFavs(dispatch, info.estudianteId);
      })
      .catch((err) => toast.warning("Datos incorrectos o faltantes"));
  };

  // Función para validar los campos del formulario de registro
  const handleValidationRegister = (register) => {
    // Expresiones regulares para validaciones
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Validación de los campos del formulario
    if (!register.username) {
      toast.warning("Username invalido o faltante.");
      return false;
    }
    if (!nameRegex.test(register.nombre)) {
      toast.warning("Nombre invalido o faltante.");
      return false;
    }
    if (!nameRegex.test(register.apellido)) {
      toast.warning("Apellido invalido o faltante.");
      return false;
    }
    if (!emailRegex.test(register.email)) {
      toast.warning("Ingrese un correo electrónico válido.");
      return false;
    }
    if (
      register.password.length < 8 ||
      !passwordRegex.test(register.password)
    ) {
      toast.warning(
        "La contraseña debe tener al menos 8 caracteres y contener números."
      );
      return false;
    }
    return true;
  };

  // Función para manejar el registro
  const handleRegister = (e) => {
    e.preventDefault();
    if (handleValidationRegister(register)) {
      setLoading(true);
      fetch("https://api.coachconnect.tech/estudiante", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
      })
        .then((res) => {
          if (res.ok) return;
          else
            return res.json().then((jsonResponse) => {
              console.log(jsonResponse);
              throw new Error(
                jsonResponse.message || "Error en la solicitud."
              );
            });
        })
        .then(() => {
          setTimeout(() => {
            setLoading(false);
            navigate("/login");
            setForm(!form);
          }, 1000);
          emailjs
            .sendForm(
              "service_m7y7fsr",
              "template_5mveabq",
              forms.current,
              "Cjl_H5JPzn_9MsSu1"
            )
            .then(
              (result) => {
                getEstudiantes(dispatch)
                toast.info(
                  "Te llegara un mail con la confirmacion de registro"
                );
              },
              (error) => {
                console.log(error.text);
              }
            );
        })
        .catch((err) => toast.warning(err.message))
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        });
    }
  };

  // Función para manejar los cambios en los inputs del inicio de sesión
  const handleInputChangeSignin = (event) => {
    const { name, value } = event.target;
    setSignin({
      ...signin,
      [name]: value.trim(),
    });
  };

  // Función para manejar los cambios en los inputs del registro
  const handleInputChangeRegister = (event) => {
    const { name, value } = event.target;
    setRegister({
      ...register,
      [name]: value.trim(),
    });
  };

  // Función para alternar entre el formulario de inicio de sesión y registro
  const handleScreen = () => {
    if (location === "/login") {
      navigate("/register");
    } else {
      navigate("/login");
    }
    setForm(!form);
    setSignin({
      email: "",
      password: "",
    });
    forms.current.reset();
  };

  // Renderizar el componente
  return (
    <>
      <Navbar />
      <div className={s.login}>
        <div className={s.cont}>
          <div className={`${s.screen} ${form ? s.active1 : ""}`}>
            {!form ? (
              <div className={s.info}>
                <div>
                  <img src="/Asset1.png" />
                  <h2>Coach Connect</h2>
                </div>
                <div className={s.acount}>
                  <p>¿No tienes una cuenta?</p>
                  <button onClick={handleScreen}>Registrarse</button>
                </div>
              </div>
            ) : (
              <div className={s.info}>
                <div>
                  <img src="/Asset1.png" />
                  <h2>Coach Connect</h2>
                </div>
                <div>
                  <p>¿Ya eres miembro?</p>
                  <button onClick={handleScreen}>Iniciar Sesion</button>
                </div>
              </div>
            )}
          </div>
          <div className={s.struc}>
            <form ref={forms} className={`${s.formReg} ${!form ? s.none : ""}`}>
              <h1>Register</h1>
              <div className={s.logcont}>
                <div className={s.us}>
                  <label className={s.lab} htmlFor="usuario">
                    Nombre de usuario:
                  </label>
                  <input
                    onChange={handleInputChangeRegister}
                    placeholder="Nombre de usuario"
                    className={s.in}
                    type="text"
                    id="username"
                    name="username"
                    required
                  ></input>
                </div>
                <div className={s.us}>
                  <label className={s.lab} htmlFor="nombre">
                    Nombre:
                  </label>
                  <input
                    placeholder="Nombre"
                    onChange={handleInputChangeRegister}
                    className={s.in}
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                  ></input>
                </div>
                <div className={s.us}>
                  <label className={s.lab} htmlFor="contrasena">
                    Apellido:
                  </label>
                  <input
                    placeholder="Apellido"
                    onChange={handleInputChangeRegister}
                    className={s.in}
                    type="apellido"
                    id="apellido"
                    name="apellido"
                    required
                  ></input>
                </div>
                <div className={s.us}>
                  <label className={s.lab} htmlFor="contrasena">
                    Email:
                  </label>
                  <input
                    placeholder="Email"
                    onChange={handleInputChangeRegister}
                    className={s.in}
                    type="email"
                    id="email"
                    name="email"
                    required
                  ></input>
                </div>
                <div className={s.us}>
                  <label className={s.lab} htmlFor="contrasena">
                    Contraseña:
                  </label>
                  <input
                    placeholder="Contraseña"
                    onChange={handleInputChangeRegister}
                    className={s.in}
                    type="password"
                    id="contraseña"
                    name="password"
                    required
                  ></input>
                </div>
              </div>
              {!loading ? (
                <button
                  type="submit"
                  onClick={handleRegister}
                  className={s.boton}
                >
                  Regsiter
                </button>
              ) : (
                <div className={s.spinner}>
                  <Loader active />
                </div>
              )}
            </form>
          </div>
          <div className={s.struc}>
            <form className={`${s.formSignin} ${form ? s.none : ""}`}>
              <h1>Sign in</h1>
              <div className={s.logcont}>
                <div className={s.us}>
                  <label className={s.lab} htmlFor="usuario">
                    Email:
                  </label>
                  <input
                    placeholder="Email"
                    onChange={handleInputChangeSignin}
                    className={s.in}
                    type="email"
                    name="email"
                    value={signin.email}
                    required
                  ></input>
                </div>
                <div className={s.us}>
                  <label className={s.lab} htmlFor="contrasena">
                    Contraseña:
                  </label>
                  <input
                    placeholder="Contrasña"
                    onChange={handleInputChangeSignin}
                    className={s.in}
                    type="password"
                    name="password"
                    value={signin.password}
                    required
                  ></input>
                </div>
              </div>
              <button type="submit" onClick={handleSignin} className={s.boton}>
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
