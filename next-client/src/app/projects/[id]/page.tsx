import { Suspense } from "react";
import ProjectDetails from "@/components/pages/projects/ProjectDetails";

export async function generateStaticParams() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3400";
    const res = await fetch(`${apiUrl}/api/projects`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!res.ok) return [];

    const json = await res.json();
    const projects = Array.isArray(json?.data) ? json.data : [];
    return projects.map((project: { _id: string }) => ({
      id: project._id,
    }));
  } catch {
    return [];
  }
}

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
