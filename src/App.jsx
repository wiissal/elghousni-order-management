import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/navbar";
import OrderCard from "./components/OrderCard";
import OrderForm from "./components/OrderForm";
import OrderSummary from "./components/OrderSummary";
import FilterBar from "./components/FilterBar";
import OrderList from "./components/OrderList";
import Products from "./components/Products";
import OrderDetails from "./components/orderDetails"; // FIXED: uppercase first letter
import "./App.css"; // App.css is in src/, so this path is correct

function App() { // Main App component 
  return (
    <Router>
      <div className="app-container"> 
        <Navbar />

        <div className="layout">
          <Sidebar />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<OrderCard />} /> {/* Home route */}
              <Route path="/form" element={<OrderForm />} /> {/* Order form route */}
              <Route
                path="/orders"
                element={
                  <>
                    <FilterBar />
                    <OrderList />

                  </>
                }
              />
              <Route path="/orders/:id" element={<OrderDetails />} /> {/* NEW */}
              <Route path="/summary" element={<OrderSummary />} />
              <Route path="/Products" element={<Products />} />

              {/* Catch all for unknown routes */}
              <Route path="*" element={<h2>Page Not Found</h2>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
