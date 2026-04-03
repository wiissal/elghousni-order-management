// App.jsx
import React, { useState } from "react";
import Navbar from "./components/navbar";
import OrderForm from "./components/OrderForm";
import OrderSummary from "./components/OrderSummary";
import FilterBar from "./components/FilterBar";
import OrderList from "./components/OrderList";
import Products from "./components/Products";
import OrderDetails from "./components/orderDetails"; 
import ProductDetails from "./components/ProductDetails";
import "./App.css";

function App() {   // Main App Component
  return (
    <Router> {/* Setting up Router for navigation*/} 
      <div className="app-container">
        {/* Top Navbar */}
        <Navbar />

        <div className="layout">
          {/* Sidebar for navigation */}
          <Sidebar />

          {/* Main content area */}
          <main className="main-content">
            <Routes>
              {/* Home Route */}
              <Route path="/" element={<OrderCard />} />

              {/* Order Form */}
              <Route path="/form" element={<OrderForm />} />

              {/* Orders List with FilterBar */}
              <Route
                path="/orders"
                element={
                  <>
                    <FilterBar />
                    <OrderList />
                  </>
                }
              />

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

              {/* Fallback for unknown routes */}
              <Route path="*" element={<h2>Page Not Found</h2>} />
              {/* Product Details Page */}
              <Route path="/products/:id" element={<ProductDetails />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
