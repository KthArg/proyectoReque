import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import "./forms.css";

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        window.location.href = "/";
      } else {
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
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
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Iniciando..." : "Iniciar Sesión"}
      </button>
    </form>
  );
}