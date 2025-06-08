import React from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { session, logout } = useAuth();

  return (
    <header>
      <nav>
        <a href="/" className="logo">
          EcoConecta ♻️
        </a>

        {/* Agrupamos todos los enlaces en un solo contenedor para un mejor control */}
        <div className="nav-menu">
          <a href="/#search">Buscar</a>
          <a href="/centros">Centros de Acopio</a>
          <a href="/ideas">Galería de Ideas</a>
          {session && <a href="/contribuir">Publicar Idea</a>}
        </div>

        <div className="auth-links">
          {session ? (
            <>
              <span>Bienvenido, {session.name}</span>
              <button onClick={logout} className="logout-button">
                Salir
              </button>
            </>
          ) : (
            <>
              <a href="/login">Iniciar Sesión</a>
              <a href="/register" className="button">
                Registrarse
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}