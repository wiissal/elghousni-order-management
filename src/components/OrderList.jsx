import React from "react";
import useStore from "../store/useStore";
import StatusBadge from "./StatusBadge";

function OrderList() {
  // Pull orders and removeOrder from Zustand
  const orders = useStore((state) => state.orders);
  const removeOrder = useStore((state) => state.removeOrder);

  if (!orders || orders.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>No orders yet.</p>
    );
  }

  return (
    <div className="order-list">
      <h2>Orders List</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-item-card">
          <div className="order-content">
            <h3>{order.customerName}</h3>
            <p>Product: {order.product}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Price: {order.price ? `${order.price} MAD` : "N/A"}</p>
            <StatusBadge status={order.status} />
          </div>
          <button className="delete-btn" onClick={() => removeOrder(order.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default OrderList;
