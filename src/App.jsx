import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";

// Pages
import Dashboard from "./Pages/Dashboard"
import Customers from "./Pages/Customers";
import Orders from "./Pages/Orders";
import Products from "./Pages/Products";
import Settings from "./Pages/Settings";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";


import "./global.css";
import { OrdersProvider } from "./contexts/OrdersContext";

function App() {
  
  return (
     <OrdersProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NotFound/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      </OrdersProvider>
  );
}

export default App;