import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from "./Header.module.css";
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { adminName, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitles = {
    "/": "Dashboard",
    "/products": "Products",
    "/orders": "Orders",
    "/customers": "Customers",
    "/settings": "Settings"
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'خروج از حساب',
      text: 'آیا مطمئن هستید که می‌خواهید خارج شوید؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بله، خارج شو',
      cancelButtonText: 'انصراف'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate('/login');
      }
    });
  };

  return (
    <div className={styles.container}>
      <h1>{pageTitles[location.pathname] || 'Dashboard'}</h1>
      <div className={styles.actions}>
        <div className={styles.user}>
          <div className={styles.profilePicAlt}>
            {adminName?.charAt(0).toUpperCase()}
          </div>
          <h4>{adminName || 'Admin'}</h4>
        </div>
        <div className={styles.notifications}>
          <i className="fas fa-bell"></i>
        </div>
        <button className={styles.logout} onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Header;