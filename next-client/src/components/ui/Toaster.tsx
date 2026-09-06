"use client";

import React, { useEffect, useState } from "react";
import { useToasts, toast, ToastItem, ToastType } from "@/lib/toast";

const typeStyles: Record<
  ToastType,
  {
    borderColor: string;
    glowColor: string;
    accentColor: string;
    tag: string;
    header: string;
    icon: string;
  }
> = {
  success: {
    borderColor: "#39ff14",
    glowColor: "rgba(57, 255, 20, 0.25)",
    accentColor: "#39ff14",
    tag: "[ OK ]",
    header: "TRANSMISSION_SUCCESS",
    icon: "✓",
  },
  error: {
    borderColor: "#ff5f57",
    glowColor: "rgba(255, 95, 87, 0.25)",
    accentColor: "#ff5f57",
    tag: "[ ERR ]",
    header: "SYSTEM_ALERT",
    icon: "✕",
  },
  warning: {
    borderColor: "#ffbd2e",
    glowColor: "rgba(255, 189, 46, 0.25)",
    accentColor: "#ffbd2e",
    tag: "[ WARN ]",
    header: "DIAGNOSTIC_WARNING",
    icon: "▲",
  },
  info: {
    borderColor: "#00f5ff",
    glowColor: "rgba(0, 245, 255, 0.25)",
    accentColor: "#00f5ff",
    tag: "[ SYS ]",
    header: "TELEMETRY_LOG",
    icon: "ℹ",
  },
  loading: {
    borderColor: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.25)",
    accentColor: "#a855f7",
    tag: "[ BUSY ]",
    header: "PROCESSING_PACKET",
    icon: "◷",
  },
};

interface ToastCardProps {
  toastItem: ToastItem;
}

function ToastCard({ toastItem }: ToastCardProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [remainingTime, setRemainingTime] = useState(toastItem.duration || 4500);
  const config = typeStyles[toastItem.type];

  useEffect(() => {
    if (!toastItem.duration || toastItem.duration <= 0 || isPaused) return;

    const interval = 50;
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= interval) {
          clearInterval(timer);
          toast.dismiss(toastItem.id);
          return 0;
        }
        return prev - interval;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [toastItem.id, toastItem.duration, isPaused]);

  const progressPercent =
    toastItem.duration && toastItem.duration > 0
      ? Math.max(0, Math.min(100, (remainingTime / toastItem.duration) * 100))
      : 100;

  return (
    <div
      role={toastItem.type === "error" ? "alert" : "status"}
      aria-live={toastItem.type === "error" ? "assertive" : "polite"}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="pointer-events-auto relative w-full overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
      style={{
        background: "rgba(6, 15, 42, 0.95)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${config.borderColor}`,
        boxShadow: `0 0 16px ${config.glowColor}, inset 0 0 12px ${config.glowColor}`,
        clipPath:
          "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
      }}
    >
      {/* HUD Header bar */}
      <div
        className="flex items-center justify-between px-3 py-1.5 border-b"
        style={{
          borderColor: `${config.borderColor}33`,
          background: "rgba(2, 8, 24, 0.7)",
        }}
      >
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span
            style={{
              color: config.accentColor,
              textShadow: `0 0 6px ${config.accentColor}`,
            }}
          >
            {config.tag}
          </span>
          <span className="text-slate-400 tracking-wider text-[10px]">
            {config.header}
          </span>
        </div>

        <button
          type="button"
          onClick={() => toast.dismiss(toastItem.id)}
          aria-label="Dismiss notification"
          className="font-mono text-xs text-slate-400 hover:text-white transition-colors px-1"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="p-3.5 space-y-2">
        <div className="flex items-start gap-2.5">
          <span
            className={`font-mono text-sm leading-none mt-0.5 ${
              toastItem.type === "loading" ? "animate-spin" : ""
            }`}
            style={{ color: config.accentColor }}
          >
            {config.icon}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-100 font-sans break-words leading-snug">
              {toastItem.message}
            </p>

            {/* Error details or bullet points from API response */}
            {Array.isArray(toastItem.details) && toastItem.details.length > 0 && (
              <div className="mt-2 pt-2 border-t border-slate-800">
                <div className="font-mono text-[10px] text-slate-400 mb-1">
                  // ERROR_LOGS:
                </div>
                <ul className="space-y-1 font-mono text-[11px] text-red-300/90">
                  {toastItem.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 break-words">
                      <span className="text-red-500 select-none">›</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {typeof toastItem.details === "string" && toastItem.details && (
              <div className="mt-2 pt-2 border-t border-slate-800 font-mono text-[11px] text-slate-400 break-words">
                <span className="text-cyan-400/80 mr-1">&gt;</span>
                {toastItem.details}
              </div>
            )}
          </div>
        </div>

        {/* Action Button (if provided) */}
        {toastItem.action && (
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => {
                toastItem.action?.onClick();
                toast.dismiss(toastItem.id);
              }}
              className="font-mono text-xs px-2.5 py-1 border transition-all hover:bg-white/10"
              style={{
                borderColor: config.borderColor,
                color: config.accentColor,
              }}
            >
              {toastItem.action.label}
            </button>
          </div>
        )}
      </div>

      {/* Auto-dismiss countdown bar */}
      {toastItem.duration && toastItem.duration > 0 && (
        <div className="h-[2px] w-full bg-slate-900 overflow-hidden">
          <div
            className="h-full transition-all duration-75 ease-linear"
            style={{
              width: `${progressPercent}%`,
              background: config.accentColor,
              boxShadow: `0 0 6px ${config.accentColor}`,
            }}
          />
        </div>
      )}
    </div>
  );
}

/**
 * Global HUD Toaster Mount Component
 */
export default function Toaster() {
  const activeToasts = useToasts();

  if (activeToasts.length === 0) return null;

  return (
    <aside
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 w-full max-w-[360px] pointer-events-none sm:px-0 px-4"
    >
      {activeToasts.map((item) => (
        <ToastCard key={item.id} toastItem={item} />
      ))}
    </aside>
  );
}
