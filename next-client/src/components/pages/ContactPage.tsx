"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3400";
      const res = await fetch(`${apiUrl}/api/createContact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          contactNumber: formData.contactNumber,
          message: formData.message,
        }),
      });

      const json = await res.json();
      const result = toast.api(json);

      if (result.success) {
        setSent(true);
        setTimeout(() => setSent(false), 4000);
        setFormData({ fullName: "", email: "", contactNumber: "", message: "" });
      }
    } catch (err) {
      toast.api(err);
    } finally {
      setLoading(false);
    }
  };

  const inputBase = {
    border: "1px solid #1a3a6b",
    color: "#e2e8f0",
  };


  return (
    <main className="pt-16">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="section-label mb-4">Establish connection</div>
        <h1
          className="font-display text-4xl font-black mb-4"
          style={{ color: "#e2e8f0" }}
        >
          Get In <span className="neon-text-cyan">Touch</span>
        </h1>
        <p
          className="text-sm mb-16"
          style={{ color: "#64748b", maxWidth: "480px" }}
        >
          Whether you have a project, a question, or just want to connect — I'm
          always open to a conversation.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact details */}
            <div className="hud-card p-6 space-y-5">
              <div
                className="font-mono text-xs mb-2"
                style={{ color: "#00f5ff60" }}
              >
                {"> CONTACT_INFO.json"}
              </div>

              {[
                { label: "Email", value: "alex@voss.dev", icon: "✉" },
                { label: "Phone", value: "+1 (415) 555-0182", icon: "◉" },
                { label: "Location", value: "San Francisco, CA", icon: "◎" },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 items-start">
                  <span
                    className="font-mono text-sm mt-0.5"
                    style={{ color: "#00f5ff40" }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <div
                      className="font-mono text-xs mb-0.5"
                      style={{ color: "#475569" }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="font-mono text-sm"
                      style={{ color: "#e2e8f0" }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="hud-card p-6">
              <div
                className="font-mono text-xs mb-4"
                style={{ color: "#00f5ff60" }}
              >
                {"> SOCIAL_LINKS"}
              </div>
              <div className="space-y-3">
                {[
                  {
                    label: "GitHub",
                    handle: "@alexvoss",
                    href: "#",
                    color: "#e2e8f0",
                  },
                  {
                    label: "LinkedIn",
                    handle: "in/alexvoss",
                    href: "#",
                    color: "#0a66c2",
                  },
                  {
                    label: "Twitter",
                    handle: "@alexvoss_dev",
                    href: "#",
                    color: "#1da1f2",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex items-center justify-between py-2 transition-all duration-200 group"
                    style={{ borderBottom: "1px solid #1a3a6b10" }}
                  >
                    <span
                      className="font-mono text-xs"
                      style={{ color: "#475569" }}
                    >
                      {social.label}
                    </span>
                    <span
                      className="font-mono text-xs transition-all duration-200 group-hover:neon-text-cyan"
                      style={{ color: "#64748b" }}
                    >
                      {social.handle}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="hud-card p-5">
              <div className="flex items-center gap-3">
                <span
                  className="w-2.5 h-2.5 rounded-full glow-pulse"
                  style={{
                    background: "#39ff14",
                    boxShadow: "0 0 8px #39ff14",
                  }}
                />
                <div>
                  <div
                    className="font-mono text-xs"
                    style={{ color: "#39ff14" }}
                  >
                    AVAILABLE FOR WORK
                  </div>
                  <div
                    className="font-mono text-xs mt-0.5"
                    style={{ color: "#475569" }}
                  >
                    Open to freelance &amp; full-time roles
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <div
              className="terminal-window"
              style={{ boxShadow: "0 0 30px rgba(0,245,255,0.08)" }}
            >
              <div className="terminal-header">
                <span
                  className="terminal-dot"
                  style={{ background: "#ff5f57" }}
                />
                <span
                  className="terminal-dot"
                  style={{ background: "#ffbd2e" }}
                />
                <span
                  className="terminal-dot"
                  style={{ background: "#28c840" }}
                />
                <span
                  className="ml-2 font-mono text-xs"
                  style={{ color: "#475569" }}
                >
                  compose_message.sh
                </span>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="font-mono text-xs block mb-2"
                      style={{ color: "#475569" }}
                    >
                      <span style={{ color: "#00f5ff40" }}>$ </span>FULL_NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full bg-transparent px-4 py-3 font-mono text-sm outline-none transition-all duration-200"
                      style={inputBase}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#00f5ff";
                        e.currentTarget.style.boxShadow =
                          "0 0 10px #00f5ff20";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#1a3a6b";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="font-mono text-xs block mb-2"
                      style={{ color: "#475569" }}
                    >
                      <span style={{ color: "#00f5ff40" }}>$ </span>EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-transparent px-4 py-3 font-mono text-sm outline-none transition-all duration-200"
                      style={inputBase}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#00f5ff";
                        e.currentTarget.style.boxShadow =
                          "0 0 10px #00f5ff20";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#1a3a6b";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="font-mono text-xs block mb-2"
                    style={{ color: "#475569" }}
                  >
                    <span style={{ color: "#00f5ff40" }}>$ </span>CONTACT_NUMBER
                  </label>
                  <input
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, contactNumber: e.target.value })
                    }
                    className="w-full bg-transparent px-4 py-3 font-mono text-sm outline-none transition-all duration-200"
                    style={inputBase}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#00f5ff";
                      e.currentTarget.style.boxShadow = "0 0 10px #00f5ff20";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#1a3a6b";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div>
                  <label
                    className="font-mono text-xs block mb-2"
                    style={{ color: "#475569" }}
                  >
                    <span style={{ color: "#00f5ff40" }}>$ </span>MESSAGE *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-transparent px-4 py-3 font-mono text-sm outline-none transition-all duration-200 resize-none"
                    style={inputBase}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#00f5ff";
                      e.currentTarget.style.boxShadow = "0 0 10px #00f5ff20";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#1a3a6b";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="glowing-btn-solid w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="animate-pulse">{"// Transmitting..."}</span>
                  ) : sent ? (
                    <span style={{ color: "#39ff14" }}>
                      {"// Transmission Successful ✓"}
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>

                <div
                  className="font-mono text-xs text-center"
                  style={{ color: "#1a3a6b" }}
                >
                  {"// encrypted · secure · delivered"}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
