import React from "react";

export default function ContainerWithTitle({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-8">
      <div className="pb-4 border-b max-w-80 border-white/30">
        <h2 className="text-5xl">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
}
