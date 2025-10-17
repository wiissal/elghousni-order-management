// OrderDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStore from "../store/useStore";
import StatusBadge from "./StatusBadge";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const orders = useStore((state) => state.orders);

  const order = orders.find((o) => o.id === Number(id));

  if (!order) {
    return (
      <div className="order-details-notfound">
        <h2>Order Not Found</h2>
        <button onClick={() => navigate("/orders")}>Back to Orders</button>
      </div>
    );
  }

  return (
    <div className="order-details">
      <h2>Order Details</h2>
      <p><strong>Customer Name:</strong> {order.customerName}</p>
      <p><strong>Product:</strong> {order.product}</p>
      <p><strong>Quantity:</strong> {order.quantity}</p>
      <p><strong>Price:</strong> {order.price ? `$${order.price}` : "N/A"}</p>
      <p>
        <strong>Status:</strong> <StatusBadge status={order.status} />
      </p>
      <button onClick={() => navigate("/orders")}>Back to Orders</button>
    </div>
  );
}

export default OrderDetails;
