import React from "react";
import claroServices from "../assets/images/claronames.png";
import zettelKasten from "../assets/images/zettwo.png";
import nakamaCollect from "../assets/images/nakamacollector.jpeg";
import ProjectCard from "./ui/ProjectCard";
import BadgeList from "./ui/BadgeList";
import { useTranslation } from "react-i18next";
import "../styles/work.css";


const TOOLS = ["Postman", "Wireshark", "Docker", "Swagger", "Git", "New Relic", "Sumologic", "Grafana", "Burpsuite"];
const LANGUAGES = ["Python", "Bash", "TypeScript", "React", "SQL", "Elasticsearch", "MongoDB", "Redis"];

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
          <BadgeList items={TOOLS} />
        </div>

        <div className="dev-column">
          <h2 className="section-title">{t("work.dev")}</h2>
          <BadgeList items={LANGUAGES} />
        </div>
      </div>

      <div className="work-section">
        <h2 className="section-title">{t("work.works")}</h2>
        <div className="project-container">
          
          <ProjectCard 
            title={t("work.claroServ")}
            image={claroServices.src}
            description={t("work.claroDesc")}
          />

          <ProjectCard 
            title="NakamaCollector"
            image={nakamaCollect.src}
            description={t("work.nakamaDesc")}
          />

          <ProjectCard 
            title={t("work.zett")}
            image={zettelKasten.src}
            description={t("work.zettDesc")}
            linkText={t("work.zettDescHere")}
            linkUrl="https://github.com/AlanAssange/securityarchive"
          />

          <ProjectCard 
            title={t("work.otherProjects")}
            description={
              <>
                {t("work.otherDesc")}{" "}
                <strong>
                  <a href="https://github.com/AlanAssange" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </strong>{" "}
                {t("work.otherDescTwo")}
              </>
            }
            showDivider={false} 
          />
        </div>
      </div>
    </div>
  );
}
