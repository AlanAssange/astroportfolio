import React from 'react';
import '../styles/work.css';

export default function Work() {
    return (
        <div className="portfolio-container">
            <div className="portfolio-banner">
                <p className="banner-text">
                    Accepting work offers via <a href="mailto:tu@email.com" className="banner-link">email!</a>
                </p>
                <p className="banner-subtext">
                    I do all what you see above.
                </p>
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
                    <h3 className="project-subtitle">NakamaCollector</h3>
                    <p className="project-description">
                        I'm actually on a development of a social network for figure and card collectors
                        with the possibility of creating contacts and selling anime products by
                        solo or finding a supplier.
                    </p>

                    <div className="project-image-placeholder">
                        <div className="placeholder-content">
                            <span>[ Image Placeholder ]</span>
                            <p>NakamaCollector Preview</p>
                        </div>
                    </div>

                    <hr className="portfolio-divider" />

                    <h3 className="project-subtitle">CLARO SERVICES</h3>
                    <div className="project-image-placeholder">
                        <div className="placeholder-content">
                            <span>[ Image Placeholder ]</span>
                            <p>NakamaCollector Preview</p>
                        </div>
                    </div>
                    <p className="project-description">
                        Im working for Claro since 2022, developing Claro Video, Claro Musica and Claro Drive (at the backend payments area)
                    </p>


                    <hr className="portfolio-divider" />

                    <h3 className="project-subtitle">MY ZETTELKASTENS!</h3>
                    <div className="project-image-placeholder">
                        <div className="placeholder-content">
                            <span>[ Image Placeholder ]</span>
                            <p>NakamaCollector Preview</p>
                        </div>
                    </div>
                    <p className="project-description">
                        This is where the magic of my own knowledge happens! I maintain constantly these digital brains so i put them here as my projects.
                    </p>

                    <hr className="portfolio-divider" />
                    <h3 className="project-subtitle">OTHER PROJECTS:</h3>
                    <p className="project-description">
                        I have older works for small companies in my github and also personal projects for learning purposes.
                    </p>
                </div>
            </div>
        </div>
    );
}