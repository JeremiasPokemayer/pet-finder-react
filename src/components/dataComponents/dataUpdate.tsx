import React, { useState, useEffect, use } from "react";
import { BlueButton } from "../../ui/buttons";
import { TextField } from "../../ui/text-field";
import { Body, Title } from "../../ui/texts";
import { useUser } from "../../hooks/userHook";
import { useNavigate } from "react-router-dom";
import { updateUser, updatePass } from "../../hooks/userHook";
import { Link } from "react-router";
import * as css from "./dataUpdate.module.css";

const API_BASE_URL = process.env.API_BASE_URL;

export function DataComponent() {
  const [user] = useUser();
  const navigate = useNavigate();
  const handleClickData = async () => {
    navigate("/update");
  };

  const handleClickPass = () => {
    navigate("/password");
  };
  return (
    <form className={css.formAuth}>
      <Title className={null}>Mis Datos</Title>
      <BlueButton onClick={handleClickData}>
        Modificar datos personales
      </BlueButton>
      <BlueButton onClick={handleClickPass}>Modificar contraseña</BlueButton>
      <Body className={null}>{user.email}</Body>
    </form>
  );
}

export function UpdateData() {
  const [user, setUser] = useUser();
  const { update } = updateUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const location = e.target.elements.location.value;
    const updatedUser = { ...user, fullName: name, location };
    setUser(updatedUser);
    update(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <form className={css.formAuth} onSubmit={handleSubmit}>
      <Title className={null}>Datos personales</Title>
      <label className={css.label}>
        <Body className={css.body}>NOMBRE</Body>
        <TextField name="name" placeholder={user.fullName} />
      </label>
      <label className={css.label}>
        <Body className={css.body}>LOCALIDAD</Body>
        <TextField name="location" placeholder={user.location} />
      </label>
      <BlueButton>Guardar</BlueButton>
    </form>
  );
}

export function UpdatePass() {
  const [user, setUser] = useUser();
  const { update } = updatePass();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = e.target.elements.password.value;
    const passwordConfirm = e.target.elements.passwordConfirm.value;
    if (password !== passwordConfirm) {
      alert("Las contraseñas no coinciden");
      return;
    } else {
      const updatedPass = { ...user, password: password };
      setUser(updatedPass);
      update(updatedPass);
      localStorage.setItem("user", JSON.stringify(updatedPass));
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <form className={css.formAuth} onSubmit={handleSubmit}>
      <Title className={null}>Contraseña</Title>
      <label className={css.label}>
        <Body className={css.body}>CONTRASEÑA</Body>
        <TextField name="password" placeholder="********" type="password" />
      </label>
      <label className={css.label}>
        <Body className={css.body}>CONFIRMAR CONTRASEÑA</Body>
        <TextField
          name="passwordConfirm"
          placeholder="********"
          type="password"
        />
      </label>
      <BlueButton>Guardar</BlueButton>
    </form>
  );
}
