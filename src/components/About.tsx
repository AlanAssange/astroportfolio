import React from "react";
import { useTranslation } from 'react-i18next';
import profileRefactor from "../assets/images/profilerefactor.png"
import Divider from "./ui/Divider";
import "../styles/about.css";

export default function AboutWindow() {

  const { t } = useTranslation();

  return (
    <div className="about-window">
      <div className="about-header">
        <img
          src={profileRefactor.src}
          alt="Profile picture"
          className="about-avatar"
        />
        <div className="about-flex-header">
          <h2 className="about-name">{t('aboutHeader.name')}</h2>
          <div className="about-header-columns">
            <div className="about-meta">
              <p><strong className="about-titles">{t('aboutHeader.class')} </strong>{t('aboutHeader.className')}</p>
              <p><strong className="about-titles">{t('aboutHeader.subclass')} </strong>{t('aboutHeader.subclassName')}</p>
              <p><strong className="about-titles">{t('aboutHeader.level')} </strong> {t('aboutHeader.levelNumber')}</p>
              <p><strong className="about-titles">{t('aboutHeader.location')}</strong> {t('aboutHeader.locationContent')}</p>
            </div>
            <div className="about-overview">
              <h3 className="about-titles" id="overview-title">{t('aboutHeader.characterOverview')}</h3>
              <p id="overview-title" style={{ whiteSpace: "pre-line" }}>{t('aboutHeader.characterOverviewDesc')}</p>
            </div>
          </div>
        </div>
      </div>
      <Divider/>
      <div className="about-content">
        <h2>{t('aboutData.aboutTitle')}</h2>
        <p>{t('aboutData.aboutDesc')}</p>
        <p>{t('aboutData.iPoints')}</p>

        <ul>
          <li>
            {t('aboutData.swordOne')}
          </li>
          <li>
            {t('aboutData.swordTwo')}
          </li>
          <li>{t('aboutData.swordThreeMaintain')} <a href='https://es.wikipedia.org/wiki/Zettelkasten' target="_blank" className="link">{t('aboutData.swordThreeZett')}</a> {t('aboutData.swordThreeContinue')}</li>
        </ul>

        <Divider/>

        <h2>{t('aboutData.educationTitle')}</h2>
        <blockquote className="quote">
          <p>{t('aboutData.firstTitle')}</p>
          <p>{t('aboutData.firstUni')}</p>
        </blockquote>

        <blockquote className="quote">
          <p>{t('aboutData.secondTitle')}</p>
          <p>{t('aboutData.secondUni')}</p>
        </blockquote>

        <blockquote className="quote">
          <p>{t('aboutData.thirdTitle')}</p>
          <p>{t('aboutData.thirdUni')}</p>
        </blockquote>

        <Divider/>

        <h2>{t('aboutData.languageTitle')}</h2>

        <blockquote className="quote">
          <p>{t('aboutData.languageOne')}</p>
          <p>{t('aboutData.languageTwo')}</p>
          <p>{t('aboutData.languageThree')}</p>
        </blockquote>
      </div>
    </div>
  );
}
