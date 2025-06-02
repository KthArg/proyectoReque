// src/Home.jsx
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-title">
      <h1>EcoConect</h1>
      <h2>Aplicación de reciclaje inteligente</h2>
    </div>
  );
};

export default Home;