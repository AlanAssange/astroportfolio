import React, { useState, useEffect } from "react";
import "../styles/end.css";

export default function End() {
  const [isShuttingDown, setIsShuttingDown] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShuttingDown(false); 
    }, 2000);

    return () => clearTimeout(timer);
  }, []); 

  return (
    <div className="end-container">
      <div className="dark-overlay"></div>
      <div className="gothic-modal">
        {isShuttingDown ? (
          <div className="modal-content shutting-down">
            <h1>Apagando el equipo...</h1>
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="modal-content thank-you">
            <h1>Gracias!</h1>
            <p className="paragraph-text">
              Estoy finalizando este proyecto el 5 de Abril de 2026, con recuerdos de haberlo iniciado en Noviembre 2025. Me llena de orgullo ver el resultado ya que dar un punto final sobre los tiempos que corren requiere ir mas allá de lo fugaz. Y considero que allí se encuentran los verdaderos desafíos. <br/><br/>Te agradezco por haber llegado hasta acá. Un fuerte abrazo si lo necesitás, y si no, también.
            </p>
            <p className="signature-text">Alan Javier Canellas</p>
            <p className="quote-text">
              Si tenés ganas de volver a bootear el OS, hace click <a href="/">
                acá 
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}