export default function ProjectsHeader() {
  return (
    <header className="mb-12">
      <div className="section-label mb-4">Portfolio</div>
      <h1
        className="font-display text-4xl font-black mb-4"
        style={{ color: "#e2e8f0" }}
      >
        Featured <span className="neon-text-cyan">Projects</span>
      </h1>
      <p
        className="text-sm"
        style={{ color: "#64748b", maxWidth: "480px" }}
      >
        A selection of projects spanning web applications, APIs, mobile apps,
        and AI/ML systems built over the past 5 years.
      </p>
    </header>
  );
}
