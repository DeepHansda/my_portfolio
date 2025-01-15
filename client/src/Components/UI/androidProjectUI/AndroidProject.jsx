import React from "react";
import "./android.css";
import AndroidSlider from "./AndroidSlider";
import { FiGithub, FiGlobe } from "react-icons/fi";

function AndroidProject({ project }) {
  const htmlString = `<div>${project.description}</div>`;
  const dateConverter = (d) => {
    var strArray = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const fDate = new Date(d);
    console.log(fDate.getMonth);

    return `${strArray[fDate.getMonth()]} ${fDate.getFullYear()}`;
  };
  return (
    <div className="androidProject">
      <div className="androidProject-main">
        <div className="androidProject-img">
          <AndroidSlider images={project.project_img} />
        </div>
        <div className="androidProject-info">
          <div className="androidProject-info-text">
            <div className="android-project-title">
              <h2>{project.title}</h2>
            </div>
            <div className="android-project-para">
              <div dangerouslySetInnerHTML={{ __html: htmlString }} />
            </div>
            <div className="duration">
              <div className="duration-title">
                <h2>Duration.</h2>
              </div>
              <div className="duration-str">
                {`${dateConverter(
                  project.duration.startingDate
                )} - ${dateConverter(project.duration.endingDate)}`}
              </div>
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
          <button>
            <a href={project.visit_link}>
              <FiGlobe /> Demo
            </a>
          </button>
        </div>

        <div className="android-project-visit" style={{ marginTop: "20px" }}>
          <button>
            <a href={project.git_link}>
              <FiGithub /> Git Repo
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AndroidProject;
