import { useEffect } from "react";
import { Title, Subtitle, Body } from "../../ui/texts";
import { BlueButton } from "../../ui/buttons";
import { useNavigate } from "react-router-dom";
import * as css from "./misMascotas.module.css";
import { useUser } from "../../hooks/userHook";
import { useMisMascotas, usePet } from "../../hooks/useMascotas";

export function MisMascotasReportadas() {
  const [user] = useUser();
  const [pet, setPet] = usePet();
  const navigate = useNavigate();
  const { misMascotasReports, pets, loading, error } = useMisMascotas();

  useEffect(() => {
    if (user?.userId) {
      misMascotasReports(user.userId);
    }
  }, [user?.userId]);

  if (loading) return <p>Cargando mascotas cercanas...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleEditClick = (selectedPet) => {
    localStorage.setItem("selectedPet", JSON.stringify(selectedPet));
    navigate("/editreport");
  };
  return (
    <div>
      <Title className={css.titleLogin}>Mascotas reportadas</Title>
      <div className={css.petsContainer}>
        {pets.length > 0 ? (
          pets.map((pet, index) => (
            <div className={css.containerReport} key={index}>
              <img
                src={pet.imageUrl}
                alt={pet.fullName}
                className={css.imageReport}
              />
              <div className={css.containerText}>
                <Subtitle className={css.subtitleReport}>
                  {pet.fullName}
                </Subtitle>
                <Body className={css.bodyReport}>{pet.location}</Body>
              </div>
              <button
                className={css.editButton}
                onClick={() => handleEditClick(pet)}
              >
                Editar
              </button>
            </div>
          ))
        ) : (
          <div className={css.containerHide}>
            <Subtitle className={null}>No hay mascotas reportadas</Subtitle>
            <img src="https://i.ibb.co/TxqBnyTz/4560004.jpg" />
            <BlueButton>Publicar reporte</BlueButton>
          </div>
        )}
      </div>
    </div>
  );
}
