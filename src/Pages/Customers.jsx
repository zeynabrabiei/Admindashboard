"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Customers.module.css";
import { useOrders } from "../contexts/OrdersContext";

function Customers() {
  const {
    customers = [],
    customersLoading: loading = false,
    deleteCustomer,
    saveCustomer,
  } = useOrders();

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editCustomer, setEditCustomer] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    document.title = "Customers";
  }, []);

  const totalCustomers = customers.length;

  const loyalCustomers = customers.filter(
    (customer) => Number(customer.orders ?? 0) > 20
  ).length;

  const filtered = customers.filter((customer) => {
    const name = String(customer.name ?? "").toLowerCase();
    const email = String(customer.email ?? "").toLowerCase();
    const search = searchTerm.trim().toLowerCase();

    return name.includes(search) || email.includes(search);
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortField) return 0;

    const valueA = String(a[sortField] ?? "").toLowerCase();
    const valueB = String(b[sortField] ?? "").toLowerCase();

    const result = valueA.localeCompare(valueB, undefined, {
      numeric: true,
    });

    return sortAsc ? result : -result;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc((previous) => !previous);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const handleSave = () => {
    if (!editCustomer) return;

    saveCustomer(editCustomer);
    setSelectedCustomer(null);
    setEditCustomer(null);
    setConfirmDelete(false);
  };

  const handleDelete = () => {
    if (!selectedCustomer) return;

    deleteCustomer(selectedCustomer.id);
    setSelectedCustomer(null);
    setEditCustomer(null);
    setConfirmDelete(false);
  };

  const handleCloseModal = () => {
    setSelectedCustomer(null);
    setEditCustomer(null);
    setConfirmDelete(false);
  };

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return parsedDate.toLocaleDateString("fa-IR");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>مدیریت مشتری‌ها</h2>

        <input
          className={styles.search}
          type="search"
          placeholder="جستجو بر اساس نام یا ایمیل..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <div className={styles.stats}>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h4>مجموع مشتری‌ها</h4>
          <p>{totalCustomers}</p>
        </motion.div>

        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4>مشتری‌های وفادار</h4>
          <p>{loyalCustomers}</p>
        </motion.div>
      </div>

      {loading ? (
        <p className={styles.status}>در حال بارگذاری مشتری‌ها...</p>
      ) : customers.length === 0 ? (
        <p className={styles.status}>
          اطلاعاتی برای نمایش وجود ندارد.
        </p>
      ) : sorted.length === 0 ? (
        <p className={styles.status}>
          مشتری‌ای با این نام یا ایمیل پیدا نشد.
        </p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={() => handleSort("name")}>
                  نام {sortField === "name" ? (sortAsc ? "↑" : "↓") : ""}
                </th>

                <th onClick={() => handleSort("email")}>
                  ایمیل {sortField === "email" ? (sortAsc ? "↑" : "↓") : ""}
                </th>

                <th onClick={() => handleSort("createdAt")}>
                  تاریخ عضویت{" "}
                  {sortField === "createdAt"
                    ? sortAsc
                      ? "↑"
                      : "↓"
                    : ""}
                </th>

                <th>تعداد سفارش</th>
              </tr>
            </thead>

            <tbody>
              <AnimatePresence>
                {sorted.map((customer) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setEditCustomer({
                        ...customer,
                        name: customer.name ?? "",
                        email: customer.email ?? "",
                        password: customer.password ?? "",
                        avatar: customer.avatar ?? "",
                      });
                      setConfirmDelete(false);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{customer.name || "—"}</td>
                    <td>{customer.email || "—"}</td>
                    <td>{formatDate(customer.createdAt)}</td>
                    <td>{Number(customer.orders ?? 0)}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {selectedCustomer && editCustomer && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className={styles.close}
                onClick={handleCloseModal}
                aria-label="بستن"
              >
                &times;
              </button>

              {editCustomer.avatar && (
                <img
                  src={editCustomer.avatar}
                  alt={editCustomer.name || "تصویر مشتری"}
                  className={styles.avatar}
                />
              )}

              <label htmlFor="customer-name">نام</label>
              <input
                id="customer-name"
                value={editCustomer.name}
                onChange={(event) =>
                  setEditCustomer({
                    ...editCustomer,
                    name: event.target.value,
                  })
                }
              />

              <label htmlFor="customer-email">ایمیل</label>
              <input
                id="customer-email"
                type="email"
                value={editCustomer.email}
                onChange={(event) =>
                  setEditCustomer({
                    ...editCustomer,
                    email: event.target.value,
                  })
                }
              />

              <label htmlFor="customer-password">رمز عبور</label>
              <input
                id="customer-password"
                type="password"
                value={editCustomer.password}
                onChange={(event) =>
                  setEditCustomer({
                    ...editCustomer,
                    password: event.target.value,
                  })
                }
              />

              <div className={styles.modalActions}>
                {!confirmDelete ? (
                  <>
                    <button
                      type="button"
                      className={styles.saveBtn}
                      onClick={handleSave}
                    >
                      ذخیره
                    </button>

                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={() => setConfirmDelete(true)}
                    >
                      حذف
                    </button>
                  </>
                ) : (
                  <>
                    <span>از حذف این مشتری مطمئن هستید؟</span>

                    <button type="button" onClick={handleDelete}>
                      بله، حذف کن
                    </button>

                    <button
                      type="button"
                      onClick={() => setConfirmDelete(false)}
                    >
                      انصراف
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Customers;

