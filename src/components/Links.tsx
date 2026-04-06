import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/links.css";

export default function LinksWindow() {
  const { t } = useTranslation();

  return (
    <section className="links-section">
      <h2>{t("links.links")}</h2>

      <div className="links-container">
        <a
          href="https://www.linkedin.com/in/alanjaviercanellas/"
          target="_blank"
          rel="noopener noreferrer"
          className="link-card"
        >
          <img
            className="contact-social"
            src="src/assets/icons/linked.png"
            alt="LinkedIn"
          />
          <span>Linkedin</span>
        </a>

        <a
          href="https://github.com/AlanAssange"
          target="_blank"
          rel="noopener noreferrer"
          className="link-card"
        >
          <img
            className="contact-social"
            src="src/assets/icons/githublair.png"
            alt="Github"
          />
          <span>Github</span>
        </a>

        <a
          href="mailto:alan.codeworks@protonmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="link-card"
        >
          <img
            className="contact-social"
            src="src/assets/icons/gmailair.png"
            alt="Gmail"
          />
          <span>Gmail</span>
        </a>
      </div>
    </section>
  );
}
