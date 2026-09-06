export default function AboutMe() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-6">
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
              I&apos;m a passionate software developer focused on building
              reliable, scalable, and user-friendly applications. I enjoy
              turning complex problems into simple and elegant solutions that
              actually work in the real world.
            </p>
            <p>
              My development philosophy centers on writing clean, maintainable
              code that teams can build on. I believe the best software is
              invisible — it just works, at any scale, under any conditions.
            </p>
            <p>
              With expertise spanning the full stack — from designing
              pixel-perfect interfaces to architecting distributed backend
              systems — I bring end-to-end ownership to every project I touch.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Years Experience", value: "5+" },
            { label: "Projects Shipped", value: "40+" },
            { label: "Happy Clients", value: "30+" },
            { label: "Commits / Year", value: "2.4K" },
          ].map((stat) => (
            <div key={stat.label} className="hud-card p-6 text-center">
              <div className="font-display text-3xl font-black neon-text-cyan mb-2">
                {stat.value}
              </div>
              <div
                className="font-mono text-xs tracking-wider"
                style={{ color: "#475569" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
