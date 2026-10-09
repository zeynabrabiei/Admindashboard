import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const OrdersContext = createContext(null);

const CUSTOMERS_URL =
  "https://68324c7fc3f2222a8cb1f4ff.mockapi.io/customers";

const ORDERS_URL =
  "https://68324c7fc3f2222a8cb1f4ff.mockapi.io/orders";

export function useOrders() {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error("useOrders must be used inside OrdersProvider.");
  }

  return context;
}

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [customersLoading, setCustomersLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);

  const [customersError, setCustomersError] = useState("");
  const [ordersError, setOrdersError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCustomers() {
      try {
        setCustomersLoading(true);
        setCustomersError("");

        const response = await fetch(CUSTOMERS_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("دریافت اطلاعات مشتری‌ها ناموفق بود.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("ساختار اطلاعات مشتری‌ها معتبر نیست.");
        }

        setCustomers(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setCustomersError(
            error.message || "خطا در دریافت مشتری‌ها."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setCustomersLoading(false);
        }
      }
    }

    fetchCustomers();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchOrders() {
      try {
        setOrdersLoading(true);
        setOrdersError("");

        const response = await fetch(ORDERS_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("دریافت اطلاعات سفارش‌ها ناموفق بود.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("ساختار اطلاعات سفارش‌ها معتبر نیست.");
        }

        setOrders(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setOrdersError(
            error.message || "خطا در دریافت سفارش‌ها."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setOrdersLoading(false);
        }
      }
    }

    fetchOrders();

    return () => controller.abort();
  }, []);

  const saveCustomer = useCallback((updatedCustomer) => {
    setCustomers((current) =>
      current.map((customer) =>
        String(customer.id) === String(updatedCustomer.id)
          ? { ...customer, ...updatedCustomer }
          : customer
      )
    );
  }, []);

  const deleteCustomer = useCallback((id) => {
    setCustomers((current) =>
      current.filter(
        (customer) => String(customer.id) !== String(id)
      )
    );
  }, []);

  const deleteOrder = useCallback((id) => {
    setOrders((current) =>
      current.filter((order) => String(order.id) !== String(id))
    );
  }, []);

  const updateOrderStatus = useCallback((id) => {
    setOrders((current) =>
      current.map((order) =>
        String(order.id) === String(id)
          ? { ...order, status: true }
          : order
      )
    );
  }, []);

  const value = {
    orders,
    customers,
    ordersLoading,
    customersLoading,
    ordersError,
    customersError,

    // Backward compatibility for pages using the old error property.
    error: customersError || ordersError,

    saveCustomer,
    deleteCustomer,
    deleteOrder,
    updateOrderStatus,
  };

  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  );
}