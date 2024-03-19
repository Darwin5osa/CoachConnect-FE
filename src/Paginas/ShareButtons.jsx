import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

const ShareButtons = ({ tutoriaUrl }) => {
  const compartirEnRedSocial = (redSocial) => {
    const urlTutoria = encodeURIComponent(tutoriaUrl);
    let urlCompartir = "";
    switch (redSocial) {
      case "facebook":
        urlCompartir = `https://www.facebook.com/sharer/sharer.php?u=${urlTutoria}`;
        break;
      case "twitter":
        urlCompartir = `https://twitter.com/intent/tweet?url=${urlTutoria}`;
        break;
      case "instagram":
        urlCompartir = `https://www.instagram.com/?url=${urlTutoria}`;
        break;
      default:
        break;
    }
    window.open(urlCompartir, "_blank", "width=600,height=400");
  };

  return (
    <div>
      <button onClick={() => compartirEnRedSocial("facebook")}>
        <FontAwesomeIcon icon={faFacebook} /> Compartir en Facebook
      </button>
      <button onClick={() => compartirEnRedSocial("twitter")}>
        <FontAwesomeIcon icon={faTwitter} /> Compartir en Twitter
      </button>
      <button onClick={() => compartirEnRedSocial("instagram")}>
        <FontAwesomeIcon icon={faInstagram} /> Compartir en Instagram
      </button>
    </div>
  );
};

export default ShareButtons;

