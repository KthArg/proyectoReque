import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import "./forms.css"; // Usaremos un CSS compartido para los formularios

export default function RegisterForm() {
  const { register } = useAuth(); // Usa la función de registro del hook
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const success = register(name, email, password);
    if (success) {
      // Redirigir a la página de login si el registro fue exitoso
      window.location.href = "/login";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <div className="form-group">
        <label htmlFor="name">Nombre Completo:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Crear Cuenta</button>
    </form>
  );
}