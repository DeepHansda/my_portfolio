"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";

export default function Contact() {
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
        setFormData({
          fullName: "",
          email: "",
          contactNumber: "",
          message: "",
        });
      }
    } catch (err) {
      toast.api(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-14 max-w-6xl mx-auto px-6">
      <div className="section-label mb-3">Get in touch</div>
      <h2
        className="font-display text-3xl font-bold mb-3"
        style={{ color: "#e2e8f0" }}
      >
        Send a <span className="neon-text-cyan">Message</span>
      </h2>
      <p className="text-sm mb-8" style={{ color: "#64748b" }}>
        Have a project in mind? Let&apos;s talk.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Info */}
        <div className="lg:col-span-2 space-y-6">
          {[
            {
              label: "Email",
              value: "deephansda921@gmail.com",
              mono: true,
              href: "mailto:deephansda921@gmail.com",
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
            {
              label: "X (Twitter)",
              value: "x.com/DeepHansda31337",
              mono: true,
              href: "https://x.com/DeepHansda31337",
            },
            {
              label: "Location",
              value: "Asansol, West Bengal",
              mono: true,
            },
          ].map((item) =>
            item.href ? (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
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
            ) : (
              <div
                key={item.label}
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
              </div>
            )
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className="font-mono text-xs block mb-2"
                style={{ color: "#475569" }}
              >
                FULL NAME *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
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

            <div>
              <label
                className="font-mono text-xs block mb-2"
                style={{ color: "#475569" }}
              >
                EMAIL *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
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
          </div>

          <div>
            <label
              className="font-mono text-xs block mb-2"
              style={{ color: "#475569" }}
            >
              CONTACT NUMBER
            </label>
            <input
              type="tel"
              value={formData.contactNumber}
              onChange={(e) =>
                setFormData({ ...formData, contactNumber: e.target.value })
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
            disabled={loading}
            className="glowing-btn-solid w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "// Transmitting..."
              : sent
                ? "// Message Transmitted ✓"
                : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
