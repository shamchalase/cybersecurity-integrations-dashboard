"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { SyntheticEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, X, ArrowUpRight, Layers3, LayoutGrid, List, ArrowDownAZ, Sparkles, Grid3x3, ChevronDown } from "lucide-react";
import { integrations, categoryNames } from "@/data/integrations";
import type { Integration } from "@/types/integration";
import IntegrationModal from "@/components/IntegrationModal";
import CategoryPieChart from "@/components/CategoryPieChart";
import { useLanguage } from "@/context/LanguageContext";

const ALL = "All Integrations";

const categoryTones: Record<string, string> = {
  "Threat Intelligence": "blue",
  CSPM: "violet",
  "Email Security": "amber",
  CNAPP: "cyan",
  "IT Operations": "green",
  SOAR: "rose",
  SIEM: "indigo",
  "Cloud Security": "teal"
};

type View = "tiles" | "grid" | "list";

// How many items load at first, and with each "Load more" click
const PAGE_SIZE: Record<View, number> = { tiles: 48, grid: 12, list: 10 };

function initials(name: string) {
  const clean = name.replace(/[^a-zA-Z0-9 ]/g, " ").trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
  return clean.slice(0, 2).toUpperCase();
}

type WithLogo = Integration & { logo?: string; domain?: string };

// Shows the real logo when available, falls back to initials (QU, RA...)
function Logo({ item, tile = false }: { item: WithLogo; tile?: boolean }) {
  const [failed, setFailed] = useState(false);
  const src =
    item.logo ||
    (item.domain
      ? `https://www.google.com/s2/favicons?domain=${item.domain}&sz=128`
      : undefined);

  if (tile) {
    return !src || failed ? (
      <span className="dir-tile-initials" aria-hidden="true">
        {initials(item.name)}
      </span>
    ) : (
      <img
        className="dir-tile-img"
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }

  if (!src || failed) {
    return (
      <span className="dir-mark" aria-hidden="true">
        {initials(item.name)}
      </span>
    );
  }

  return (
    <span className="dir-mark has-logo">
      <img
        src={src}
        alt={`${item.name} logo`}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

// Decide where the hover popover opens so it never goes off screen
function placePopover(event: SyntheticEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const half = 112;
  const cx = rect.left + rect.width / 2;
  el.dataset.h = cx - half < 12 ? "left" : cx + half > window.innerWidth - 12 ? "right" : "center";
  el.dataset.v = rect.top < 240 ? "below" : "above";
}

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const index = text.toLowerCase().indexOf(q.toLowerCase());
  if (index === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <mark>{text.slice(index, index + q.length)}</mark>
      {text.slice(index + q.length)}
    </>
  );
}

export default function IntegrationDirectory() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [selected, setSelected] = useState<Integration | null>(null);
  const [view, setView] = useState<View>("tiles");
  const [sortAZ, setSortAZ] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE.tiles);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduceMotion = useReducedMotion();

  // Cmd/Ctrl + K or "/" focuses search
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      } else if (event.key === "/" && !typing) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const counts = useMemo(() => {
    return integrations.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const list = integrations.filter((item) => {
      const matchesCategory = activeCategory === ALL || item.category === activeCategory;
      if (!matchesCategory) return false;
      if (!normalized) return true;

      const translatedCategory = t(item.category).toLowerCase();
      return (
        item.name.toLowerCase().includes(normalized) ||
        item.category.toLowerCase().includes(normalized) ||
        translatedCategory.includes(normalized)
      );
    });
    return sortAZ ? [...list].sort((a, b) => a.name.localeCompare(b.name)) : list;
  }, [query, activeCategory, sortAZ, t]);

  // Start from the first page again whenever the list changes
  useEffect(() => {
    setVisible(PAGE_SIZE[view]);
  }, [query, activeCategory, sortAZ, view]);

  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;
  const step = PAGE_SIZE[view];
  const progress = filtered.length ? Math.round((shown.length / filtered.length) * 100) : 0;

  const resetFilters = () => {
    setQuery("");
    setActiveCategory(ALL);
  };

  const hasFilters = query !== "" || activeCategory !== ALL;

  return (
    <section id="integrations" className="dir">
      <div className="dir-inner">
        {/* Header */}
        <header className="dir-header">
          <div className="dir-header-copy">
            <p className="dir-kicker">
              <Sparkles size={15} aria-hidden="true" />
              {t("Integration ecosystem")}
            </p>
            <h2>
              {t("One ecosystem for")} <em>{t("connected security")}</em>
            </h2>
            <p className="dir-lede">
              {t("Browse the platforms that work with Metron and find the tools your team already relies on.")}
            </p>
          </div>

          <dl className="dir-stats">
            <div>
              <dt>{t("Integrations")}</dt>
              <dd>{integrations.length}</dd>
            </div>
            <div>
              <dt>{t("Categories")}</dt>
              <dd>{Object.keys(counts).length}</dd>
            </div>
          </dl>
        </header>

        {/* Interactive Category Breakdown Pie Chart & Color Metric Boxes */}
        <CategoryPieChart
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
        />

        {/* Controls */}
        <div className="dir-controls">
          <div className="dir-search">
            <Search size={19} aria-hidden="true" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("Search by name or category")}
              aria-label={t("Search integrations")}
              autoComplete="off"
            />
            {query ? (
              <button className="dir-icon-btn" onClick={() => setQuery("")} aria-label={t("Clear search")}>
                <X size={16} />
              </button>
            ) : (
              <kbd aria-hidden="true">⌘K</kbd>
            )}
          </div>

          <div className="dir-tools">
            <button
              type="button"
              className={`dir-toggle ${sortAZ ? "is-on" : ""}`}
              onClick={() => setSortAZ((v) => !v)}
              aria-pressed={sortAZ}
              title={t("Sort A to Z")}
            >
              <ArrowDownAZ size={16} />
              <span>{t("A–Z")}</span>
            </button>
            <div className="dir-segment" role="group" aria-label={t("Layout")}>
              <button
                type="button"
                className={view === "tiles" ? "is-on" : ""}
                onClick={() => setView("tiles")}
                aria-pressed={view === "tiles"}
                aria-label={t("Compact tiles")}
                title={t("Compact tiles")}
              >
                <Grid3x3 size={16} />
              </button>
              <button
                type="button"
                className={view === "grid" ? "is-on" : ""}
                onClick={() => setView("grid")}
                aria-pressed={view === "grid"}
                aria-label={t("Grid view")}
                title={t("Grid view")}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                type="button"
                className={view === "list" ? "is-on" : ""}
                onClick={() => setView("list")}
                aria-pressed={view === "list"}
                aria-label={t("List view")}
                title={t("List view")}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Category filters */}
        <div className="dir-filters" role="group" aria-label={t("Filter integrations by category")}>
          {categoryNames.map((category) => {
            const count = category === ALL ? integrations.length : counts[category] || 0;
            const active = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`dir-chip ${active ? "is-active" : ""}`}
                data-tone={categoryTones[category] || "neutral"}
                aria-pressed={active}
              >
                {category !== ALL && <i className="dir-chip-dot" aria-hidden="true" />}
                {t(category)}
                <span>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="dir-status" aria-live="polite">
          <span>
            {t("Showing")} <strong>{shown.length}</strong> {t("of")} {filtered.length}
            {activeCategory !== ALL && <> {t("in")} {t(activeCategory)}</>}
          </span>
          {hasFilters && (
            <button className="dir-link" onClick={resetFilters}>
              {t("Reset filters")}
            </button>
          )}
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <>
          <motion.div layout={!reduceMotion} className={`dir-grid ${view === "list" ? "is-list" : view === "tiles" ? "is-tiles" : ""}`}>
            <AnimatePresence mode="popLayout">
              {shown.map((item, index) =>
                view === "tiles" ? (
                  <motion.button
                    layout={!reduceMotion}
                    key={`${item.category}-${item.name}-${index}`}
                    type="button"
                    className="dir-tile"
                    data-tone={categoryTones[item.category] || "blue"}
                    aria-label={`${item.name}, ${t(item.category)}`}
                    onClick={() => setSelected(item)}
                    onMouseEnter={placePopover}
                    onFocus={placePopover}
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.16, delay: reduceMotion ? 0 : Math.min(index * 0.005, 0.1) }}
                  >
                    <Logo item={item as WithLogo} tile />
                    <span className="dir-tile-cat" aria-hidden="true">
                      {t(item.category)}
                    </span>
                    <span className="dir-pop" aria-hidden="true">
                      <span className="dir-pop-head">
                        <Logo item={item as WithLogo} />
                        <span className="dir-pop-name">{item.name}</span>
                      </span>
                      <span className="dir-card-cat">
                        <i />
                        {t(item.category)}
                      </span>
                      <span className="dir-pop-go">
                        {t("View details")} <ArrowUpRight size={14} />
                      </span>
                    </span>
                  </motion.button>
                ) : (
                <motion.button
                  layout={!reduceMotion}
                  key={`${item.category}-${item.name}-${index}`}
                  type="button"
                  className="dir-card"
                  data-tone={categoryTones[item.category] || "blue"}
                  onClick={() => setSelected(item)}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.18, delay: reduceMotion ? 0 : Math.min(index * 0.01, 0.12) }}
                >
                  <Logo item={item as WithLogo} />
                  <span className="dir-card-body">
                    <span className="dir-card-name">
                      <Highlight text={item.name} query={query} />
                    </span>
                    <span className="dir-card-cat">
                      <i aria-hidden="true" />
                      <Highlight text={t(item.category)} query={query} />
                    </span>
                  </span>
                  <span className="dir-card-go">
                    <span>{t("View details")}</span>
                    <ArrowUpRight size={24} />
                  </span>
                </motion.button>
                )
              )}
            </AnimatePresence>
          </motion.div>

          {filtered.length > step && (
            <div className="dir-more">
              <div className="dir-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label={t("Integrations loaded")}>
                <span style={{ width: `${progress}%` }} />
              </div>
              <p className="dir-more-text">
                {t("Loaded {shown} of {total} integrations", { shown: shown.length, total: filtered.length })}
              </p>
              <div className="dir-more-actions">
                {remaining > 0 ? (
                  <>
                    <button className="dir-more-btn" onClick={() => setVisible((v) => v + step)}>
                      {t("Load {count} more", { count: Math.min(step, remaining) })}
                      <ChevronDown size={18} />
                    </button>
                    <button className="dir-ghost-btn" onClick={() => setVisible(filtered.length)}>
                      {t("Show all {count}", { count: filtered.length })}
                    </button>
                  </>
                ) : (
                  <button className="dir-ghost-btn" onClick={() => setVisible(step)}>
                    {t("Show fewer")}
                  </button>
                )}
              </div>
            </div>
          )}
          </>
        ) : (
          <div className="dir-empty">
            <div className="dir-empty-icon">
              <Layers3 size={26} />
            </div>
            <h3>{t("No integrations match your search")}</h3>
            <p>
              {query
                ? t("Nothing found. Check the spelling or try a broader term.")
                : t("There are no integrations in this category yet.")}
            </p>
            <button className="dir-btn" onClick={resetFilters}>
              {t("Show all integrations")}
            </button>
          </div>
        )}
      </div>

      <IntegrationModal integration={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
