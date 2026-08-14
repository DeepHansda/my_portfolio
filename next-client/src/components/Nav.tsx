"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(2, 8, 24, 0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(0,245,255,0.15)",
        boxShadow: "0 0 30px rgba(0,245,255,0.05)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-sm font-bold tracking-widest neon-text-cyan"
        >
          {"<DEEP.HANSDA />"}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 font-display text-xs tracking-widest uppercase transition-all duration-300"
                style={{
                  color: isActive ? "#00f5ff" : "#94a3b8",
                  textShadow: isActive ? "0 0 10px #00f5ff80" : "none",
                }}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-4 right-4 h-px"
                    style={{
                      background: "#00f5ff",
                      boxShadow: "0 0 8px #00f5ff",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-px w-6 transition-all duration-300"
              style={{ background: "#00f5ff" }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-6 pb-4 flex flex-col gap-1"
          style={{ borderTop: "1px solid rgba(0,245,255,0.1)" }}
        >
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-left font-display text-xs tracking-widest uppercase"
                style={{ color: isActive ? "#00f5ff" : "#94a3b8" }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
