import React, { useState, useEffect } from "react";
import "../styles/end.css";
import "../i18n/i18n";
import { useTranslation } from 'react-i18next';

export default function End() {
  const [isShuttingDown, setIsShuttingDown] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang && i18n.language !== savedLang) {
      i18n.changeLanguage(savedLang);
    }
    
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
            <h1>{t("end.shutDown")}</h1>
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="modal-content thank-you">
            <h1>{t("end.greetings")}</h1>
            <p style={{ whiteSpace: "pre-line" }} className="paragraph-text">
            {t("end.greetingsPar")}
            </p>
            <p className="signature-text">Alan Javier Cañellas</p>
            <p className="quote-text">
            {t("end.shortRest")} <a className="hereFormat" href="/">
            {t("end.shortHere")} 
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}