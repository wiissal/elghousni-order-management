// Sidebar.jsx
import { NavLink } from "react-router-dom";
import "../App.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><NavLink to="/">Products</NavLink></li> {/* Link to OrderCard */}
        <li><NavLink to="/form">New Order</NavLink></li> {/* Link to OrderForm */}
        <li><NavLink to="/orders">Orders</NavLink></li> {/* Link to OrderList */}
        <li><NavLink to="/summary">Summary</NavLink></li> {/* Link to OrderSummary */}
        <li><NavLink to="/products">Manage Products</NavLink></li> {/* Link to Products */}
      </ul>
    </div>
  );
}

export default Sidebar;
