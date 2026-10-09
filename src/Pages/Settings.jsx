import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Settings.module.css";

function Settings() {
  const { adminName, userData, updateCredentials } = useAuth();

  const [username, setUsername] = useState(userData?.username ?? "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    document.title = "Settings | Admin Dashboard";
  }, []);

  const handleSave = (event) => {
    event.preventDefault();

    const cleanUsername = username.trim();

    if (!cleanUsername || !password.trim()) {
      setFeedback({
        type: "error",
        message: "لطفاً نام کاربری و رمز عبور جدید را وارد کنید.",
      });
      return;
    }

    updateCredentials(cleanUsername, password);
    setUsername(cleanUsername);
    setPassword("");
    setShowPassword(false);

    setFeedback({
      type: "success",
      message: "تنظیمات حساب کاربری با موفقیت ذخیره شد.",
    });
  };

  const handleReset = () => {
    setUsername(userData?.username ?? "");
    setPassword("");
    setShowPassword(false);
    setFeedback(null);
  };

  const displayName = adminName || userData?.username || "Admin";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <main className={styles.page} dir="rtl">
      {/* Page heading */}
      <header className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <div className={styles.breadcrumb}>
            <span>مدیریت</span>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.currentBreadcrumb}>تنظیمات</span>
          </div>

          <h1 className={styles.pageTitle}>تنظیمات حساب کاربری</h1>

          <p className={styles.pageDescription}>
            اطلاعات حساب و تنظیمات امنیتی خود را از این بخش مدیریت کنید.
          </p>
        </div>

        <div className={styles.headerIcon} aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="m19.4 15 .1.1a1.7 1.7 0 0 1-2.4 2.4l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a1.7 1.7 0 0 1-3.4 0v-.2a1.7 1.7 0 0 0-2.9-1.2l-.1.1a1.7 1.7 0 0 1-2.4-2.4l.1-.1a1.7 1.7 0 0 0-1.2-2.9H4a1.7 1.7 0 0 1 0-3.4h.2a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a1.7 1.7 0 0 1 2.4-2.4l.1.1a1.7 1.7 0 0 0 2.9-1.2V4a1.7 1.7 0 0 1 3.4 0v.2a1.7 1.7 0 0 0 2.9 1.2l.1-.1a1.7 1.7 0 0 1 2.4 2.4l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.2a1.7 1.7 0 0 1 0 3.4h-.2a1.7 1.7 0 0 0-1.2.9Z" />
          </svg>
        </div>
      </header>

      {/* Profile overview */}
      <section className={styles.profileCard} aria-label="پروفایل مدیر">
        <div className={styles.profileBackground} aria-hidden="true">
          <span className={styles.decorCircle} />
          <span className={styles.decorCircleSmall} />
        </div>

        <div className={styles.profileContent}>
          <div className={styles.avatar}>{initial}</div>

          <div className={styles.profileInfo}>
            <span className={styles.profileEyebrow}>حساب مدیریت</span>

            <h2 className={styles.profileName}>{displayName}</h2>

            <p className={styles.profileDescription}>
              مدیریت اطلاعات و دسترسی حساب کاربری
            </p>
          </div>
        </div>

        <div className={styles.accountBadge}>
          <span className={styles.badgeDot} />
          حساب فعال
        </div>
      </section>

      {/* Settings content */}
      <div className={styles.contentGrid}>
        <section className={styles.settingsCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeadingGroup}>
              <div className={styles.sectionIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                </svg>
              </div>

              <div>
                <h2 className={styles.cardTitle}>اطلاعات حساب</h2>
                <p className={styles.cardSubtitle}>
                  مشخصات ورود خود را به‌روزرسانی کنید.
                </p>
              </div>
            </div>

            <span className={styles.optionalBadge}>قابل ویرایش</span>
          </div>

          <div className={styles.cardDivider} />

          <form className={styles.form} onSubmit={handleSave}>
            <div className={styles.field}>
              <label htmlFor="settings-username" className={styles.label}>
                نام کاربری جدید
              </label>

              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon} aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                  </svg>
                </span>

                <input
                  id="settings-username"
                  name="username"
                  type="text"
                  className={styles.input}
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                    setFeedback(null);
                  }}
                  placeholder="نام کاربری خود را وارد کنید"
                  autoComplete="username"
                  required
                />
              </div>

              <span className={styles.fieldHint}>
                این نام برای شناسایی حساب شما استفاده می‌شود.
              </span>
            </div>

            <div className={styles.field}>
              <label htmlFor="settings-password" className={styles.label}>
                رمز عبور جدید
              </label>

              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon} aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <rect x="4" y="10" width="16" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 1 1 8 0v3" />
                    <path d="M12 14v3" />
                  </svg>
                </span>

                <input
                  id="settings-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className={styles.input}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setFeedback(null);
                  }}
                  placeholder="رمز عبور جدید را وارد کنید"
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={
                    showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"
                  }
                  aria-pressed={showPassword}
                >
                  {showPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <path d="M3 3l18 18" />
                      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                      <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 8.5 4.5 9 7-.2 1.1-1 2.3-2.1 3.4" />
                      <path d="M6.2 6.2C3.8 7.7 2.3 10 2 12c.5 2.5 4 7 10 7 1.2 0 2.3-.2 3.3-.6" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              <span className={styles.fieldHint}>
                رمز جدید برای ورودهای بعدی شما استفاده خواهد شد.
              </span>
            </div>

            {feedback && (
              <div
                className={`${styles.feedback} ${
                  feedback.type === "success"
                    ? styles.feedbackSuccess
                    : styles.feedbackError
                }`}
                role="status"
                aria-live="polite"
              >
                <span className={styles.feedbackIcon} aria-hidden="true">
                  {feedback.type === "success" ? "✓" : "!"}
                </span>
                <span>{feedback.message}</span>
              </div>
            )}

            <div className={styles.formActions}>
              <button type="submit" className={styles.saveButton}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M5 3h12l4 4v14H3V3h2Z" />
                  <path d="M7 3v6h10V3M7 21v-8h10v8" />
                </svg>
                ذخیره تغییرات
              </button>

              <button
                type="button"
                className={styles.resetButton}
                onClick={handleReset}
              >
                بازنشانی فرم
              </button>
            </div>
          </form>
        </section>

        {/* Security information */}
        <aside className={styles.sideColumn}>
          <section className={styles.securityCard}>
            <div className={styles.securityIcon}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>

            <h2 className={styles.securityTitle}>امنیت حساب</h2>

            <p className={styles.securityDescription}>
              برای حفظ امنیت حساب خود، اطلاعات ورودتان را در اختیار دیگران
              قرار ندهید.
            </p>

            <div className={styles.securityDivider} />

            <div className={styles.securityItem}>
              <span className={styles.securityItemIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <rect x="4" y="10" width="16" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 1 1 8 0v3" />
                </svg>
              </span>

              <div>
                <h3>رمز عبور شخصی</h3>
                <p>از رمز عبور اختصاصی استفاده کنید.</p>
              </div>
            </div>

            <div className={styles.securityItem}>
              <span className={styles.securityItemIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </span>

              <div>
                <h3>به‌روزرسانی اطلاعات</h3>
                <p>اطلاعات ورود را در صورت نیاز تغییر دهید.</p>
              </div>
            </div>
          </section>

          <section className={styles.tipCard}>
            <span className={styles.tipLabel}>نکته مهم</span>

            <h2>حساب خود را ایمن نگه دارید</h2>

            <p>
              از رمز عبور قابل حدس استفاده نکنید و پس از کار با داشبورد در
              دستگاه‌های مشترک، از حساب خارج شوید.
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}

export default Settings;