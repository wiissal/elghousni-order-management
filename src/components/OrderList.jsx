// OrderList.jsx
import React from "react";
import useStore from "../store/useStore";
import StatusBadge from "./StatusBadge";

function OrderList() {
  // Pull orders from Zustand
  const orders = useStore((state) => state.orders);

  if (!orders || orders.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>No orders yet.</p>;
  }

  return (
    <div className="order-list">
      <h2>Orders List</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-item">
          <div className="order-info">
            <h3>{order.customerName}</h3>
            <p>Product: {order.product}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Price: {order.price ? `$${order.price}` : "N/A"}</p>
            <StatusBadge status={order.status} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderList;
