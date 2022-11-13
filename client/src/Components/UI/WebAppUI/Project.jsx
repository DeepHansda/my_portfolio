import React, { useEffect } from "react";
import "./project.css";
import WebSlider from "./WebSlider";
import { FiGithub, FiGlobe } from "react-icons/fi";
import { useState } from "react";
import { Divider } from "@mui/material";
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

  // const dom = new DOMParser()
  // const desContent = dom.parseFromString("<p>hello world<p/>","text/html");
  // console.log(desContent.body.firstChild.outerHTML)

  const htmlString = `<div>${project.description}</div>`;
  return (
    <div className="project">
      <div className="project-cover">
        <WebSlider images={project.project_img} />

        <div className="project-info">
          <div className="project-text">
            <div className="project-text-title">
              <h1>{project.title}</h1>
            </div>

            <div className="project-text-para">
              <div dangerouslySetInnerHTML={{ __html: htmlString }} />
            </div>

            <div className="duration">
              <div className="duration-title">
                <h2>Duration.</h2>
              </div>
              <Divider />
              <div className="duration-str">
                {`${dateConverter(
                  project.duration.startingDate
                )} - ${dateConverter(project.duration.endingDate)}`}
              </div>
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
