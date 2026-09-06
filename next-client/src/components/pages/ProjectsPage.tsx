"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Project, ProjectFilterOption, ProjectTypeItem } from "./projects/types";
import ProjectsHeader from "./projects/ProjectsHeader";
import ProjectFilter from "./projects/ProjectFilter";
import ProjectGrid from "./projects/ProjectGrid";

const defaultCategoryOption: ProjectFilterOption = { key: "all", name: "All" };

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeCategory = searchParams.get("type") || "all";

  const [categories, setCategories] = useState<ProjectFilterOption[]>([
    defaultCategoryOption,
  ]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Fetch available project types for the filter
  const fetchProjectTypes = useCallback(async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3400";
      const res = await fetch(`${apiUrl}/api/project-types`, {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      if (!res.ok) return;

      const json = await res.json();
      const typesData: ProjectTypeItem[] = Array.isArray(json?.data)
        ? json.data
        : [];

      if (typesData.length > 0) {
        const dynamicOptions: ProjectFilterOption[] = typesData.map((t) => ({
          key: t.key || t.name.toLowerCase().replace(/\s+/g, "-"),
          name: t.name,
        }));
        setCategories([defaultCategoryOption, ...dynamicOptions]);
      }
    } catch (err) {
      console.warn("Could not fetch project types:", err);
    }
  }, []);

  // 2. Fetch projects from API based on active type param
  const fetchProjects = useCallback(async (typeParam: string) => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3400";
      const query =
        typeParam && typeParam.toLowerCase() !== "all"
          ? `?type=${encodeURIComponent(typeParam)}`
          : "";
      const res = await fetch(`${apiUrl}/api/projects${query}`, {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const json = await res.json();
      const projectList: Project[] = Array.isArray(json?.data) ? json.data : [];
      setProjects(projectList);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Unable to load projects";
      setError(msg);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjectTypes();
  }, [fetchProjectTypes]);

  useEffect(() => {
    fetchProjects(activeCategory);
  }, [activeCategory, fetchProjects]);

  const handleSelectCategory = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key.toLowerCase() === "all") {
      params.delete("type");
    } else {
      params.set("type", key);
    }
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  return (
    <main className="pt-16">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <ProjectsHeader />

        <ProjectFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="hud-card h-[400px] flex flex-col overflow-hidden"
                style={{ background: "#040b1e" }}
              >
                <div className="h-[190px] bg-[#060f2a]/80" />
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-4 bg-[#1a3a6b]/50 rounded w-3/4" />
                    <div className="h-3 bg-[#1a3a6b]/30 rounded w-full" />
                    <div className="h-3 bg-[#1a3a6b]/30 rounded w-5/6" />
                  </div>
                  <div className="h-8 bg-[#1a3a6b]/20 rounded mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div
            className="hud-card p-12 text-center my-8"
            style={{ border: "1px solid #ef444440" }}
          >
            <p className="font-display text-sm text-red-400 tracking-wider mb-2">
              FAILED TO LOAD PROJECTS
            </p>
            <p className="font-mono text-xs text-slate-500 mb-6">{error}</p>
            <button
              type="button"
              onClick={() => fetchProjects(activeCategory)}
              className="font-display text-xs tracking-widest px-5 py-2.5 transition-all duration-200 cursor-pointer"
              style={{
                border: "1px solid #00f5ff",
                color: "#00f5ff",
                background: "#00f5ff10",
              }}
            >
              RETRY
            </button>
          </div>
        ) : (
          <ProjectGrid projects={projects} />
        )}
      </div>
    </main>
  );
}
