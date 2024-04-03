import React from "react";
import { FaTwitter } from "react-icons/fa";
import s from "./css/share.module.css"


const ShareOnTwittweButton = ({ text, url }) => {
  const handleClick = () => {
    // Construir la URL de compartir en Twitter
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

    // Abrir la URL de compartir en una nueva ventana
    window.open(twitterShareUrl, "_blank");
  };

  return (
    <FaTwitter className={s.share} onClick={handleClick}/>
  )
};

export default ShareOnTwittweButton;