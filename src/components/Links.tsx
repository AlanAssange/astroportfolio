import React from 'react';
import "../styles/links.css";

export default function LinksWindow(){
    return(
        <>
        <section className="links-section">
        <h2>All my links</h2>
        <div className="icons-container">
            <div className="icon-map">
                <img id="icon-size" src="src/assets/icons/linkedin.svg"/>
                <p>Linkedin</p>
            </div>
            <div className="icon-map">
                <img id="icon-size" src="src/assets/icons/github.png"/>
                <p>Github</p>
            </div>
            <div className="icon-map">
                <img id="icon-size" src='src/assets/icons/gmail.png'/>
                <p>Gmail</p>
            </div>
        </div>
        </section>
        </>
    )
}