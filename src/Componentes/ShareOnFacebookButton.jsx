import React from "react";
import { FaFacebookSquare } from "react-icons/fa";

import s from "./css/share.module.css"

const ShareOnFacebookButton = ({ url }) => {
  const handleClick = () => {
    // Construir la URL de compartir en Facebook
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

    // Abrir la URL de compartir en una nueva ventana
    window.open(facebookShareUrl, "_blank");
  };

  return (
    <FaFacebookSquare className={s.share} onClick={handleClick}/>
  );
};

export default ShareOnFacebookButton;
