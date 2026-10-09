import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { login, userData } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");

    if (
      username.trim() === userData.username &&
      password === userData.password
    ) {
      login(username.trim());
      navigate("/", { replace: true });
    } else {
      setError("نام کاربری یا رمز عبور واردشده صحیح نیست.");
    }
  };

  return (
    <main className={styles.loginContainer} dir="rtl">
      <section className={styles.loginShell}>
        {/* Brand panel */}
        <aside className={styles.brandPanel}>
          <div className={styles.brandTop}>
            <div className={styles.logo}>N</div>
            <span className={styles.brandName}>NOVA</span>
          </div>

          <div className={styles.brandContent}>
            <span className={styles.eyebrow}>
              MANAGEMENT PLATFORM
            </span>

            <h1>
              مدیریت هوشمند،
              <br />
              تجربه‌ای متفاوت.
            </h1>

            <p>
              به پنل مدیریت خود خوش آمدید. تمام اطلاعات و فعالیت‌های
              کسب‌وکار خود را در یک فضای یکپارچه مدیریت کنید.
            </p>

            <div className={styles.visualCard}>
              <div className={styles.visualHeader}>
                <span>نمای کلی داشبورد</span>
                <span className={styles.liveBadge}>
                  <span />
                  فعال
                </span>
              </div>

              <div className={styles.visualMetrics}>
                <div>
                  <span>مدیریت</span>
                  <strong>متمرکز</strong>
                </div>

                <div>
                  <span>دسترسی</span>
                  <strong>سریع</strong>
                </div>
              </div>

              <div className={styles.chart}>
                {[34, 52, 42, 72, 56, 86, 66, 100, 76, 90].map(
                  (height, index) => (
                    <span
                      key={index}
                      style={{ height: `${height}%` }}
                    />
                  )
                )}
              </div>
            </div>
          </div>

          <div className={styles.brandFooter}>
            <span>Secure workspace</span>
            <span>© {new Date().getFullYear()} NOVA</span>
          </div>

          <span className={styles.decorCircle} />
          <span className={styles.decorCircleTwo} />
        </aside>

        {/* Login form */}
        <section className={styles.formPanel}>
          <div className={styles.mobileBrand}>
            <div className={styles.mobileLogo}>N</div>
            <span>NOVA</span>
          </div>

          <div className={styles.formContent}>
            <div className={styles.welcomeIcon}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
              </svg>
            </div>

            <span className={styles.formEyebrow}>
              خوش آمدید
            </span>

            <h2 className={styles.formTitle}>
              ورود به حساب کاربری
            </h2>

            <p className={styles.formDescription}>
              برای ادامه، اطلاعات حساب مدیریت خود را وارد کنید.
            </p>

            <form className={styles.loginForm} onSubmit={handleLogin}>
              <div className={styles.field}>
                <label htmlFor="login-username">
                  نام کاربری
                </label>

                <div className={styles.inputWrapper}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                  </svg>

                  <input
                    id="login-username"
                    name="username"
                    type="text"
                    placeholder="نام کاربری خود را وارد کنید"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                      setError("");
                    }}
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="login-password">
                  رمز عبور
                </label>

                <div className={styles.inputWrapper}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    aria-hidden="true"
                  >
                    <rect x="4" y="10" width="16" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 1 1 8 0v3" />
                  </svg>

                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="رمز عبور خود را وارد کنید"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    aria-label={
                      showPassword
                        ? "مخفی کردن رمز عبور"
                        : "نمایش رمز عبور"
                    }
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        aria-hidden="true"
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
                        aria-hidden="true"
                      >
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p className={styles.error} role="alert">
                  <span aria-hidden="true">!</span>
                  {error}
                </p>
              )}

              <button type="submit" className={styles.submitButton}>
                <span>ورود به داشبورد</span>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </button>
            </form>

            <div className={styles.securityNote}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <rect x="4" y="10" width="16" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 1 1 8 0v3" />
              </svg>

              <span>
                ورود فقط برای کاربران مجاز پنل مدیریت است.
              </span>
            </div>
          </div>

          <footer className={styles.formFooter}>
            <span>Designed with care</span>
            <span className={styles.footerDot}>•</span>
            <span>NOVA Admin</span>
          </footer>
        </section>
      </section>
    </main>
  );
}

export default Login;