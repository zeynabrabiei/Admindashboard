
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useOrders } from "../contexts/OrdersContext";
import styles from "./Chart.module.css";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const fallbackSalesData = [
  { month: "Jan", orders: 42 },
  { month: "Feb", orders: 58 },
  { month: "Mar", orders: 49 },
  { month: "Apr", orders: 72 },
  { month: "May", orders: 65 },
  { month: "Jun", orders: 84 },
  { month: "Jul", orders: 76 },
];

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

function getMonthlyData(orders) {
  const now = new Date();

  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - 5 + index,
      1
    );

    return {
      month: MONTHS[date.getMonth()],
      year: date.getFullYear(),
      orders: 0,
    };
  });

  orders.forEach((order) => {
    const date = getOrderDate(order);

    if (!date) return;

    const month = months.find(
      (item) =>
        item.month === MONTHS[date.getMonth()] &&
        item.year === date.getFullYear()
    );

    if (month) month.orders += 1;
  });

  return months;
}

function getCustomerName(order) {
  return (
    order.name ||
    order.customerName ||
    order.customer?.name ||
    "Unknown customer"
  );
}

function getStatus(order) {
  const status = order.status;

  if (status === true || status === "completed") {
    return "completed";
  }

  return "pending";
}

export default function Chart() {
  const {
    orders = [],
    ordersLoading,
  } = useOrders();

  const safeOrders = Array.isArray(orders) ? orders : [];

  const recentOrders = [...safeOrders].slice(-5).reverse();

  const hasOrderDates = safeOrders.some((order) =>
    getOrderDate(order)
  );

  const monthlyData = hasOrderDates
    ? getMonthlyData(safeOrders).map(({ month, orders }) => ({
        month,
        orders,
      }))
    : fallbackSalesData;

  return (
    <section className={styles.grid}>
      <article className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h2 className={styles.title}>Order activity</h2>
            <p className={styles.subtitle}>
              Monthly order overview
            </p>
          </div>

          <span className={styles.chartIcon} aria-hidden="true">
            ↗
          </span>
        </div>

        <div className={styles.chart}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyData}
              margin={{ top: 12, right: 8, left: -18, bottom: 0 }}
            >
              <CartesianGrid
                stroke="#edf1f7"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8792a6", fontSize: 12 }}
              />

              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8792a6", fontSize: 12 }}
              />

              <Tooltip
                contentStyle={{
                  border: "1px solid #e9edf4",
                  borderRadius: 12,
                  boxShadow: "0 8px 24px rgba(31, 50, 90, .08)",
                }}
                formatter={(value) => [value, "Orders"]}
              />

              <Line
                type="monotone"
                dataKey="orders"
                name="Orders"
                stroke="#3979ec"
                strokeWidth={3}
                dot={{ r: 4, fill: "#3979ec", strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h2 className={styles.title}>Recent orders</h2>
            <p className={styles.subtitle}>
              Latest orders in your store
            </p>
          </div>

          <span className={styles.count}>{safeOrders.length}</span>
        </div>

        {ordersLoading ? (
          <div className={styles.state}>Loading orders...</div>
        ) : recentOrders.length === 0 ? (
          <div className={styles.state}>
            No orders to display yet.
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Order</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order, index) => {
                  const status = getStatus(order);

                  return (
                    <tr
                      key={
                        order.id ??
                        `${getCustomerName(order)}-${index}`
                      }
                    >
                      <td className={styles.orderId}>
                        #{order.id ?? "—"}
                      </td>

                      <td className={styles.customerName}>
                        {getCustomerName(order)}
                      </td>

                      <td>
                        <span
                          className={`${styles.badge} ${
                            status === "completed"
                              ? styles.completed
                              : styles.pending
                          }`}
                        >
                          {status === "completed"
                            ? "Completed"
                            : "Pending"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </article>
    </section>
  );
}