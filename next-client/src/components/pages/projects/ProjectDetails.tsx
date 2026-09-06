"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Project } from "./types";
import HtmlRenderer from "@/components/ui/HtmlRenderer";
import { formatDateRange, formatDate } from "@/lib/date";

interface ProjectDetailsProps {
  id: string;
  initialProject?: Project | null;
}

export default function ProjectDetails({
  id,
  initialProject = null,
}: ProjectDetailsProps) {
  const [project, setProject] = useState<Project | null>(initialProject);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [loading, setLoading] = useState(!initialProject);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3400";
      const res = await fetch(`${apiUrl}/api/projects/${id}`, {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(
          res.status === 404
            ? "Project not found in system database."
            : `Server returned HTTP ${res.status}`,
        );
      }

      const json = await res.json();
      if (json?.data) {
        setProject(json.data);
      } else {
        throw new Error("Invalid response received from server.");
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to load project details.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!initialProject) {
      fetchProject();
    }
  }, [initialProject, fetchProject]);

  if (loading) {
    return (
      <main className="pt-24 pb-20 max-w-6xl mx-auto px-6">
        {/* Back Link Skeleton */}
        <div className="h-6 w-44 bg-[#1a3a6b]/30 rounded mb-8 animate-pulse" />

        {/* Header Skeleton */}
        <div className="space-y-4 mb-10 animate-pulse">
          <div className="h-10 w-3/4 bg-[#1a3a6b]/40 rounded" />
          <div className="h-5 w-1/3 bg-[#1a3a6b]/20 rounded" />
        </div>

        {/* Main Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-[380px] bg-[#060f2a] border border-[#1a3a6b] rounded" />
            <div className="h-40 bg-[#060f2a] border border-[#1a3a6b] rounded" />
          </div>
          <div className="space-y-6">
            <div className="h-64 bg-[#060f2a] border border-[#1a3a6b] rounded" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="pt-28 pb-20 max-w-4xl mx-auto px-6">
        <div
          className="hud-card p-10 text-center"
          style={{ border: "1px solid #ef444450" }}
        >
          <div className="font-mono text-xs text-red-400 mb-2">// 404 // NOT_FOUND</div>
          <h1 className="font-display text-2xl font-bold text-slate-100 mb-3">
            PROJECT NOT FOUND
          </h1>
          <p className="font-mono text-xs text-slate-400 max-w-md mx-auto mb-6">
            {error || "The project you are looking for does not exist or has been removed."}
          </p>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={fetchProject}
              className="font-display text-xs tracking-wider px-5 py-2.5 border border-cyan-400 text-cyan-400 bg-cyan-950/20 hover:bg-cyan-950/40 cursor-pointer transition-colors"
            >
              RETRY
            </button>
            <Link
              href="/projects"
              className="font-display text-xs tracking-wider px-5 py-2.5 border border-[#1a3a6b] text-slate-300 hover:border-slate-400 cursor-pointer transition-colors"
            >
              ← ALL PROJECTS
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const images = project.project_img || [];
  const activeImage = images[activeImgIndex]?.img || images[0]?.img || "";
  const durationText = formatDateRange(
    project.duration?.startingDate,
    project.duration?.endingDate,
  );

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Navigation & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-display text-xs tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors py-1.5 px-3 border border-cyan-500/30 hover:border-cyan-400 bg-cyan-950/20"
          >
            <span>←</span>
            <span>BACK TO PROJECTS</span>
          </Link>

          <div className="font-mono text-xs text-slate-500 hidden sm:flex items-center gap-2">
            <span>INDEX</span>
            <span className="text-cyan-500">/</span>
            <span>PROJECTS</span>
            <span className="text-cyan-500">/</span>
            <span className="text-slate-300 truncate max-w-xs">{project.title}</span>
          </div>
        </div>

        {/* Project Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            {project.type?.name && (
              <span className="font-mono text-xs px-2.5 py-0.5 border border-[#a855f7]/60 text-[#a855f7] bg-[#020818] tracking-wider uppercase">
                {project.type.name}
              </span>
            )}

            {typeof project.rating === "number" && project.rating > 0 && (
              <span className="font-mono text-xs px-2.5 py-0.5 border border-yellow-500/40 text-yellow-400 bg-[#020818] flex items-center gap-1.5">
                <span>★</span>
                <span>{Number(project.rating).toFixed(1)} / 10</span>
              </span>
            )}

            {durationText && (
              <span className="font-mono text-xs text-slate-400 flex items-center gap-1.5">
                <span className="text-cyan-400">◷</span>
                <span>{durationText}</span>
              </span>
            )}
          </div>

          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-wide mb-6">
            {project.title}
          </h1>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.visit_link && (
              <a
                href={project.visit_link}
                target="_blank"
                rel="noopener noreferrer"
                className="glowing-btn-solid inline-flex items-center gap-2 text-xs py-2.5 px-6 font-display font-bold tracking-wider cursor-pointer"
              >
                <span>LAUNCH DEMO</span>
                <span className="text-sm">↗</span>
              </a>
            )}

            {project.git_link && (
              <a
                href={project.git_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-display text-xs font-semibold tracking-wider py-2.5 px-6 border border-[#1a3a6b] text-slate-300 hover:border-[#a855f7] hover:text-[#a855f7] hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] bg-[#060f2a] transition-all duration-200 cursor-pointer"
              >
                <span>VIEW SOURCE</span>
                <span className="text-sm">↗</span>
              </a>
            )}
          </div>
        </header>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Column: Image Showcase & Detailed Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery Showcase */}
            <div className="hud-card overflow-hidden">
              <div className="border-b border-[#1a3a6b] px-4 py-2.5 bg-[#020818]/60 flex items-center justify-between">
                <span className="section-label">VISUAL PREVIEW</span>
                {images.length > 1 && (
                  <span className="font-mono text-xs text-slate-400">
                    SCREENSHOT {activeImgIndex + 1} OF {images.length}
                  </span>
                )}
              </div>

              {/* Main Featured Image */}
              <div className="relative h-[260px] sm:h-[400px] bg-[#020818] flex items-center justify-center overflow-hidden">
                {activeImage ? (
                  <img
                    src={activeImage}
                    alt={`${project.title} screenshot ${activeImgIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="font-mono text-xs text-slate-500">
                    [NO SCREENSHOT AVAILABLE]
                  </div>
                )}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#060f2a]/80 via-transparent to-transparent" />
              </div>

              {/* Interactive Thumbnail Strip */}
              {images.length > 1 && (
                <div className="p-4 bg-[#020818]/80 border-t border-[#1a3a6b] flex items-center gap-3 overflow-x-auto">
                  {images.map((imgItem, idx) => (
                    <button
                      key={imgItem._id || idx}
                      type="button"
                      onClick={() => setActiveImgIndex(idx)}
                      aria-label={`Select screenshot ${idx + 1}`}
                      className={`relative shrink-0 w-20 h-14 rounded-sm overflow-hidden border transition-all duration-200 cursor-pointer ${
                        idx === activeImgIndex
                          ? "border-cyan-400 shadow-[0_0_10px_rgba(0,245,255,0.4)] scale-105"
                          : "border-[#1a3a6b] opacity-60 hover:opacity-100 hover:border-slate-400"
                      }`}
                    >
                      <img
                        src={imgItem.img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description Section */}
            <section className="hud-card p-6 sm:p-8">
              <div className="section-label mb-4">PROJECT BRIEF & DETAILS</div>
              <div className="border-t border-[#1a3a6b]/50 pt-4">
                <HtmlRenderer
                  html={project.description}
                  className="text-slate-300 leading-relaxed space-y-4"
                />
              </div>
            </section>
          </div>

          {/* Sidebar: Tech Stack & System Specifications */}
          <aside className="space-y-8">
            {/* Tech Stack */}
            <section className="hud-card p-6">
              <div className="section-label mb-4">TECHNOLOGIES USED</div>
              {Array.isArray(project.tech_list) && project.tech_list.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {project.tech_list.map((tech, idx) => (
                    <span
                      key={tech._id || `${tech.name}-${idx}`}
                      className="font-mono text-xs px-3 py-1.5 flex items-center gap-2 border border-[#1a3a6b] bg-[#020818] text-slate-300 hover:border-cyan-400/60 transition-colors"
                    >
                      {tech.tech && (
                        <img
                          src={tech.tech}
                          alt={tech.name}
                          className="w-4 h-4 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      )}
                      <span className="capitalize">{tech.name}</span>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="font-mono text-xs text-slate-500">
                  No specific technologies catalogued.
                </p>
              )}
            </section>

            {/* Project Specifications Card */}
            <section className="hud-card p-6 space-y-4">
              <div className="section-label mb-2">SYSTEM METRICS</div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center py-2 border-b border-[#1a3a6b]/40">
                  <span className="text-slate-400">CATEGORY</span>
                  <span className="text-cyan-400 font-semibold">
                    {project.type?.name || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-[#1a3a6b]/40">
                  <span className="text-slate-400">TIMELINE</span>
                  <span className="text-slate-200">{durationText || "N/A"}</span>
                </div>

                {typeof project.rating === "number" && project.rating > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-[#1a3a6b]/40">
                    <span className="text-slate-400">SCORE</span>
                    <span className="text-yellow-400">
                      ★ {Number(project.rating).toFixed(1)} / 10
                    </span>
                  </div>
                )}

                {project.createdAt && (
                  <div className="flex justify-between items-center py-2 border-b border-[#1a3a6b]/40">
                    <span className="text-slate-400">INDEXED ON</span>
                    <span className="text-slate-300">
                      {formatDate(project.createdAt, "medium")}
                    </span>
                  </div>
                )}

                {project.visit_link && (
                  <div className="flex justify-between items-center py-2 border-b border-[#1a3a6b]/40">
                    <span className="text-slate-400">DEPLOYMENT</span>
                    <a
                      href={project.visit_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline truncate max-w-[150px]"
                    >
                      {project.visit_link.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}

                {project.git_link && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-400">REPOSITORY</span>
                    <a
                      href={project.git_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:underline truncate max-w-[150px]"
                    >
                      {project.git_link.replace(/^https?:\/\/github\.com\//, "")}
                    </a>
                  </div>
                )}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
