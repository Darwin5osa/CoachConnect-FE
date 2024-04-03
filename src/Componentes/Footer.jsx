import { useLocation } from "react-router-dom";

import s from "./css/footer.module.css";
import React from "react";

const Footer = () => {
  const location = useLocation();

  return (
    <div>
      <footer className={s.footer}>
        <div className={s.left}>
          <img className={s.logo} src="/Asset1.png" alt="logo" />
          <p className={s.copy}>© 2024 - COACH CONNECT</p>
        </div>
        <div className={s.line}></div>
        <a
          className={s.email}
          title="Email"
          href="mailto:info@coachconnect.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          INFO@COACHCONNECT.COM
        </a>
      </footer>
    </div>
  );
};

export default Footer;
