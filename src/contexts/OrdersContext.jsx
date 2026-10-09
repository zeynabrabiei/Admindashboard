
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

// Demo data used when the API is unavailable or returns an empty list.
const DEMO_CUSTOMERS = [
  {
    id: "C-1001",
    name: "Olivia Martin",
    email: "olivia@example.com",
    password: "",
    avatar: "https://i.pravatar.cc/120?img=47",
    orders: 24,
    createdAt: "2026-01-12T10:00:00.000Z",
  },
  {
    id: "C-1002",
    name: "James Wilson",
    email: "james@example.com",
    password: "",
    avatar: "https://i.pravatar.cc/120?img=12",
    orders: 12,
    createdAt: "2026-02-04T10:00:00.000Z",
  },
  {
    id: "C-1003",
    name: "Sophia Brown",
    email: "sophia@example.com",
    password: "",
    avatar: "https://i.pravatar.cc/120?img=44",
    orders: 31,
    createdAt: "2026-03-18T10:00:00.000Z",
  },
  {
    id: "C-1004",
    name: "Liam Davis",
    email: "liam@example.com",
    password: "",
    avatar: "https://i.pravatar.cc/120?img=13",
    orders: 8,
    createdAt: "2026-04-09T10:00:00.000Z",
  },
  {
    id: "C-1005",
    name: "Emma Taylor",
    email: "emma@example.com",
    password: "",
    avatar: "https://i.pravatar.cc/120?img=49",
    orders: 22,
    createdAt: "2026-05-21T10:00:00.000Z",
  },
];

const DEMO_ORDERS = [
  {
    id: "ORD-1048",
    name: "Olivia Martin",
    status: true,
    date: "2026-10-08",
    createdAt: "2026-10-08T09:30:00.000Z",
  },
  {
    id: "ORD-1047",
    name: "James Wilson",
    status: false,
    date: "2026-10-07",
    createdAt: "2026-10-07T13:15:00.000Z",
  },
  {
    id: "ORD-1046",
    name: "Sophia Brown",
    status: true,
    date: "2026-10-06",
    createdAt: "2026-10-06T11:20:00.000Z",
  },
  {
    id: "ORD-1045",
    name: "Liam Davis",
    status: false,
    date: "2026-10-05",
    createdAt: "2026-10-05T15:45:00.000Z",
  },
  {
    id: "ORD-1044",
    name: "Emma Taylor",
    status: true,
    date: "2026-10-04",
    createdAt: "2026-10-04T08:10:00.000Z",
  },
];

export function useOrders() {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error("useOrders must be used inside OrdersProvider.");
  }

  return context;
}

async function fetchList(url, signal) {
  const response = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid API response");
  }

  return data;
}

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [customersLoading, setCustomersLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Keep the real errors available for debugging without showing them
  // as disruptive messages in the dashboard.
  const [customersError, setCustomersError] = useState("");
  const [ordersError, setOrdersError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadCustomers() {
      try {
        setCustomersLoading(true);
        setCustomersError("");

        const data = await fetchList(
          CUSTOMERS_URL,
          controller.signal
        );

        if (!controller.signal.aborted) {
          setCustomers(
            data.length > 0 ? data : DEMO_CUSTOMERS
          );
        }
      } catch (error) {
        if (
          error.name !== "AbortError" &&
          !controller.signal.aborted
        ) {
          setCustomersError(error.message);
          setCustomers(DEMO_CUSTOMERS);
        }
      } finally {
        if (!controller.signal.aborted) {
          setCustomersLoading(false);
        }
      }
    }

    loadCustomers();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadOrders() {
      try {
        setOrdersLoading(true);
        setOrdersError("");

        const data = await fetchList(
          ORDERS_URL,
          controller.signal
        );

        if (!controller.signal.aborted) {
          setOrders(data.length > 0 ? data : DEMO_ORDERS);
        }
      } catch (error) {
        if (
          error.name !== "AbortError" &&
          !controller.signal.aborted
        ) {
          setOrdersError(error.message);
          setOrders(DEMO_ORDERS);
        }
      } finally {
        if (!controller.signal.aborted) {
          setOrdersLoading(false);
        }
      }
    }

    loadOrders();

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
      current.filter(
        (order) => String(order.id) !== String(id)
      )
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

    // Pages using the old generic error property won't display
    // the API error instead of the fallback content.
    error: "",

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