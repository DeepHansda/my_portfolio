"use client";

import { useState } from "react";

const categories = [
  "All",
  "Web",
  "Mobile",
  "Backend",
  "AI/ML",
  "Other",
] as const;
type Category = (typeof categories)[number];

interface Project {
  name: string;
  desc: string;
  tech: string[];
  category: Exclude<Category, "All">;
  image: string;
  github: string;
  demo: string;
}

const projects: Project[] = [
  {
    name: "Cakeemon",
    desc: "Full-stack e-commerce platform with auth, product management, cart, and Razorpay payment integration.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Razorpay"],
    category: "Web",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&auto=format",
    github: "#",
    demo: "#",
  },
  {
    name: "NexaChat",
    desc: "Real-time messaging platform with WebSocket support, end-to-end encryption, and file sharing.",
    tech: ["Next.js", "Socket.io", "PostgreSQL", "Redis", "AWS S3"],
    category: "Web",
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&h=400&fit=crop&auto=format",
    github: "#",
    demo: "#",
  },
  {
    name: "OrbitTracker",
    desc: "Cross-platform fitness app with GPS tracking, analytics dashboard, and social challenges.",
    tech: ["React Native", "TypeScript", "Firebase", "Google Maps"],
    category: "Mobile",
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=400&fit=crop&auto=format",
    github: "#",
    demo: "#",
  },
  {
    name: "DataForge API",
    desc: "High-performance REST API gateway handling 10M+ requests/day with rate limiting and analytics.",
    tech: ["NestJS", "PostgreSQL", "Redis", "Docker", "AWS"],
    category: "Backend",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&auto=format",
    github: "#",
    demo: "#",
  },
  {
    name: "SentimentLens",
    desc: "NLP-powered sentiment analysis tool for social media monitoring with real-time dashboards.",
    tech: ["Python", "FastAPI", "TensorFlow", "React", "PostgreSQL"],
    category: "AI/ML",
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=400&fit=crop&auto=format",
    github: "#",
    demo: "#",
  },
  {
    name: "StockOracle",
    desc: "ML model for stock price prediction using LSTM networks with portfolio simulation features.",
    tech: ["Python", "Keras", "Pandas", "FastAPI", "Vue.js"],
    category: "AI/ML",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop&auto=format",
    github: "#",
    demo: "#",
  },
  {
    name: "CodeSandbox CLI",
    desc: "Developer tool for scaffolding, linting, and deploying projects with plugin architecture.",
    tech: ["Node.js", "TypeScript", "Commander.js", "Docker"],
    category: "Other",
    image:
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&h=400&fit=crop&auto=format",
    github: "#",
    demo: "#",
  },
  {
    name: "PulseBoard",
    desc: "Business intelligence dashboard with customizable widgets, data export, and team collaboration.",
    tech: ["React", "D3.js", "Node.js", "TimescaleDB", "WebSockets"],
    category: "Web",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format",
    github: "#",
    demo: "#",
  },
];

export default function ProjectsPage() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <main className="pt-16">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="section-label mb-4">Portfolio</div>
        <h1
          className="font-display text-4xl font-black mb-4"
          style={{ color: "#e2e8f0" }}
        >
          Featured <span className="neon-text-cyan">Projects</span>
        </h1>
        <p
          className="text-sm mb-12"
          style={{ color: "#64748b", maxWidth: "480px" }}
        >
          A selection of projects spanning web applications, APIs, mobile apps,
          and AI/ML systems built over the past 5 years.
        </p>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="font-display text-xs tracking-widest px-4 py-2 transition-all duration-200"
              style={{
                border: `1px solid ${active === cat ? "#00f5ff" : "#1a3a6b"}`,
                color: active === cat ? "#00f5ff" : "#475569",
                background: active === cat ? "#00f5ff10" : "transparent",
                boxShadow: active === cat ? "0 0 12px #00f5ff20" : "none",
                textShadow: active === cat ? "0 0 8px #00f5ff80" : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.name}
              className="hud-card group overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,245,255,0.1)]"
            >
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{ height: "180px", background: "#060f2a" }}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                />
                {/* Category badge */}
                <div
                  className="absolute top-3 right-3 font-mono text-xs px-2 py-0.5"
                  style={{
                    border: "1px solid #a855f740",
                    color: "#a855f7",
                    background: "#020818cc",
                  }}
                >
                  {project.category}
                </div>
                {/* Scan overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 60%, #020818 100%)",
                  }}
                />
              </div>

              <div className="p-5">
                <h3
                  className="font-display text-sm font-bold mb-2"
                  style={{ color: "#e2e8f0" }}
                >
                  {project.name}
                </h3>
                <p
                  className="text-xs leading-relaxed mb-4"
                  style={{ color: "#64748b" }}
                >
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-1.5 py-0.5"
                      style={{
                        border: "1px solid #1a3a6b",
                        color: "#475569",
                        background: "#020818",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.demo}
                    className="flex-1 text-center font-display text-xs tracking-wider py-2 transition-all duration-200"
                    style={{
                      border: "1px solid #00f5ff",
                      color: "#00f5ff",
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#00f5ff15";
                      e.currentTarget.style.boxShadow = "0 0 12px #00f5ff30";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    View Project
                  </a>
                  <a
                    href={project.github}
                    className="flex-1 text-center font-display text-xs tracking-wider py-2 transition-all duration-200"
                    style={{
                      border: "1px solid #1a3a6b",
                      color: "#64748b",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#a855f7";
                      e.currentTarget.style.color = "#a855f7";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#1a3a6b";
                      e.currentTarget.style.color = "#64748b";
                    }}
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
