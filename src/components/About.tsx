import React from "react";
import "../styles/about.css";

export default function AboutWindow() {
  return (
    <div className="about-window">
      <div className="about-header">
        <img
          src="src/assets/images/fixedcromo.png"
          alt="Profile picture"
          className="about-avatar"
        />
        <div className="about-flex-header">
          <h2 className="about-name">Alan Javier Cañellas</h2>
          <div className="about-header-columns">
            <div className="about-meta">
              <p>Class: Software Developer</p>
              <p>Subclass: Cybersecurity Student</p>
              <p>Level: 25</p>
              <p>Location: Buenos Aires, Argentina</p>
            </div>
            <div className="about-overview">
              <h3>Character Overview</h3>
              <p>
                Backend-focused developer with passion for secure systems,
                RPG aesthetics and old-school interfaces.
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className="about-content">
        <h2>ABOUT</h2>
        <p>Hi! i'm Alan, a 25 years old software developer from Buenos Aires, Argentina.</p>
        <p>I…</p>

        <ul>
          <li>
            Develop backend solutions end-to-end for a streaming platform, with a focus on user transactions and third-party integrations.
          </li>
          <li>
            Build frontend projects in my free time, often using AI to assist with visuals and creative assets  *things that im not capable of doing myself!*
          </li>
          <li>Maintain several <a href='https://es.wikipedia.org/wiki/Zettelkasten' target="_blank">Zettelkastens</a> as part of my personal interest knowledge-building process, particularly in Philosophy, and Cybersecurity.</li>
        </ul>

        <h2>EDUCATION</h2>
        <blockquote className="quote">
          <p>Bachelor of Science in Cybersecurity (2024 - Present)</p>
          <p>FASTA Catherina University.</p>
        </blockquote>

        <blockquote className="quote">
          <p>Bachelor of Science in Computer Science (2022 - 2024)</p>
          <p>University of Lujan.</p>
        </blockquote>

        <h2>LANGUAGE PROFICIENCY</h2>

        <blockquote className="quote">
          <p>English - C2 (Advanced)</p>
          <p>Spanish - Native</p>
          <p>German - Currently learning!!</p>
        </blockquote>
      </div>
    </div>
  );
}
