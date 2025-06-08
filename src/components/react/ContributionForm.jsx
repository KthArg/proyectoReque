import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import "./forms.css";

export default function ContributionForm() {
  const { session } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }
    setIsLoading(true);

    setTimeout(() => {
      const newIdea = {
        id: Date.now(),
        title,
        description,
        author: session.name,
        date: new Date().toLocaleDateString(),
      };

      const existingIdeas =
        JSON.parse(localStorage.getItem("ecoconecta_ideas")) || [];
      const updatedIdeas = [...existingIdeas, newIdea];
      localStorage.setItem("ecoconecta_ideas", JSON.stringify(updatedIdeas));

      toast.success("¡Tu idea ha sido publicada con éxito!");
      window.location.href = "/ideas";
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <div className="form-group">
        <label htmlFor="title">Título de tu Idea:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Describe tu idea:</label>
        <textarea
          id="description"
          rows="6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Publicando..." : "Publicar Idea"}
      </button>
    </form>
  );
}