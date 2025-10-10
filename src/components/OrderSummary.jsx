// OrderSummary.jsx
import "../App.css";

function OrderSummary({ orders }) {
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const preparedOrders = orders.filter((o) => o.status === "prepared").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <div className="summary-grid">
        <div className="summary-box total">
          <h3>Total</h3>
          <p>{totalOrders}</p>
        </div>
        <div className="summary-box pending">
          <h3>Pending</h3>
          <p>{pendingOrders}</p>
        </div>
        <div className="summary-box prepared">
          <h3>Prepared</h3>
          <p>{preparedOrders}</p>
        </div>
        <div className="summary-box delivered">
          <h3>Delivered</h3>
          <p>{deliveredOrders}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
