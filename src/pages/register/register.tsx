import React from "react";
import { FormRegister } from "../../components/form/form";
import { Link } from "react-router";
import * as css from "./login.module.css";

export class Register extends React.Component<any, any> {
  render() {
    return (
      <div>
        <FormRegister />
      </div>
    );
  }
}
