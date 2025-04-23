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
              src="https://s3-alpha-sig.figma.com/img/6178/8357/c19ead6c7eecf06b3b1ac2dfd5631d44?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lClfp7XeTcLpcDt~DGvQqnBLGHqkEssPYLtAf7cqHxJFBHh556dhGRs7IcOkrhiPzgQlTHzWZeDR7igZfIpkojucNB9Dst75FO0Dq1gHu019SiBE3xPKt-8FfHmvP5FnbVEinASFSmMt4Txgs0pZlstfR0yyInmhk8BDtIim~WtpgF0NLHZbmyrRwHVBpVLNiZm3vk1OUWkW6B7HdeWMi7lzL7BOC2Bvwy4-bgKNfOklfxibU2-ok9UCuF5J-ggcwonot-mVBuIGpAgKdM~CrGZgJxmVJ-mUFJ0RitBi32VMNvYxtKfFzKOInBZTykF9U9PipNalpeOuvg3CkKVfZg__"
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
