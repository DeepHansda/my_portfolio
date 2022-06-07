import React, { useState, useEffect, useContext } from "react";
import "./projects.css";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import { ProjectContext } from "../../App";

function Projects() {
  return (
    <div className="projects">
      <div className="container-wrapper">
        <div className="projects-title">
          <h2>projects</h2>
        </div>
        <div className="projects-selection">
          <div className="project-web cat">
            <Link to="/webProjects">
              <div className="web-button">web app</div>
            </Link>
          </div>
          <div className="project-and cat">
            <Link to="/androidProjects">
              <div className="and-button">android app</div>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Projects;
