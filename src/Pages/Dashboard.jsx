import { useEffect, useMemo } from "react";

import Card from "../components/Card";
import Chart from "../components/Chart";
import { useOrders } from "../contexts/OrdersContext";
import styles from "./Dashboard.module.css";

function getOrderAmount(order) {
  const value = order.total ?? order.amount ?? order.price;

  if (value === null || value === undefined || value === "") {
    return null;
  }

  const amount = Number(value);

  return Number.isFinite(amount) && amount >= 0 ? amount : null;
}

function getOrderDate(order) {
  const value =
    order.createdAt ||
    order.created_at ||
    order.date ||
    order.orderDate;

  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function Dashboard() {
  const {
    orders,
    customers,
    ordersLoading,
    customersLoading,
    ordersError,
    customersError,
  } = useOrders();

  useEffect(() => {
    document.title = "Dashboard | Admin";
  }, []);

  const statistics = useMemo(() => {
    const amounts = orders
      .map(getOrderAmount)
      .filter((amount) => amount !== null);

    const revenue = amounts.reduce((total, amount) => total + amount, 0);

    const today = new Date();

    const todayOrders = orders.filter((order) => {
      const date = getOrderDate(order);

      return (
        date &&
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    });

    const todayAmounts = todayOrders
      .map(getOrderAmount)
      .filter((amount) => amount !== null);

    const todaySales = todayAmounts.reduce(
      (total, amount) => total + amount,
      0
    );

    return {
      revenue,
      todaySales,
      hasRevenue: amounts.length > 0,
      hasTodaySales: todayAmounts.length > 0,
    };
  }, [orders]);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>OVERVIEW</span>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>
            Here’s an overview of your store performance.
          </p>
        </div>

        <div className={styles.date}>
          <span aria-hidden="true">◷</span>
          {new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }).format(new Date())}
        </div>
      </header>

      {/* {(ordersError || customersError) && (
        <div className={styles.error} role="alert">
          <strong>Some data could not be loaded.</strong>
          <span>
            {[
              ordersError && `Orders: ${ordersError}`,
              customersError && `Customers: ${customersError}`,
            ]
              .filter(Boolean)
              .join(" ")}
          </span>
        </div>
      )} */}

      <section className={styles.stats} aria-label="Store statistics">
        <Card
          icon="💰"
          title="Today's Sales"
          value={
            ordersLoading
              ? "..."
              : statistics.hasTodaySales
                ? formatCurrency(statistics.todaySales)
                : "—"
          }
          description="Based on today's dated orders"
          type="sales"
        />

        <Card
          icon="📦"
          title="Total Orders"
          value={ordersLoading ? "..." : orders.length}
          description="Orders currently available"
          type="orders"
        />

        <Card
          icon="👥"
          title="Total Customers"
          value={customersLoading ? "..." : customers.length}
          description="Customers currently available"
          type="customers"
        />

        <Card
          icon="📈"
          title="Total Revenue"
          value={
            ordersLoading
              ? "..."
              : statistics.hasRevenue
                ? formatCurrency(statistics.revenue)
                : "—"
          }
          description="Sum of available order amounts"
          type="revenue"
        />
      </section>

      <Chart />
    </main>
  );
}