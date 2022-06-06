import React from "react";
import "./android.css";
import AndroidSlider from "./AndroidSlider";
import {FiGithub, FiGlobe} from "react-icons/fi";

function AndroidProject({ project }) {
  return (
    <div className="androidProject">
      <div className="androidProject-main">
        <div className="androidProject-img">
          <AndroidSlider images={project.project_img}/>
        </div>
        <div className="androidProject-info">
          <div className="androidProject-info-text">
            <div className="android-project-title">
              <h2>{project.title}</h2>
            </div>
            <div className="android-project-para">
              <p>{project.description}</p>
            </div>
          </div>
          <div className="android-project-tech-container">
            <div className="android-project-tech-list">
              {project.tech_list.map((tech) => {
                return (
                  <li className="android-project-tech">
                    <img src={tech.tech} alt={tech.name} />
                  </li>
                );
              })}
            </div>
          </div>
        </div>
        <div className="android-project-visit">
          <button><a href={project.visit_link}><FiGlobe/> visit</a></button>
        </div>

        <div className="android-project-visit" style={{marginTop:'20px'}}>
          <button><a href={project.git_link}><FiGithub/> Git Repo</a></button>
        </div>
      </div>
    </div>
  );
}

export default AndroidProject;
