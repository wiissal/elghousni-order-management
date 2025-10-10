// App.jsx
import React, { useState } from "react";
import Navbar from "./components/navbar"; // lowercase as you requested
import Sidebar from "./components/Sidebar";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";
import FilterBar from "./components/FilterBar";
import OrderSummary from "./components/OrderSummary";
import OrderCard from "./components/OrderCard"; // optional if you want product cards
import "./App.css";

function App() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");

  // Add a new order
  const handleAddOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  // Change current filter
  const handleFilterChange = (status) => {
    setFilter(status);
  };

  // Filter orders for OrderList
  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <div className="content">
        {/* Only show OrderCard if you want product selection cards */}
        <OrderCard />

        {/* Form to create new orders */}
        <OrderForm onAddOrder={handleAddOrder} />

        {/* Summary of all orders */}
        <OrderSummary orders={orders} />

        {/* Filter buttons */}
        <FilterBar currentFilter={filter} onFilterChange={handleFilterChange} />

        {/* List of orders based on filter */}
        <OrderList orders={filteredOrders} />
      </div>

      <div className="footer">
        <p>&copy; 2025 Elghousni Olive Cooperative. All rights reserved.</p>
      </div>
    </div>
  );
}

export default App;
