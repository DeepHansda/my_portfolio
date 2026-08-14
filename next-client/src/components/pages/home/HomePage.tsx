"use client";

import { useState } from "react";
import Link from "next/link";
import HeroSection from "@/components/pages/home/HeroSection";

const skills = {
  Frontend: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  Backend: ["Node.js", "NestJS", "Django", "REST APIs"],
  Database: ["PostgreSQL", "MongoDB"],
  "Cloud & DevOps": ["AWS", "GCP", "Docker", "CI/CD"],
  Tools: ["Git", "GitHub", "VS Code", "Figma"],
};

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

const experience = [
  {
    role: "Senior Software Developer",
    company: "NexaCore Systems",
    period: "2023 — Present",
    location: "Remote · San Francisco, CA",
    items: [
      "Architected and shipped a real-time dashboard serving 50K+ concurrent users",
      "Led migration of legacy monolith to microservices, reducing latency by 60%",
      "Built reusable React component library adopted across 4 product teams",
      "Developed REST API integrations with Stripe, Twilio, and AWS services",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
  },
  {
    role: "Full-Stack Developer",
    company: "Orbital Labs",
    period: "2021 — 2023",
    location: "Hybrid · Austin, TX",
    items: [
      "Developed and maintained web applications for 3 enterprise clients",
      "Implemented CI/CD pipelines reducing deployment time from hours to minutes",
      "Integrated third-party services including payment gateways and analytics",
      "Improved application performance by 40% through query optimization",
    ],
    tech: ["Next.js", "NestJS", "MongoDB", "GCP", "TypeScript"],
  },
  {
    role: "Frontend Developer",
    company: "Pixel Forge Studio",
    period: "2019 — 2021",
    location: "On-site · New York, NY",
    items: [
      "Built pixel-perfect responsive interfaces from Figma designs",
      "Contributed to open-source component library with 2K+ GitHub stars",
      "Collaborated with design and product teams in 2-week sprint cycles",
    ],
    tech: ["React", "JavaScript", "Tailwind CSS", "Figma"],
  },
];

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main>
      <HeroSection />

      {/* Intro */}
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
                I'm a passionate software developer focused on building
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

      {/* Skills */}
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

      {/* Services */}
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

      {/* Experience */}
      <section
        className="py-24"
        style={{
          background:
            "linear-gradient(180deg, transparent, #060f2a60, transparent)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-label mb-4">Career timeline</div>
          <h2
            className="font-display text-3xl font-bold mb-12"
            style={{ color: "#e2e8f0" }}
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

            <div className="space-y-10">
              {experience.map((exp, i) => (
                <div key={i} className="sm:pl-20 relative">
                  {/* Timeline dot */}
                  <div
                    className="absolute left-0 lg:left-8 top-6 w-3 h-3 rounded-full hidden sm:block -translate-x-1/2"
                    style={{
                      background: "#00f5ff",
                      boxShadow: "0 0 10px #00f5ff",
                    }}
                  />

                  <div className="hud-card p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3
                          className="font-display text-base font-bold"
                          style={{ color: "#e2e8f0" }}
                        >
                          {exp.role}
                        </h3>
                        <div
                          className="font-mono text-xs mt-1"
                          style={{ color: "#00f5ff" }}
                        >
                          {exp.company}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className="font-mono text-xs"
                          style={{ color: "#a855f7" }}
                        >
                          {exp.period}
                        </div>
                        <div
                          className="font-mono text-xs mt-1"
                          style={{ color: "#475569" }}
                        >
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex gap-3 text-sm"
                          style={{ color: "#94a3b8" }}
                        >
                          <span style={{ color: "#00f5ff40" }}>▸</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-xs px-2 py-0.5"
                          style={{
                            border: "1px solid #a855f740",
                            color: "#a855f7",
                            background: "#a855f710",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="section-label mb-4">Get in touch</div>
        <h2
          className="font-display text-3xl font-bold mb-4"
          style={{ color: "#e2e8f0" }}
        >
          Send a <span className="neon-text-cyan">Message</span>
        </h2>
        <p className="text-sm mb-12" style={{ color: "#64748b" }}>
          Have a project in mind? Let's talk.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              {
                label: "Email",
                value: "deephansda@gmail.com",
                mono: true,
                href: "mailto:deephansda@gmail.com",
              },
              {
                label: "GitHub",
                value: "github.com/DeepHansda",
                mono: true,
                href: "https://github.com/DeepHansda",
              },
              {
                label: "LinkedIn",
                value: "linkedin.com/in/deep-hansda-44627a20a",
                mono: true,
                href: "https://www.linkedin.com/in/deep-hansda-44627a20a/",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hud-card p-4 block hover:border-[#00f5ff50] transition-colors"
              >
                <div
                  className="font-mono text-xs mb-1"
                  style={{ color: "#475569" }}
                >
                  {item.label}
                </div>
                <div className="font-mono text-sm" style={{ color: "#00f5ff" }}>
                  {item.value}
                </div>
              </a>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["name", "email"].map((field) => (
                <div key={field}>
                  <label
                    className="font-mono text-xs block mb-2"
                    style={{ color: "#475569" }}
                  >
                    {field.toUpperCase()} *
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    required
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    className="w-full bg-transparent px-4 py-3 font-mono text-sm outline-none transition-all duration-200"
                    style={{
                      border: "1px solid #1a3a6b",
                      color: "#e2e8f0",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "#00f5ff")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "#1a3a6b")
                    }
                  />
                </div>
              ))}
            </div>

            <div>
              <label
                className="font-mono text-xs block mb-2"
                style={{ color: "#475569" }}
              >
                SUBJECT *
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full bg-transparent px-4 py-3 font-mono text-sm outline-none transition-all duration-200"
                style={{ border: "1px solid #1a3a6b", color: "#e2e8f0" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#00f5ff")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#1a3a6b")}
              />
            </div>

            <div>
              <label
                className="font-mono text-xs block mb-2"
                style={{ color: "#475569" }}
              >
                MESSAGE *
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-transparent px-4 py-3 font-mono text-sm outline-none transition-all duration-200 resize-none"
                style={{ border: "1px solid #1a3a6b", color: "#e2e8f0" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#00f5ff")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#1a3a6b")}
              />
            </div>

            <button
              type="submit"
              className="glowing-btn-solid w-full sm:w-auto"
            >
              {sent ? "// Message Transmitted ✓" : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 text-center"
        style={{ borderTop: "1px solid #1a3a6b" }}
      >
        <div className="font-mono text-xs" style={{ color: "#475569" }}>
          {"// DEEP HANSDA © 2026 — Built with React + Next.js + TypeScript"}
        </div>
      </footer>
    </main>
  );
}
