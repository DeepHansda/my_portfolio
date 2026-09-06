const skills = {
  Frontend: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  Backend: ["Node.js", "NestJS", "Django", "REST APIs"],
  Database: ["PostgreSQL", "MongoDB"],
  "Cloud & DevOps": ["AWS", "GCP", "Docker", "CI/CD"],
  Tools: ["Git", "GitHub", "VS Code", "Figma"],
};

export default function Skills() {
  return (
    <section
      className="py-24"
      style={{
        background:
          "linear-gradient(180deg, transparent, #060f2a60, transparent)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="section-label mb-4">Technical arsenal</div>
        <h2
          className="font-display text-3xl font-bold mb-12"
          style={{ color: "#e2e8f0" }}
        >
          Skills &amp; <span className="neon-text-cyan">Technologies</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="hud-card p-6 group hover:border-[#00f5ff40] transition-all duration-300"
            >
              <div
                className="font-mono text-xs mb-4"
                style={{ color: "#00f5ff" }}
              >
                {">"} {category.toUpperCase()}
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-2 py-1 transition-all duration-200"
                    style={{
                      border: "1px solid #1a3a6b",
                      color: "#94a3b8",
                      background: "#020818",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
