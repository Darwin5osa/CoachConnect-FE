import React from 'react'
import s from "./footer.module.css"

const Footer = () => {
  return (
    <div>
      <footer className={s.footer}>
        <div className={s.left}>
          <img className={s.logo} src="./Asset1.png" alt="logo" />
          <p className={s.copy}>© 2024 - COACH CONNECT</p>
        </div>
        <p className={s.email}>info@coachconnect.com</p>
      </footer>
    </div>
  )
}

export default Footer