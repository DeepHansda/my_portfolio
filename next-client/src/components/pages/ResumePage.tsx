"use client";

import { useState, useEffect, useCallback } from "react";
import { resolveResumeUrls, ResolvedResumeUrls } from "@/lib/resumeUrl";

export default function ResumePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState<ResolvedResumeUrls | null>(null);

  const fetchResume = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3400";
      const res = await fetch(`${apiUrl}/api/getResume?latest=true`, {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const json = await res.json();
      const payload = json.data;
      let resumeLink = "";

      if (Array.isArray(payload)) {
        const active = payload.find((item: { isActive?: boolean; resume?: string }) => item?.isActive);
        resumeLink = active?.resume || payload[0]?.resume || "";
      } else if (payload && typeof payload === "object") {
        resumeLink = payload.resume || payload.link || "";
      }

      if (!resumeLink) {
        // Fallback to local /resume.pdf if no link in DB
        resumeLink = "/resume.pdf";
      }

      const resolved = resolveResumeUrls(resumeLink);
      setResumeData(resolved);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unable to reach resume server";
      console.warn("Could not fetch remote resume, falling back to local:", msg);
      setError(msg);
      // Graceful fallback to local /resume.pdf
      setResumeData(resolveResumeUrls("/resume.pdf"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResume();
  }, [fetchResume]);

  return (
    <main className="pt-16">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="section-label mb-4">Credentials</div>
        <h1
          className="font-display text-4xl font-black mb-4"
          style={{ color: "#e2e8f0" }}
        >
          My <span className="neon-text-cyan">Resume</span>
        </h1>
        <p className="text-sm mb-8" style={{ color: "#64748b" }}>
          View or download the full resume below.
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {resumeData?.downloadUrl ? (
            <a
              href={resumeData.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              download={!resumeData.isGoogleDrive ? resumeData.filename : undefined}
              className="glowing-btn-solid flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3"
                />
              </svg>
              <span>Download Resume</span>
            </a>
          ) : null}

          {resumeData?.viewUrl ? (
            <a
              href={resumeData.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glowing-btn flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span>Open in New Tab</span>
            </a>
          ) : null}

          <button
            type="button"
            onClick={fetchResume}
            title="Reload Resume"
            aria-label="Reload Resume"
            className="p-3 rounded text-slate-400 hover:text-cyan-400 hover:bg-[#060f2a] border border-[#1a3a6b] transition-all"
          >
            <svg
              className={`w-4 h-4 ${loading ? "animate-spin text-cyan-400" : ""}`}
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
          </button>
        </div>

        {/* PDF viewer HUD Card */}
        <div
          className="hud-card overflow-hidden flex flex-col relative rounded-lg border border-[#1a3a6b]"
          style={{ minHeight: "700px", height: "80vh" }}
        >
          {/* Terminal Header */}
          <div className="terminal-header flex items-center justify-between px-4 py-3 bg-[#030b20] border-b border-[#1a3a6b]">
            <div className="flex items-center gap-2">
              <span className="terminal-dot inline-block w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
              <span className="terminal-dot inline-block w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
              <span className="terminal-dot inline-block w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
              <span
                className="ml-2 font-mono text-xs truncate max-w-[200px] sm:max-w-md"
                style={{ color: "#94a3b8" }}
              >
                {resumeData?.isGoogleDrive
                  ? "resume.pdf — [Google Drive stream]"
                  : `${resumeData?.filename || "resume.pdf"} — [PDF viewer]`}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span
                className="flex items-center gap-1.5 font-mono text-xs"
                style={{ color: loading ? "#00f5ff" : "#39ff14" }}
              >
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    loading ? "bg-[#00f5ff] animate-ping" : "bg-[#39ff14] animate-pulse"
                  }`}
                />
                {loading ? "STREAMING" : "ONLINE"}
              </span>
            </div>
          </div>

          {/* Viewer Frame Container */}
          <div className="relative flex-1 w-full h-full bg-[#020818]">
            {loading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#020818]/90 backdrop-blur-xs">
                <div className="w-10 h-10 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin mb-4" />
                <div className="font-mono text-xs text-cyan-400 tracking-wider animate-pulse">
                  {"// FETCHING RESUME DATA STREAM..."}
                </div>
              </div>
            )}

            {resumeData?.previewUrl ? (
              <iframe
                key={resumeData.previewUrl}
                src={resumeData.previewUrl}
                title="Resume PDF Preview"
                className="w-full h-full border-0 bg-[#020818]"
                allow="autoplay; encrypted-media; fullscreen"
              />
            ) : !loading ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center font-mono">
                <div className="text-amber-400 text-sm mb-2">
                  {"// NO RESUME DOCUMENT AVAILABLE"}
                </div>
                <p className="text-xs text-slate-500 mb-6 max-w-sm">
                  {error || "Could not load the resume preview. Please verify connection and try again."}
                </p>
                <button
                  onClick={fetchResume}
                  className="glowing-btn text-xs px-4 py-2"
                >
                  Retry Connection
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {/* Informational Footer */}
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-slate-500">
          <div>
            Format: {resumeData?.isGoogleDrive ? "Google Drive Embedded Document" : "Direct PDF Asset"}
          </div>
          <div>
            Having trouble with inline preview?{" "}
            <a
              href={resumeData?.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline inline-flex items-center gap-1"
            >
              Open in New Tab &rarr;
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
