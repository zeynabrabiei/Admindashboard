import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./Chart.module.css";
import { useOrders } from "../contexts/OrdersContext";

const salesData = [
  { month: "Jan", sales: 400 },
  { month: "Feb", sales: 600 },
  { month: "Mar", sales: 800 },
  { month: "Apr", sales: 650 },
  { month: "May", sales: 700 },
  { month: "Jul", sales: 1200 },
];

const Chart = () => {
  const { orders, ordersLoading } = useOrders();

  // فقط ۵ سفارش آخر
  const recentOrders = [...orders].slice(-5).reverse();

  const startId = 35;

  return (
    <div className={styles.chartAndOrders}>
      <div className={styles.chartBox}>
        <p className={styles.boxTitle}>Sales Chart</p>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.ordersBox}>
        <p className={styles.boxTitle}>Recent Orders</p>
        {ordersLoading ? (
          <p>Loading...</p>
        ) : (
          <table className={styles.ordersTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={order.id}>
                  <td>{startId - index}</td>
                  <td>{order.name}</td>
                  <td className={order.status ? styles.completed : styles.pending}>
                    {order.status ? "Completed" : "Pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Chart;
