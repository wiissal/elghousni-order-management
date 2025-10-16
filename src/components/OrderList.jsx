// OrderList.jsx
import React from "react";
import useStore from "../store/useStore";
import StatusBadge from "./StatusBadge";

function OrderList() {
  // Access orders and current filter from Zustand
  const { orders, filter } = useStore((state) => ({
    orders: state.orders,
    filter: state.filter,
  }));

  // Apply filter
  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  if (!filteredOrders || filteredOrders.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>No orders yet.</p>;
  }

  return (
    <div className="order-list">
      <h2>Orders List</h2>
      {filteredOrders.map((order) => (
        <div key={order.id} className="order-item">
          <div className="order-info">
            <h3>{order.customerName}</h3>
            <p>Product: {order.product}</p>
            <p>Quantity: {order.quantity}</p>
            {order.price && <p>Price: ${order.price}</p>}
            <p>
              Status: <StatusBadge status={order.status} />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderList;
