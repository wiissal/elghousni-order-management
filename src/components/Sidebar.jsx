// Sidebar.jsx
import "../App.css";
import useStore from "../store/useStore";

function Sidebar() {
  const setActivePart = useStore((state) => state.setActivePart);

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <ul className="sidebar-menu">
        <li onClick={() => setActivePart("orderCard")}>Products</li>
        <li onClick={() => setActivePart("orderForm")}>Order Form</li>
        <li onClick={() => setActivePart("orderSummary")}>Summary</li>
        <li onClick={() => setActivePart("filterBar")}>Filter Orders</li>
      </ul>
    </div>
  );
}

export default Sidebar;
