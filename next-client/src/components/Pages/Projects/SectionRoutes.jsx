import React, { useContext } from "react";
import { ProjectContext } from "../../App";
import Project from "../../UI/WebAppUI/Project";
import AndroidProject from "../../UI/androidProjectUI/AndroidProject";
import "./cat.css";
import { CircularProgress, Container, Typography } from "@mui/material";

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
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div className="projects-container">
          {projectsData.length !== 0 ? (
            projectsData.map((project, index) => {
              return <Project project={project} key={project._id} />;
            })
          ) : (
            <Container maxWidth="xs">
              <Typography component="p" variant="h6" sx={{ color: "#fff" }}>
                Projects are not Available!
              </Typography>
            </Container>
          )}
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
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div className="android-showcase-container">
          {projectsData.length != 0 ? (
            projectsData.map((project, index) => {
              return <AndroidProject project={project} key={project._id} />;
            })
          ) : (
            <Container maxWidth="xs">
              <Typography component="p" variant="h6" sx={{ color: "#fff" }}>
                Projects are not Available!
              </Typography>
            </Container>
          )}
        </div>
      )}
    </>
  );
}
