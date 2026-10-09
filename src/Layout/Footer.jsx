import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const navigationLinks = [
  { label: "Dashboard", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Orders", path: "/orders" },
  { label: "Customers", path: "/customers" },
  { label: "Settings", path: "/settings" },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.topAccent} />

      <div className={styles.container}>
        <div className={styles.main}>
          {/* Personal branding */}
          <div className={styles.brand}>
            <Link
              to="/"
              className={styles.brandName}
              aria-label="Zeynab Rabiei - Dashboard"
            >
              <span className={styles.brandIcon}>Z</span>

              <span>
                <span className={styles.name}>Zeynab Rabiei</span>
                <span className={styles.role}>Frontend Developer</span>
              </span>
            </Link>

            <p className={styles.tagline}>
              Building modern digital experiences with JavaScript, React,
              and Next.js.
            </p>

            <span className={styles.availability}>
              <span className={styles.statusDot} />
              Open to new opportunities
            </span>
          </div>

          {/* Existing navigation */}
          <nav className={styles.navigation} aria-label="Footer navigation">
            <h2 className={styles.heading}>Explore</h2>

            <ul className={styles.linkList}>
              {navigationLinks.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className={styles.navLink}>
                    <span>{item.label}</span>
                    <span className={styles.arrow} aria-hidden="true">
                      ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links */}
          <div className={styles.connect}>
            <h2 className={styles.heading}>Let's Connect</h2>

            <p className={styles.connectText}>
              Have a project in mind? Let's build something meaningful.
            </p>

            <a
              className={styles.emailLink}
              href="mailto:zeynabrabiei92@gmail.com"
            >
              <span className={styles.emailIcon} aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </span>

              <span>zeynabrabiei92@gmail.com</span>
            </a>

            <div className={styles.socials}>
              <a
                href="https://github.com/zeynabrabiei"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub profile"
                title="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.59 1.21 3.22.92.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.04-1.15 3.04-1.15.61 1.54.23 2.68.12 2.96.72.78 1.15 1.78 1.15 3.01 0 4.27-2.62 5.21-5.11 5.49.4.35.75 1.02.75 2.06v3.06c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/zeynabrabiei"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn profile"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.24h2.95v9.51ZM6.46 7.94a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.29 10.81H15.8v-4.63c0-1.1-.02-2.51-1.53-2.51-1.53 0-1.76 1.19-1.76 2.43v4.71H9.57V9.24h2.82v1.3h.04c.39-.74 1.35-1.53 2.78-1.53 2.98 0 3.54 1.96 3.54 4.51v5.23Z" />
                </svg>
              </a>

              <a
                href="mailto:zeynabrabiei92@gmail.com"
                className={styles.socialLink}
                aria-label="Send an email"
                title="Email"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </a>

              <a
                href="https://zeynabrabiei.ir"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Personal website"
                title="Personal website"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Zeynab Rabiei. All rights reserved.
          </p>

          <a href="https://zeynabrabiei.ir" className={styles.signature}>
            <span>Designed &amp; Built with</span>
            <span className={styles.heart} aria-label="love">
              ♥
            </span>
            <span>by Zeynab Rabiei</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;