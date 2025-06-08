import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

// Este componente envuelve a otros componentes para protegerlos
export default function AuthGuard({ children }) {
  const { session } = useAuth();

  useEffect(() => {
    // Si la sesión ha sido verificada y es nula (no hay usuario), redirigimos.
    if (session === null) {
      window.location.href = "/login";
    }
  }, [session]);

  // Si hay una sesión, muestra el contenido protegido.
  if (session) {
    return <>{children}</>;
  }

  // Mientras se verifica la sesión (session es undefined), no muestra nada.
  return null;
}