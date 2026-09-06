import { ProjectFilterOption } from "./types";

interface ProjectFilterProps {
  categories: readonly ProjectFilterOption[];
  activeCategory: string;
  onSelectCategory: (categoryKey: string) => void;
}

export default function ProjectFilter({
  categories,
  activeCategory,
  onSelectCategory,
}: ProjectFilterProps) {
  return (
    <div
      className="flex flex-wrap gap-2 mb-12"
      role="tablist"
      aria-label="Project categories"
    >
      {categories.map((cat) => {
        const isActive =
          activeCategory.toLowerCase() === cat.key.toLowerCase();
        return (
          <button
            key={cat.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectCategory(cat.key)}
            className="font-display text-xs tracking-widest px-4 py-2 transition-all duration-200 cursor-pointer"
            style={{
              border: `1px solid ${isActive ? "#00f5ff" : "#1a3a6b"}`,
              color: isActive ? "#00f5ff" : "#475569",
              background: isActive ? "#00f5ff10" : "transparent",
              boxShadow: isActive ? "0 0 12px #00f5ff20" : "none",
              textShadow: isActive ? "0 0 8px #00f5ff80" : "none",
            }}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
