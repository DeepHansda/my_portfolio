import React from "react";

export default function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center py-10">
      <div className="relative w-2 bg-gray-300 h-full left-1/2 -translate-x-1/2"></div>
      <div className="absolute flex flex-col w-full max-w-3xl">{children}</div>
    </div>
  );
}
