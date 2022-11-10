import React, { useContext } from "react";
import { ProjectContext } from "../../App";
import Project from "../UI/WebAppUI/Project";
import AndroidProject from "../UI/androidProjectUI/AndroidProject";
import "./cat.css";
import { CircularProgress } from "@mui/material";

export function WebSection() {
  const { projects, loading } = useContext(ProjectContext);
  const projectsData =
    projects &&
    projects.filter((pro) => {
      return pro.type === "webApp";
    });

  return (
    <>
      {loading ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <div className="projects-container">
          {projectsData.map((project, index) => {
            return <Project project={project} key={project._id} />;
          })}
        </div>
      )}
    </>
  );
}

export function AndroidSection() {
  const { projects, loading } = useContext(ProjectContext);

  const projectsData =
    projects &&
    projects.filter((pro) => {
      return pro.type === "androidApp";
    });
  return (
    <>
      {loading ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <div className="android-showcase-container">
          {projectsData.map((project, index) => {
            return <AndroidProject project={project} key={project._id} />;
          })}
        </div>
      )}
    </>
  );
}
