import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import styles from "./Layout.module.css";

function Layout() {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.header}>
        <Header />
        <Outlet /> 
        <Footer />
      </div>
    </div>
  );
}

export default Layout;