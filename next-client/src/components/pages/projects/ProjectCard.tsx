import Link from "next/link";
import { Project } from "./types";
import HtmlRenderer from "@/components/ui/HtmlRenderer";
import { formatDateRange } from "@/lib/date";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const displayImg = project.project_img?.[0]?.img || "";
  const durationText = formatDateRange(
    project.duration?.startingDate,
    project.duration?.endingDate,
  );

  return (
    <article className="hud-card group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,245,255,0.1)]">
      {/* Image container - shows only one image */}
      <div className="relative overflow-hidden shrink-0 h-[190px] bg-[#060f2a]">
        {displayImg ? (
          <img
            src={displayImg}
            alt={project.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-95 transition-opacity duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-mono text-xs text-slate-500">
            [NO PREVIEW]
          </div>
        )}

        {/* Category/Type badge */}
        {project.type?.name && (
          <div className="absolute top-3 right-3 font-mono text-xs px-2 py-0.5 backdrop-blur-sm z-10 border border-[#a855f7]/40 text-[#a855f7] bg-[#020818]/80">
            {project.type.name}
          </div>
        )}

        {/* Scan overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#020818]" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Duration */}
        {durationText && (
          <div className="font-mono text-[11px] text-slate-400 mb-1.5 flex items-center gap-1.5">
            <span className="neon-text-cyan">◷</span>
            <span>{durationText}</span>
          </div>
        )}

        {/* Title */}
        <h3 className="font-display text-base font-bold mb-3 tracking-wide text-slate-200">
          {project.title}
        </h3>

        {/* Description rendered safely via HtmlRenderer */}
        <div className="mb-4 flex-1">
          <HtmlRenderer
            html={project.description}
            className="text-xs text-slate-400 line-clamp-4"
          />
        </div>

        {/* Tech list */}
        {Array.isArray(project.tech_list) && project.tech_list.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech_list.map((tech, idx) => (
              <span
                key={tech._id || `${tech.name}-${idx}`}
                className="font-mono text-xs px-2 py-0.5 flex items-center gap-1.5 transition-colors border border-[#1a3a6b] text-slate-400 bg-[#020818]"
              >
                {tech.tech && (
                  <img
                    src={tech.tech}
                    alt={tech.name}
                    className="w-3 h-3 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
                <span>{tech.name}</span>
              </span>
            ))}
          </div>
        )}

        {/* Action Links: Full Details and Demo */}
        <div className="flex items-center gap-3 mt-auto pt-2">
          <Link
            href={`/projects/${project._id}`}
            className="flex-1 h-9 px-3 flex items-center justify-center font-display text-xs font-semibold tracking-wider transition-all duration-200 border border-[#00f5ff]/60 text-[#00f5ff] bg-[#00f5ff]/5 hover:bg-[#00f5ff]/15 hover:border-[#00f5ff] hover:shadow-[0_0_12px_rgba(0,245,255,0.3)] cursor-pointer"
          >
            Full Details
          </Link>

          {project.visit_link ? (
            <a
              href={project.visit_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-9 px-3 flex items-center justify-center font-display text-xs font-semibold tracking-wider transition-all duration-200 border border-[#a855f7]/60 text-[#a855f7] bg-[#a855f7]/5 hover:bg-[#a855f7]/15 hover:border-[#a855f7] hover:shadow-[0_0_12px_rgba(168,85,247,0.3)] cursor-pointer"
            >
              Demo
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="flex-1 h-9 px-3 flex items-center justify-center font-display text-xs font-semibold tracking-wider border border-slate-700 text-slate-500 bg-slate-900/40 cursor-not-allowed opacity-50 select-none"
            >
              Demo
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
