"use client";

import { useState, useEffect, useCallback } from "react";
import { formatDateRange, calculateDurationSpan } from "@/lib/date";
import { ExperienceItem } from "@/lib/experience";
import HtmlRenderer from "@/components/ui/HtmlRenderer";

export default function Experiences() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExperiences = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3400";
      const res = await fetch(`${apiUrl}/api/getExperiences`, {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const json = await res.json();
      if (Array.isArray(json?.data)) {
        setExperiences(json.data);
      } else {
        setExperiences([]);
      }
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Unable to reach experience server";
      console.warn("Could not fetch remote experiences:", msg);
      setError(msg);
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  return (
    <section
      id="experiences"
      className="py-20"
      style={{
        background:
          "linear-gradient(180deg, transparent, #060f2a60, transparent)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="section-label">Career timeline</div>
          <button
            id="sync-experiences-btn"
            type="button"
            onClick={fetchExperiences}
            title="Reload Experiences"
            aria-label="Reload Experiences"
            className="flex items-center gap-1.5 text-xs font-mono text-[#94a3b8] hover:text-[#00f5ff] transition-colors p-1.5 rounded hover:bg-[#060f2a]"
          >
            <svg
              className={`w-3.5 h-3.5 ${loading ? "animate-spin text-cyan-400" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="hidden sm:inline">Sync</span>
          </button>
        </div>

        <h2
          id="experiences-heading"
          className="font-display text-3xl font-bold mb-12 text-[#e2e8f0]"
        >
          Work <span className="neon-text-cyan">Experience</span>
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-0 lg:left-8 top-0 bottom-0 w-px hidden sm:block"
            style={{
              background:
                "linear-gradient(180deg, #00f5ff40, #a855f740, transparent)",
            }}
          />

          {loading && experiences.length === 0 ? (
            <div className="space-y-6 sm:pl-20">
              {[1, 2].map((n) => (
                <div key={n} className="hud-card p-6 animate-pulse">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-5 w-48 bg-slate-800 rounded" />
                    <div className="h-4 w-28 bg-slate-800 rounded" />
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-3.5 w-full bg-slate-800/60 rounded" />
                    <div className="h-3.5 w-5/6 bg-slate-800/60 rounded" />
                    <div className="h-3.5 w-4/6 bg-slate-800/60 rounded" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-5 w-16 bg-slate-800/40 rounded" />
                    <div className="h-5 w-16 bg-slate-800/40 rounded" />
                    <div className="h-5 w-16 bg-slate-800/40 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : experiences.length === 0 ? (
            <div className="sm:pl-20">
              <div className="hud-card p-8 text-center font-mono">
                <div className="text-amber-400 text-sm mb-2">
                  {"// NO EXPERIENCES RECORDED"}
                </div>
                <p className="text-xs text-[#64748b] mb-4">
                  {error || "No career timeline entries found."}
                </p>
                <button
                  id="retry-sync-btn"
                  type="button"
                  onClick={fetchExperiences}
                  className="glowing-btn text-xs px-4 py-2"
                >
                  Retry Sync
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              {experiences.map((exp) => (
                <div
                  key={exp._id}
                  id={`experience-${exp._id}`}
                  className="sm:pl-20 relative"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-0 lg:left-8 top-6 w-3 h-3 rounded-full hidden sm:block -translate-x-1/2 bg-[#00f5ff] glow-pulse"
                    style={{
                      boxShadow: "0 0 10px #00f5ff",
                    }}
                  />

                  <div className="hud-card p-6">
                    {/* Header with Logo, Title, Position, and Dates */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div className="flex items-start gap-3.5">
                        {exp.companyLogo ? (
                          <div className="relative w-11 h-11 rounded bg-[#020818] border border-[#1a3a6b] p-1.5 shrink-0 overflow-hidden flex items-center justify-center">
                            <img
                              src={exp.companyLogo}
                              alt={exp.companyName}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                (e.currentTarget as HTMLElement).style.display =
                                  "none";
                              }}
                            />
                          </div>
                        ) : (
                          <div className="relative w-11 h-11 rounded bg-[#020818] border border-[#1a3a6b] p-1.5 shrink-0 flex items-center justify-center font-mono text-xs font-bold neon-text-cyan">
                            {exp.companyName
                              ? exp.companyName.slice(0, 2).toUpperCase()
                              : "//"}
                          </div>
                        )}

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-display text-base font-bold text-[#e2e8f0]">
                              {exp.title}
                            </h3>
                            {exp.position && (
                              <span
                                className="font-mono text-[10px] uppercase px-2 py-0.5 rounded tracking-wider"
                                style={{
                                  border: "1px solid #00f5ff40",
                                  color: "#00f5ff",
                                  background: "#00f5ff10",
                                }}
                              >
                                {exp.position}
                              </span>
                            )}
                          </div>
                          <div className="font-mono text-xs mt-1 neon-text-cyan uppercase">
                            {exp.companyName}
                          </div>
                        </div>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <div className="font-mono text-xs font-semibold neon-text-purple">
                          {formatDateRange(
                            exp.duration?.joiningDate,
                            exp.duration?.leavingDate,
                          )}
                        </div>
                        <div
                          className="font-mono text-[11px] mt-1"
                          style={{ color: "#64748b" }}
                        >
                          {calculateDurationSpan(
                            exp.duration?.joiningDate,
                            exp.duration?.leavingDate,
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Detailed HTML description */}
                    {exp.des && (
                      <HtmlRenderer html={exp.des} className="mb-4" />
                    )}

                    {/* Skills tags */}
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-[#1a3a6b]/50">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill._id || skill.key}
                            className="font-mono text-xs px-2 py-0.5 rounded transition-colors"
                            style={{
                              border: "1px solid #a855f740",
                              color: "#a855f7",
                              background: "#a855f710",
                            }}
                          >
                            {skill.title}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
