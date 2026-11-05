"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Shield,
  ShieldCheck,
  Network,
  Zap,
  LockKeyhole,
  CheckCircle2,
  GitBranch
} from "lucide-react";
import Navbar from "@/components/Navbar";
import IntegrationDirectory from "@/components/IntegrationDirectory";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

const capabilities = [
  {
    icon: Network,
    titleKey: "Connected ecosystem",
    descriptionKey: "Bring your security technology landscape into one connected ecosystem."
  },
  {
    icon: Zap,
    titleKey: "Operational efficiency",
    descriptionKey: "Make it easier for security and IT teams to work across their existing platforms."
  },
  {
    icon: LockKeyhole,
    titleKey: "Security-focused",
    descriptionKey: "Explore an ecosystem centered on security and IT operations technologies."
  }
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <main>
      <Navbar />

      <section id="overview" className="hero-section">
        <div className="hero-grid-pattern" />
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="hero-inner">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div className="hero-badge">
              <span /> {t("SECURITY THAT WORKS TOGETHER")}
            </div>
            <h1>
              {t("Bring your security")}
              <br />
              <span>{t("ecosystem together.")}</span>
            </h1>
            <p>
              {t(
                "Explore the Metron integration ecosystem. Connect the security and IT operations platforms your teams rely on."
              )}
            </p>
            <div className="hero-actions">
              <a href="#integrations" className="button button-primary">
                {t("Explore integrations")} <ArrowUpRight size={17} />
              </a>
              <a href="#capabilities" className="button button-ghost">
                {t("Discover the ecosystem")} <ArrowDown size={16} />
              </a>
            </div>
            <div className="hero-proof">
              <span>
                <CheckCircle2 size={15} /> {t("Security ecosystem")}
              </span>
              <span>
                <CheckCircle2 size={15} /> {t("Multiple technology categories")}
              </span>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.92, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="visual-orbit orbit-three" />
            <motion.div
              className="visual-core"
              animate={{ scale: [1, 1.025, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="core-shield"><ShieldCheck size={43} /></div>
              <strong>METRON</strong>
              <span>{t("CONNECTED SECURITY")}</span>
            </motion.div>
            <motion.div
              className="orbit-node node-one"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Network size={19} />
            </motion.div>
            <motion.div
              className="orbit-node node-two"
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            >
              <LockKeyhole size={18} />
            </motion.div>
            <motion.div
              className="orbit-node node-three"
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            >
              <GitBranch size={19} />
            </motion.div>
            <motion.div
              className="orbit-node node-four"
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
            >
              <Zap size={19} />
            </motion.div>
            <div className="visual-caption">
              <span className="live-dot" /> {t("INTEGRATION ECOSYSTEM")}
            </div>
          </motion.div>
        </div>

        <div className="hero-bottom">
          <span>{t("BUILT FOR A CONNECTED SECURITY LANDSCAPE")}</span>
          <a href="#integrations">
            {t("Explore the directory")} <ArrowDown size={14} />
          </a>
        </div>
      </section>

      <IntegrationDirectory />

      <section id="capabilities" className="capabilities-section">
        <div className="section-shell">
          <div className="center-heading">
            <span className="eyebrow">
              <span className="eyebrow-dot" /> {t("THE METRON APPROACH")}
            </span>
            <h2>
              {t("Designed for a more")}
              <br />
              <span>{t("connected world.")}</span>
            </h2>
            <p>
              {t(
                "Your security ecosystem is stronger when the technologies around it can work together."
              )}
            </p>
          </div>
          <div className="capability-grid">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.titleKey}
                  className="capability-card"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                >
                  <div className="capability-icon"><Icon size={23} /></div>
                  <span className="capability-number">0{index + 1}</span>
                  <h3>{t(item.titleKey)}</h3>
                  <p>{t(item.descriptionKey)}</p>
                  <ArrowRight className="capability-arrow" size={18} />
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section section-shell">
        <div className="contact-panel">
          <div className="contact-decoration" />
          <div className="contact-content">
            <span className="eyebrow">
              <span className="eyebrow-dot" /> {t("LET'S CONNECT")}
            </span>
            <h2>
              {t("Make your security")}
              <br />
              <span>{t("ecosystem work smarter.")}</span>
            </h2>
            <p>
              {t(
                "Explore the integrations listed above and discover the possibilities of a connected security landscape."
              )}
            </p>
            <a href="#integrations" className="button button-light">
              {t("Explore integrations")} <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="contact-art">
            <ShieldCheck size={126} strokeWidth={0.8} />
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner section-shell">
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
          <p>{t("Security and IT operations integrations, brought together.")}</p>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Metron. {t("All rights reserved.")}</span>
            <a href="#overview">
              {t("Back to top")} <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
