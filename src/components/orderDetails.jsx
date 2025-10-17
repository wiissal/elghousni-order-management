// OrderDetails.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStore from "../store/useStore";
import StatusBadge from "./StatusBadge"; // adjust path if needed

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Zustand store
  const orders = useStore((state) => state.orders);
  const updateOrder = useStore((state) => state.updateOrder);
  const deleteOrder = useStore((state) => state.deleteOrder);

  // Find order by ID
  const order = orders.find((o) => o.id === Number(id));

  // Local state for status update
  const [status, setStatus] = useState(order?.status || "");

  if (!order) {
    return (
      <div className="order-details-notfound">
        <h2>Order Not Found</h2>
        <button onClick={() => navigate("/orders")}>Back to Orders</button>
      </div>
    );
  }

  // Handlers
  const handleStatusChange = (e) => setStatus(e.target.value);

  const handleUpdate = () => {
    updateOrder(order.id, { ...order, status });
    alert("Order updated!");
  };

  const handleDelete = () => {
    deleteOrder(order.id);
    navigate("/orders");
  };

  return (
    <div className="order-details">
      <h2>Order Details</h2>
      <p><strong>Customer Name:</strong> {order.customerName}</p>
      <p><strong>Product:</strong> {order.product}</p>
      <p><strong>Quantity:</strong> {order.quantity}</p>
      <p><strong>Price:</strong> {order.price ? `$${order.price}` : "N/A"}</p>
      <p><strong>Status:</strong> <StatusBadge status={status} /></p>

      {/* Update Status */}
      <div style={{ marginTop: "10px" }}>
        <label>Change Status: </label>
        <select value={status} onChange={handleStatusChange}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>
        <button onClick={handleUpdate} style={{ marginLeft: "10px" }}>Update Order</button>
      </div>

      {/* Delete Order */}
      <button onClick={handleDelete} style={{ marginTop: "10px", color: "red" }}>
        Delete Order
      </button>

      {/* Back Button */}
      <button onClick={() => navigate("/orders")} style={{ marginTop: "10px" }}>
        Back to Orders
      </button>
    </div>
  );
}

export default OrderDetails;
