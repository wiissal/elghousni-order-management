// App.jsx
import React from "react";
import Sidebar from "./components/Sidebar";
import OrderForm from "./components/OrderForm";
import orderList from "./components/OrderList";
import OrderSummary from "./components/OrderSummary";
import FilterBar from "./components/FilterBar";
import OrderCard from "./components/OrderCard";
import useStore from "./store/useStore";
import "./App.css";

function App() {
  const activePart = useStore((state) => state.activePart); // pull activePart from Zustand

  return (
    <div className="app-container">
      {/* Sidebar automatically updates Zustand activePart */}
      <Sidebar />

      <div className="main-content">
        {activePart === "orderCard" && <OrderCard />}
        {activePart === "orderForm" && <OrderForm />}
        {activePart === "orderSummary" && <OrderSummary />}
        {activePart === "filterBar" && <FilterBar />}
        {activePart === "orderList" && <orderList />}
      </div>
    </div>
  );
}

export default App;
