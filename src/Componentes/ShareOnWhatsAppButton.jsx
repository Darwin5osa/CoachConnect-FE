import React from "react";
import s from "./css/share.module.css"
import { IoLogoWhatsapp } from "react-icons/io";

const ShareOnWhatsAppButton = ({ text, url }) => {
  const handleClick = () => {
    // Construir la URL de compartir en WhatsApp
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}%20${encodeURIComponent(url)}`;

    // Abrir la URL de compartir en una nueva ventana
    window.open(whatsappShareUrl, "_blank");
  };

  return (
    <IoLogoWhatsapp className={s.share} onClick={handleClick}/>
  );
};

export default ShareOnWhatsAppButton;
