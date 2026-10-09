import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <span className={styles.eyebrow}>PAGE NOT FOUND</span>

        <h1 className={styles.code}>404</h1>

        <h2 className={styles.title}>این صفحه پیدا نشد!</h2>

        <p className={styles.description}>
          شاید آدرس اشتباه باشد یا صفحه موردنظر جابه‌جا شده باشد.
        </p>

        <Link to="/" className={styles.homeBtn}>
          بازگشت به داشبورد
          <span aria-hidden="true">←</span>
        </Link>
      </div>
    </main>
  );
}