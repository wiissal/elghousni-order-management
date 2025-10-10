// OrderList.jsx
import "../App.css";

function OrderList({ orders }) {
  return (
    <div className="order-list">
      <h2>Orders Overview</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-item">
            <div className="order-info">
              <h3>{order.customerName}</h3>
              <p><strong>Product:</strong> {order.product}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`status-badge ${order.status}`}>
                  {order.status}
                </span>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderList;
