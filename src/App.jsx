// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/navbar";
import OrderCard from "./components/OrderCard";
import OrderForm from "./components/OrderForm";
import OrderSummary from "./components/OrderSummary";
import FilterBar from "./components/FilterBar";
import OrderList from "./components/OrderList";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navbar always at the top */}
        <Navbar />

        <div className="layout">
          {/* Sidebar always visible on the left */}
          <Sidebar />

          {/* The main area that changes depending on the route */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<OrderCard />} />
              <Route path="/form" element={<OrderForm />} />
              <Route path="/summary" element={<OrderSummary />} />
              <Route
                path="/orders"
                element={
                  <>
                    <FilterBar />
                    <OrderList />
                  </>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
