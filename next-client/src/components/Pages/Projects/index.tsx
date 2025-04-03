import Link from "next/link";
import "./projects.css";
import { Query, useQuery } from "@tanstack/react-query";
import Project from "@/components/UI/WebAppUI";
import { GET_PROJECTS } from "@/utils/AxiosUtils/api";
import request from "@/utils/AxiosUtils";

function Projects() {
  const { data, isLoading } = useQuery([GET_PROJECTS], () =>
    request({ url: GET_PROJECTS })
  );
  return (
    <div className="projects">
      <div className="container-wrapper">
        <div className="projects-title">
          <h2>projects</h2>
        </div>
        <div className="projects-selection">
          <div className="project-web cat">
            <Link href="/webProjects">
              <div className="web-button">web app</div>
            </Link>
          </div>
          <div className="project-and cat">
            <Link href="/androidProjects">
              <div className="and-button">android app</div>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Project project={} />
      </div>
    </div>
  );
}

export default Projects;
