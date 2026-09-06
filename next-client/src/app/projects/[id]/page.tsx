import { Suspense } from "react";
import ProjectDetails from "@/components/pages/projects/ProjectDetails";


interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="pt-24 text-center text-cyan-400 font-display text-sm tracking-widest">
          INITIALIZING INTERFACE...
        </div>
      }
    >
      <ProjectDetails id={id} />
    </Suspense>
  );
}
