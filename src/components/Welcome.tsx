import React from 'react';
import { useTranslation } from 'react-i18next';
import bonfire from "../assets/images/bonfire.gif";
import "../styles/welcome.css";

export default function WelcomeWindow() {
  const { t } = useTranslation();

  return (
    <div className="welcome-container">
      <h2 className="welcome-title">
        {t('welcome.welcome')}
      </h2>
      
      <div className="welcome-text-wrapper">
        <p className="welcome-instruction">
          {t('welcome.doubleClick')}
        </p>

        <p className="welcome-instruction">
          {t('welcome.singleClick')}
        </p>
      </div>

      <div className="welcome-image-container">
        <img 
          src={bonfire.src} 
          className="welcome-gif" 
          alt="Bonfire" 
        />
      </div>
    </div>
  );
}