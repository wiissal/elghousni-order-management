import "../App.css";
import useStore from "../store/useStore";

function OrderSummary() {
  const orders = useStore((state) => state.orders);
  const setFilter = useStore((state) => state.setFilter); // action to set current filter
  const setActivePart = useStore((state) => state.setActivePart); // to show OrderList

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const preparedOrders = orders.filter((o) => o.status === "prepared").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;

  const handleClick = (filter) => {
    setFilter(filter);        // set filter
    setActivePart("filterBar"); // switch main content to filter + order list
  };

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <div className="summary-grid">
        <div className="summary-box total" onClick={() => handleClick("all")}>
          <h3>Total</h3>
          <p>{totalOrders}</p>
        </div>
        <div className="summary-box pending" onClick={() => handleClick("pending")}>
          <h3>Pending</h3>
          <p>{pendingOrders}</p>
        </div>
        <div className="summary-box prepared" onClick={() => handleClick("prepared")}>
          <h3>Prepared</h3>
          <p>{preparedOrders}</p>
        </div>
        <div className="summary-box delivered" onClick={() => handleClick("delivered")}>
          <h3>Delivered</h3>
          <p>{deliveredOrders}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
