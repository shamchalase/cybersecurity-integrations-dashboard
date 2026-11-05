"use client";

import { useState } from "react";
import { Menu, X, ArrowUpRight, Globe } from "lucide-react";
import Image from "next/image";
import { useLanguage, type Language } from "@/context/LanguageContext";

const links = [
  { label: "Overview", href: "#overview" },
  { label: "Integrations", href: "#integrations" },
  { label: "Capabilities", href: "#capabilities" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="site-header">
      <div className="nav-shell">
        <a href="#overview" className="brand" aria-label="Metron home">
          <Image
            src="/logo.png"
            alt="Metron Logo"
            width={150}
            height={45}
            priority
            className="brand-logo"
          />
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {t(link.label)}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="language-select-wrap">
            <Globe size={15} aria-hidden="true" />
            <select
              className="language-select"
              value={language}
              onChange={(event) =>
                setLanguage(event.target.value as Language)
              }
              aria-label={t("Select language")}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
            </select>
          </div>

          <a className="button button-nav" href="#contact">
            {t("Talk to our team")} <ArrowUpRight size={15} />
          </a>
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? t("Close navigation") : t("Open navigation")}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="mobile-nav">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {t(link.label)}
            </a>
          ))}
          <div className="mobile-nav-lang">
            <Globe size={16} />
            <select
              className="mobile-language-select"
              value={language}
              onChange={(event) => {
                setLanguage(event.target.value as Language);
                setOpen(false);
              }}
              aria-label={t("Select language")}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
            </select>
          </div>
          <a
            href="#contact"
            className="button button-nav mobile-cta"
            onClick={() => setOpen(false)}
          >
            {t("Talk to our team")} <ArrowUpRight size={15} />
          </a>
        </div>
      )}
    </header>
  );
}
