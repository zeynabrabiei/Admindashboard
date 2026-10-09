import { useEffect, useState } from "react";
import { useOrders } from "../contexts/OrdersContext";
import styles from "./Orders.module.css";

function Orders() {
  const {
    orders = [],
    ordersLoading: loading,
    error,
    deleteOrder,
    updateOrderStatus,
  } = useOrders();

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmStatusId, setConfirmStatusId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    document.title = "Orders | Admin Dashboard";
  }, []);

  const completedOrders = orders.filter((order) => order.status).length;
  const pendingOrders = orders.length - completedOrders;

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = String(order.name ?? "")
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && order.status) ||
      (filter === "pending" && !order.status);

    return matchesSearch && matchesFilter;
  });

  const cancelActions = () => {
    setConfirmDeleteId(null);
    setConfirmStatusId(null);
  };

  if (loading) {
    return (
      <main className={styles.page} dir="rtl">
        <div className={styles.loading}>
          <span className={styles.spinner} />
          <p>در حال دریافت سفارش‌ها...</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page} dir="rtl">
      <header className={styles.pageHeader}>
        <div>
          <div className={styles.breadcrumb}>
            <span>مدیریت</span>
            <span>/</span>
            <span>سفارش‌ها</span>
          </div>

          <h1 className={styles.pageTitle}>مدیریت سفارش‌ها</h1>

          <p className={styles.pageDescription}>
            سفارش‌ها را بررسی کنید و وضعیت آن‌ها را مدیریت کنید.
          </p>
        </div>

        <div className={styles.headerIcon} aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path d="M3 3h2l2.4 12.1a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6" />
            <circle cx="10" cy="21" r="1" />
            <circle cx="18" cy="21" r="1" />
          </svg>
        </div>
      </header>

      <section className={styles.stats}>
        <article className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M3 3h2l2.4 12.1a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6" />
              <circle cx="10" cy="21" r="1" />
              <circle cx="18" cy="21" r="1" />
            </svg>
          </div>
          <div>
            <p className={styles.statLabel}>مجموع سفارش‌ها</p>
            <p className={styles.statValue}>{orders.length}</p>
          </div>
        </article>

        <article className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.pendingIcon}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </div>
          <div>
            <p className={styles.statLabel}>در انتظار</p>
            <p className={styles.statValue}>{pendingOrders}</p>
          </div>
        </article>

        <article className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.completedIcon}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="12" cy="12" r="9" />
              <path d="m8 12 2.5 2.5L16 9" />
            </svg>
          </div>
          <div>
            <p className={styles.statLabel}>تکمیل‌شده</p>
            <p className={styles.statValue}>{completedOrders}</p>
          </div>
        </article>
      </section>

      <section className={styles.ordersPanel}>
        <div className={styles.panelHeader}>
          <div>
            <h2 className={styles.panelTitle}>فهرست سفارش‌ها</h2>
            <p className={styles.panelDescription}>
              {filteredOrders.length} سفارش نمایش داده می‌شود
            </p>
          </div>

          <div className={styles.filters}>
            <label className={styles.searchBox}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m16 16 4 4" />
              </svg>

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="جست‌وجوی مشتری..."
                aria-label="جست‌وجوی سفارش بر اساس نام مشتری"
              />
            </label>

            <select
              className={styles.filterSelect}
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              aria-label="فیلتر وضعیت سفارش"
            >
              <option value="all">همه سفارش‌ها</option>
              <option value="pending">در انتظار</option>
              <option value="completed">تکمیل‌شده</option>
            </select>
          </div>
        </div>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        {!error && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>شناسه</th>
                  <th>نام مشتری</th>
                  <th>وضعیت</th>
                  <th>تاریخ سفارش</th>
                  <th>عملیات</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((item, index) => {
                  const isDeleteConfirming = confirmDeleteId === item.id;
                  const isStatusConfirming = confirmStatusId === item.id;

                  return (
                    <tr
                      key={item.id}
                      className={
                        isDeleteConfirming
                          ? styles.deleteRow
                          : isStatusConfirming
                            ? styles.statusRow
                            : ""
                      }
                    >
                      <td>
                        <span className={styles.orderId}>
                          #{String(item.id ?? index + 1).padStart(3, "0")}
                        </span>
                      </td>

                      <td>
                        <div className={styles.customerCell}>
                          <span className={styles.customerAvatar}>
                            {String(item.name || "م").charAt(0).toUpperCase()}
                          </span>
                          <span className={styles.customerName}>
                            {item.name || "بدون نام"}
                          </span>
                        </div>
                      </td>

                      <td>
                        <span
                          className={`${styles.statusBadge} ${
                            item.status ? styles.completed : styles.pending
                          }`}
                        >
                          <span className={styles.statusDot} />
                          {item.status ? "تکمیل‌شده" : "در انتظار"}
                        </span>
                      </td>

                      <td className={styles.dateCell}>
                        {item.date || "—"}
                      </td>

                      <td>
                        {isDeleteConfirming ? (
                          <div className={styles.actionGroup}>
                            <span className={styles.confirmText}>حذف شود؟</span>
                            <button
                              type="button"
                              className={styles.confirmBtn}
                              onClick={() => {
                                deleteOrder(item.id);
                                cancelActions();
                              }}
                            >
                              بله
                            </button>
                            <button
                              type="button"
                              className={styles.cancelBtn}
                              onClick={cancelActions}
                            >
                              خیر
                            </button>
                          </div>
                        ) : isStatusConfirming ? (
                          <div className={styles.actionGroup}>
                            <span className={styles.confirmText}>تکمیل شود؟</span>
                            <button
                              type="button"
                              className={styles.confirmBtn}
                              onClick={() => {
                                updateOrderStatus(item.id);
                                cancelActions();
                              }}
                            >
                              بله
                            </button>
                            <button
                              type="button"
                              className={styles.cancelBtn}
                              onClick={cancelActions}
                            >
                              خیر
                            </button>
                          </div>
                        ) : (
                          <div className={styles.actionGroup}>
                            <button
                              type="button"
                              className={styles.iconButton}
                              onClick={() => {
                                setConfirmDeleteId(item.id);
                                setConfirmStatusId(null);
                              }}
                              aria-label={`حذف سفارش ${item.id}`}
                              title="حذف سفارش"
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                                <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6" />
                              </svg>
                            </button>

                            {!item.status && (
                              <button
                                type="button"
                                className={`${styles.iconButton} ${styles.completeButton}`}
                                onClick={() => {
                                  setConfirmStatusId(item.id);
                                  setConfirmDeleteId(null);
                                }}
                                aria-label={`تکمیل سفارش ${item.id}`}
                                title="تکمیل سفارش"
                              >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                  <path d="m5 12 4 4L19 6" />
                                </svg>
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}

                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className={styles.emptyState}>
                      <span className={styles.emptyIcon}>⌕</span>
                      <strong>سفارشی پیدا نشد</strong>
                      <span>عبارت جست‌وجو یا فیلتر را تغییر دهید.</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default Orders;