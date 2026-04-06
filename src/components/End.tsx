import React, { useState, useEffect } from "react";
import "../styles/end.css";
import i18next from "../i18n/i18n";
import { useTranslation } from 'react-i18next';

export default function End() {
  const [isShuttingDown, setIsShuttingDown] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const init = async () => {
      const lang = localStorage.getItem("lang") || "en";
  
      if (i18next.language !== lang) {
        await i18next.changeLanguage(lang);
      }
  
      setIsReady(true);
  
      timer = setTimeout(() => {
        setIsShuttingDown(false);
      }, 2000);
    };
  
    init();
  
    return () => {
      if (timer) clearTimeout(timer);
    };
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