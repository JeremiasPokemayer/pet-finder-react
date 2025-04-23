import { useState, useRef, useMemo, useEffect } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
import { GreenButton, BlueButton, RedButton } from "../../ui/buttons";
import { Title, Body } from "../../ui/texts";
import { useUser } from "../../hooks/userHook";
import { usePet, useUpdatePet, usePetFind } from "../../hooks/useMascotas";
import { TextField } from "../../ui/text-field";
import * as css from "./editreport.module.css";
import { useDropzone } from "react-dropzone";

export function EditReportPets() {
  const [user] = useUser();
  const [pet, setPet] = usePet();
  const [imagePreview, setImagePreview] = useState(null);
  const [isPetLoaded, setIsPetLoaded] = useState(false);
  const mapRef = useRef(null);
  const { updatePet } = useUpdatePet();
  const { petFind, petDelete } = usePetFind();

  const onClick = () => {
    petFind(pet.objectID);
  };

  const onClick2 = () => {
    petDelete(pet.objectID);
  };

  useEffect(() => {
    const savedPet = localStorage.getItem("selectedPet");
    if (savedPet) {
      setPet(JSON.parse(savedPet));
      localStorage.removeItem("selectedPet");
    }
    setIsPetLoaded(true);
  }, []);

  const Map = useMemo(
    () =>
      ReactMapboxGl({
        accessToken: process.env.MAP_BOX_TOKEN,
        attributionControl: false,
      }),
    []
  );

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
      const imageUrl = reader.result.toString();
      setPet((prevPet) => ({
        ...prevPet,
        imageUrlData: imageUrl,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleMapLoad = (map) => {
    const geocoder = new MapboxGeocoder({
      accessToken: process.env.MAP_BOX_TOKEN,
      mapboxgl: mapboxgl,
      marker: true,
      placeholder: pet.location || "Editar ubicación",
    });

    map.addControl(geocoder);

    geocoder.on("result", (e) => {
      setPet((prevPet) => ({
        ...prevPet,
        petLng: e.result.center[0],
        petLat: e.result.center[1],
        location: e.result.place_name,
      }));
      map.flyTo({
        center: [e.result.center[0], e.result.center[1]],
        zoom: 14,
      });
    });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setPet((prevPet) => ({
      ...prevPet,
      fullName: value,
    }));
  };

  const handleClick = async () => {
    updatePet(pet, user.userId);
  };

  if (!pet) return <p>Cargando reporte...</p>;

  return (
    <div className={css.container}>
      <Title className={css.title}>Editar reporte de mascota</Title>
      <label className={css.label}>
        <Body className={null}>NOMBRE</Body>
        <TextField
          placeholder={pet.fullName}
          name="name"
          onChange={handleChange}
        />
        <div className={css.dropzone} {...getRootProps()}>
          <input {...getInputProps()} />
          <Body className={css.body}>
            Arrastra y suelta algunos archivos aquí, o haz clic para seleccionar
            archivos
          </Body>
        </div>
      </label>
      {imagePreview || pet.imageUrl ? (
        <div style={{ marginTop: "20px" }}>
          <img
            src={imagePreview || pet.imageUrl}
            alt="Vista previa"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      ) : null}
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        className={css.map}
        onStyleLoad={handleMapLoad}
        ref={mapRef}
        center={[user.userLng, user.userLat]}
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[-34.5596292, -58.7066194]} />
        </Layer>
      </Map>
      <div className={css.buttonContainer}>
        <BlueButton type="button" onClick={handleClick}>
          Guardar
        </BlueButton>
        <GreenButton onClick={onClick}>Reportar como encontrado</GreenButton>
        <RedButton onClick={onClick2}>Eliminar reporte</RedButton>
      </div>
    </div>
  );
}
