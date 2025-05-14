import React, { useState } from "react";
import * as css from "./header.module.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/userHook";

import { Link } from "react-router-dom";

function HeaderOculto({ setFlag }) {
  const [user] = useUser();
  const navigate = useNavigate();

  function onClick() {
    setFlag(true);
  }
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className={css.headerHidden}>
      <div className={css.headerConfig}>
        <button className={css.buttonCerrar} onClick={onClick}>
          X
        </button>
        <div className={css.serviciosHidden}>
          <Link to="/datos" id="logout-link" onClick={() => setFlag(true)}>
            Mis datos
          </Link>
          <Link
            to="/mismascotas"
            id="logout-link"
            onClick={() => setFlag(true)}
          >
            Mis mascotas reportadas
          </Link>
          <Link to="/report" id="logout-link" onClick={() => setFlag(true)}>
            Reportar mascota
          </Link>
          <Link to="/mascotas" id="logout-link" onClick={() => setFlag(true)}>
            Mascotas cerca
          </Link>
        </div>
        <p>{user.email}</p>
        <button className={css.buttonCerrarSesion} onClick={handleLogout}>
          CERRAR SESIÓN
        </button>
      </div>
    </div>
  );
}

function Header() {
  const [flag, setFlag] = useState(true);

  return (
    <div>
      {flag ? (
        <div className={css.header}>
          <Link to="/">
            <img
              className={css.logo}
              src="https://i.ibb.co/vfj3PKS/DALL-E-2025-01-15-18-35-08-A-square-logo-featuring-the-word-Jere-with-a-detailed-wolf-illustration-T.webp"
              alt="Logo"
            ></img>
          </Link>
          <button className={css.buttonAbrir} onClick={() => setFlag(false)}>
            <img
              src="https://i.ibb.co/dwPt6rf7/menu.png"
              alt=""
              className={css.image}
            />
          </button>
        </div>
      ) : (
        <HeaderOculto setFlag={setFlag} />
      )}
    </div>
  );
}

export { Header };
