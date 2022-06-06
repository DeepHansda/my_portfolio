import React, { useState, useEffect, useContext } from "react";
import "./projects.css";
import Project from "../UI/WebAppUI/Project";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import AndApp from "../UI/AndroidAppUI/AndApp";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../Redux/Actions/projectActions";
import { ProjectContext } from "../../App";

function Projects() {
  const [webapp, setWebapp] = useState("");
  const projects = useContext(ProjectContext);
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
