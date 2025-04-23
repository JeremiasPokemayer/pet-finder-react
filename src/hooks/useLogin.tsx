import { useState } from "react";
import { useUser } from "./userHook";

const API_BASE_URL = process.env.API_BASE_URL;

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useUser();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Error en la autenticación");
      }

      const data = await response.json();
      const res = await fetch(`${API_BASE_URL}/signin`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify({ email, password }),
      });
      const userData = await res.json();
      setUser({
        ...user,
        token: data.token,
        userId: userData.user.id,
        fullName: userData.user.fullName,
        location: userData.user.location,
      });
      return userData;
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
