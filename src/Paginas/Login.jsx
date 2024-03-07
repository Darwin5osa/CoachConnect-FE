import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminNavbar from "../Componentes/admin/AdminNavbar";
import { useGlobalContex } from "../Utils/global.context";
import React, { useEffect, useState, useRef } from "react";
import s from "./css/login.module.css";
import emailjs from "@emailjs/browser";
import { jwtDecode } from "jwt-decode";
const Login = () => {
  const forms = useRef();
  const [loading, setLoading] = useState(false);
  const [signin, setSignin] = useState({
    email: "",
    password: "",
  });
  const [register, setRegister] = useState({
    username: "",
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });
  const { state, dispatch } = useGlobalContex();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [form, setForm] = useState(location === "/register" ? true : false);

  useEffect(() => {
    if (state.session && state.session.role == "ADMIN") {
      navigate("/admin/dashboard");
    }
    if (state.session && state.session.role == "ESTUDIANTE") {
      navigate("/");
    }
  }, [state]);

  const handleSignin = (e) => {
    e.preventDefault();
    console.log(signin);
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signin),
    })
      .then((res) => res.json())
      .then((data) => {
        const info = { ...jwtDecode(data.token), name: signin.email };
        console.log(info);
        dispatch({ type: "SET_SESSION", payload: info });
        window.localStorage.setItem("token", data.token);
      })
      .catch((err) => alert("Datos incorrectos o faltantes"));

    /*     if (jwtData.isAdmin) {
      console.log("admin");
      navigate("/admin/dashboard");
    }

    if (jwtData && !jwtData.isAdmin) {
      console.log("user");
      navigate("/");
    } */
  };

  const handleValidationRegister = (register) => {
    // Expresiones regulares para validaciones
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Validación de los campos del formulario
    if (!nameRegex.test(register.nombre)) {
      alert("Nombre invalido o faltante.");
      return false;
    }

    if (!nameRegex.test(register.apellido)) {
      alert("Apellido invalido o faltante.");
      return false;
    }

    if (!emailRegex.test(register.email)) {
      alert("Ingrese un correo electrónico válido.");
      return false;
    }

    if (
      register.password.length < 8 ||
      !passwordRegex.test(register.password)
    ) {
      alert(
        "La contraseña debe tener al menos 8 caracteres y contener números."
      );
      return false;
    }

    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(register);

    if (handleValidationRegister(register)) {
      setLoading(true);
      fetch("http://localhost:8080/estudiante", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          emailjs
            .sendForm(
              "service_0zl4red",
              "template_0ozonpo",
              forms.current,
              "Cjl_H5JPzn_9MsSu1"
            )
            .then(
              (result) => {
                console.log(result);
              },
              (error) => {
                console.log(error.text);
              }
            );
        })
        .catch((err) => alert("Datos incorrectos o faltantes"))
        .finally(() => {
          setTimeout(() => {
            setLoading(false);

            navigate("/login");
            setForm(!form);
          }, 1000);
        });
    }
  };

  const handleInputChangeSignin = (event) => {
    const { name, value } = event.target;
    setSignin({
      ...signin,
      [name]: value.trim(), // Agregar trim() para eliminar espacios al inicio y al final
    });
  };
  const handleInputChangeRegister = (event) => {
    const { name, value } = event.target;
    setRegister({
      ...register,
      [name]: value.trim(),
    });
  };

  const handleScreen = () => {
    if (location == "/login") {
      navigate("/register");
    } else {
      navigate("/login");
    }
    setForm(!form);
    setSignin({
      email: "",
      password: "",
    });
    setRegister({
      username: "",
      nombre: "",
      apellido: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className={s.login}>
      <AdminNavbar />
      <div className={s.cont}>
        <div className={`${s.screen} ${form ? s.active1 : ""}`}>
          {!form ? (
            <div className={s.info}>
              <div>
                <img src="/Asset1.png" />
                <h2>Coach Connect</h2>
              </div>
              <div>
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
                  value={register.username}
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
                  onChange={handleInputChangeRegister}
                  value={register.nombre}
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
                  onChange={handleInputChangeRegister}
                  value={register.apellido}
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
                  onChange={handleInputChangeRegister}
                  value={register.email}
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
                  onChange={handleInputChangeRegister}
                  value={register.password}
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
                <Loader active inline="centered" />
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
  );
};

export default Login;
