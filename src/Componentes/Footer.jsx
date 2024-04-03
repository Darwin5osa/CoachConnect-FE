import s from "./css/footer.module.css";
import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { FiInstagram } from "react-icons/fi";
import { BsDiscord } from "react-icons/bs";
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div>
      <footer className={s.footer}>
        <div className={s.left}>
          <img className={s.logo} src="./Asset1.png" alt="logo" />
          <p className={s.copy}>© 2024 - COACH CONNECT</p>
          </div>
          
          <a href="https://wa.me/34624366585" target="_blank" rel="noopener noreferrer">
        <IoLogoWhatsapp size={30} color="#4BC8AB" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FiInstagram  size={30} color="#4BC8AB" />
      </a>
      <a href="https://discord.gg/uWZgGWtg" target="_blank" rel="noopener noreferrer">
        <BsDiscord  size={30} color="#4BC8AB" />
      </a>
      <a href="https://twitter.com/i/flow/login" target="_blank" rel="noopener noreferrer">
        <RiTwitterXFill   size={30} color="#4BC8AB" />
      </a>
      
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
