import React, { useEffect } from 'react';
import Card from "../components/Card";
import Chart from "../components/Chart";
import { useOrders } from '../contexts/OrdersContext';
// import styles from "./Dashboard.module.css";

function Dashboard() {

  const { orders, customers } = useOrders();

  useEffect( () =>{
    document.title = "Dashboard";
  },[])

  return (
    <>
    
      <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))" }}>
        <Card icon={"💰"} title="Today's Sales" value="$2,300" type="sales" />
        <Card icon={"📦"} title="Total Orders" value={orders.length} type="orders" />
        <Card icon={"👥"} title="Total Customers" value={customers.length} type="customers" />
        <Card icon={"📈"} title="Total Revenue" value="$87,650" type="revenue" />
      </div>
      <Chart />
    </>
  )
}

export default Dashboard;