import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Users,
  Settings,
  Sparkles,
  X,
  ChartNoAxesCombined,
} from "lucide-react";

import styles from "./Sidebar.module.css";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { path: "/products", label: "Products", icon: ShoppingBag },
  { path: "/orders", label: "Orders", icon: ShoppingCart },
  { path: "/customers", label: "Customers", icon: Users },
  { path: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ isOpen = false, onClose }) {
  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <ChartNoAxesCombined size={23} />
          </div>

          <div className={styles.brandText}>
            <span className={styles.brandName}>NOVA</span>
            <span className={styles.brandCaption}>ADMIN STUDIO</span>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.workspace}>
          <span className={styles.workspaceDot} />
          <span>Workspace</span>
          <span className={styles.workspaceBadge}>PRO</span>
        </div>

        <nav className={styles.navigation} aria-label="Main navigation">
          <p className={styles.sectionLabel}>MAIN MENU</p>

          <ul className={styles.sidebarList}>
            {navItems.map(({ path, label, icon: Icon, end }) => (
              <li key={path} className={styles.sidebarItem}>
                <NavLink
                  to={path}
                  end={end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ""}`
                  }
                >
                  <Icon size={19} strokeWidth={1.9} />
                  <span>{label}</span>
                  <span className={styles.activeIndicator} />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.sidebarBottom}>
          <div className={styles.promo}>
            <div className={styles.promoIcon}>
              <Sparkles size={19} />
            </div>
            <strong>Your workspace</strong>
            <p>Manage your store from one beautiful dashboard.</p>
            <div className={styles.promoLine}>
              <span />
            </div>
          </div>

          <div className={styles.sidebarFooter}>
            <span className={styles.statusDot} />
            <span>System dashboard</span>
            <span className={styles.version}>v1.0</span>
          </div>
        </div>
      </aside>
    </>
  );
}