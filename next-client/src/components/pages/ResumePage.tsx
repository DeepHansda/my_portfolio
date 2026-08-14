export default function ResumePage() {
  return (
    <main className="pt-16">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="section-label mb-4">Credentials</div>
        <h1
          className="font-display text-4xl font-black mb-4"
          style={{ color: "#e2e8f0" }}
        >
          My <span className="neon-text-cyan">Resume</span>
        </h1>
        <p className="text-sm mb-10" style={{ color: "#64748b" }}>
          View or download the full resume below.
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-4 mb-10">
          <a href="/resume.pdf" download className="glowing-btn-solid">
            Download Resume
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="glowing-btn"
          >
            Open in New Tab
          </a>
        </div>

        {/* PDF viewer */}
        <div
          className="hud-card overflow-hidden"
          style={{ minHeight: "700px" }}
        >
          <div className="terminal-header">
            <span className="terminal-dot" style={{ background: "#ff5f57" }} />
            <span className="terminal-dot" style={{ background: "#ffbd2e" }} />
            <span className="terminal-dot" style={{ background: "#28c840" }} />
            <span
              className="ml-2 font-mono text-xs"
              style={{ color: "#475569" }}
            >
              resume.pdf — viewer
            </span>
          </div>

          {/* Fallback UI when no actual PDF is mounted */}
          <div
            className="p-8"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <div className="text-center mb-10" style={{ color: "#475569" }}>
              <div className="font-mono text-xs mb-2">
                {"// PDF viewer — attach resume.pdf to /public"}
              </div>
            </div>

            {/* Resume content preview */}
            <div className="max-w-2xl mx-auto space-y-8">
              {/* Header */}
              <div
                style={{
                  borderBottom: "1px solid #1a3a6b",
                  paddingBottom: "1.5rem",
                }}
              >
                <h2 className="font-display text-2xl font-black neon-text-cyan mb-1">
                  ALEX VOSS
                </h2>
                <div
                  className="font-display text-sm font-semibold mb-3"
                  style={{ color: "#a855f7" }}
                >
                  Full-Stack Developer
                </div>
                <div
                  className="flex flex-wrap gap-4 font-mono text-xs"
                  style={{ color: "#64748b" }}
                >
                  <span>alex@voss.dev</span>
                  <span>github.com/alexvoss</span>
                  <span>linkedin.com/in/alexvoss</span>
                  <span>San Francisco, CA</span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <div className="font-mono text-xs mb-3 neon-text-cyan">
                  {"> SUMMARY"}
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#94a3b8" }}
                >
                  Full-stack developer with 5+ years of experience building
                  scalable web applications, REST APIs, and real-time systems.
                  Proficient in React, Node.js, TypeScript, and cloud platforms.
                  Passionate about clean code, performance, and user experience.
                </p>
              </div>

              {/* Experience */}
              <div>
                <div className="font-mono text-xs mb-4 neon-text-cyan">
                  {"> EXPERIENCE"}
                </div>
                <div className="space-y-5">
                  {[
                    {
                      role: "Senior Software Developer",
                      company: "NexaCore Systems",
                      period: "2023 — Present",
                      items: [
                        "Real-time dashboard for 50K+ concurrent users",
                        "Microservices migration reducing latency by 60%",
                      ],
                    },
                    {
                      role: "Full-Stack Developer",
                      company: "Orbital Labs",
                      period: "2021 — 2023",
                      items: [
                        "Enterprise web applications for 3 clients",
                        "CI/CD pipeline implementation",
                      ],
                    },
                    {
                      role: "Frontend Developer",
                      company: "Pixel Forge Studio",
                      period: "2019 — 2021",
                      items: [
                        "Pixel-perfect responsive UI implementation",
                        "Open-source component library (2K+ stars)",
                      ],
                    },
                  ].map((exp) => (
                    <div
                      key={exp.role}
                      className="pl-4"
                      style={{ borderLeft: "2px solid #00f5ff30" }}
                    >
                      <div className="flex flex-wrap justify-between gap-2 mb-1">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "#e2e8f0" }}
                        >
                          {exp.role}
                        </span>
                        <span
                          className="font-mono text-xs"
                          style={{ color: "#a855f7" }}
                        >
                          {exp.period}
                        </span>
                      </div>
                      <div
                        className="font-mono text-xs mb-2"
                        style={{ color: "#00f5ff" }}
                      >
                        {exp.company}
                      </div>
                      <ul className="space-y-1">
                        {exp.items.map((item, i) => (
                          <li
                            key={i}
                            className="text-xs flex gap-2"
                            style={{ color: "#64748b" }}
                          >
                            <span style={{ color: "#00f5ff40" }}>▸</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <div className="font-mono text-xs mb-3 neon-text-cyan">
                  {"> SKILLS"}
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Node.js",
                    "NestJS",
                    "PostgreSQL",
                    "MongoDB",
                    "AWS",
                    "Docker",
                    "Python",
                  ].map((s) => (
                    <span
                      key={s}
                      className="font-mono text-xs px-2 py-0.5"
                      style={{
                        border: "1px solid #1a3a6b",
                        color: "#94a3b8",
                        background: "#020818",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="font-mono text-xs mb-3 neon-text-cyan">
                  {"> EDUCATION"}
                </div>
                <div
                  className="pl-4"
                  style={{ borderLeft: "2px solid #a855f730" }}
                >
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "#e2e8f0" }}
                  >
                    B.S. Computer Science
                  </div>
                  <div
                    className="font-mono text-xs"
                    style={{ color: "#a855f7" }}
                  >
                    University of California, Berkeley
                  </div>
                  <div
                    className="font-mono text-xs mt-1"
                    style={{ color: "#475569" }}
                  >
                    2015 — 2019
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
