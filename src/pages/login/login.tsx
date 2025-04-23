import React from "react";
import { FormLogin } from "../../components/form/form";
import { Link } from "react-router";
import * as css from "./login.module.css";

export class Login extends React.Component<any, any> {
  render() {
    return (
      <div>
        <FormLogin />
      </div>
    );
  }
}
