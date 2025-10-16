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
        <Navbar />

        <div className="layout">
          <Sidebar />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<OrderCard />} />
              <Route path="/form" element={<OrderForm />} />
              <Route
                path="/orders"
                element={
                  <>
                    <FilterBar />
                    <OrderList />
                  </>
                }
              />
              <Route path="/summary" element={<OrderSummary />} />

              {/* Catch-all for unknown routes */}
              <Route path="*" element={<h2>Page Not Found</h2>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
