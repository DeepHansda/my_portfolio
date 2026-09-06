const services = [
  {
    icon: "⬡",
    title: "Web Development",
    desc: "Build modern, responsive, and scalable websites and web applications using cutting-edge technologies.",
  },
  {
    icon: "◈",
    title: "Full-Stack Development",
    desc: "Develop complete applications from frontend interfaces to backend APIs and databases.",
  },
  {
    icon: "⬢",
    title: "API Development",
    desc: "Design and develop secure, scalable REST APIs and backend services with robust architecture.",
  },
  {
    icon: "◇",
    title: "UI Development",
    desc: "Convert designs into responsive and accessible user interfaces with pixel-perfect precision.",
  },
  {
    icon: "⬟",
    title: "Application Development",
    desc: "Build custom applications tailored to specific business requirements and user needs.",
  },
];

export default function Services() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-6">
      <div className="section-label mb-4">What I do</div>
      <h2
        className="font-display text-3xl font-bold mb-12"
        style={{ color: "#e2e8f0" }}
      >
        Services &amp; <span className="neon-text-purple">Expertise</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc, i) => (
          <div
            key={svc.title}
            className="hud-card p-6 group cursor-default transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,245,255,0.08)]"
          >
            <div
              className="font-display text-3xl mb-4"
              style={{
                color: i % 2 === 0 ? "#00f5ff" : "#a855f7",
                textShadow: "none",
              }}
            >
              {svc.icon}
            </div>
            <h3
              className="font-display text-sm font-bold mb-3 tracking-wide"
              style={{ color: "#e2e8f0" }}
            >
              {svc.title}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#64748b" }}
            >
              {svc.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
