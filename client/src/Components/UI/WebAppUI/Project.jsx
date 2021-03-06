import React, { useEffect } from "react";
import "./project.css";
import WebSlider from "./WebSlider";
import { FiGithub, FiGlobe } from "react-icons/fi";
import { useState } from "react";
function Project({ project }) {

  const [screen, setScreen] = useState(window.innerWidth);
  useEffect(() => {
    function handleSize() {
      setScreen(window.innerWidth);
    }
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  return (
    <div className="project">
      <div className="project-cover">
        {screen > 1024 ? 
        <WebSlider images={project.project_img} />:
        <div className="project-img">
          <img src={project.project_img[0].img} alt="" />
        </div>
}
        <div className="project-info">
          <div className="project-text">
            <div className="project-text-title">
              <h1>{project.title}</h1>
            </div>

            <div className="project-text-para">
              <p>{project.description}</p>
            </div>
          </div>

          <div className="project-tech">
            <div className="project-tech-title">
              <h1>technologies used :</h1>
            </div>
            <div className="project-tech-list">
              {project.tech_list.map((tech) => {
                return (
                  <li
                    className={
                      project.tech_list.length === 3
                        ? "threeImg"
                        : "project-tech-item"
                    }
                    key={tech._id}
                  >
                    <img src={tech.tech} alt={tech.name} />
                  </li>
                );
              })}
            </div>
          </div>

          <div className="web-button-container">
            <div className="project-button">
              <a href={project.visit_link}>
                <div className="visit-button">
                  <FiGlobe /> visit
                </div>
              </a>
            </div>

            <div className="project-button">
              <a href={project.git_link}>
                <div className="visit-button">
                  <FiGithub /> Git Repo
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
