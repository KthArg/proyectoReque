import React, { useState } from "react";
import "./SearchBar.css"; // Importaremos una hoja de estilos CSS

export default function SearchBar({ materials }) {
  const [query, setQuery] = useState("");

  const filteredMaterials = materials.filter((material) => {
    if (!query) return false;
    return material.data.title.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="search-container">
      <input
        type="search"
        className="search-input"
        placeholder="Busca un material (ej. botella, teclado...)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <ul className="results-list">
          {filteredMaterials.length > 0 ? (
            filteredMaterials.map((material) => (
              <li key={material.slug} className="result-item">
                <a href={`/materiales/${material.slug}`}>
                  {material.data.title}
                </a>
              </li>
            ))
          ) : (
            <li className="result-item no-results">
              No se encontraron resultados.
            </li>
          )}
        </ul>
      )}
    </div>
  );
}