import React from "react";
import useStore from "../store/useStore";
import StatusBadge from "./StatusBadge";
import "../App.css";

function OrderList() {
  const orders = useStore((state) => state.orders); // get current orders
  const filter = useStore((state) => state.filter); // get current filter
  const removeOrder = useStore((state) => state.removeOrder);

  // Apply filter
  const filteredOrders = 
    filter === "all"
      ? orders
      : orders.filter((o) => o.status === filter);

  if (!filteredOrders.length) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>No orders found.</p>;
  }

  return (
    <div className="order-list">
      <h2>Orders List</h2>
      {filteredOrders.map((order) => (
        <div key={order.id} className="order-item-card">
          <div className="order-content">
            <h3>{order.customerName}</h3>
            <p>Product: {order.product}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Price: {order.price ? `${order.price} MAD` : "N/A"}</p>
            <StatusBadge status={order.status} />
          </div>
          <button className="delete-btn" onClick={() => removeOrder(order.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default OrderList;
