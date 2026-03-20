import React from 'react';
import { useTranslation } from 'react-i18next';
import "../styles/links.css";

export default function LinksWindow() {
    const { t } = useTranslation();
    return (
        <section className="links-section">
            <h2>{t("links.links")}</h2>
            <div className="icons-container">
                <div className="icon-map">
                    <a href="https://www.linkedin.com/in/alanjaviercanellas/"target="_blank">
                        <img className="contact-social" id="icon-size" src="src/assets/icons/linked.png" />
                    </a>
                    <p>Linkedin</p>
                </div>
                <div className="icon-map">
                    <a href="https://github.com/AlanAssange" target="_blank">
                        <img className="contact-social" id="icon-size" src="src/assets/icons/githublair.png" />
                    </a>
                    <p>Github</p>
                </div>
                <div className="icon-map">
                <a href="mailto:alanjc27@gmail.com" target="_blank">
                        <img className="contact-social" id="icon-size" src='src/assets/icons/gmailair.png' />
                    </a>
                    <p>Gmail</p>
                </div>
            </div>
        </section>
    )
}