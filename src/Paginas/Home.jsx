
import s from "./css/home.module.css";
import React from "react";

const Home = () => {
  return (
    <>
      <header id="home" className={s.banner}>
        <div className={s.titleCont}>
          <img className={s.brand} src="/Asset1.png" alt="" />
          <div className={s.aux}>
            <h1 className={s.title}>
              <span>COACH</span> 
              <span>CONNECT</span>
            </h1>
            <p className={s.slogan}>Conectando Talento, creando futuro.</p>
          </div>
        </div>
        <div className={s.bg}></div>
      </header>
    </>
  );
};

export default Home;
