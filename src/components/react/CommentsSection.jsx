import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth"; // Necesita saber si hay un usuario logueado
import "./forms.css"; // Reutiliza los estilos de los formularios

// El componente recibe el 'slug' del material como una "prop"
// para saber a qué página pertenece.
export default function CommentsSection({ materialSlug }) {
  const { session } = useAuth(); // Obtiene la sesión actual (si existe)
  const [comments, setComments] = useState([]); // Estado para guardar la lista de comentarios
  const [newComment, setNewComment] = useState(""); // Estado para el texto del nuevo comentario

  // Este 'useEffect' se ejecuta una vez cuando el componente carga en la pantalla.
  // Su trabajo es leer los comentarios guardados desde el localStorage.
  useEffect(() => {
    // 1. Lee el objeto gigante de TODOS los comentarios del localStorage.
    const allComments =
      JSON.parse(localStorage.getItem("ecoconecta_comments")) || {};
    // 2. Busca los comentarios específicos para ESTE materialSlug.
    // Si no hay, usa un array vacío.
    setComments(allComments[materialSlug] || []);
  }, [materialSlug]); // El [materialSlug] asegura que si la prop cambia, se vuelve a ejecutar.

  // Esta función se ejecuta cuando el usuario envía el formulario.
  const handleCommentSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    if (!newComment.trim()) return; // No permite comentarios vacíos

    // Crea el nuevo objeto de comentario
    const comment = {
      author: session.name, // El nombre viene de la sesión activa
      text: newComment,
      date: new Date().toLocaleDateString(),
    };

    // Actualiza el localStorage
    const allComments =
      JSON.parse(localStorage.getItem("ecoconecta_comments")) || {};
    const updatedCommentsForThisMaterial = [
      ...(allComments[materialSlug] || []),
      comment,
    ];
    allComments[materialSlug] = updatedCommentsForThisMaterial;
    localStorage.setItem("ecoconecta_comments", JSON.stringify(allComments));

    // Actualiza el estado de React para que la UI se refresque al instante
    setComments(updatedCommentsForThisMaterial);
    setNewComment(""); // Limpia el campo de texto
  };

  return (
    <div className="comments-section">
      <h3>Comentarios de la Comunidad</h3>
      <div className="comments-list">
        {/* Muestra un mensaje si no hay comentarios */}
        {comments.length === 0 && (
          <p>Aún no hay comentarios. ¡Sé el primero!</p>
        )}
        {/* Mapea y muestra cada comentario */}
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <strong>{comment.author}</strong>
            <small>{comment.date}</small>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>

      {/* El formulario para añadir un comentario solo se muestra si hay una sesión activa */}
      {session && (
        <form onSubmit={handleCommentSubmit} className="form-card">
          <h4>Añadir un comentario</h4>
          <div className="form-group">
            <textarea
              rows="4"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe tu comentario aquí..."
            ></textarea>
          </div>
          <button type="submit">Publicar</button>
        </form>
      )}
    </div>
  );
}