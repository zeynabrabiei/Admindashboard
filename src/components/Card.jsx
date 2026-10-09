import React from 'react';
import styles from "./Card.module.css";


function Card({ icon, title, value, type }) {
  return (
    <div className={`${styles.card} ${styles[type]}`}>
      <div className={styles.icon}>{icon}</div>
      <div>
        <p className={styles.title}>{title}</p>
        <h3 className={styles.value}>{value}</h3>
      </div>
    </div>
  )
}

export default Card;