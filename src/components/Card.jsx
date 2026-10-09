import styles from "./Card.module.css";

export default function Card({
  icon,
  title,
  value,
  type = "default",
  description,
}) {
  return (
    <article className={`${styles.card} ${styles[type] || ""}`}>
      <div className={styles.top}>
        <div className={styles.icon} aria-hidden="true">
          {icon}
        </div>

        <span className={styles.indicator} />
      </div>

      <div className={styles.details}>
        <p className={styles.title}>{title}</p>

        <h3 className={styles.value}>{value}</h3>

        {description && (
          <p className={styles.description}>{description}</p>
        )}
      </div>
    </article>
  );
}