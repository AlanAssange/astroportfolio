import React from "react";
import Divider from "./Divider";

interface ProjectCardProps {
  title: string;
  image?: string; 
  description: React.ReactNode;
  linkText?: string;
  linkUrl?: string;
  showDivider?: boolean;
}

export default function ProjectCard({
  title,
  image,
  description,
  linkText,
  linkUrl,
  showDivider = true,
}: ProjectCardProps) {
  return (
    <>
      <h3 className="project-subtitle">{title}</h3>
      {image && (
        <img src={image} alt={title} className="project-image" />
      )}
      
      <p className="project-description">
        {description}
        {linkUrl && linkText && (
          <>
            {" "}
            <strong>
              <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                {linkText}
              </a>
            </strong>
          </>
        )}
      </p>
      {showDivider && <Divider />}
    </>
  );
}