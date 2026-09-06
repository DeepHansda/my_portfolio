import ProjectCard from "./ProjectCard";
import { Project } from "./types";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="hud-card p-12 text-center my-8" style={{ border: "1px dashed #1a3a6b" }}>
        <p className="font-display text-sm text-slate-400 tracking-wider mb-1">
          NO PROJECTS FOUND
        </p>
        <p className="font-mono text-xs text-slate-500">
          No records matching the selected category criteria in database.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project._id || project.title} project={project} />
      ))}
    </div>
  );
}
