import React from "react";
import diceDivider from "../../assets/icons/dice.png";

export default function Divider() {
  return (
    <div className="about-separator">
      <span className="line"></span>
      <img
        src={diceDivider.src}
        alt="Divider icon"
        className="separator-icon"
      />
      <span className="line"></span>
    </div>
  );
}