"use client";

import devfolioLogo from '../assets/devfolio-logo.webp';

export const PlatformPartner = () => (
  <section className="section platform-partner-section">
    <div className="platform-partner-content">
      <span className="eyebrow platform-partner-eyebrow">
        <i />
        Platform Partner
      </span>
      <h2 className="platform-partner-title">OFFICIAL PLATFORM PARTNER</h2>
      
      <div className="platform-partner-glass-card">
        <div className="glass-corner top-left" />
        <div className="glass-corner top-right" />
        <div className="glass-corner bottom-left" />
        <div className="glass-corner bottom-right" />
        <div className="glass-light-sheen" />

        <div className="partner-logo-glass-frame">
          <img
            src={devfolioLogo.src}
            alt="Devfolio - Official Platform Partner"
            className="partner-logo"
            width={240}
            height={50}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <p className="partner-description">
        Devfolio is the official platform for HACK 2027 registrations and Round 1 online PPT submissions.
      </p>

      <a
        href="https://hack2027.devfolio.co/overview"
        target="_blank"
        rel="noopener noreferrer"
        className="button partner-devfolio-btn"
      >
        VISIT DEVFOLIO <span className="cta-arrow" aria-hidden="true">↗</span>
      </a>
    </div>
  </section>
);
