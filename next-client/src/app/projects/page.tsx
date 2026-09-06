import { Suspense } from "react";
import ProjectsPage from "../../components/pages/ProjectsPage";

export default function Projects() {
  return (
    <Suspense
      fallback={
        <div className="pt-24 text-center text-cyan-400 font-display text-sm tracking-widest">
          INITIALIZING INTERFACE...
        </div>
      }
    >
      <ProjectsPage />
    </Suspense>
  );
}
