import React, { useState, useEffect } from "react";

// Los iconos SVG se mantienen igual
const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

export default function ThemeToggle() {
  // 1. Inicializa el estado sin acceder a localStorage.
  //    Podemos usar 'undefined' para saber que aún no se ha determinado.
  const [theme, setTheme] = useState(undefined);

  // 2. El primer useEffect se encarga de leer el estado inicial
  //    SOLO cuando el componente se monta en el navegador.
  useEffect(() => {
    const root = document.documentElement;
    const initialTheme = root.classList.contains("dark") ? "dark" : "light";
    setTheme(initialTheme);
  }, []);

  // 3. El segundo useEffect reacciona a los cambios de estado
  //    para actualizar la clase del HTML y el localStorage.
  useEffect(() => {
    // No hagas nada si el tema aún no se ha determinado.
    if (theme === undefined) return;

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Ahora es seguro acceder a localStorage.
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Evita renderizar el botón hasta que el tema inicial se haya determinado
  // para prevenir un "parpadeo" del icono incorrecto.
  if (theme === undefined) {
    return null;
  }

  return (
    <button onClick={handleClick} className="theme-toggle" aria-label="Cambiar tema">
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}