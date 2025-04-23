import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppRoutes } from "./router";

const root = createRoot(document.getElementById("app"));
root.render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);
