"use client";

import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

export interface HtmlRendererProps {
  html: string;
  className?: string;
}

/**
 * Dedicated component to safely render HTML strings using dangerouslySetInnerHTML
 * sanitized with DOMPurify to prevent XSS.
 * Includes cyberpunk theme styling for lists, typography, and links.
 */
export default function HtmlRenderer({
  html,
  className = "",
}: HtmlRendererProps) {
  const [sanitizedHtml, setSanitizedHtml] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return DOMPurify.sanitize(html);
    }
    return "";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSanitizedHtml(DOMPurify.sanitize(html));
    }
  }, [html]);

  return (
    <div
      className={`prose-cyber [&_ul]:space-y-2 [&_ul]:my-2 [&_li]:flex [&_li]:items-start [&_li]:gap-2.5 [&_li]:text-sm [&_li]:text-slate-300 [&_li]:leading-relaxed [&_li::before]:content-['▸'] [&_li::before]:text-cyan-400 [&_li::before]:shrink-0 [&_li::before]:mt-0.5 [&_p]:text-sm [&_p]:text-slate-300 [&_p]:leading-relaxed [&_strong]:text-slate-100 [&_strong]:font-semibold [&_a]:text-cyan-400 [&_a]:underline hover:[&_a]:text-cyan-300 ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
