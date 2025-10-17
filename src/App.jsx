// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/navbar"; // fixed: uppercase
import OrderCard from "./components/OrderCard";
import OrderForm from "./components/OrderForm";
import OrderSummary from "./components/OrderSummary";
import FilterBar from "./components/FilterBar";
import OrderList from "./components/OrderList";
import Products from "./components/Products";
import OrderDetails from "./components/orderDetails"; // fixed: uppercase

import "./App.css";

function App() {
  return (
    <Router>
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

              {/* Order Details Page */}
              <Route path="/orders/:id" element={<OrderDetails />} />

              {/* Order Summary */}
              <Route path="/summary" element={<OrderSummary />} />

              {/* Products Management */}
              <Route path="/products" element={<Products />} />

              {/* Fallback for unknown routes */}
              <Route path="*" element={<h2>Page Not Found</h2>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
