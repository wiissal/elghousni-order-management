// Sidebar.jsx
import "../App.css";

function Sidebar({ setActivePart }) {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <ul className="sidebar-menu">
        <li onClick={() => setActivePart("orderCard")}>Products</li>     {/* Changed from "Order Card" to "Products" */}
        <li onClick={() => setActivePart("orderForm")}>Order Form</li>  {/* Changed from "Add Order" to "Order Form" */}
        <li onClick={() => setActivePart("orderSummary")}>Summary</li>  {/* Changed from "Order Summary" to "Summary" */}
        <li onClick={() => setActivePart("filterBar")}>Filter Orders</li>  {/* Changed from "Filter Orders" to "Filter Orders" */}
      </ul>
    </div>
  );
}

export default Sidebar;
