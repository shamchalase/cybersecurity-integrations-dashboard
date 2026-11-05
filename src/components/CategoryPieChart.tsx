"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart as PieChartIcon, Filter, RotateCcw, Sparkles } from "lucide-react";
import { integrations, categoryNames } from "@/data/integrations";
import { useLanguage } from "@/context/LanguageContext";

const ALL = "All Integrations";

const categoryColors: Record<string, { color: string; bg: string; border: string }> = {
  "Threat Intelligence": { color: "#3b82f6", bg: "rgba(59, 130, 246, 0.08)", border: "rgba(59, 130, 246, 0.28)" },
  CSPM: { color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.08)", border: "rgba(139, 92, 246, 0.28)" },
  "Email Security": { color: "#f59e0b", bg: "rgba(245, 158, 11, 0.08)", border: "rgba(245, 158, 11, 0.28)" },
  CNAPP: { color: "#06b6d4", bg: "rgba(6, 182, 212, 0.08)", border: "rgba(6, 182, 212, 0.28)" },
  "IT Operations": { color: "#10b981", bg: "rgba(16, 185, 129, 0.08)", border: "rgba(16, 185, 129, 0.28)" },
  SOAR: { color: "#f43f5e", bg: "rgba(244, 63, 94, 0.08)", border: "rgba(244, 63, 94, 0.28)" },
  SIEM: { color: "#6366f1", bg: "rgba(99, 102, 241, 0.08)", border: "rgba(99, 102, 241, 0.28)" },
  "Cloud Security": { color: "#14b8a6", bg: "rgba(20, 184, 166, 0.08)", border: "rgba(20, 184, 166, 0.28)" }
};

type Props = {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
};

export default function CategoryPieChart({ activeCategory, onSelectCategory }: Props) {
  const { t } = useLanguage();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const total = integrations.length;

  const categories = useMemo(() => {
    const rawCategories = categoryNames.filter((cat) => cat !== ALL);
    const counts = integrations.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    return rawCategories.map((name) => {
      const count = counts[name] || 0;
      const palette = categoryColors[name] || {
        color: "#4f46e5",
        bg: "rgba(79, 70, 229, 0.08)",
        border: "rgba(79, 70, 229, 0.25)"
      };
      const pct = total > 0 ? (count / total) * 100 : 0;
      return {
        name,
        count,
        pct: Number(pct.toFixed(1)),
        ...palette
      };
    });
  }, [total]);

  // Donut geometry constants
  const size = 230;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2 - 4;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  // Compute SVG stroke-dasharray and stroke-dashoffset for each slice
  let accumulatedOffset = 0;
  const slices = categories.map((cat) => {
    const fraction = total > 0 ? cat.count / total : 0;
    const arcLength = fraction * circumference;
    const gap = categories.length > 1 ? 2.5 : 0;
    const dash = Math.max(0.5, arcLength - gap);
    const offset = accumulatedOffset;
    accumulatedOffset += arcLength;

    return {
      ...cat,
      dash,
      offset
    };
  });

  const activeOrHovered = hoveredCategory
    ? categories.find((c) => c.name === hoveredCategory)
    : activeCategory !== ALL
    ? categories.find((c) => c.name === activeCategory)
    : null;

  return (
    <motion.div
      className="dir-analytics-panel"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Small boxes above the chart showing color swatch, category name, and count */}
      <div className="dir-legend-wrapper">
        <div className="dir-legend-header">
          <div className="dir-legend-heading">
            <span className="dir-legend-badge">
              <Sparkles size={14} aria-hidden="true" />
              {t("Category Breakdown")}
            </span>
            <span className="dir-legend-subtext">
              {t("Click any slice or box to filter integrations")}
            </span>
          </div>

          {activeCategory !== ALL && (
            <button
              type="button"
              className="dir-chart-reset-btn"
              onClick={() => onSelectCategory(ALL)}
            >
              <RotateCcw size={13} />
              {t("Reset Chart Filter")}
            </button>
          )}
        </div>

        <div className="dir-legend-grid">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.name;
            const isHovered = hoveredCategory === cat.name;

            return (
              <button
                key={cat.name}
                type="button"
                className={`dir-legend-box ${isSelected ? "is-selected" : ""} ${isHovered ? "is-hovered" : ""}`}
                style={{
                  borderColor: isSelected || isHovered ? cat.color : cat.border,
                  backgroundColor: isSelected ? cat.bg : undefined
                }}
                onClick={() => onSelectCategory(isSelected ? ALL : cat.name)}
                onMouseEnter={() => setHoveredCategory(cat.name)}
                onMouseLeave={() => setHoveredCategory(null)}
                aria-pressed={isSelected}
                title={`${t(cat.name)}: ${cat.count} ${t("integrations")}`}
              >
                <div className="dir-legend-box-top">
                  <span
                    className="dir-legend-swatch"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="dir-legend-pct">{cat.pct}%</span>
                </div>
                <strong className="dir-legend-box-name">{t(cat.name)}</strong>
                <span className="dir-legend-box-count">
                  {cat.count} <small>{t("integrations")}</small>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Pie / Donut Chart Display */}
      <div className="dir-chart-body">
        <div className="dir-chart-visual">
          <div className="dir-chart-svg-wrap">
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className="dir-donut-svg"
            >
              {/* Background track circle */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="#eef2f9"
                strokeWidth={strokeWidth}
              />

              {/* Slices group rotated -90deg so first slice starts at 12 o'clock */}
              <g transform={`rotate(-90 ${center} ${center})`}>
                {slices.map((slice) => {
                  const isHovered = hoveredCategory === slice.name;
                  const isSelected = activeCategory === slice.name;
                  const isDimmed =
                    (hoveredCategory && hoveredCategory !== slice.name) ||
                    (activeCategory !== ALL && activeCategory !== slice.name && !hoveredCategory);

                  return (
                    <circle
                      key={slice.name}
                      cx={center}
                      cy={center}
                      r={radius}
                      fill="none"
                      stroke={slice.color}
                      strokeWidth={isHovered || isSelected ? strokeWidth + 5 : strokeWidth}
                      strokeDasharray={`${slice.dash} ${circumference}`}
                      strokeDashoffset={-slice.offset}
                      strokeLinecap="round"
                      className="dir-donut-slice"
                      style={{
                        opacity: isDimmed ? 0.35 : 1,
                        filter: isHovered || isSelected ? `drop-shadow(0 0 10px ${slice.color}90)` : "none"
                      }}
                      onMouseEnter={() => setHoveredCategory(slice.name)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      onClick={() => onSelectCategory(isSelected ? ALL : slice.name)}
                    />
                  );
                })}
              </g>
            </svg>

            {/* Donut Center Readout */}
            <div className="dir-donut-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeOrHovered ? activeOrHovered.name : "all"}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.15 }}
                  className="dir-donut-center-inner"
                >
                  <span className="dir-donut-count">
                    {activeOrHovered ? activeOrHovered.count : total}
                  </span>
                  <span className="dir-donut-label">
                    {activeOrHovered ? t(activeOrHovered.name) : t("Total Integrations")}
                  </span>
                  <span className="dir-donut-sub">
                    {activeOrHovered ? `${activeOrHovered.pct}% ${t("of total")}` : `${categories.length} ${t("Categories")}`}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Informative Side Panel */}
        <div className="dir-chart-side-panel">
          <div className="dir-chart-info-card">
            <div className="dir-chart-info-head">
              <PieChartIcon size={18} className="dir-chart-info-icon" />
              <strong>{t("Interactive Ecosystem Distribution")}</strong>
            </div>
            <p className="dir-chart-info-desc">
              {t("Explore the Metron integration ecosystem. Connect the security and IT operations platforms your teams rely on.")}
            </p>

            <div className="dir-chart-stat-rows">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className={`dir-chart-stat-row ${activeCategory === cat.name ? "is-active" : ""}`}
                  onClick={() => onSelectCategory(activeCategory === cat.name ? ALL : cat.name)}
                >
                  <div className="dir-stat-row-label">
                    <span className="dir-stat-dot" style={{ backgroundColor: cat.color }} />
                    <span>{t(cat.name)}</span>
                  </div>
                  <div className="dir-stat-row-bar-wrap">
                    <div className="dir-stat-row-bar">
                      <span
                        style={{
                          width: `${cat.pct}%`,
                          backgroundColor: cat.color
                        }}
                      />
                    </div>
                    <span className="dir-stat-row-pct">{cat.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

