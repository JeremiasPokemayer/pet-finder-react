import { useAtom } from "jotai";
import { userAtom } from "../atoms";
import { useState } from "react";
import { SetStateAction } from "react";

const API_BASE_URL = process.env.API_BASE_URL;

type User = {
  userId: any;
  fullName: any;
  email: any;
  location: any;
  userLat: any;
  userLng: any;
  password: any;
  token: any;
};

export const useUser = (): [User, React.Dispatch<SetStateAction<User>>] => {
  return useAtom(userAtom);
};

export const updateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async (userData) => {
    setLoading(true);
    setError(null);
    const { email, fullName, userId, location, userLat, userLng } = userData;

    try {
      const response = await fetch(`${API_BASE_URL}/update-name`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          fullName,
          userId,
          location,
          userLat,
          userLng,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la autenticación");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};

export const updatePass = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async (userData) => {
    setLoading(true);
    setError(null);
    const { userId, email, password } = userData;

    try {
      const response = await fetch(`${API_BASE_URL}/update-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en el cambio de contraseña");
      }

      const data = await response.json();

      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};
