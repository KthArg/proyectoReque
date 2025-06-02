import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const STORAGE_KEY_USERS = "users";
const STORAGE_KEY_SESSION = "currentUser";

// Usuario admin fijo
const ADMIN_EMAIL = "admin@admin.com";
const ADMIN_PASSWORD = "admin123";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email.trim() || !password.trim()) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    // Validar admin
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = {
        id: "admin",
        name: "Administrador",
        email: ADMIN_EMAIL,
        role: "admin",
      };
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(adminUser));
      navigate("/home");
      return;
    }

    // Validar usuario normal
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS)) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Email o contraseña incorrectos.");
      return;
    }

    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(user));
    navigate("/Home");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="username"
            required
          />
        </label>

        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
        </label>

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Ingresar</button>

        {/* Botón para ir a registro */}
        <button
          type="button"
          className="register-button"
          onClick={() => navigate("/register")}
          style={{ marginTop: "15px" }}
        >
          Registrarse como cliente
        </button>
      </form>
    </div>
  );
};

export default Login;
