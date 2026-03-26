import React from "react";
import claroServices from "../assets/images/claroservices.png";
import zettelKasten from "../assets/images/zettwo.png";
import nakamaCollect from "../assets/images/nakamacollector.jpeg";
import "../styles/work.css";

export default function Work() {
  return (
    <div className="portfolio-container">
      <div className="portfolio-banner">
        <p className="banner-text">
          Accepting work offers via{" "}
          <a href="mailto:alanjc27@gmail.com" className="banner-link">
            email!
          </a>
        </p>
        <p className="banner-subtext">I do all what you see above.</p>
      </div>
      <div className="portfolio-grid">
        <div className="tools-column">
          <h2 className="section-title">TOOLS</h2>
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
          <h2 className="section-title">DEVELOPMENT</h2>
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

      <hr className="portfolio-divider" />

      <div className="work-section">
        <h2 className="section-title">WORK</h2>
        <div className="project-container">
          <h3 className="project-subtitle">CLARO SERVICES</h3>
          <img
            src={claroServices.src}
            alt="Claro services"
            className="project-image"
          />
          <p className="project-description">
            Working with Claro since 2022 as a Backend Developer for their core
            digital system. I specialize in the payments infrastructure for
            Claro Video, Claro Musica, and Claro Drive, ensuring secure and
            scalable transactions for millions of users.
          </p>

          <hr className="portfolio-divider" />

          <h3 className="project-subtitle">NakamaCollector</h3>
          <p className="project-description">
            Currently building a secure social marketplace for anime
            enthusiasts. It’s designed to bridge the gap between collectors and
            the market, providing a dedicated space to showcase collections and
            build community. Users can manage new contacts, safely trade
            individual pieces, or scale their business by sourcing from verified
            suppliers.
          </p>

          <img
            src={nakamaCollect.src}
            alt="Collection and trade figure-cards app"
            className="project-image"
          />

          <hr className="portfolio-divider" />

          <h3 className="project-subtitle">MY ZETTELKASTENS!</h3>
          <img
            src={zettelKasten.src}
            alt="Zettelkasten Knowledge Graph"
            className="project-image"
          />
          <p className="project-description">
            This is where the magic of my own knowledge happens! I maintain
            constantly these digital brains so i put them here as my projects.
            You can watch one of them clicking <strong><a href="https://github.com/AlanAssange/securityarchive" target="_blank" >here</a></strong>
          </p>

          <hr className="portfolio-divider" />
          <h3 className="project-subtitle">OTHER PROJECTS:</h3>
          <p className="project-description">
            Check out my <strong><a href="https://github.com/AlanAssange" target="_blank">GitHub</a></strong> for additional projects (see this code as well!), ranging from early
            professional work for local companies to personal coding experiments!.
          </p>
        </div>
      </div>
    </div>
  );
}
