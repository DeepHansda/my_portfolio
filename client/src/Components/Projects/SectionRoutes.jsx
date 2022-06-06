import React, { useContext } from "react";
import { ProjectContext } from "../../App";
import Project from "../UI/WebAppUI/Project";
import AndroidProject from "../UI/androidProjectUI/AndroidProject";
import "./cat.css";
export function WebSection() {
  const data = useContext(ProjectContext);
  const projects = data.filter((pro) => {
    return pro.type === "webApp";
  });
  console.log(projects);
  return (
    <>
      <div className="projects-container">
        {projects.map((project, index) => {
          return <Project project={project} key={project._id} />;
        })}
      </div>
    </>
  );
}

export function AndroidSection() {
  const data = useContext(ProjectContext);
  const projects = data.filter((pro) => {
    return pro.type === "androidApp";
  });
  return (
    <div className="android-showcase-container">
      {projects.map((project, index) => {
        return <AndroidProject project={project} key={project._id} />;
      })}
    </div>
  );
}
