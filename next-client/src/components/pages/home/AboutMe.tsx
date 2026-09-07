export default function AboutMe() {
  return (
    <section className="py-12 md:py-14 max-w-6xl mx-auto px-6">
      <div className="section-label mb-4">About me</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <h2
            className="font-display text-3xl font-bold mb-6"
            style={{ color: "#e2e8f0" }}
          >
            Crafting Digital
            <br />
            <span className="neon-text-purple">Realities</span>
          </h2>
          <div
            className="space-y-4 text-base leading-relaxed"
            style={{ color: "#94a3b8" }}
          >
            <p>
              Hi, I&apos;m Deep. I&apos;m a software developer with around 2
              years of professional experience in web application development.
            </p>
            <p>
              I primarily work with JavaScript and modern web technologies, with
              experience in frontend and backend development. I&apos;ve worked
              with technologies like React, Next.js, Node.js, Express.js,
              FastAPI, NestJS, and I&apos;m also familiar with working with
              APIs, databases, and application architecture.
            </p>
            <p>
              Over the course of my experience, I&apos;ve worked on
              business-oriented applications and have gained an understanding of
              areas like CRM, ERP, SaaS, procurement, inventory, and project
              workflows. This has helped me understand not only how to develop
              features, but also how to translate business requirements into
              software solutions.
            </p>
            <p>
              At this stage of my career, I&apos;m especially interested in
              improving my backend and system-design skills and working on
              larger and more challenging applications.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div
            className="font-mono text-xs flex items-center justify-between"
            style={{ color: "#00f5ff80" }}
          >
            <span>{"> TECH_PROFICIENCY.stats"}</span>
            <span className="text-[10px] text-[#64748b]">SCALE / 10</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "React / Next.js", rate: 9.0, color: "#39ff14" },
              { name: "TypeScript", rate: 8.5, color: "#00f5ff" },
              { name: "JavaScript", rate: 9.0, color: "#00f5ff" },
              { name: "Node.js & Express", rate: 7.0, color: "#a855f7" },
              { name: "MongoDB & SQL", rate: 7.5, color: "#a855f7" },
              { name: "Nest.js", rate: 6.5, color: "#39ff14" },
              { name: "FastAPI", rate: 6.5, color: "#00f5ff" },
            ].map((skill) => (
              <div
                key={skill.name}
                className="hud-card p-4 sm:p-5 flex flex-col justify-between group hover:border-[#00f5ff50] transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className="font-mono text-xs font-medium"
                    style={{ color: "#e2e8f0" }}
                  >
                    {skill.name}
                  </span>
                  <span
                    className="font-display text-sm font-bold shrink-0"
                    style={{
                      color: skill.color,
                      textShadow: `0 0 10px ${skill.color}80`,
                    }}
                  >
                    {skill.rate}
                    <span className="font-mono text-[10px] text-[#64748b] ml-0.5">
                      /10
                    </span>
                  </span>
                </div>
                <div
                  className="w-full h-1.5 overflow-hidden"
                  style={{ background: "#020818", border: "1px solid #1a3a6b" }}
                  role="progressbar"
                  aria-valuenow={skill.rate}
                  aria-valuemin={0}
                  aria-valuemax={10}
                  aria-label={skill.name}
                >
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${(skill.rate / 10) * 100}%`,
                      background: skill.color,
                      boxShadow: `0 0 8px ${skill.color}`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
