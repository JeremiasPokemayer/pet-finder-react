import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import { BlueButton } from "../../ui/buttons";
import { TextField } from "../../ui/text-field";
import { Body, Title } from "../../ui/texts";
import { Link } from "react-router";
import * as css from "./form.module.css";
import { useUser } from "../../hooks/userHook";
import { useRegister } from "../../hooks/useRegister";
import { useLogin } from "../../hooks/useLogin";

const API_BASE_URL = process.env.API_BASE_URL;

export function FormAuth() {
  return (
    <form className={css.formAuth}>
      <label className={css.labelAuth}>
        <Body className={css.bodyAuth}>Email</Body>
        <TextField name={"email"} />
      </label>
      <Link to={"/login"}>
        <BlueButton onClick={undefined}>Siguiente</BlueButton>
      </Link>
    </form>
  );
}

export function FormLogin() {
  const [user, setUser] = useUser();
  const { login } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(user.email, user.password);
    if (data) {
      navigate("/mascotas");
    }
  };

  return (
    <form className={css.formLogin} onSubmit={handleSubmit}>
      <Title className={css.titleLogin}>Iniciar Sesión</Title>
      <Body className={css.bodyLogin}>
        Ingresá los siguientes datos para iniciar sesión
      </Body>
      <label className={css.labelEmail}>
        <Body className={css.bodyEmail}>Email</Body>
        <TextField
          name="email"
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />
      </label>
      <label className={css.labelPassword}>
        <Body className={css.bodyPassword}>Password</Body>
        <TextField
          name="password"
          type="password"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
      </label>
      <a href="/auth">Olvidé mi contraseña</a>
      <BlueButton type="submit">Acceder</BlueButton>
    </form>
  );
}

export function FormRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useUser();
  const { register } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await register(user.email, user.password);
  };

  return (
    <form className={css.formLogin} onSubmit={handleSubmit}>
      <Title className={css.titleLogin}>Registrate</Title>
      <Body className={css.bodyLogin}>
        Ingresá los siguientes datos para realizar el registro
      </Body>
      <label className={css.labelEmail}>
        <Body className={css.bodyEmail}>Email</Body>
        <TextField
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
            setUser({ ...user, email: e.target.value });
          }}
        />
      </label>
      <label className={css.labelPassword}>
        <Body className={css.bodyPassword}>Contraseña</Body>
        <TextField
          name="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setUser({ ...user, password: e.target.value });
          }}
        />
        <Body className={css.bodyPassword}>Confirmar Contraseña</Body>
        <TextField name="passwordConfirm" type="password" />
      </label>
      <Body className={css.bodyPassword}>
        Ya tenes una cuenta?<a href="/login">Iniciar Sesión</a>
      </Body>
      <BlueButton type="submit">Acceder</BlueButton>
    </form>
  );
}
