"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShieldCheck, ArrowUpRight } from "lucide-react";
import type { Integration } from "@/types/integration";
import { useLanguage } from "@/context/LanguageContext";

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

type Props = {
  integration: Integration | null;
  onClose: () => void;
};

function ModalLogo({ integration }: { integration: Integration }) {
  const [failed, setFailed] = useState(false);
  const src =
    integration.logo ||
    (integration.domain
      ? `https://www.google.com/s2/favicons?domain=${integration.domain}&sz=128`
      : undefined);

  if (!src || failed) {
    return (
      <div className="detail-mark" aria-hidden="true">
        {integration.name.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <div className="detail-mark has-logo">
      <img
        src={src}
        alt={`${integration.name} logo`}
        loading="eager"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export default function IntegrationModal({ integration, onClose }: Props) {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {integration && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="integration-title"
            className="detail-modal"
            initial={{ opacity: 0, y: 22, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
              <button
                className="modal-close"
                onClick={onClose}
                aria-label={t("Close details")}
              >
                <X size={19} />
              </button>
              <ModalLogo integration={integration} />
              <div className="modal-category-wrap">
                <span className="modal-category-tag" data-tone={categoryTones[integration.category] || "blue"}>
                  <i className="modal-category-dot" /> {t(integration.category)}
                </span>
              </div>
              <h2 id="integration-title">{integration.name}</h2>
              <p className="detail-copy">
                {t(
                  "Explore how {name} fits into the Metron integration ecosystem. This directory entry is based on the integration information supplied for this project.",
                  { name: integration.name }
                )}
              </p>
              <div className="detail-info">
                <div className="detail-info-icon"><ShieldCheck size={20} /></div>
                <div>
                  <strong>{t("Integration directory entry")}</strong>
                  <span>{t("Category")}: {t(integration.category)}</span>
                </div>
              </div>
              <button className="button button-primary modal-action" onClick={onClose}>
                {t("Back to integrations")} <ArrowUpRight size={16} />
              </button>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
