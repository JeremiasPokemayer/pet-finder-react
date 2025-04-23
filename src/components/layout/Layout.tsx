import { Outlet } from "react-router-dom";
import * as css from "./layout.module.css";
import { Header } from "../header/header";

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export { Layout };
