import React from "react";
import claroServices from "../assets/images/claronames.png";
import zettelKasten from "../assets/images/zettwo.png";
import nakamaCollect from "../assets/images/nakamacollector.jpeg";
import diceDivider from "../assets/icons/dice.png";
import { useTranslation } from "react-i18next";
import "../styles/work.css";

export default function Work() {
  const { t } = useTranslation();
  return (
    <div className="portfolio-container">
      <div className="portfolio-banner">
        <p className="banner-text">
          {t("work.workOffers")}{" "}
          <a href="mailto:alan.codeworks@protonmail.com" className="banner-link">
            email!
          </a>
        </p>
      </div>
      <div className="portfolio-grid">
        <div className="tools-column">
          <h2 className="section-title">{t("work.tools")}</h2>
          <div className="badges-container">
            <span className="badge">Postman</span>
            <span className="badge">Wireshark</span>
            <span className="badge">Docker</span>
            <span className="badge">Swagger</span>
            <span className="badge">Git</span>
            <span className="badge">New Relic</span>
            <span className="badge">Sumologic</span>
            <span className="badge">Grafana</span>
            <span className="badge">Burpsuite</span>
          </div>
        </div>

        <div className="dev-column">
          <h2 className="section-title">{t("work.dev")}</h2>
          <div className="badges-container">
            <span className="badge">Python</span>
            <span className="badge">Bash</span>
            <span className="badge">TypeScript</span>
            <span className="badge">React</span>
            <span className="badge">SQL</span>
            <span className="badge">Elasticsearch</span>
            <span className="badge">MongoDB</span>
            <span className="badge">Redis</span>
          </div>
        </div>
      </div>

      <div className="about-separator">
        <span className="line"></span>
        <img
          src={diceDivider.src}
          alt="Divider icon"
          className="separator-icon"
        />
        <span className="line"></span>
      </div>

      <div className="work-section">
        <h2 className="section-title">{t("work.works")}</h2>
        <div className="project-container">
          <h3 className="project-subtitle">{t("work.claroServ")}</h3>
          <img
            src={claroServices.src}
            alt="Claro services"
            className="project-image"
          />
          <p className="project-description">{t("work.claroDesc")}</p>
          <div className="about-separator">
            <span className="line"></span>
            <img
              src={diceDivider.src}
              alt="Divider icon"
              className="separator-icon"
            />
            <span className="line"></span>
          </div>
          <h3 className="project-subtitle">NakamaCollector</h3>
          <img
            src={nakamaCollect.src}
            alt="Collection and trade figure-cards app"
            className="project-image"
          />
          <p className="project-description">{t("work.nakamaDesc")}</p>
          <div className="about-separator">
            <span className="line"></span>
            <img
              src={diceDivider.src}
              alt="Divider icon"
              className="separator-icon"
            />
            <span className="line"></span>
          </div>
          <h3 className="project-subtitle">{t("work.zett")}</h3>
          <img
            src={zettelKasten.src}
            alt="Zettelkasten Knowledge Graph"
            className="project-image"
          />
          <p className="project-description">
          {t("work.zettDesc")}{" "}
            <strong>
              <a
                href="https://github.com/AlanAssange/securityarchive"
                target="_blank"
              >
                {t("work.zettDescHere")}
              </a>
            </strong>
          </p>
          <div className="about-separator">
            <span className="line"></span>
            <img
              src={diceDivider.src}
              alt="Divider icon"
              className="separator-icon"
            />
            <span className="line"></span>
          </div>{" "}
          <h3 className="project-subtitle">{t("work.otherProjects")}</h3>
          <p className="project-description">
          {t("work.otherDesc")}{" "}
            <strong>
              <a href="https://github.com/AlanAssange" target="_blank">
                GitHub
              </a>
            </strong>{" "}
            {t("work.otherDescTwo")}
          </p>
        </div>
      </div>
    </div>
  );
}
