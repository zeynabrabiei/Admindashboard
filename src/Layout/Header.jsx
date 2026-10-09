import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
} from "lucide-react";
import Swal from "sweetalert2";

import { useAuth } from "../contexts/AuthContext";
import styles from "./Header.module.css";

const pageTitles = {
  "/": "Dashboard",
  "/products": "Products",
  "/orders": "Orders",
  "/customers": "Customers",
  "/settings": "Settings",
};

export default function Header({ onMenuClick }) {
  const { adminName, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitle = pageTitles[location.pathname] || "Dashboard";
  const displayName = adminName || "Admin";

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "خروج از حساب",
      text: "آیا مطمئن هستید که می‌خواهید خارج شوید؟",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#e5e7eb",
      confirmButtonText: "بله، خارج شو",
      cancelButtonText: "انصراف",
      reverseButtons: true,
      customClass: {
        cancelButton: "swal-cancel-button",
      },
    });

    if (result.isConfirmed) {
      logout();
      navigate("/login");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button
          type="button"
          className={styles.menuButton}
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu size={21} />
        </button>

        <div className={styles.heading}>
          <span className={styles.eyebrow}>WORKSPACE / NOVA</span>
          <h1 className={styles.title}>{pageTitle}</h1>
        </div>
      </div>

      <div className={styles.actions}>
        <label className={styles.search}>
          <Search size={17} />
          <input
            type="search"
            placeholder="Search anything..."
            aria-label="Search"
          />
          <kbd>⌘ K</kbd>
        </label>

        <button
          type="button"
          className={styles.iconButton}
          aria-label="Notifications"
          onClick={() =>
            Swal.fire({
              icon: "info",
              title: "Notifications",
              text: "You’re all caught up!",
              confirmButtonColor: "#6366f1",
            })
          }
        >
          <Bell size={19} />
          <span className={styles.notificationDot} />
        </button>

        <div className={styles.divider} />

        <button
          type="button"
          className={styles.profile}
          onClick={() =>
            Swal.fire({
              title: displayName,
              text: "Administrator account",
              icon: "info",
              confirmButtonColor: "#6366f1",
            })
          }
        >
          <span className={styles.avatar}>
            {displayName.charAt(0).toUpperCase()}
          </span>

          <span className={styles.profileInfo}>
            <strong>{displayName}</strong>
            <small>Administrator</small>
          </span>

          <ChevronDown size={16} className={styles.chevron} />
        </button>

        <button
          type="button"
          className={styles.logoutButton}
          onClick={handleLogout}
          aria-label="Log out"
          title="Log out"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}