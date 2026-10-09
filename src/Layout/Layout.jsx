import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import styles from "./Layout.module.css";

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className={styles.layout}>
      <Sidebar
        isOpen={isMenuOpen}
        onClose={closeMenu}
      />

      <div className={styles.main}>
        <Header onMenuClick={() => setIsMenuOpen(true)} />

        <main className={styles.content}>
          <div className={styles.page}>
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}