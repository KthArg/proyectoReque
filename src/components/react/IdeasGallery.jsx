import React, { useState, useEffect } from "react";

export default function IdeasGallery() {
  const [ideas, setIdeas] = useState([]);

  // Al cargar el componente, leemos las ideas del localStorage
  useEffect(() => {
    const savedIdeas =
      JSON.parse(localStorage.getItem("ecoconecta_ideas")) || [];
    // Las ordenamos para que las más nuevas aparezcan primero
    setIdeas(savedIdeas.reverse());
  }, []);

  if (ideas.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h3>Aún no hay ideas en la galería.</h3>
        <p>
          ¿Por qué no eres el primero en{" "}
          <a href="/contribuir">publicar una idea</a>?
        </p>
      </div>
    );
  }

  return (
    <div className="ideas-grid">
      {ideas.map((idea) => (
        <div key={idea.id} className="idea-card">
          <h2>{idea.title}</h2>
          <p className="idea-description">{idea.description}</p>
          <div className="idea-meta">
            <span>
              por <strong>{idea.author}</strong>
            </span>
            <span>{idea.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
}