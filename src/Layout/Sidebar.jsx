import React from 'react';
import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/products", label: "Products" },
    { path: "/orders", label: "Orders" },
    { path: "/customers", label: "Customers" },
    { path: "/settings", label: "Settings" }
  ];

  return (
    <div className={styles.container}>
      <ul className={styles.sidebarList}>
        {navItems.map(item => (
          <li 
            key={item.path} 
            className={`${styles.sidebarItem} ${location.pathname === item.path ? styles.active : ''}`}
          >
            <Link className={styles.link} to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;