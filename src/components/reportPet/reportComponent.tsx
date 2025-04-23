import { useState, useRef, useEffect, useMemo } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
import { GreenButton, BlackButton } from "../../ui/buttons";
import { Title, Body } from "../../ui/texts";
import { useUser } from "../../hooks/userHook";
import { usePet } from "../../hooks/useMascotas";
import { useSetPet } from "../../hooks/useMascotas";
import { TextField } from "../../ui/text-field";
import * as css from "./report.module.css";
import { useDropzone } from "react-dropzone";

export function ReportPets() {
  const [user, setUser] = useUser();
  const [pet, setPet] = usePet();
  const [imagePreview, setImagePreview] = useState(null);
  const mapRef = useRef(null);
  const { setPetData } = useSetPet();

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
      placeholder: "Buscar ubicación",
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
    if (!user?.userId) {
      alert("No se ha cargado el usuario aún.");
      return;
    }
    setPetData(pet, user.userId);
  };

  return (
    <div className={css.container}>
      <Title className={css.title}>Reportar mascota</Title>
      <Body className={css.body}>
        Ingresá la siguiente información para realizar el reporte de la mascota
      </Body>
      <label className={css.label}>
        <Body className={null}>NOMBRE</Body>
        <TextField name="name" onChange={handleChange} />
        <div className={css.dropzone} {...getRootProps()}>
          <input {...getInputProps()} />
          <Body className={css.body}>
            Arrastra y suelta algunos archivos aquí, o haz clic para seleccionar
            archivos
          </Body>
        </div>
      </label>
      {imagePreview && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={imagePreview}
            alt="Vista previa"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        className={css.map}
        onStyleLoad={handleMapLoad}
        ref={mapRef}
        center={[-64.9623, -38.4161]}
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[-34.5596292, -58.7066194]} />
        </Layer>
      </Map>
      <div className={css.buttonContainer}>
        <GreenButton type="button" onClick={handleClick}>
          Enviar
        </GreenButton>
        <BlackButton>Cancelar</BlackButton>
      </div>
    </div>
  );
}
