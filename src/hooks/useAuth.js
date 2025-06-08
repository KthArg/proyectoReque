import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// Este hook manejará toda la lógica de sesión y usuarios
export function useAuth() {
  const [session, setSession] = useState(undefined); // Inicia como undefined para manejar el estado de carga

  // Al cargar, revisa si hay una sesión guardada en localStorage
  useEffect(() => {
    const savedSession = localStorage.getItem("ecoconecta_session");
    if (savedSession) {
      setSession(JSON.parse(savedSession));
    } else {
      setSession(null); // Si no hay sesión, se establece explícitamente a null
    }
  }, []);

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("ecoconecta_users")) || [];
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      toast.error("Este correo electrónico ya está registrado.");
      return false;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("ecoconecta_users", JSON.stringify(users));
    toast.success("¡Registro exitoso! Ahora puedes iniciar sesión.");
    return true;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("ecoconecta_users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const currentSession = { name: user.name, email: user.email };
      localStorage.setItem(
        "ecoconecta_session",
        JSON.stringify(currentSession)
      );
      toast.success(`¡Bienvenido de vuelta, ${user.name}!`);
      setSession(currentSession);
      return true;
    }

    toast.error("Email o contraseña incorrectos.");
    return false;
  };

  const logout = () => {
    localStorage.removeItem("ecoconecta_session");
    setSession(null);
    toast("Has cerrado sesión.");
    window.location.href = "/";
  };

  return { session, register, login, logout };
}