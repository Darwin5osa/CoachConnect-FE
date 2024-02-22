import Card from "../Componentes/Card";
import s from "./home.module.css";
import React from "react";

const Home = () => {
  return (
    <>
      <header className={s.banner}>
        <div className={s.titleCont}>
          <img className={s.brand} src="/Asset1.png" alt="" />
          <div className={s.kaka}>
            <h1 className={s.title}>COACH CONNECT</h1>
            <p className={s.slogan}>Conectando Talento, creando futuro.</p>
          </div>
        </div>
        <div className={s.bg}></div>
      </header>
    </>
  );
};

export default Home;
