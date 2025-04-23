import React from "react";
import * as css from "./auth.module.css";
import { FormAuth } from "../../components/form/form";
import { Title, Body } from "../../ui/texts";

export class Auth extends React.Component<any, any> {
  render() {
    return (
      <div className={css.root}>
        <img
          src="https://i.ibb.co/0yVNrDJT/undraw-login-re-4vu2-1.png"
          alt=""
        ></img>
        <Title className={css.title}>Ingresar</Title>
        <Body className={css.body}>Ingresá tu email para continuar.</Body>
        <FormAuth />
        <p>Aún no tenes cuenta?</p>
        <a href="/register">Registrate.</a>
      </div>
    );
  }
}
