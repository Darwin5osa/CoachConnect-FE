import { useNavigate, useLocation } from "react-router-dom";
import AdminNavbar from "../Componentes/admin/AdminNavbar";
import { useGlobalContex } from "../Utils/global.context";
import React, { useEffect, useState } from "react";
import s from "./css/login.module.css";
import { jwtDecode } from "jwt-decode";
const Login = () => {
  const [signin, setSignin] = useState({
    email: "",
    password: "",
  });
  const [register, setRegister] = useState({
    name: "",
    surname: "",
    email: "",
    contraseña: "",
  });
  console.log(signin);
  const [error, setError] = useState(false);
  const { state, dispatch } = useGlobalContex();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  console.log(location);

  const [form, setForm] = useState(location === "/register" ? true : false);

  useEffect(() => {
    if (state.session && state.session.isAdmin) {
      navigate("/admin/dashboard");
    }
    if (state.session && !state.session.isAdmin) {
      navigate("/");
    }
  }, [state]);

  const jwtAdmin =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibGF1cmVhbm8iLCJlbWFpbCI6ImxhdXJlYW5vQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWV9.Je0GQ8wah3BUGujNOUBjtEi36dZp31oukOTSpS_OaGo";

  const jwtUser =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibGF1cmVhbm8iLCJlbWFpbCI6ImxhdXJlYW5vQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfQ.oTl_lq9q5qyKdr_I1snKxhwQiH0qi2FOTcvUvuIizuU";

  const validationRules = {
    name: { regex: /^[a-zA-Z\s]+$/ },
    surname: { regex: /^[a-zA-Z\s]+$/ },
    email: { regex: /^\S+@\S+\.\S+$/ },
    password: { regex: /^[0-9]+$/ },
  };

  const validateInputs = (data, validationRules) => {
    for (let key in validationRules) {
      const value = data[key];
      const rule = validationRules[key];

      if (rule && rule.regex) {
        const regex = new RegExp(rule.regex);
        if (!regex.test(value)) {
          return false;
        }
      }
    }
    return true;
  };

  const handleLogin = (e) => {
    signin;

    const jwtData = { ...jwtDecode(jwtAdmin), token: jwtAdmin };
    console.log(jwtData);

    dispatch({ type: "SET_SESSION", payload: jwtData });
    window.localStorage.setItem("token", jwtAdmin);

    if (jwtData.isAdmin) {
      console.log("admin");
      navigate("/admin/dashboard");
    }

    if (jwtData && !jwtData.isAdmin) {
      console.log("user");
      navigate("/");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
  };

  const [inputValue, setInputValue] = useState({
    usuario: "",
    pass: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignin({
      ...signin,
      [name]: value,
    });
    setInputValue({
      ...inputValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleInputClick = (event) => {
    const label = event.target.parentNode.querySelector("label");
    if (label) {
      label.classList.add(s.active);
    }
  };

  const handleInputBlur = (event) => {
    const label = event.target.parentNode.querySelector("label");
    if (label && event.target.value === "") {
      label.classList.remove(s.active);
    }
  };

  const handleScreen = () => {
    if(location=="/login"){
      navigate("/register")
    }else{
      navigate("/login")
    }
    setForm(!form);
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
          <form
            className={`${s.formReg} ${
              !form
                ? s.none
                : ""
            }`}
          >
            <h1>Register</h1>
            <div className={s.logcont}>
              <div className={s.us}>
                <label
                  className={`${s.lab} ${inputValue.usuario ? s.active : ""}`}
                  htmlFor="nombre"
                >
                  Nombre:
                </label>
                <input
                  onChange={handleInputChange}
                  onClick={handleInputClick}
                  onBlur={handleInputBlur}
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
                  onChange={handleInputChange}
                  onClick={handleInputClick}
                  onBlur={handleInputBlur}
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
                  onChange={handleInputChange}
                  onClick={handleInputClick}
                  onBlur={handleInputBlur}
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
                  onChange={handleInputChange}
                  onClick={handleInputClick}
                  onBlur={handleInputBlur}
                  className={s.in}
                  type="password"
                  id="contrasena"
                  name="contrasena"
                  required
                ></input>
              </div>
            </div>
            <button type="submit" onClick={handleRegister} className={s.boton}>
              Regsiter
            </button>
          </form>
        </div>
        <div className={s.struc}>
          <form
            className={`${s.formLogin} ${
              form
                ? s.none
                : ""
            }`}
          >
            <h1>Sign in</h1>
            <div className={s.logcont}>
              <div className={s.us}>
                <label
                  className={s.lab}
                  htmlFor="usuario"
                >
                  Email:
                </label>
                <input
                  onChange={handleInputChange}
                  onClick={handleInputClick}
                  onBlur={handleInputBlur}
                  className={s.in}
                  type="email"
                  id="email"
                  name="email"
                  title="Porfavor ingrese un email valido"
                  required
                ></input>
              </div>
              <div className={s.us}>
                <label className={s.lab} htmlFor="contrasena">
                  Contraseña:
                </label>
                <input
                  onChange={handleInputChange}
                  onClick={handleInputClick}
                  onBlur={handleInputBlur}
                  className={s.in}
                  type="password"
                  id="contrasena"
                  name="password"
                  required
                ></input>
              </div>
            </div>
            <button type="submit" onClick={handleLogin} className={s.boton}>
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
