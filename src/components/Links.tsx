import React from 'react';
import "../styles/links.css";

export default function LinksWindow() {
    return (
            <section className="links-section">
                <h2>All my links</h2>
                <div className="icons-container">
                    <div className="icon-map">
                        <img id="icon-size" src="src/assets/icons/linked.png" />
                        <p>Linkedin</p>
                    </div>
                    <div className="icon-map">
                        <img id="icon-size" src="src/assets/icons/githublair.png" />
                        <p>Github</p>
                    </div>
                    <div className="icon-map">
                        <img id="icon-size" src='src/assets/icons/gmailair.png' />
                        <p>Gmail</p>
                    </div>
                </div>
            </section>
    )
}