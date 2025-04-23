import { useState, SetStateAction } from "react";
import { useAtom } from "jotai";
import { petsArrayAtom, petAtom, reportAtom } from "../atoms";

const API_BASE_URL = process.env.API_BASE_URL;

type Pet = {
  fullName: null;
  location: null;
  petLat: null;
  petLng: null;
  imageUrlData: string | null;
  imageUrl?: string;
  objectID?: string;
  reportId?: string;
};

export const usePet = (): [Pet, React.Dispatch<SetStateAction<Pet>>] => {
  return useAtom(petAtom);
};

export const useReport = () => {
  return useAtom(reportAtom);
};

export const useSetPet = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const setPetData = async (dataPets, userId) => {
    const { fullName, location, petLat, petLng, imageUrlData } = dataPets;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/setpets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          location,
          petLat,
          petLng,
          imageUrlData,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al setear la mascota");
      }

      const dataPet = await response.json();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { setPetData, loading, error };
};

export const useUpdatePet = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updatePet = async (dataPets, userId) => {
    const { fullName, location, _geoloc, imageUrl, objectID } = dataPets;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/update-pet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          objectID,
          fullName,
          location,
          petLat: _geoloc.lat,
          petLng: _geoloc.lng,
          imageUrlData: imageUrl,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al setear la mascota");
      }

      const dataPet = await response.json();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { updatePet, loading, error };
};

export const useMascotasCerca = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pets, setPets] = useAtom(petsArrayAtom);

  const mascotasCerca = async (latitud, longitud) => {
    setLoading(true);
    setError(null);
    const lat = parseFloat(latitud);
    const lng = parseFloat(longitud);

    try {
      const response = await fetch(
        `${API_BASE_URL}/pets-cerca-de?lat=${lat}&lng=${lng}`
      );

      if (!response.ok) {
        throw new Error("Error al obtener las mascotas cercanas");
      }

      const dataPets = await response.json();
      setPets(dataPets);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { mascotasCerca, pets, loading, error };
};

export const useMisMascotas = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pets, setPets] = useAtom(petsArrayAtom);

  const misMascotasReports = async (userId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/mispets`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error("Error al obtener las mascotas cercanas");
      }

      const dataPets = await response.json();
      setPets(dataPets);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { misMascotasReports, pets, loading, error };
};

export const useSendReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendReport = async (dataReport, objectID) => {
    const { reportName, reportPhone, location, userId } = dataReport;
    setLoading(true);
    setError(null);

    const response = await fetch(`${API_BASE_URL}/user/${userId}`);
    const user = await response.json();
    const reportEmail = user.email;

    try {
      const response = await fetch(`${API_BASE_URL}/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          objectID,
          reportName,
          reportPhone,
          location,
          reportEmail,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al obtener las mascotas cercanas");
      }

      const dataPets = await response.json();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { sendReport, loading, error };
};

export const usePetFind = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const petFind = async (objectID) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/petfind`, {
        method: "patch",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          objectID,
        }),
      });

      if (!res.ok) {
        throw new Error("Error al obtener las mascotas cercanas");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const petDelete = async (objectID) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/pet/${objectID}`, {
        method: "delete",
      });

      if (!response.ok) {
        throw new Error("Error al obtener las mascotas cercanas");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { petFind, petDelete, loading, error };
};
