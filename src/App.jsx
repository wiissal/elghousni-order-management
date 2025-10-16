// App.jsx
import React from "react";
import Sidebar from "./components/Sidebar";
import OrderForm from "./components/OrderForm";
import OrderCard from "./components/OrderCard";
import OrderList from "./components/OrderList";
import OrderSummary from "./components/OrderSummary";
import FilterBar from "./components/FilterBar";
import useStore from "./store/useStore";
import "./App.css";

function App() {
  // Pull the active part and filter from Zustand
  const activePart = useStore((state) => state.activePart);

  return (
    <div className="app-container">
      {/*flex container for sidebar and main content */}
      <div className="layout">
      {/* Sidebar always visible */}
      <Sidebar />

      <div className="main-content">
        {/* Conditional rendering based on activePart */}
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
