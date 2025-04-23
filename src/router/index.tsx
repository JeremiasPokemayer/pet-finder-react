import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/login/login";
import { Home } from "../pages/home/home";
import { Layout } from "../components/layout/Layout";
import { EditReportPets } from "../components/editReport/editReport";
import { Auth } from "../pages/auth/auth";
import { Register } from "../pages/register/register";
import { Mascotas } from "../pages/mascotas/mascotas";
import { Report } from "../pages/report/report";
import { Datos } from "../pages/datos/datos";
import { MisMascotas } from "../pages/myPetReports/mypets";
import {
  UpdateData,
  UpdatePass,
} from "../components/dataComponents/dataUpdate";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="auth" element={<Auth />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="mascotas" element={<Mascotas />}></Route>
        <Route path="report" element={<Report />}></Route>
        <Route path="datos" element={<Datos />}></Route>
        <Route path="update" element={<UpdateData />}></Route>
        <Route path="password" element={<UpdatePass />}></Route>
        <Route path="mismascotas" element={<MisMascotas />}></Route>
        <Route path="editreport" element={<EditReportPets />}></Route>
      </Route>
    </Routes>
  );
}

export { AppRoutes };
