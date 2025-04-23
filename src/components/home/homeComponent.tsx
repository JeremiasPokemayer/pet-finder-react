import * as css from "./home.module.css";
import { BlueButton, GreenButton } from "../../ui/buttons";
import { Title, Subtitle } from "../../ui/texts";
import { Link } from "react-router";
import { useUser } from "../../hooks/userHook";

export function HomeComponent() {
  const [user, setUser] = useUser();
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUser({ ...user, userLat: latitude, userLng: longitude });
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error);
        }
      );
    } else {
      console.error("La geolocalización no es compatible con este navegador.");
    }
  };

  return (
    <div className={css.root}>
      <img
        src="https://i.ibb.co/YBg0FSpJ/eric-ward-ISg37-AI2-A-s-unsplash.jpg"
        className={css.image}
      />
      <Title className={css.title}>Pet Finder App</Title>
      <Subtitle className={css.subtitle}>
        Encontrá y reportá mascotas perdidas cerca de tu ubicación
      </Subtitle>
      <BlueButton onClick={handleGetLocation}>
        Dar mi ubicación actual
      </BlueButton>
      <Link to="/auth">
        <GreenButton onClick={undefined}>
          ¿Cómo funciona Pet Finder?
        </GreenButton>
      </Link>
    </div>
  );
}
