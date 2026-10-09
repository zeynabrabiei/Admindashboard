import React, { createContext, useContext, useEffect, useState } from "react";

const OrdersContext = createContext();
export const useOrders = () => useContext(OrdersContext);

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customersLoading, setCustomersLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://68324c7fc3f2222a8cb1f4ff.mockapi.io/customers")
      .then((res) => {
        if (!res.ok) throw new Error("خطا در دریافت مشتری‌ها");
        return res.json();
      })
      .then((data) => {
        setCustomers(data);
        setCustomersLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setCustomersLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("https://68324c7fc3f2222a8cb1f4ff.mockapi.io/orders")
      .then((res) => {
        if (!res.ok) throw new Error("خطا در دریافت سفارش‌ها");
        return res.json();
      })
      .then((data) => {
        setOrders(data);
        setOrdersLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setOrdersLoading(false);
      });
  }, []);

  const saveCustomer = (updatedCustomer) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c))
    );
  };

  const deleteCustomer = (id) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  const deleteOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const updateOrderStatus = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: true } : order
      )
    );
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        ordersLoading,
        customers,
        customersLoading,
        saveCustomer,
        deleteCustomer,
        deleteOrder,
        updateOrderStatus,
        error,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}
