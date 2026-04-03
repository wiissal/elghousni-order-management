import "../App.css";
import useStore from "../store/useStore";
import { useNavigate } from "react-router-dom";

function OrderSummary() {
  const orders = useStore((state) => state.orders);
  const setFilter = useStore((state) => state.setFilter);
  const navigate = useNavigate(); // react-router navigation

  const totalOrders = orders.length; 
  const pendingOrders = orders.filter((o) => o.status === "pending").length; 
  const preparedOrders = orders.filter((o) => o.status === "prepared").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;

  const handleClick = (filter) => {
    setFilter(filter);       // set filter in Zustand
    navigate("/orders");     // go to /orders page to show FilterBar + OrderList
  };

  return ( 
    <div className="order-summary">
      <h2>Order Summary</h2>
      <div className="summary-grid">
        <div className="summary-box total" onClick={() => handleClick("all")}> {/* Shown if current filter is 'all' */}
          <h3>Total</h3>
          <p>{totalOrders}</p>
        </div>
        <div className="summary-box pending" onClick={() => handleClick("pending")}> {/* Shown if current filter is 'pending' */}
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
