import { useEffect, useState } from "react";
import { Title, Subtitle, Body } from "../../ui/texts";
import { TextField } from "../../ui/text-field";
import { usePet } from "../../hooks/useMascotas";
import * as css from "./mascotas.module.css";
import { useReport } from "../../hooks/useMascotas";
import { useUser } from "../../hooks/userHook";
import { useMascotasCerca, useSendReport } from "../../hooks/useMascotas";
import { GreenButton } from "../../ui/buttons";

function ReportOculto({ setFlag }) {
  const [pet] = usePet();
  const [report, setReport] = useReport();
  const { sendReport } = useSendReport();

  function onClick() {
    setFlag(true);
  }

  function onClick2() {
    sendReport(report, pet.objectID);
    setFlag(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setReport({
      ...report,
      [name]: value,
      userId: pet.reportId,
    });
  }

  return (
    <div className={css.reportHidden}>
      <div className={css.reportConfig}>
        <button className={css.buttonCerrar} onClick={onClick}>
          X
        </button>
        <div className={css.reportPetHidden}>
          <Subtitle className={css.subtitleReport}>
            Reportar info de <p className={null}>{pet.fullName}</p>
          </Subtitle>
          <div className={css.textFieldContainer}>
            <label>
              NOMBRE:
              <TextField name="reportName" onChange={handleChange} />
            </label>
            <label>
              TELÉFONO:
              <TextField name="reportPhone" onChange={handleChange} />
            </label>
            <label>
              ¿DÓNDE LO VISTE?
              <TextField name="location" onChange={handleChange} />
            </label>
          </div>
          <GreenButton onClick={onClick2}>Enviar información</GreenButton>
        </div>
      </div>
    </div>
  );
}

export function MascostasReportadas() {
  const [flag, setFlag] = useState(true);
  const [pet, setPet] = usePet();
  const [user] = useUser();
  const { mascotasCerca, pets, loading, error } = useMascotasCerca();

  const handleEditClick = (selectedPet) => {
    setPet(selectedPet);
  };

  useEffect(() => {
    if (user.userLat && user.userLng) {
      mascotasCerca(user.userLat, user.userLng);
    }
  }, [user.userLat, user.userLng]);

  if (loading) return <p>Cargando mascotas cercanas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Title className={css.titleLogin}>Mascotas perdidas cerca</Title>
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
                className={css.buttonReport}
                onClick={() => {
                  setFlag(false);
                  handleEditClick(pet);
                }}
              >
                Reportar
              </button>
            </div>
          ))
        ) : (
          <h2>No hay mascotas cerca</h2>
        )}
      </div>
      {!flag && <ReportOculto setFlag={setFlag} />}
    </div>
  );
}
