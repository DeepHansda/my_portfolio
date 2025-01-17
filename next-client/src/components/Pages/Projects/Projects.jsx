import Link from "next/link";
import "./projects.css";

function Projects() {
  
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
        {/* <Outlet /> */}
      </div>
    </div>
  );
}

export default Projects;
