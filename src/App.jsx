// App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import OrderForm from "./components/OrderForm";
import OrderCard from "./components/OrderCard";
import OrderList from "./components/OrderList";
import OrderSummary from "./components/OrderSummary";
import FilterBar from "./components/FilterBar";
import useStore from "./store/useStore";
import "./App.css";

function App() {
  const activePart = useStore((state) => state.activePart);

  return (
    <div className="app-container">
      <Navbar /> {/* Top navbar */}
      <div className="layout">
        <Sidebar /> {/* Left sidebar */}
        <div className="main-content">
          {activePart === "orderCard" && <OrderCard />}
          {activePart === "orderForm" && <OrderForm />}
          {activePart === "orderSummary" && <OrderSummary />}
          {activePart === "filterBar" && (
            <>
              <FilterBar />
              <OrderList />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
