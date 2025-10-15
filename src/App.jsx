// App.jsx
import React, { useState } from "react";
import Navbar from "./components/navbar";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";
import FilterBar from "./components/FilterBar";
import OrderSummary from "./components/OrderSummary";
import OrderCard from "./components/OrderCard";
import "./App.css";

function App() {
  // STATE VARIABLES
  const [orders, setOrders] = useState([]); // stores all orders

  const [filter, setFilter] = useState("all"); // current filter ("all", "completed", etc.)
  const [activePart, setActivePart] = useState("orderCard"); // which part of the UI is visible

  // FUNCTIONS

  // Add a new order
  const handleAddOrder = (newOrder) => {
    setOrders([...orders, newOrder]); // add new order to orders array
  };

  // Filter orders for OrderList
  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  // render
  return (
    <div className="App">
      {/* Navbar */}
      <Navbar setActivePart={setActivePart}>
        <div style={{ width: "100%" }}>
          <div className="main-container">
            {/* Main content area */}
            <div className="content">
              {activePart === "orderCard" && <OrderCard />}
              {activePart === "orderForm" && (
                <OrderForm onAddOrder={handleAddOrder} />
              )}
              {activePart === "orderSummary" && (
                <OrderSummary orders={orders} />
              )}
              {activePart === "orderList" && (
                <>
                  <FilterBar
                    currentFilter={filter}
                    onFilterChange={setFilter}
                  />
                  <OrderList orders={filteredOrders} />
                </>
              )}
              {activePart === "filterBar" && (
                <>
                  <FilterBar
                    currentFilter={filter}
                    onFilterChange={setFilter}
                  />
                  <OrderList orders={filteredOrders} />
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="footer">
            <p>&copy; 2025 Elghousni Olive Cooperative. All rights reserved.</p>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default App;
